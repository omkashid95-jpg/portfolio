from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

# --- Admin User ---
class AdminUserBase(BaseModel):
    username: str
    email: EmailStr

class AdminUserCreate(AdminUserBase):
    password: str

class AdminUserResponse(AdminUserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Auth ---
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# --- Project ---
class ProjectBase(BaseModel):
    title: str
    description: str
    technologies: Optional[str] = None
    image_url: Optional[str] = None
    source_link: Optional[str] = None
    live_link: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True

# --- Skill ---
class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None
    proficiency: Optional[int] = None

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int

    class Config:
        from_attributes = True

# --- Certificate ---
class CertificateBase(BaseModel):
    title: str
    issuer: str
    date_issued: Optional[str] = None
    credential_url: Optional[str] = None
    image_url: Optional[str] = None

class CertificateCreate(CertificateBase):
    pass

class CertificateResponse(CertificateBase):
    id: int

    class Config:
        from_attributes = True

# --- Contact Message ---
class ContactMessageBase(BaseModel):
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageResponse(ContactMessageBase):
    id: int
    is_read: bool
    created_at: datetime

    class Config:
        from_attributes = True

# --- Uploaded File ---
class UploadedFileResponse(BaseModel):
    id: int
    filename: str
    file_type: Optional[str] = None
    file_url: str
    uploaded_at: datetime

    class Config:
        from_attributes = True

# --- Site Content ---
class SiteContentBase(BaseModel):
    key: str
    value: str

class SiteContentCreate(SiteContentBase):
    pass

class SiteContentResponse(SiteContentBase):
    id: int

    class Config:
        from_attributes = True

# --- Education ---
class EducationBase(BaseModel):
    degree: str
    institution: str
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    description: Optional[str] = None
    percentage: Optional[str] = None
    cgpa: Optional[str] = None

class EducationCreate(EducationBase):
    pass

class EducationResponse(EducationBase):
    id: int

    class Config:
        from_attributes = True

# --- Experience ---
class ExperienceBase(BaseModel):
    title: Optional[str] = None
    technology: Optional[str] = None
    experience_type: Optional[str] = None
    duration: Optional[str] = None
    description: Optional[str] = None
    key_skills: Optional[str] = None
    outcome: Optional[str] = None

class ExperienceCreate(ExperienceBase):
    pass

class ExperienceResponse(ExperienceBase):
    id: int

    class Config:
        from_attributes = True
