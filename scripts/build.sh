#!/usr/bin/env bash
# Works Portal ビルド: works.json を検証 → docs をビルド。
# 検証に失敗したらビルドを中止し、既存の出力を維持する(壊れた反映を防ぐ)。
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "[1/3] works.json を検証…"
python3 scripts/validate_works.py

echo "[2/3] config.json を配信ルートへ複製…"
cp config.json portal/config.json

echo "[3/3] docs をビルド…"
python3 scripts/build_docs.py

echo "完了。portal/index.html をブラウザで開くか、以下でローカル確認:"
echo "  python3 -m http.server -d portal 8080  →  http://localhost:8080/"
