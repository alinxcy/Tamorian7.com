#!/usr/bin/env python3
"""docs/ 配下の Markdown を HTML 化して portal/docs/ に出力する。

依存ゼロ(標準ライブラリのみ)の軽量 Markdown レンダラ。SSG を入れずに
「md を1個置く → ビルド → 反映」以上の手順を要求しない、という方針を満たす。
frontmatter(title / date / tags / work_id)に対応。

Usage:
    python3 scripts/build_docs.py
"""
import html
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def load_config():
    path = os.path.join(ROOT, "config.json")
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"site": {}, "paths": {}}


# ---------- frontmatter ----------

def parse_frontmatter(text):
    """先頭の --- ... --- ブロックを dict として取り出す。本文も返す。"""
    meta = {}
    if not text.startswith("---"):
        return meta, text
    lines = text.split("\n")
    if lines[0].strip() != "---":
        return meta, text
    end = None
    for i in range(1, len(lines)):
        if lines[i].strip() == "---":
            end = i
            break
    if end is None:
        return meta, text
    for line in lines[1:end]:
        if not line.strip() or ":" not in line:
            continue
        key, _, val = line.partition(":")
        key, val = key.strip(), val.strip()
        if key == "tags":
            val = val.strip("[]")
            meta[key] = [t.strip().strip('"\'') for t in val.split(",") if t.strip()]
        else:
            meta[key] = val.strip('"\'')
    body = "\n".join(lines[end + 1:])
    return meta, body


# ---------- inline ----------

def render_inline(text):
    text = html.escape(text, quote=False)
    # インラインコードを退避(中の記法を無効化するため)
    codes = []

    def stash(m):
        codes.append(m.group(1))
        return f"\x00{len(codes) - 1}\x00"

    text = re.sub(r"`([^`]+)`", stash, text)

    # リンク [text](url)
    text = re.sub(
        r"\[([^\]]+)\]\(([^)\s]+)\)",
        lambda m: f'<a href="{m.group(2)}">{m.group(1)}</a>',
        text,
    )
    # 太字・斜体
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<!\*)\*([^*]+)\*(?!\*)", r"<em>\1</em>", text)

    # コードを戻す
    def unstash(m):
        return f"<code>{html.escape(codes[int(m.group(1))], quote=False)}</code>"

    text = re.sub(r"\x00(\d+)\x00", unstash, text)
    return text


# ---------- block ----------

def render_markdown(text):
    lines = text.split("\n")
    out = []
    i = 0
    n = len(lines)

    while i < n:
        line = lines[i]

        # fenced code block
        m = re.match(r"^```(\w*)\s*$", line)
        if m:
            i += 1
            buf = []
            while i < n and not re.match(r"^```\s*$", lines[i]):
                buf.append(lines[i])
                i += 1
            i += 1  # 閉じフェンスをスキップ
            code = html.escape("\n".join(buf), quote=False)
            out.append(f"<pre><code>{code}</code></pre>")
            continue

        # blank line
        if not line.strip():
            i += 1
            continue

        # heading
        m = re.match(r"^(#{1,6})\s+(.*)$", line)
        if m:
            level = len(m.group(1))
            out.append(f"<h{level}>{render_inline(m.group(2).strip())}</h{level}>")
            i += 1
            continue

        # horizontal rule
        if re.match(r"^(-{3,}|\*{3,}|_{3,})\s*$", line):
            out.append("<hr>")
            i += 1
            continue

        # blockquote
        if line.startswith(">"):
            buf = []
            while i < n and lines[i].startswith(">"):
                buf.append(lines[i][1:].lstrip())
                i += 1
            out.append(f"<blockquote>{render_inline(' '.join(buf))}</blockquote>")
            continue

        # unordered list
        if re.match(r"^\s*[-*+]\s+", line):
            buf = []
            while i < n and re.match(r"^\s*[-*+]\s+", lines[i]):
                item = re.sub(r"^\s*[-*+]\s+", "", lines[i])
                buf.append(f"<li>{render_inline(item)}</li>")
                i += 1
            out.append("<ul>" + "".join(buf) + "</ul>")
            continue

        # ordered list
        if re.match(r"^\s*\d+\.\s+", line):
            buf = []
            while i < n and re.match(r"^\s*\d+\.\s+", lines[i]):
                item = re.sub(r"^\s*\d+\.\s+", "", lines[i])
                buf.append(f"<li>{render_inline(item)}</li>")
                i += 1
            out.append("<ol>" + "".join(buf) + "</ol>")
            continue

        # paragraph (連続する非空行をまとめる)
        buf = []
        while i < n and lines[i].strip() and not re.match(
                r"^(#{1,6}\s|```|>|\s*[-*+]\s|\s*\d+\.\s|(-{3,}|\*{3,}|_{3,})\s*$)",
                lines[i]):
            buf.append(lines[i].strip())
            i += 1
        if buf:
            out.append(f"<p>{render_inline(' '.join(buf))}</p>")

    return "\n".join(out)


# ---------- page template ----------

def page(title, body, cfg, depth=1):
    root = "../" * depth
    site = cfg.get("site", {}).get("name", "Works Portal")
    return f"""<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{html.escape(title)} — {html.escape(site)}</title>
  <link rel="stylesheet" href="{root}assets/style.css">
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <h1>{html.escape(site)}</h1>
      <nav class="site-nav">
        <a href="{root}index.html">カタログ</a>
        <a href="{root}docs/index.html">知識ノート</a>
      </nav>
    </div>
  </header>
  <main class="wrap doc">
{body}
  </main>
  <footer class="site-footer">
    <div class="wrap">生成: build_docs.py</div>
  </footer>
</body>
</html>
"""


def main():
    cfg = load_config()
    paths = cfg.get("paths", {})
    src = os.path.join(ROOT, paths.get("docs_src", "docs"))
    out = os.path.join(ROOT, paths.get("docs_out", "portal/docs"))
    os.makedirs(out, exist_ok=True)

    if not os.path.isdir(src):
        print(f"✗ docs ソースディレクトリが無い: {src}", file=sys.stderr)
        return 1

    articles = []
    md_files = sorted(f for f in os.listdir(src) if f.endswith(".md"))
    for fname in md_files:
        with open(os.path.join(src, fname), "r", encoding="utf-8") as f:
            raw = f.read()
        meta, body_md = parse_frontmatter(raw)
        slug = os.path.splitext(fname)[0]
        title = meta.get("title", slug)
        date = meta.get("date", "")
        tags = meta.get("tags", [])
        work_id = meta.get("work_id", "")

        meta_bits = []
        if date:
            meta_bits.append(html.escape(date))
        if tags:
            meta_bits.append(" ".join(f'<span class="tag">{html.escape(t)}</span>' for t in tags))
        if work_id:
            meta_bits.append(
                f'関連作品: <a href="../index.html#{html.escape(work_id)}">{html.escape(work_id)}</a>')
        meta_html = f'<p class="meta">{" · ".join(meta_bits)}</p>' if meta_bits else ""

        body = f'<h1>{html.escape(title)}</h1>\n{meta_html}\n{render_markdown(body_md)}'
        with open(os.path.join(out, slug + ".html"), "w", encoding="utf-8") as f:
            f.write(page(title, body, cfg, depth=1))
        articles.append({"slug": slug, "title": title, "date": date, "tags": tags})

    # 記事一覧(新しい順)
    articles.sort(key=lambda a: a["date"], reverse=True)
    items = []
    for a in articles:
        tags = " ".join(f'<span class="tag">{html.escape(t)}</span>' for t in a["tags"])
        items.append(
            f'<li><a href="{html.escape(a["slug"])}.html">{html.escape(a["title"])}</a>'
            f'<div class="doc-date">{html.escape(a["date"])} {tags}</div></li>'
        )
    index_body = "<h1>知識ノート</h1>\n"
    index_body += ('<ul class="doc-list">' + "".join(items) + "</ul>") if items \
        else '<p class="msg">まだ記事がありません。</p>'
    with open(os.path.join(out, "index.html"), "w", encoding="utf-8") as f:
        f.write(page("知識ノート", index_body, cfg, depth=1))

    print(f"✓ docs ビルド完了: {len(articles)} 記事 → {os.path.relpath(out, ROOT)}/")
    return 0


if __name__ == "__main__":
    sys.exit(main())
