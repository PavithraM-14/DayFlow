import os
import re

combined_headers = """{/* TopNavBar (Mobile) */}
<header className="md:hidden flex items-center justify-between p-4 bg-surface border-b border-outline-variant sticky top-0 z-50">
  <div className="flex items-center gap-2">
    <span className="material-symbols-outlined text-primary">menu</span>
    <h1 className="font-title-md text-primary">Dayflow</h1>
  </div>
  <img alt="Profile photo" className="w-8 h-8 rounded-full border border-outline-variant bg-surface-container object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ" />
</header>
{/* TopNavBar (Desktop) */}
<header className="bg-surface flex justify-between items-center h-16 px-gutter border-b border-outline-variant sticky top-0 z-40 hidden md:flex">
  <div className="flex items-center gap-4 flex-grow max-w-md">
    <div className="relative w-full">
      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
      <input className="w-full pl-10 pr-4 py-2 bg-surface-container-low border border-outline-variant rounded-[10px] focus:ring-2 focus:ring-primary-container focus:border-primary focus:outline-none transition-colors text-body-sm font-body-sm" placeholder="Search employees, documents..." type="text" />
    </div>
  </div>
  <div className="flex items-center gap-4 ml-auto">
    <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant relative">
      <span className="material-symbols-outlined">notifications</span>
      <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
    </button>
    <button className="w-10 h-10 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center text-on-surface-variant">
      <span className="material-symbols-outlined">apps</span>
    </button>
    <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant">
      <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrJ1l9JGS0deg42HpVQSStp3WuLg6cFZW2FeG26-gaOuYdb6ndlwrx2AuaA27pg_mwg-16BH0vLFVhbSYT_mV6myPlpU4qy2NJ_opECPnYffJnHomg15Xs2ms4GmmLi3nl8qphGPoWWcyhhYNSJTjr42ac6VRMY6AFBrSr5ALG3Pt2PH4hMFAMsCFMQTOCwpWDb_wcsXAldmDawt7V86kvLeq6kxCD7Yttk5p3P4saztOMOfhirc7mSQ" />
    </div>
  </div>
</header>"""

base_dir = r"d:\odoo bangalore\DayFlow\frontend\src\app\employee-dashboard"

pages = [
    "page.js",
    "attendance/page.js",
    "payroll/page.js",
    "profile/page.js",
    "time-off/page.js"
]

for p in pages:
    filepath = os.path.join(base_dir, p)
    if os.path.exists(filepath):
        with open(filepath, "r", encoding="utf-8") as file:
            content = file.read()
            
        def replacer(match):
            if replacer.count == 0:
                replacer.count += 1
                return combined_headers
            else:
                return ""
        replacer.count = 0
        
        new_content = re.sub(r'<header\b[^>]*>.*?</header>', replacer, content, flags=re.DOTALL)
        
        with open(filepath, "w", encoding="utf-8") as file:
            file.write(new_content)

print("Headers replaced successfully")
