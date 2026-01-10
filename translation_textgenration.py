import torch
from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig

# 1️⃣ Model gốc
model_name_or_path = "tencent/HY-MT1.5-1.8B"

# 2️⃣ Cấu hình 4-bit 
bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_compute_dtype=torch.float16
)

# 3️⃣ Load tokenizer
tokenizer = AutoTokenizer.from_pretrained(model_name_or_path, trust_remote_code=True)

# 4️⃣ Load model
print("Đang nạp model...")
model = AutoModelForCausalLM.from_pretrained(
    model_name_or_path,
    quantization_config=bnb_config,
    device_map="auto",
    trust_remote_code=True
)

# 5️⃣ Danh sách ngôn ngữ
languages = [
    "Chinese", "English", "French", "Portuguese", "Spanish", "Japanese",
    "Turkish", "Russian", "Arabic", "Korean", "Thai", "Italian", "German",
    "Vietnamese", "Malay", "Indonesian", "Filipino", "Hindi", "Traditional Chinese",
    "Polish", "Czech", "Dutch", "Khmer", "Burmese", "Persian", "Gujarati",
    "Urdu", "Telugu", "Marathi", "Hebrew", "Bengali", "Tamil", "Ukrainian",
    "Tibetan", "Kazakh", "Mongolian", "Uyghur", "Cantonese"
] # Rút gọn để test nhanh

# 6️⃣ Nhập liệu
text_input = input("Nhập câu cần dịch: ")

# 7️⃣ Vòng lặp dịch
model.eval()
for lang in languages:
    # Tạo tin nhắn theo đúng chuẩn Chat
    messages = [
        {
            "role": "user", 
            "content": f"Please translate the following text into {lang}, output only the translated content:\n{text_input}"
        }
    ]
    
    # Ép kiểu về format của model (quan trọng nhất)
    input_ids = tokenizer.apply_chat_template(
        messages, 
        tokenize=True, 
        add_generation_prompt=True, 
        return_tensors="pt",
        return_token_type_ids=False
    ).to(model.device)
    
    with torch.no_grad():
        outputs = model.generate(
            input_ids,
            max_new_tokens=256,
            temperature=0.5,    # Giữ nhiệt độ thấp để không bị "sáng tạo" lung tung
            do_sample=False,
            repetition_penalty=1.1,
            eos_token_id=tokenizer.eos_token_id # Dừng lại ngay khi dịch xong
        )
    
    # Lấy phần text mới được sinh ra (bỏ phần prompt cũ)
    new_tokens = outputs[0][len(input_ids[0]):]
    translation = tokenizer.decode(new_tokens, skip_special_tokens=True).strip()
    
    print(f"[{lang}]: {translation}")