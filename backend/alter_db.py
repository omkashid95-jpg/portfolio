import sqlite3
import os

db_path = "portfolio.db"
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

try:
    cursor.execute("ALTER TABLE education ADD COLUMN percentage VARCHAR")
    print("Added percentage column")
except sqlite3.OperationalError as e:
    print(f"Percentage: {e}")

try:
    cursor.execute("ALTER TABLE education ADD COLUMN cgpa VARCHAR")
    print("Added cgpa column")
except sqlite3.OperationalError as e:
    print(f"CGPA: {e}")

conn.commit()
conn.close()
