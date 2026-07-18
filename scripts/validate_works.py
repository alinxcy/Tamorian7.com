#!/usr/bin/env python3
"""works.json を works.schema.json で検証する。

依存ゼロ(標準ライブラリのみ)。JSON Schema の必要な部分だけを実装した
軽量バリデータ。pip install 不要で「何年後でも動く」ことを優先している。
対応キーワード: type / required / properties / additionalProperties /
items / enum / pattern / minLength / $ref(ドキュメント内の #/... 参照)。

Usage:
    python3 scripts/validate_works.py [works.json] [works.schema.json]

引数省略時は config.json の paths を参照する。
検証成功で exit 0、失敗で exit 1(全エラーを列挙して終了)。
"""
import json
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TYPE_MAP = {
    "object": dict,
    "array": list,
    "string": str,
    "number": (int, float),
    "integer": int,
    "boolean": bool,
}


def load_json(path):
    with open(path, "r", encoding="utf-8") as f:
        return json.load(f)


def resolve_ref(ref, root_schema):
    if not ref.startswith("#/"):
        raise ValueError(f"未対応の $ref 形式: {ref}")
    node = root_schema
    for part in ref[2:].split("/"):
        part = part.replace("~1", "/").replace("~0", "~")
        node = node[part]
    return node


def check_type(value, expected):
    # JSON の bool は int のサブクラスなので明示的に切り分ける
    if expected == "integer" or expected == "number":
        if isinstance(value, bool):
            return False
    py = TYPE_MAP.get(expected)
    return py is not None and isinstance(value, py)


def validate(value, schema, root_schema, path, errors):
    if "$ref" in schema:
        schema = resolve_ref(schema["$ref"], root_schema)

    if "type" in schema:
        if not check_type(value, schema["type"]):
            got = "boolean" if isinstance(value, bool) else type(value).__name__
            errors.append(f"{path}: 型が {schema['type']} であるべき(実際: {got})")
            return  # 型が違えば以降のチェックは無意味

    if "enum" in schema and value not in schema["enum"]:
        errors.append(f"{path}: {value!r} は許可値 {schema['enum']} のいずれかであるべき")

    if isinstance(value, str):
        if "minLength" in schema and len(value) < schema["minLength"]:
            errors.append(f"{path}: 空文字/短すぎ(最低 {schema['minLength']} 文字)")
        if "pattern" in schema and not re.search(schema["pattern"], value):
            errors.append(f"{path}: {value!r} がパターン {schema['pattern']} に一致しない")

    if isinstance(value, dict):
        props = schema.get("properties", {})
        for req in schema.get("required", []):
            if req not in value:
                errors.append(f"{path}: 必須プロパティ '{req}' が無い")
        if schema.get("additionalProperties") is False:
            for key in value:
                if key not in props:
                    errors.append(f"{path}: 未知のプロパティ '{key}'")
        for key, subschema in props.items():
            if key in value:
                validate(value[key], subschema, root_schema, f"{path}.{key}", errors)

    if isinstance(value, list) and "items" in schema:
        for i, item in enumerate(value):
            validate(item, schema["items"], root_schema, f"{path}[{i}]", errors)


def main(argv):
    cfg_path = os.path.join(ROOT, "config.json")
    cfg = load_json(cfg_path) if os.path.exists(cfg_path) else {"paths": {}}
    paths = cfg.get("paths", {})

    works_path = argv[1] if len(argv) > 1 else os.path.join(
        ROOT, paths.get("works", "portal/works.json"))
    schema_path = argv[2] if len(argv) > 2 else os.path.join(
        ROOT, paths.get("schema", "works.schema.json"))

    try:
        data = load_json(works_path)
    except json.JSONDecodeError as e:
        print(f"✗ {works_path} は不正な JSON です: {e}", file=sys.stderr)
        return 1
    except FileNotFoundError:
        print(f"✗ {works_path} が見つかりません", file=sys.stderr)
        return 1

    schema = load_json(schema_path)

    errors = []
    validate(data, schema, schema, "works.json", errors)

    # 追加チェック: id の重複はスキーマでは表現しづらいので個別に検証
    ids = [w.get("id") for w in data.get("works", []) if isinstance(w, dict)]
    dups = {i for i in ids if ids.count(i) > 1 and i is not None}
    for d in sorted(dups):
        errors.append(f"works.json: id '{d}' が重複している")

    if errors:
        print(f"✗ 検証失敗: {len(errors)} 件のエラー", file=sys.stderr)
        for e in errors:
            print(f"  - {e}", file=sys.stderr)
        return 1

    print(f"✓ {os.path.relpath(works_path, ROOT)} は有効です "
          f"({len(data.get('works', []))} 件の作品)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
