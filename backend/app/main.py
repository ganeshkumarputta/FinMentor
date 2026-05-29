from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.services.ai_service import (
get_ai_recommendation,
follow_up
)

app = FastAPI()

app.add_middleware(

CORSMiddleware,

allow_origins=["*"],

allow_credentials=True,

allow_methods=["*"],

allow_headers=["*"]

)


@app.post("/ai-recommend")
async def ai(data: dict):

    return get_ai_recommendation(

        data["amount"],

        data["years"]

    )


@app.post("/followup")
async def ask(data: dict):

    return {

        "text":

        follow_up(

            data["context"],

            data["question"]

        )

    }