from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
import shutil
import os
from .. import models, schemas, database, auth

router = APIRouter(prefix="/api", tags=["API"])

# --- Skills ---
@router.get("/skills", response_model=List[schemas.SkillResponse])
def get_skills(db: Session = Depends(database.get_db)):
    return db.query(models.Skill).all()

@router.post("/skills", response_model=schemas.SkillResponse)
def create_skill(skill: schemas.SkillCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_skill = models.Skill(**skill.model_dump())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/skills/{skill_id}")
def delete_skill(skill_id: int, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not db_skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(db_skill)
    db.commit()
    return {"message": "Skill deleted successfully"}

# --- Contact Messages ---
@router.post("/contact", response_model=schemas.ContactMessageResponse)
def create_contact_message(message: schemas.ContactMessageCreate, db: Session = Depends(database.get_db)):
    db_message = models.ContactMessage(**message.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/contact", response_model=List[schemas.ContactMessageResponse])
def get_contact_messages(db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

# --- File Uploads ---
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload", response_model=schemas.UploadedFileResponse)
def upload_file(file_type: str, file: UploadFile = File(...), db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    file_url = f"/static/uploads/{file.filename}"
    db_file = models.UploadedFile(filename=file.filename, file_type=file_type, file_url=file_url)
    db.add(db_file)
    db.commit()
    db.refresh(db_file)
    return db_file

# --- Site Content ---
@router.get("/content", response_model=List[schemas.SiteContentResponse])
def get_all_site_content(db: Session = Depends(database.get_db)):
    return db.query(models.SiteContent).all()

@router.get("/content/{key}", response_model=schemas.SiteContentResponse)
def get_site_content(key: str, db: Session = Depends(database.get_db)):
    content = db.query(models.SiteContent).filter(models.SiteContent.key == key).first()
    if not content:
        raise HTTPException(status_code=404, detail="Content not found")
    return content

@router.post("/content", response_model=schemas.SiteContentResponse)
def update_site_content(content: schemas.SiteContentCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_content = db.query(models.SiteContent).filter(models.SiteContent.key == content.key).first()
    if db_content:
        db_content.value = content.value
    else:
        db_content = models.SiteContent(**content.model_dump())
        db.add(db_content)
    db.commit()
    db.refresh(db_content)
    return db_content
@router.get("/certificates", response_model=List[schemas.CertificateResponse])
def get_certificates(db: Session = Depends(database.get_db)):
    return db.query(models.Certificate).all()

@router.post("/certificates", response_model=schemas.CertificateResponse)
def create_certificate(certificate: schemas.CertificateCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_certificate = models.Certificate(**certificate.model_dump())
    db.add(db_certificate)
    db.commit()
    db.refresh(db_certificate)
    return db_certificate

@router.put("/certificates/{certificate_id}", response_model=schemas.CertificateResponse)
def update_certificate(certificate_id: int, certificate: schemas.CertificateCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_certificate = db.query(models.Certificate).filter(models.Certificate.id == certificate_id).first()
    if not db_certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
        
    for key, value in certificate.model_dump().items():
        setattr(db_certificate, key, value)
        
    db.commit()
    db.refresh(db_certificate)
    return db_certificate

@router.delete("/certificates/{certificate_id}")
def delete_certificate(certificate_id: int, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_certificate = db.query(models.Certificate).filter(models.Certificate.id == certificate_id).first()
    if not db_certificate:
        raise HTTPException(status_code=404, detail="Certificate not found")
    db.delete(db_certificate)
    db.commit()
    return {"message": "Certificate deleted successfully"}

# --- Education ---
@router.get("/education", response_model=List[schemas.EducationResponse])
def get_education(db: Session = Depends(database.get_db)):
    return db.query(models.Education).all()

@router.post("/education", response_model=schemas.EducationResponse)
def create_education(education: schemas.EducationCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_education = models.Education(**education.model_dump())
    db.add(db_education)
    db.commit()
    db.refresh(db_education)
    return db_education

@router.put("/education/{education_id}", response_model=schemas.EducationResponse)
def update_education(education_id: int, education: schemas.EducationCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_education = db.query(models.Education).filter(models.Education.id == education_id).first()
    if not db_education:
        raise HTTPException(status_code=404, detail="Education not found")
        
    for key, value in education.model_dump().items():
        setattr(db_education, key, value)
        
    db.commit()
    db.refresh(db_education)
    return db_education

@router.delete("/education/{education_id}")
def delete_education(education_id: int, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_education = db.query(models.Education).filter(models.Education.id == education_id).first()
    if not db_education:
        raise HTTPException(status_code=404, detail="Education not found")
    db.delete(db_education)
    db.commit()
    return {"message": "Education deleted successfully"}

# --- Experience ---
@router.get("/experience", response_model=List[schemas.ExperienceResponse])
def get_experience(db: Session = Depends(database.get_db)):
    # Sort by ID or start_date descending? Let's just return all for now.
    return db.query(models.Experience).all()

@router.post("/experience", response_model=schemas.ExperienceResponse)
def create_experience(experience: schemas.ExperienceCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_experience = models.Experience(**experience.model_dump())
    db.add(db_experience)
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.put("/experience/{experience_id}", response_model=schemas.ExperienceResponse)
def update_experience(experience_id: int, experience: schemas.ExperienceCreate, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_experience = db.query(models.Experience).filter(models.Experience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
        
    for key, value in experience.model_dump().items():
        setattr(db_experience, key, value)
        
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.delete("/experience/{experience_id}")
def delete_experience(experience_id: int, db: Session = Depends(database.get_db), current_user: models.AdminUser = Depends(auth.get_current_user)):
    db_experience = db.query(models.Experience).filter(models.Experience.id == experience_id).first()
    if not db_experience:
        raise HTTPException(status_code=404, detail="Experience not found")
    db.delete(db_experience)
    db.commit()
    return {"message": "Experience deleted successfully"}
