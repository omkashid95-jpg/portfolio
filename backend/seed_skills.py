from app.database import SessionLocal, engine, Base
from app.models import Skill

def seed_skills():
    db = SessionLocal()
    
    # Optional: Clear existing skills if we want to replace them
    # db.query(Skill).delete()
    
    skills_data = [
        {"name": "Python", "proficiency": 100, "category": "Programming Languages"},
        {"name": "MySQL", "proficiency": 100, "category": "Databases"},
        {"name": "FastAPI", "proficiency": 100, "category": "Web Development"},
        {"name": "REST APIs", "proficiency": 100, "category": "Web Development"},
        {"name": "Backend Development", "proficiency": 70, "category": "Web Development"},
        {"name": "Scikit-learn", "proficiency": 60, "category": "Machine Learning & AI"},
        {"name": "Pandas", "proficiency": 70, "category": "Data Science & Analysis"},
        {"name": "NumPy", "proficiency": 100, "category": "Data Science & Analysis"},
        {"name": "Matplotlib", "proficiency": 70, "category": "Data Science & Analysis"},
        {"name": "Seaborn", "proficiency": 70, "category": "Data Science & Analysis"},
        {"name": "Generative AI (GenAI)", "proficiency": 70, "category": "Machine Learning & AI"},
        {"name": "EDA", "proficiency": 70, "category": "Data Science & Analysis"},
        {"name": "Feature Engineering", "proficiency": 65, "category": "Data Science & Analysis"},
        {"name": "Llamaindex", "proficiency": 60, "category": "Machine Learning & AI"},
        {"name": "Rag", "proficiency": 60, "category": "Machine Learning & AI"},
        {"name": "Chromadb", "proficiency": 60, "category": "Databases"},
        {"name": "VectorDB", "proficiency": 80, "category": "Databases"},
        {"name": "Google Gemini APIs", "proficiency": 60, "category": "Machine Learning & AI"},
        {"name": "Github", "proficiency": 60, "category": "Tools & Platforms"},
        {"name": "N8N", "proficiency": 70, "category": "Tools & Platforms"},
        {"name": "Communication", "proficiency": 90, "category": "Soft Skills"},
        {"name": "Analytical Thinking", "proficiency": 70, "category": "Soft Skills"},
        {"name": "Team Collaboration", "proficiency": 70, "category": "Soft Skills"},
        {"name": "Problem Solving", "proficiency": 90, "category": "Soft Skills"}
    ]
    
    for skill_data in skills_data:
        # Check if skill already exists
        existing_skill = db.query(Skill).filter(Skill.name == skill_data["name"]).first()
        if existing_skill:
            existing_skill.proficiency = skill_data["proficiency"]
            existing_skill.category = skill_data["category"]
        else:
            new_skill = Skill(**skill_data)
            db.add(new_skill)
            
    db.commit()
    print(f"Seeded {len(skills_data)} skills to the database.")
    db.close()

if __name__ == "__main__":
    seed_skills()
