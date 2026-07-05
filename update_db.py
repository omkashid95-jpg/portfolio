import sqlite3
import os

db_path = os.path.join("backend", "portfolio.db")
conn = sqlite3.connect(db_path)
cursor = conn.cursor()
text = "I am from Pakistan and currently living in Karachi. I am doing Bachelor's in Software engineering and I will graduate in the year 2021. I am Ui Ux designer and currently working as a freelancer."
cursor.execute("UPDATE site_content SET value = ? WHERE key = 'hero_description'", (text,))
conn.commit()
conn.close()
