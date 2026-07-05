from app.database import SessionLocal, engine, Base
from app.models import AdminUser
from app.auth import get_password_hash

# Ensure tables are created
Base.metadata.create_all(bind=engine)

def create_admin(username: str, email: str, password: str):
    db = SessionLocal()
    existing_user = db.query(AdminUser).filter(AdminUser.username == username).first()
    if existing_user:
        print(f"Admin user '{username}' already exists.")
    else:
        hashed_password = get_password_hash(password)
        admin = AdminUser(username=username, email=email, hashed_password=hashed_password)
        db.add(admin)
        db.commit()
        print(f"Admin user '{username}' created successfully!")
    db.close()

if __name__ == "__main__":
    import sys
    if len(sys.argv) != 4:
        print("Usage: python create_admin.py <username> <email> <password>")
    else:
        create_admin(sys.argv[1], sys.argv[2], sys.argv[3])
