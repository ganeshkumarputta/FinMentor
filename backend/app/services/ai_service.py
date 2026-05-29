import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(

    api_key=os.getenv("GROQ_API_KEY"),

    base_url="https://api.groq.com/openai/v1"

)

MODEL = "llama-3.3-70b-versatile"


def ask(prompt):

    response = client.chat.completions.create(

        model=MODEL,

        messages=[

            {
                "role": "system",

                "content": """
You are InvestWise AI.

Explain investments clearly.

Assume user is beginner.

Use headings.

Use bullets.

End with final recommendation.
"""
            },

            {
                "role": "user",

                "content": prompt
            }

        ]

    )

    return response.choices[0].message.content


def get_ai_recommendation(

    amount,
    years

):

    prompt = f"""

User wants to invest:

₹{amount}

for

{years}

years.

Answer format:

# Introduction

Explain simply.

# Investment Options

Explain:

SIP

FD

Stocks

Mutual Funds

Post Office

For each include:

- What it is
- Pros
- Cons
- Risk
- Expected return

# Example Growth

Explain inflation simply.

# How To Start

Step by step.

# Final Recommendation

Say:

"If I had ₹{amount}
for {years} years,
I would choose _____"

Explain why.

"""

    try:

        return {

            "text":

            ask(
                prompt
            )

        }

    except Exception as e:

        return {

            "text":

            f"AI Error: {str(e)}"

        }


def follow_up(

    context,
    question

):

    prompt = f"""

Previous discussion:

{context}

User question:

{question}

Continue naturally.

Keep structure.

"""

    try:

        return {

            "text":

            ask(
                prompt
            )

        }

    except Exception as e:

        return {

            "text":

            f"AI Error: {str(e)}"

        }