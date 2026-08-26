#!/usr/bin/env python3
"""把 competitor-board-addon.zip 內嵌成 base64（給 download-demo.js 用）。
zip 更新後重跑：python3 _build-embed.py"""
import base64, io, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
b64 = base64.b64encode(open("competitor-board-addon.zip", "rb").read()).decode()
io.open("embed.js", "w", encoding="utf-8").write(
    "/* 自動產生 — 由 _build-embed.py 產出，不要手改 */\n"
    "window.DEMO_FILES_B64 = window.DEMO_FILES_B64 || {};\n"
    'window.DEMO_FILES_B64["competitor-board-addon.zip"] = "%s";\n' % b64)
print("embed.js 更新完成", len(b64)//1024, "KB(b64)")
