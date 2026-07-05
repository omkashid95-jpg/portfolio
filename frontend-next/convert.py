import re
import os

with open('cert.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Extract <header>, <main>, <footer>
header_match = re.search(r'<header[^>]*>.*?</header>', html, re.DOTALL)
main_match = re.search(r'<main[^>]*>.*?</main>', html, re.DOTALL)
footer_match = re.search(r'<footer[^>]*>.*?</footer>', html, re.DOTALL)

header_html = header_match.group(0) if header_match else ''
main_html = main_match.group(0) if main_match else ''
footer_html = footer_match.group(0) if footer_match else ''

combined_html = header_html + '\n' + main_html + '\n' + footer_html

# React JSX conversions
jsx = combined_html.replace('class=', 'className=')
# Fix self closing tags
jsx = re.sub(r'<img([^>]*[^/])>', r'<img\1 />', jsx)
jsx = re.sub(r'<br([^>]*[^/])>', r'<br\1 />', jsx)
jsx = re.sub(r'<input([^>]*[^/])>', r'<input\1 />', jsx)
jsx = re.sub(r'<!--.*?-->', '', jsx, flags=re.DOTALL)

# Handle style tags if any inside these (shouldnt be)
jsx = jsx.replace('stroke-width=', 'strokeWidth=')
jsx = jsx.replace('stroke-linecap=', 'strokeLinecap=')
jsx = jsx.replace('stroke-linejoin=', 'strokeLinejoin=')
jsx = jsx.replace('viewbox=', 'viewBox=')

page_content = f"""import React from "react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CertificationsPage() {{
  return (
    <>
      <style dangerouslySetInnerHTML={{{{__html: `
        .material-symbols-outlined {{
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }}
        .sunrise-glow {{
            background: radial-gradient(circle at 70% 30%, rgba(255, 92, 0, 0.15) 0%, transparent 60%);
        }}
        .orbital-lines {{
            background-image: radial-gradient(circle at 50% 50%, transparent 0%, transparent 40%, rgba(255, 255, 255, 0.03) 41%, transparent 42%);
            background-size: 800px 800px;
            background-position: center;
        }}
        .glass-card {{
            background: rgba(31, 31, 40, 0.7);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.08);
        }}
      `}}}} />
      {jsx}
    </>
  );
}}
"""

os.makedirs('src/app/certifications', exist_ok=True)
with open('src/app/certifications/page.tsx', 'w', encoding='utf-8') as f:
    f.write(page_content)
