# Translation + Custom System Prompt Web UI

This project provides a lightweight web UI and backend to translate text using the `tencent/HY-MT1.5-1.8B` model, with support for passing a custom system prompt.

---

## Features

- Translate text into multiple target languages.
- Set a custom system prompt to influence translation behavior.
- Lightweight web interface for easy testing.
- Uses 4-bit quantized model for efficient GPU usage.

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
  <i>Thank you for visiting! Don’t forget to click <b>⭐️ Star</b> to support the project.</i>
</p>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=80&section=footer"/>

</div>
