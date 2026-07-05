from app.database import SessionLocal
from app.models import AdminUser
from app.auth import get_password_hash

db = SessionLocal()
user = db.query(AdminUser).filter(AdminUser.username == 'admin2').first()
if user:
    user.hashed_password = get_password_hash('admin123')
    db.commit()
    print("Password reset for admin2 to 'admin123'")
db.close()
