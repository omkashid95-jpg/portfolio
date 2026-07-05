import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.database import engine, Base
from app.routers import auth, projects, api

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Portfolio API")

frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
if frontend_url and not frontend_url.startswith("http"):
    frontend_url = f"https://{frontend_url}"

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    frontend_url
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins, 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

os.makedirs("uploads", exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory="uploads"), name="uploads")

app.include_router(auth.router)
app.include_router(projects.router)
app.include_router(api.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Portfolio API"}
