#!/usr/bin/env python3
"""
sync_resources.py
Automated deep-mining scanner and updater for Itqan Library (مكتبة إتقان).
Scans Itqan Community discussions AND replies/posts across all tags
for new datasets, models, tools, and papers, and automatically upserts them into resources.json.

Includes a Resilient 3-Tier Fallback Engine:
- Tier 1: Google Gemini 1.5 Flash (AI Semantic Classification & Summarization)
- Tier 2: Groq Llama-3.3-70B / OpenRouter (Secondary AI Backup if Gemini is rate-limited or fails)
- Tier 3: Deterministic Rule-Based & Heuristic Engine (Zero-AI, Zero-cost, 100% offline & keyless)
"""

import json
import os
import re
import sys
import urllib.request
import urllib.error

RESOURCES_FILE = os.path.join(os.path.dirname(__file__), "resources.json")
BASE_DISCUSSIONS_API = "https://community.itqan.dev/api/discussions"
BASE_POSTS_API = "https://community.itqan.dev/api/posts"

TECH_TAGS = [
    "", # General feed
    "ai",
    "asr",
    "tools-resources",
    "recitation-audio-data",
    "uthmani-scripts",
    "tech-knowledge"
]

EXCLUDE_TITLE_KEYWORDS = [
    "مقترح", "فكرة", "استطلاع", "رأي", "دعوة", "سؤال", "مشكلة", 
    "استفسار", "طلب مساعدة", "تحديت نفسي", "أحتاج مساعدة", "كيف تبني",
    "شراكات واستثمار"
]

EXCLUDE_LINK_PATTERNS = [
    "/issues/", "/pull/", "before.html", "play.google.com", 
    "twitter.com", "x.com", "facebook.com", "google.com/search",
    "mailerlite.com", "t.me"
]

def load_existing():
    if os.path.exists(RESOURCES_FILE):
        with open(RESOURCES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def save_resources(data):
    with open(RESOURCES_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved {len(data)} curated resources to {RESOURCES_FILE}")

def api_get(url):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "ItqanLibraryCurator/3.5 (+https://github.com/nandxorandor/itqan-library)"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Notice: Failed to fetch API {url}: {e}", file=sys.stderr)
        return None

def extract_links_from_text(text):
    """Find and cleanly format genuine resource links."""
    urls = re.findall(r'https?://[^\s<>"\)\]]+', text)
    verified = []
    seen = set()
    for u in urls:
        u = u.rstrip(".,;:)'\"")
        if u in seen:
            continue
        seen.add(u)
        
        # Exclude unwanted patterns
        if any(pat in u for pat in EXCLUDE_LINK_PATTERNS) or "community.itqan.dev" in u:
            continue

        src = "رابط مباشر"
        name = u.split("/")[-1] or u

        if "github.com" in u:
            src = "GitHub"
            parts = [p for p in u.replace("https://github.com/", "").split("/") if p]
            if len(parts) >= 2:
                name = f"مستودع {parts[0]}/{parts[1]}"
            elif len(parts) == 1:
                name = f"مستودع {parts[0]}"
        elif "huggingface.co" in u:
            src = "HuggingFace"
            parts = [p for p in u.replace("https://huggingface.co/", "").split("/") if p]
            if len(parts) >= 2:
                name = f"حزمة {parts[-2]}/{parts[-1]}"
            elif len(parts) == 1:
                name = f"منظومة {parts[0]}"
        elif "archive.org" in u:
            src = "Archive.org"
            parts = [p for p in u.replace("https://archive.org/details/", "").split("/") if p]
            if parts:
                name = f"أرشيف {parts[0]}"
        elif "arxiv.org" in u or "doi.org" in u or u.endswith(".pdf"):
            src = "ورقة علمية"
            name = "الورقة البحثية المنشورة (PDF)"
        elif "youtube.com" in u or "youtu.be" in u:
            src = "فيديو مسجل"
            name = "مشاهدة الورشة المرئية"
        elif "audio.qud.dev" in u or "everyayah.com" in u or "api" in u:
            src = "بوابة صوتية / API"
            name = u.replace("https://", "").replace("http://", "").split("/")[0]
        else:
            continue

        verified.append({"name": name, "url": u, "src": src})
    return verified

def rule_based_classify_and_summarize(title, content):
    """
    Tier 3 Fallback: Deterministic Rule-Based & Heuristic Engine.
    Zero-AI, zero-key, executes in milliseconds with zero dependencies.
    """
    title_and_text = (title + " " + content).lower()
    category = "tools"
    icon = "💻"
    
    if any(w in title_and_text for w in ["huggingface.co/models", "نموذج", "whisper", "zipformer", "tajweedformer", "تسميع"]):
        category = "ai"
        icon = "👳‍♂️"
    elif any(w in title_and_text for w in ["archive.org", "حزمة صوت", "تسجيلات", "تلاوات", "corpus", "dataset"]):
        category = "audio"
        icon = "🔊"
    elif any(w in title_and_text for w in ["خط", "رسم عثماني", "مصحف", "ttf", "woff2", "svg"]):
        category = "fonts"
        icon = "✒️"
    elif any(w in title_and_text for w in ["arxiv", "paper", "ورقة بحثية", "دراسة", "معيار"]):
        category = "research"
        icon = "📚"
    elif any(w in title_and_text for w in ["ورشة", "محاضرة", "لقاء تقني", "شرح عملي", "youtube"]):
        category = "workshops"
        icon = "📺"

    clean_desc = re.sub(r'<[^>]+>', ' ', content)
    clean_desc = re.sub(r'\s+', ' ', clean_desc).strip()
    if len(clean_desc) > 175:
        clean_desc = clean_desc[:172] + "..."
    if not clean_desc:
        clean_desc = f"مورد تقني معتمد مستخرج من أطروحات المجتمع: {title}"

    return {
        "category": category,
        "icon": icon,
        "summary": clean_desc,
        "metric": "مورد تقني معتمد"
    }

def ai_classify_and_summarize(title, content, links):
    """
    3-Tier Resilient Fallback Architecture:
    - Tier 1: Google Gemini 1.5 Flash (via native REST)
    - Tier 2: Groq Llama 3.3 (via native REST)
    - Tier 3: Deterministic Rule-Based Engine (Zero-AI fallback)
    """
    gemini_key = os.environ.get("GEMINI_API_KEY", "").strip()
    groq_key = os.environ.get("GROQ_API_KEY", "").strip()

    prompt = f"""أنت خبير في تقنيات القرآن الكريم مفتوحة المصدر لمجتمع إتقان.
المطلوب تحليل الموضوع التالي وتصنيفه وتلخيصه بدقة:
العنوان: {title}
المحتوى: {content[:1000]}
الروابط المستخرجة: {[l['url'] for l in links]}

أجب بصيغة JSON فقط بهذا الشكل:
{{
  "category": "ai" | "audio" | "fonts" | "tools" | "research" | "workshops",
  "summary": "ملخص فني دقيق من سطرين يوضح فائدة هذا المورد للمطورين والباحثين",
  "metric": "وصف تقني موجز مثل: نموذج مفتوح المصدر أو حزمة تسجيلات صوتية"
}}"""

    # --- Tier 1: Google Gemini API ---
    if gemini_key:
        try:
            gemini_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
            req_data = {
                "contents": [{"parts": [{"text": prompt}]}],
                "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"}
            }
            req = urllib.request.Request(
                gemini_url,
                data=json.dumps(req_data).encode("utf-8"),
                headers={"Content-Type": "application/json"}
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                res_json = json.loads(resp.read().decode("utf-8"))
                text = res_json['candidates'][0]['content']['parts'][0]['text']
                data = json.loads(text)
                cat = data.get("category", "tools")
                if cat not in ["ai", "audio", "fonts", "tools", "research", "workshops"]:
                    cat = "tools"
                icon_map = {"ai": "👳‍♂️", "audio": "🔊", "fonts": "✒️", "tools": "💻", "research": "📚", "workshops": "📺"}
                print(f"    [AI Tier 1: Gemini] Successfully categorized as '{cat}'")
                return {
                    "category": cat,
                    "icon": icon_map.get(cat, "💻"),
                    "summary": data.get("summary", ""),
                    "metric": data.get("metric", "مورد تقني موثق")
                }
        except Exception as e:
            print(f"    [Notice] Gemini Tier 1 failed or rate-limited: {e}. Switching to Tier 2...", file=sys.stderr)

    # --- Tier 2: Groq Cloud API (Llama-3.3-70b-versatile) ---
    if groq_key:
        try:
            groq_url = "https://api.groq.com/openai/v1/chat/completions"
            req_data = {
                "model": "llama-3.3-70b-versatile",
                "messages": [
                    {"role": "system", "content": "You output JSON only."},
                    {"role": "user", "content": prompt}
                ],
                "response_format": {"type": "json_object"},
                "temperature": 0.2
            }
            req = urllib.request.Request(
                groq_url,
                data=json.dumps(req_data).encode("utf-8"),
                headers={
                    "Content-Type": "application/json",
                    "Authorization": f"Bearer {groq_key}"
                }
            )
            with urllib.request.urlopen(req, timeout=10) as resp:
                res_json = json.loads(resp.read().decode("utf-8"))
                text = res_json['choices'][0]['message']['content']
                data = json.loads(text)
                cat = data.get("category", "tools")
                if cat not in ["ai", "audio", "fonts", "tools", "research", "workshops"]:
                    cat = "tools"
                icon_map = {"ai": "👳‍♂️", "audio": "🔊", "fonts": "✒️", "tools": "💻", "research": "📚", "workshops": "📺"}
                print(f"    [AI Tier 2: Groq] Successfully categorized via Llama 3.3 as '{cat}'")
                return {
                    "category": cat,
                    "icon": icon_map.get(cat, "💻"),
                    "summary": data.get("summary", ""),
                    "metric": data.get("metric", "مورد تقني موثق")
                }
        except Exception as e:
            print(f"    [Notice] Groq Tier 2 failed: {e}. Switching to Tier 3 Rule-Engine...", file=sys.stderr)

    # --- Tier 3: Deterministic Rule-Based Fallback (Zero-AI) ---
    return rule_based_classify_and_summarize(title, content)

def scan_and_update():
    existing = load_existing()
    # Index by discussionNum for fast upserting
    existing_by_num = {str(item.get("discussionNum")): item for item in existing if item.get("discussionNum")}
    
    print(f"Curated library currently contains {len(existing)} resources.")
    new_count = 0
    updated_links_count = 0

    # -------------------------------------------------------------
    # Stage 1: Deep Post/Comment Mining (/api/posts)
    # Catches links posted in replies and discussions in real-time
    # -------------------------------------------------------------
    print("Stage 1: Scanning latest community replies and comments for resource links...")
    posts_payload = api_get(f"{BASE_POSTS_API}?sort=-createdAt&page[limit]=50&include=discussion,user")
    if posts_payload and "data" in posts_payload:
        for post in posts_payload.get("data", []):
            content = post.get("attributes", {}).get("contentHtml", "")
            links = extract_links_from_text(content)
            if not links:
                continue

            disc_rel = post.get("relationships", {}).get("discussion", {}).get("data", {})
            disc_id = str(disc_rel.get("id")) if disc_rel else None
            if not disc_id:
                continue

            # Check if this discussion is already tracked in our catalog
            if disc_id in existing_by_num:
                target_item = existing_by_num[disc_id]
                existing_urls = {l["url"] for l in target_item.get("links", [])}
                added_any = False
                for l in links:
                    if l["url"] not in existing_urls:
                        target_item.setdefault("links", []).append(l)
                        existing_urls.add(l["url"])
                        added_any = True
                        updated_links_count += 1
                        print(f"  [⟳] Auto-mined new link for #{disc_id} ({target_item.get('title')[:30]}): {l['url']}")
                if added_any:
                    target_item["metric"] = f"{len(target_item['links'])} مصادر وروابط مباشرة"

    # -------------------------------------------------------------
    # Stage 2: Discussions Scanner (/api/discussions)
    # Catches new technical topics across tags
    # -------------------------------------------------------------
    print("Stage 2: Scanning technical discussion topics across tags...")
    for tag in TECH_TAGS:
        url = f"{BASE_DISCUSSIONS_API}?include=tags,firstPost,user&sort=-createdAt&page[limit]=50"
        if tag:
            url += f"&filter[tag]={tag}"
        payload = api_get(url)
        if not payload or "data" not in payload:
            continue
            
        discussions = payload.get("data", [])
        included = payload.get("included", [])
        posts_by_id = {
            item["id"]: item["attributes"].get("contentHtml") or item["attributes"].get("content", "")
            for item in included if item.get("type") == "posts"
        }
        users_by_id = {
            item["id"]: item["attributes"].get("displayName") or item["attributes"].get("username", "")
            for item in included if item.get("type") == "users"
        }

        for disc in discussions:
            disc_id = str(disc["id"])
            if disc_id in existing_by_num:
                continue

            attrs = disc.get("attributes", {})
            title = attrs.get("title", "")
            
            # Strict rejection of non-resource discussions
            if any(bad in title for bad in EXCLUDE_TITLE_KEYWORDS):
                continue
            
            first_post_rel = disc.get("relationships", {}).get("firstPost", {}).get("data", {})
            first_post_id = first_post_rel.get("id")
            content = posts_by_id.get(first_post_id, "")
            
            links = extract_links_from_text(content)
            has_gold_link = any(l["src"] in ["GitHub", "HuggingFace", "Archive.org", "ورقة علمية", "فيديو مسجل"] for l in links)
            
            if has_gold_link:
                user_rel = disc.get("relationships", {}).get("user", {}).get("data", {})
                author_name = users_by_id.get(user_rel.get("id") if user_rel else None) or "عضو في مجتمع إتقان"

                # Classify and summarize using the Resilient Fallback Engine
                analysis = ai_classify_and_summarize(title, content, links)

                new_item = {
                    "id": len(existing) + 1,
                    "title": title,
                    "category": analysis.get("category", "tools"),
                    "icon": analysis.get("icon", "💻"),
                    "license": "مفتوح المصدر",
                    "metric": analysis.get("metric", f"{len(links)} روابط فحص وتحميل مباشرة"),
                    "author": author_name,
                    "discussionUrl": f"https://community.itqan.dev/d/{disc_id}",
                    "discussionNum": disc_id,
                    "description": analysis.get("summary", ""),
                    "links": links[:12]
                }
                existing.append(new_item)
                existing_by_num[disc_id] = new_item
                new_count += 1
                print(f"  [+] Curated and added: {title} (#{disc_id}) -> {new_item['category']}")

    if new_count > 0 or updated_links_count > 0:
        save_resources(existing)
        print(f"Curation complete: Added {new_count} new assets, auto-mined {updated_links_count} new links into existing cards.")
    else:
        print("Curation complete: Library is fully up to date.")

if __name__ == "__main__":
    scan_and_update()
