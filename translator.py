import threading
from typing import List, Optional, Dict

import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig


class Translator:
    def __init__(self, model_name_or_path: str = "tencent/HY-MT1.5-1.8B"):
        self.model_name_or_path = model_name_or_path

        bnb_config = BitsAndBytesConfig(
            load_in_4bit=True,
            bnb_4bit_use_double_quant=True,
            bnb_4bit_quant_type="nf4",
            bnb_4bit_compute_dtype=torch.float16,
        )

        # load tokenizer and model once
        self.tokenizer = AutoTokenizer.from_pretrained(self.model_name_or_path, trust_remote_code=True)

        print("Loading model (this may take a while)...")
        self.model = AutoModelForCausalLM.from_pretrained(
            self.model_name_or_path,
            quantization_config=bnb_config,
            device_map="auto",
            trust_remote_code=True,
        )
        self.model.eval()

        # model generation isn't thread-safe for some backends; guard with a lock
        self._lock = threading.Lock()

    def translate(
        self,
        text: str,
        languages: List[str],
        system_prompt: Optional[str] = None,
        max_new_tokens: int = 256,
        temperature: float = 0.5,
    ) -> Dict[str, str]:
        """Translate `text` into each language in `languages`.

        Returns a dict mapping language -> translated text.
        """
        results: Dict[str, str] = {}

        for lang in languages:
            # build chat messages; include optional system prompt
            messages = []
            
            # Nếu có system prompt, thêm vào messages với role system
            if system_prompt:
                # Format system prompt cho từng ngôn ngữ đích
                formatted_prompt = system_prompt.replace("[Target Language]", lang)
                messages.append({"role": "system", "content": formatted_prompt})

            messages.append(
                {
                    "role": "user",
                    "content": f"Please translate the following text into {lang}, output only the translated content:\n{text}",
                }
            )

            # Ép kiểu về format của model (giống y chang code gốc)
            input_ids = self.tokenizer.apply_chat_template(
                messages, 
                tokenize=True, 
                add_generation_prompt=True, 
                return_tensors="pt",
                return_token_type_ids=False
            ).to(self.model.device)

            with torch.no_grad():
                with self._lock:
                    outputs = self.model.generate(
                        input_ids,
                        max_new_tokens=max_new_tokens,
                        temperature=temperature,
                        do_sample=False,
                        repetition_penalty=1.1,
                        eos_token_id=self.tokenizer.eos_token_id,
                    )

            # Lấy phần text mới được sinh ra (bỏ phần prompt cũ) - giống code gốc
            new_tokens = outputs[0][len(input_ids[0]):]
            translation = self.tokenizer.decode(new_tokens, skip_special_tokens=True).strip()
            results[lang] = translation

        return results


# module-level singleton for convenience
_SINGLETON: Optional[Translator] = None


def get_translator() -> Translator:
    global _SINGLETON
    if _SINGLETON is None:
        _SINGLETON = Translator()
    return _SINGLETON
