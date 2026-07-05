import json
import urllib.request
import os

output_file = r"C:/Users/Om/.gemini/antigravity/brain/2cd58536-dc57-480d-895b-7ef5f66a666d/.system_generated/steps/353/output.txt"

with open(output_file, 'r', encoding='utf-8') as f:
    data = json.load(f)

os.makedirs('frontend/templates', exist_ok=True)

for screen in data.get('screens', []):
    title = screen.get('title', 'Untitled').replace(' ', '_').replace(':', '').replace('(', '').replace(')', '').replace('/', '_')
    html_code = screen.get('htmlCode', {})
    download_url = html_code.get('downloadUrl')
    
    if download_url:
        print(f"Downloading {title}...")
        try:
            filename = f"frontend/templates/{title}.html"
            req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
            with urllib.request.urlopen(req) as response:
                with open(filename, 'wb') as out_file:
                    out_file.write(response.read())
            print(f"Saved to {filename}")
        except Exception as e:
            print(f"Failed to download {title}: {e}")
