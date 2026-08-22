import os
import re

routes = {
    "Dashboard": "/employee-dashboard",
    "Attendance": "/employee-dashboard/attendance",
    "Time Off": "/employee-dashboard/time-off",
    "My Profile": "/employee-dashboard/profile",
    "Profile": "/employee-dashboard/profile",
    "Payroll": "/employee-dashboard/payroll"
}

files = [
    "attendance/page.js",
    "payroll/page.js",
    "profile/page.js",
    "time-off/page.js"
]

base_dir = r"d:\odoo bangalore\DayFlow\frontend\src\app\employee-dashboard"

for f in files:
    filepath = os.path.join(base_dir, f)
    with open(filepath, "r", encoding="utf-8") as file:
        content = file.read()
    
    def repl(m):
        a_tag = m.group(0)
        href = "#"
        for name, route in routes.items():
            if name in a_tag:
                href = route
                break
        
        new_tag = re.sub(r'\s*href="[^"]*"\s*', ' ', a_tag)
        new_tag = re.sub(r'^<a\b', f'<Link href="{href}"', new_tag)
        new_tag = re.sub(r'</a>$', '</Link>', new_tag)
        
        return new_tag

    new_content = re.sub(r'<a\b[^>]*>.*?</a>', repl, content, flags=re.DOTALL)
    
    with open(filepath, "w", encoding="utf-8") as file:
        file.write(new_content)

print("Links updated")
