import uvicorn
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
from starlette.concurrency import run_in_threadpool
from translator import get_translator

app = FastAPI(title="Translation + System Prompt API")
translator = get_translator()


class TranslateRequest(BaseModel):
    text: str
    languages: Optional[List[str]] = None
    system_prompt: Optional[str] = None
    max_new_tokens: int = 256
    temperature: float = 0.5


@app.post("/translate")
async def translate(req: TranslateRequest):
    langs = req.languages or ["English"]
    translations = await run_in_threadpool(
        translator.translate, req.text, langs, req.system_prompt, req.max_new_tokens, req.temperature
    )
    return {"translations": translations}


@app.get("/")
def index():
    return FileResponse("static/index.html")


app.mount("/static", StaticFiles(directory="static"), name="static")


# ---- Tích hợp auto-reload trực tiếp ----
if __name__ == "__main__":
    uvicorn.run(
        "app:app",  # file:app instance
        host="0.0.0.0",
        port=8000,
        reload=True,  # <-- đây là key để tự reload khi code thay đổi
        log_level="info"
    )
