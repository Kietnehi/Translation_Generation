# 🌐 Translation + Custom System Prompt Web UI

> **Intelligent parallel translation powered by Tencent HY-MT1.5-1.8B & Custom System Prompts.**
> The project provides a lightweight web interface and backend for text translation with extensive System Prompt customization capabilities.

<div align="center">

### Powered by Tencent HY-MT1.5-1.8B with Custom System Prompt

<img src="image/poster.jpg" alt="Translation Text Generation Poster" width="550"/>

<p><i>Lightweight Web UI for Parallel Translation with Custom System Prompt Design</i></p>

</div>

<div align="center">

![Views](https://komarev.com/ghpvc/?username=Kietnehi&label=REPO%20VIEWS&color=0e75b6&style=for-the-badge)
[![GitHub stars](https://img.shields.io/github/stars/Kietnehi/Translation_Generation?style=for-the-badge&color=ffd700)](https://github.com/Kietnehi/Translation_Generation/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Kietnehi/Translation_Generation?style=for-the-badge&color=orange)](https://github.com/Kietnehi/Translation_Generation/network/members)
![GitHub repo size](https://img.shields.io/github/repo-size/Kietnehi/Translation_Generation?style=for-the-badge&color=blueviolet)
![GitHub last commit](https://img.shields.io/github/last-commit/Kietnehi/Translation_Generation?style=for-the-badge&color=brightgreen)
![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Tencent](https://img.shields.io/badge/Tencent_AI-0052D9?style=for-the-badge&logo=tencent&logoColor=white)
![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=for-the-badge)
![Maintained](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)
![Open PRs](https://img.shields.io/github/issues-pr/Kietnehi/Translation_Generation?style=for-the-badge&color=orange)
[![GitHub Profile](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/Kietnehi)
[![GitHub followers](https://img.shields.io/github/followers/Kietnehi?label=Follow%20Me&style=for-the-badge&color=236AD3)](https://github.com/Kietnehi)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python_3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Tencent](https://img.shields.io/badge/Tencent-0052D9?style=for-the-badge&logo=tencent&logoColor=white)
![NVIDIA](https://img.shields.io/badge/NVIDIA-76B900?style=for-the-badge&logo=nvidia&logoColor=white)
![VS Code](https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)
![Tencent Model](https://img.shields.io/badge/Model-HY--MT1.5--1.8B-blue?style=for-the-badge&logo=tencent&logoColor=white)
![Hugging Face](https://img.shields.io/badge/%F0%9F%A4%97%20Hugging%20Face-FFD21E?style=for-the-badge&color=gray)
![Quantization](https://img.shields.io/badge/Optimization-4bit_Quant-green?style=for-the-badge)
![CUDA](https://img.shields.io/badge/Hardware-CUDA_Supported-76B900?style=for-the-badge&logo=nvidia&logoColor=white)

---


## 🔁 System Pipeline & Architecture

This diagram illustrates the end-to-end workflow of the **Translation + Custom System Prompt Web UI**, from user input to parallel multilingual output.

<p align="center">
  <img src="image/pipeline.jpg" alt="Translation System Pipeline" width="900px" style="border-radius: 12px; border: 1px solid #eaecef;"/>
</p>

## Features

- Translate text into multiple target languages.
- Set a custom system prompt to influence translation behavior.
- Lightweight web interface for easy testing.
- Uses 4-bit quantized model for efficient GPU usage.

---

## 🌟 Features

- **Multi-Language Support**: Translate text into multiple target languages simultaneously.
- **System Prompt Designer**: Influence translation behavior by setting Persona, Context, and Strict Constraints.
- **Logic Splitting**: Automatically formats instructions for the AI, replacing `[Target Language]` dynamically for each task.
- **Efficient Inference**: Uses 4-bit quantization (`bitsandbytes`) for optimized GPU usage.
- **History Tracking**: Keep track of recent translation requests and configurations.

---

## 📸 Screenshots & Workflow Analysis

Below is a practical illustration of how the system handles intelligent translation logic:

### 1. System Prompt Designer (Logic Configuration)
Where the "brain" is set up for the AI before executing the task.

<p align="center">
  <img src="image/system_prompt.png" alt="System Prompt Designer Interface" width="800px" style="border-radius: 10px; border: 1px solid #eaecef;"/>
</p>

* **Persona & Context**: Setting up the role of "Creative Game Localizer" helps the AI choose words with nuances suitable for the Fantasy genre instead of rigid machine translation.
* **Constraint Enforcement**: Applying strict constraints such as "Do not translate proper nouns" (ShadowRealm) to protect the content's identity.

### 2. Intelligent Translator (Execution & Results)
AI performs parallel translation based on the established instructions.

<p align="center">
  <img src="image/translator.png" alt="Translation Results Interface" width="800px" style="border-radius: 10px; border: 1px solid #eaecef;"/>
</p>

* **Analysis**: The model strictly adheres to system commands — keeping the word "ShadowRealm" unchanged in Vietnamese, Chinese, and Japanese translations.
* **Optimization**: Intuitive card interface supports quick copying of each language, helping to increase work efficiency.

---

### 🌟 Advanced Features (New!)

- **Logic Splitting Engine**: Automates the splitting of system logic. You only need to set up the template once, the system will automatically adjust the content for each target language by replacing the `[Target Language]` variable in real time.
- **System Prompt Designer**: In-depth Prompt design interface with:
  - **Persona Role**: Define the translation style (Expert, Creative, Technical).
  - **Project Context**: Provide context for the AI to deeply understand the content to be translated.
  - **Strict Constraints**: Set "hard" rules (maintain original length, do not translate technical terms, preserve Code formatting).
- **Real-time Instruction Preview**: Preview the system command chain that will be sent to the HY-MT1.5 model before translation.
- **Multi-Language Batch Processing**: Translate multiple languages in parallel with separate system instructions for each stream.

---

## Quick Start

### 1. Frontend Setup

```bash
npm install
npm run dev
```

This will start the frontend development server.

### 2. Backend Setup

1. Create a Python virtual environment and activate it:

```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate     # Windows
```

2. Install Python dependencies:

```bash
pip install -r requirements.txt
```

3. Run the FastAPI app:

```bash
python app.py
```

4. Open your browser at [http://localhost:8000](http://localhost:8000) and use the form to:

- Enter input text
- Optionally provide a custom system prompt
- Select target language(s)

---

### 3. Using Prompt Designer
- Switch to the **System Prompt Designer** tab.
- Fill in the parameters: Role, Context, and Constraints.
- Return to the **Translator** tab, enter the text and press **"Translate"**. The system will automatically combine these parameters into the system command sent to the AI.

---
## Notes

- Model weights are loaded with **4-bit quantization**. Make sure:
  - Your environment supports `bitsandbytes`
  - You have a compatible GPU
- The server currently runs inference synchronously in a thread pool.  
  For production, consider **batching requests** or using an **async queue** for better throughput.

---

## Dependencies

- Python >= 3.10
- FastAPI
- Uvicorn
- bitsandbytes
- `tencent/HY-MT1.5-1.8B` model from Hugging Face
- Node.js & npm for frontend

---

# HY-MT1.5-1.8B - Hunyuan Translation Model v1.5 (1.8B)

## Overview
HY-MT1.5-1.8B is a 1.8 billion parameter translation model from Tencent's Hunyuan Translation Model v1.5 series. It is designed for high-quality, real-time translations across 33 languages and 5 ethnic/dialect variations. Despite being smaller than the 7B version, it achieves comparable performance while being optimized for edge device deployment.

## Key Features
- **High Performance**: Industry-leading results for models of similar size, surpassing most commercial translation APIs.
- **Edge Deployment**: Quantized versions allow real-time translation on edge devices.
- **Advanced Translation Capabilities**:
  - Terminology intervention
  - Contextual translation
  - Formatted translation
  - Mixed-language scenario support
- **Lightweight & Fast**: Delivers high-speed inference without significant loss in translation quality.

## Model Variants
| Model | Description |
|-------|-------------|
| `HY-MT1.5-1.8B` | Standard 1.8B translation model |
| `HY-MT1.5-1.8B-FP8` | FP8 quantized model for faster deployment |
| `HY-MT1.5-1.8B-GPTQ-Int4` | INT4 quantized model for edge devices |
| `HY-MT1.5-7B` | Larger 7B model, upgraded for mixed-language and annotated translation |
| `HY-MT1.5-7B-FP8` | FP8 quantized 7B model |
| `HY-MT1.5-7B-GPTQ-Int4` | INT4 quantized 7B model |

## Supported Languages
- Chinese (zh), English (en), French (fr), Portuguese (pt), Spanish (es)
- Japanese (ja), Turkish (tr), Russian (ru), Arabic (ar), Korean (ko)
- Thai (th), Italian (it), German (de), Vietnamese (vi), Malay (ms)
- Indonesian (id), Filipino (tl), Hindi (hi), Traditional Chinese (zh-Hant)
- Polish (pl), Czech (cs), Dutch (nl), Khmer (km), Burmese (my)
- Persian (fa), Gujarati (gu), Urdu (ur), Telugu (te), Marathi (mr)
- Hebrew (he), Bengali (bn), Tamil (ta), Ukrainian (uk), Tibetan (bo)
- Kazakh (kk), Mongolian (mn), Uyghur (ug), Cantonese (yue)

## Quick Start with Transformers
```python
from transformers import AutoModelForCausalLM, AutoTokenizer

model_name_or_path = "tencent/HY-MT1.5-1.8B"

tokenizer = AutoTokenizer.from_pretrained(model_name_or_path)
model = AutoModelForCausalLM.from_pretrained(model_name_or_path, device_map="auto")

messages = [
    {"role": "user", "content": "Translate the following segment into Chinese, without additional explanation.\n\nIt’s on the house."},
]

tokenized_chat = tokenizer.apply_chat_template(
    messages,
    tokenize=True,
    add_generation_prompt=False,
    return_tensors="pt"
)

outputs = model.generate(tokenized_chat.to(model.device), max_new_tokens=2048)
output_text = tokenizer.decode(outputs[0])
print(output_text)
```

### Recommended Inference Parameters
```json
{
  "top_k": 20,
  "top_p": 0.6,
  "repetition_penalty": 1.05,
  "temperature": 0.7
}
```

---
## License

Specify your license here (MIT/Apache/Proprietary).

## 🔗 Author's GitHub

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=120&section=header"/>

<p align="center">
  <a href="https://github.com/Kietnehi">
    <img src="https://github.com/Kietnehi.png" width="140" height="140" style="border-radius: 50%; border: 4px solid #A371F7;" alt="Avatar Truong Phu Kiet"/>
  </a>
</p>

<h3>🚀 Truong Phu Kiet</h3>

<a href="https://github.com/Kietnehi">
  <img src="https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=236AD3&background=00000000&center=true&vCenter=true&width=435&lines=Student+@+Sai+Gon+University;Fullstack+Dev+%26+AI+Researcher;Translation+Text+Generation+Tencent+Model" alt="Typing SVG" />
</a>


<br/><br/>

<p align="center">
  <img src="https://img.shields.io/badge/SGU-Sai_Gon_University-0056D2?style=flat-square&logo=google-scholar&logoColor=white" alt="SGU"/>
  <img src="https://img.shields.io/badge/Base-Ho_Chi_Minh_City-FF4B4B?style=flat-square&logo=google-maps&logoColor=white" alt="HCMC"/>
</p>

<h3>🛠 Tech Stack</h3>
<p align="center">
  <a href="https://skillicons.dev">
    <img src="https://skillicons.dev/icons?i=docker,python,react,nodejs,mongodb,git,fastapi,pytorch&theme=light" alt="My Skills"/>
  </a>
</p>

<br/>

<h3>🌟 Translation + Text Generation Web Application Using Tencent Model</h3>
<p align="center">
  <a href="https://github.com/Kietnehi/FaceRecognition_WEB">
    <img src="https://img.shields.io/github/stars/Kietnehi/Translation_Generation?style=for-the-badge&color=yellow" alt="Stars"/>
    <img src="https://img.shields.io/github/forks/Kietnehi/Translation_Generation?style=for-the-badge&color=orange" alt="Forks"/>
    <img src="https://img.shields.io/github/issues/Kietnehi/Translation_Generation?style=for-the-badge&color=red" alt="Issues"/>
  </a>
</p>
<!-- Dynamic quote -->
<p align="center">
  <img src="https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark" alt="Daily Quote"/>
</p>
<p align="center">
  <i>Thank you for visiting! Don't forget to click <b>⭐️ Star</b> to support the project.</i>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=80&section=footer"/>

</div>

---
## Citation
```bibtex
@misc{hy-mt1.5,
  title={HY-MT1.5 Technical Report}, 
  author={Mao Zheng and Zheng Li and Tao Chen and Mingyang Song and Di Wang},
  year={2025},
  eprint={2512.24092},
  archivePrefix={arXiv},
  primaryClass={cs.CL},
  url={https://arxiv.org/abs/2512.24092}
}
```