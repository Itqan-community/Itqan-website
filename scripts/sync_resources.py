#!/usr/bin/env python3
"""
sync_resources.py
Automated deep-mining scanner, link validator, and updater for Itqan Library (مكتبة إتقان).
Scans Itqan Community discussions AND replies/posts across all tags and search queries
for new datasets, models, tools, papers, and recorded workshops/sessions, and automatically upserts them into resources.json.

Features:
- Parallel Link Health Checker (ThreadPoolExecutor with HEAD/GET verification to eliminate 404/410 broken links)
- Resilient 3-Tier Fallback Engine:
  - Tier 1: Google Gemini 1.5 Flash (AI Semantic Classification & Summarization)
  - Tier 2: Groq Llama-3.3-70B / OpenRouter (Secondary AI Backup if Gemini is rate-limited or fails)
  - Tier 3: Deterministic Rule-Based & Heuristic Engine (Zero-AI, Zero-cost, 100% offline & keyless)
- Auto-embedding into index.html for zero-latency standalone execution.
"""

import json
import os
import re
import sys
import concurrent.futures
import urllib.request
import urllib.error
import ssl

RESOURCES_FILE = os.path.join(os.path.dirname(__file__), "resources.json")
INDEX_FILE = os.path.join(os.path.dirname(__file__), "index.html")
BASE_DISCUSSIONS_API = "https://community.itqan.dev/api/discussions"
BASE_POSTS_API = "https://community.itqan.dev/api/posts"

TECH_TAGS = [
    "", # General feed
    "ai",
    "asr",
    "tools-resources",
    "recitation-audio-data",
    "uthmani-scripts",
    "tech-knowledge",
    "projects-collabs",
    "developers-space",
    "code-for-quran",
    "ama"
]

SEARCH_QUERIES = [
    "ورشة",
    "ملخص ورشة",
    "لقاء",
    "youtube",
    "huggingface",
    "github.com",
    "archive.org"
]

EXCLUDE_TITLE_KEYWORDS = [
    "مقترح", "فكرة", "استطلاع", "رأي", "سؤال", "مشكلة", 
    "استفسار", "طلب مساعدة", "تحديت نفسي", "أحتاج مساعدة", "كيف تبني",
    "شراكات واستثمار"
]

EXCLUDE_LINK_PATTERNS = [
    "/issues/", "/pull/", "before.html", "play.google.com", 
    "twitter.com", "x.com", "facebook.com", "google.com/search",
    "mailerlite.com", "t.me"
]

SSL_CTX = ssl.create_default_context()
SSL_CTX.check_hostname = False
SSL_CTX.verify_mode = ssl.CERT_NONE

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"
}

URL_CACHE = {}

def verify_single_url(url, timeout=7):
    """
    Carefully validates whether a URL is alive.
    A link is considered dead ONLY if it returns HTTP 404, 410, or DNS resolution failure.
    Uses HEAD first, then falls back to GET (bytes 0-100) to avoid false positives.
    """
    if url in URL_CACHE:
        return URL_CACHE[url]

    # 1. Try HEAD request
    try:
        req = urllib.request.Request(url, headers=HEADERS, method="HEAD")
        with urllib.request.urlopen(req, timeout=timeout, context=SSL_CTX) as resp:
            URL_CACHE[url] = True
            return True
    except urllib.error.HTTPError as e:
        pass
    except Exception:
        pass

    # 2. Test with GET (handles servers rejecting HEAD or CDN bot challenges)
    try:
        get_headers = dict(HEADERS)
        get_headers["Range"] = "bytes=0-100"
        req_get = urllib.request.Request(url, headers=get_headers, method="GET")
        with urllib.request.urlopen(req_get, timeout=timeout, context=SSL_CTX) as resp:
            URL_CACHE[url] = True
            return True
    except urllib.error.HTTPError as e:
        if e.code in (404, 410):
            URL_CACHE[url] = False
            return False
        # 403, 429, 500 etc. mean server exists but throttles/protects bots
        URL_CACHE[url] = True
        return True
    except urllib.error.URLError as e:
        reason_str = str(e.reason).lower()
        if "not known" in reason_str or "nodename" in reason_str or "getaddrinfo failed" in reason_str or "connection refused" in reason_str:
            URL_CACHE[url] = False
            return False
        URL_CACHE[url] = True
        return True
    except Exception:
        URL_CACHE[url] = True
        return True

def load_existing():
    if os.path.exists(RESOURCES_FILE):
        with open(RESOURCES_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    return []

def update_index_html(resources):
    """Embeds the updated resources.json data directly into index.html for offline support."""
    if not os.path.exists(INDEX_FILE):
        return
    try:
        with open(INDEX_FILE, "r", encoding="utf-8") as f:
            html = f.read()

        start_token = "const EMBEDDED_RESOURCES = ["
        idx_start = html.find(start_token)
        if idx_start == -1:
            return

        end_token = "const SHEIKH_IMG_HTML ="
        idx_end = html.find(end_token, idx_start)
        if idx_end == -1:
            return

        formatted_json = json.dumps(resources, ensure_ascii=False, indent=6)
        new_embedded_block = f"const EMBEDDED_RESOURCES = {formatted_json};\n\n    "
        new_html = html[:idx_start] + new_embedded_block + html[idx_end:]

        with open(INDEX_FILE, "w", encoding="utf-8") as f:
            f.write(new_html)
        print(f"Successfully synced index.html with {len(resources)} embedded resources.")
    except Exception as e:
        print(f"Notice: Failed to embed resources into index.html: {e}", file=sys.stderr)

def save_resources(data):
    with open(RESOURCES_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"Successfully saved {len(data)} curated resources to {RESOURCES_FILE}")
    update_index_html(data)

def api_get(url):
    req = urllib.request.Request(
        url,
        headers={"User-Agent": "ItqanLibraryCurator/4.0 (+https://github.com/nandxorandor/itqan-library)"}
    )
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.loads(resp.read().decode("utf-8"))
    except Exception as e:
        print(f"Notice: Failed to fetch API {url}: {e}", file=sys.stderr)
        return None

def extract_links_from_text(text):
    """
    Find and cleanly format genuine resource links.
    Handles standard URLs as well as Flarum embedded iframes (e.g. YouTube nocookie embeds).
    Fast regex extraction; validation is performed in batch in Stage 3.
    """
    urls = re.findall(r'https?://[^\s<>"\)\]]+', text)
    
    # Also extract YouTube embeds from Flarum iframes (youtube-nocookie.com/embed/ID)
    yt_embed_ids = re.findall(r'youtube-nocookie\.com/embed/([a-zA-Z0-9_-]{11})', text)
    for vid in yt_embed_ids:
        urls.append(f"https://www.youtube.com/watch?v={vid}")

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
            name = "مشاهدة تسجيل الورشة (YouTube)"
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
    
    # Priority 1: Workshops & Recorded Sessions
    if any(w in title_and_text for w in ["ورشة", "ملخص ورشة", "لقاء تفاعلي", "تسجيل الورشة", "جلسة تفاعلية", "youtube.com/watch", "youtu.be"]):
        category = "workshops"
        icon = "📺"
    # Priority 2: Recitation AI Models
    elif any(w in title_and_text for w in ["huggingface.co/models", "نموذج", "whisper", "zipformer", "tajweedformer", "تسميع"]):
        category = "ai"
        icon = "👳‍♂️"
    # Priority 3: Audio Corpora & Reciter Datasets
    elif any(w in title_and_text for w in ["archive.org", "حزمة صوت", "تسجيلات", "تلاوات", "corpus", "dataset", "everyayah"]):
        category = "audio"
        icon = "🔊"
    # Priority 4: Fonts & Mushaf Assets
    elif any(w in title_and_text for w in ["خط", "رسم عثماني", "مصحف", "ttf", "woff2", "svg", "مصحف المدينة"]):
        category = "fonts"
        icon = "✒️"
    # Priority 5: Research & Standards
    elif any(w in title_and_text for w in ["arxiv", "paper", "ورقة بحثية", "دراسة", "معيار", "معايير"]):
        category = "research"
        icon = "📚"

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
  "metric": "وصف تقني موجز مثل: ورشة عمل مسجلة أو نموذج مفتوح المصدر"
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

def clean_and_verify_all_resources(existing):
    """
    Parallel health check across all library resources.
    Removes 404/410/dead URLs and prunes cards that have 0 remaining active download links.
    """
    print("\nStarting Parallel Link Health Check & Dead Link Verification...")
    all_urls = set()
    for item in existing:
        for l in item.get("links", []):
            all_urls.add(l["url"])

    urls_list = list(all_urls)
    print(f"Verifying {len(urls_list)} unique links across {len(existing)} resources...")

    with concurrent.futures.ThreadPoolExecutor(max_workers=25) as executor:
        future_map = {executor.submit(verify_single_url, u): u for u in urls_list}
        done = 0
        for future in concurrent.futures.as_completed(future_map):
            done += 1
            # URL_CACHE is updated in verify_single_url

    cleaned = []
    removed_links_count = 0
    pruned_cards_count = 0

    for item in existing:
        valid_links = []
        for l in item.get("links", []):
            if URL_CACHE.get(l["url"], True):
                valid_links.append(l)
            else:
                removed_links_count += 1

        if not valid_links:
            pruned_cards_count += 1
            continue

        item_copy = dict(item)
        item_copy["links"] = valid_links
        if "روابط" in item_copy.get("metric", "") or "مصادر" in item_copy.get("metric", ""):
            item_copy["metric"] = f"{len(valid_links)} مصادر وروابط مباشرة"
        cleaned.append(item_copy)

    # Re-index IDs consecutively
    for idx, item in enumerate(cleaned, 1):
        item["id"] = idx

    print(f"Link Health Verification complete: Removed {removed_links_count} dead/404 links, pruned {pruned_cards_count} empty resources.")
    print(f"Total active verified resources: {len(cleaned)}")
    return cleaned

def scan_and_update(run_health_check=True):
    existing = load_existing()
    existing_by_num = {str(item.get("discussionNum")): item for item in existing if item.get("discussionNum")}
    
    print(f"Curated library currently contains {len(existing)} resources.")
    new_count = 0
    updated_links_count = 0

    # -------------------------------------------------------------
    # Stage 1: Deep Post/Comment Mining (/api/posts)
    # Catches links posted in replies, embeds, and comments
    # -------------------------------------------------------------
    print("Stage 1: Scanning latest community replies and comments for resource links...")
    posts_payload = api_get(f"{BASE_POSTS_API}?sort=-createdAt&page[limit]=100&include=discussion,user")
    if posts_payload and "data" in posts_payload:
        included = {item['id']: item for item in posts_payload.get('included', [])}
        for post in posts_payload.get("data", []):
            content = post.get("attributes", {}).get("contentHtml", "")
            links = extract_links_from_text(content)
            if not links:
                continue

            disc_rel = post.get("relationships", {}).get("discussion", {}).get("data", {})
            disc_id = str(disc_rel.get("id")) if disc_rel else None
            if not disc_id:
                continue

            # If discussion already tracked, append new links
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
            else:
                # If a post has high-value links in an untracked discussion, fetch discussion and create card!
                disc_info = included.get(disc_id)
                disc_title = disc_info.get("attributes", {}).get("title", "") if disc_info else ""
                if not disc_title:
                    fetched_disc = api_get(f"{BASE_DISCUSSIONS_API}/{disc_id}")
                    if fetched_disc and "data" in fetched_disc:
                        disc_title = fetched_disc["data"].get("attributes", {}).get("title", "")
                
                if disc_title and not any(bad in disc_title for bad in EXCLUDE_TITLE_KEYWORDS):
                    analysis = ai_classify_and_summarize(disc_title, content, links)
                    new_item = {
                        "id": len(existing) + 1,
                        "title": disc_title,
                        "category": analysis.get("category", "workshops" if any(l["src"] == "فيديو مسجل" for l in links) else "tools"),
                        "icon": analysis.get("icon", "📺" if any(l["src"] == "فيديو مسجل" for l in links) else "💻"),
                        "license": "مفتوح المصدر",
                        "metric": analysis.get("metric", f"{len(links)} روابط فحص وتحميل مباشرة"),
                        "author": "مساهمة من ردود المجتمع",
                        "discussionUrl": f"https://community.itqan.dev/d/{disc_id}",
                        "discussionNum": disc_id,
                        "description": analysis.get("summary", ""),
                        "links": links[:12]
                    }
                    existing.append(new_item)
                    existing_by_num[disc_id] = new_item
                    new_count += 1
                    print(f"  [+] Discovered from reply: #{disc_id} ({disc_title[:35]}) -> {new_item['category']}")

    # -------------------------------------------------------------
    # Stage 2: Discussions Scanner (/api/discussions)
    # Catches technical topics across tags and targeted queries
    # -------------------------------------------------------------
    print("Stage 2: Scanning technical discussion topics and workshops...")
    endpoints = []
    for tag in TECH_TAGS:
        url = f"{BASE_DISCUSSIONS_API}?include=tags,firstPost,user&sort=-createdAt&page[limit]=50"
        if tag:
            url += f"&filter[tag]={tag}"
        endpoints.append(url)
    
    for q in SEARCH_QUERIES:
        import urllib.parse
        encoded_q = urllib.parse.quote(q)
        endpoints.append(f"{BASE_DISCUSSIONS_API}?include=tags,firstPost,user&filter[q]={encoded_q}&page[limit]=30")

    seen_discussions = set()
    for url in endpoints:
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
            if disc_id in seen_discussions or disc_id in existing_by_num:
                continue
            seen_discussions.add(disc_id)

            attrs = disc.get("attributes", {})
            title = attrs.get("title", "")
            
            # Strict rejection of non-resource discussions (unless it's a workshop summary)
            is_workshop_topic = any(w in title.lower() for w in ["ورشة", "ملخص ورشة", "لقاء تفاعلي"])
            if not is_workshop_topic and any(bad in title for bad in EXCLUDE_TITLE_KEYWORDS):
                continue
            
            first_post_rel = disc.get("relationships", {}).get("firstPost", {}).get("data", {})
            first_post_id = first_post_rel.get("id")
            content = posts_by_id.get(first_post_id, "")
            
            links = extract_links_from_text(content)
            
            # Also check if any reply in this discussion contains a YouTube recording or gold link
            if not links or not any(l["src"] in ["GitHub", "HuggingFace", "Archive.org", "ورقة علمية", "فيديو مسجل"] for l in links):
                detailed_disc = api_get(f"{BASE_DISCUSSIONS_API}/{disc_id}")
                if detailed_disc and "included" in detailed_disc:
                    for inc in detailed_disc.get("included", []):
                        if inc.get("type") == "posts":
                            post_content = inc.get("attributes", {}).get("contentHtml", "")
                            reply_links = extract_links_from_text(post_content)
                            for rl in reply_links:
                                if rl["url"] not in [x["url"] for x in links]:
                                    links.append(rl)

            has_gold_link = any(l["src"] in ["GitHub", "HuggingFace", "Archive.org", "ورقة علمية", "فيديو مسجل"] for l in links)
            
            if has_gold_link:
                user_rel = disc.get("relationships", {}).get("user", {}).get("data", {})
                author_name = users_by_id.get(user_rel.get("id") if user_rel else None) or "عضو في مجتمع إتقان"

                # Classify and summarize using the Resilient Fallback Engine
                analysis = ai_classify_and_summarize(title, content, links)

                # If it's a workshop topic with YouTube links, force workshops category
                if is_workshop_topic or any(l["src"] == "فيديو مسجل" for l in links):
                    analysis["category"] = "workshops"
                    analysis["icon"] = "📺"
                    analysis["metric"] = "ورشة تقنية مسجلة"

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
                print(f"  [+] Curated and added: {title[:40]} (#{disc_id}) -> {new_item['category']}")

    # -------------------------------------------------------------
    # Stage 3: Health Check & Dead Link Pruning
    # -------------------------------------------------------------
    if run_health_check:
        existing = clean_and_verify_all_resources(existing)

    save_resources(existing)
    print(f"Sync & Health Check complete: Curated {len(existing)} active resources.")

if __name__ == "__main__":
    scan_and_update()
