"""
100 icon resources v2: 20 common icons x 5 genuinely different designs.
line  线性   — classic 1.7 outline
fill  填充   — solid silhouettes, details knocked out in surface color
duo   双色   — two-layer: faded main mass + solid accent details
broken 断线  — geometry split into open segments with breathing gaps
badge 面片   — filled chip with the glyph cut in surface color
"""
import os
import shutil
import json

BASE = "src/registry/icons"
REF = "src/registry/icons/line-icons/icon-home/files"

S = 'stroke="var(--surface)"'

ICONS = {
    "home": {
        "name": "主页",
        "line": '<path d="M4.5 10.2 12 4l7.5 6.2V19a1.6 1.6 0 0 1-1.6 1.6h-3.6v-6.2h-4.6v6.2H6.1A1.6 1.6 0 0 1 4.5 19v-8.8Z"/>',
        "solid": '<path fill="currentColor" stroke="none" d="M4.5 10.2 12 4l7.5 6.2V19a1.6 1.6 0 0 1-1.6 1.6h-3.2v-5.8h-5.4v5.8H6.1A1.6 1.6 0 0 1 4.5 19v-8.8Z"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M4.5 10.2 12 4l7.5 6.2V19a1.6 1.6 0 0 1-1.6 1.6H6.1A1.6 1.6 0 0 1 4.5 19v-8.8Z"/><path d="M3.2 11.2 12 3.8l8.8 7.4"/>',
        "broken": '<path d="M5.4 9.4V19a1.5 1.5 0 0 0 1.5 1.5h2.6M14.5 20.5h2.6a1.5 1.5 0 0 0 1.5-1.5V9.4M4.2 10.4 12 4l7.8 6.4M9.6 20.4v-4.4a1 1 0 0 1 1-1h2.8a1 1 0 0 1 1 1v4.4"/>',
        "badge": '<path d="M6.6 10.4 12 6l5.4 4.4v6.4a1 1 0 0 1-1 1h-8.8a1 1 0 0 1-1-1v-6.4Z"/><path d="M10.6 17.6v-3h2.8v3"/>',
    },
    "search": {
        "name": "搜索",
        "line": '<circle cx="11" cy="11" r="6.6"/><path d="m15.8 15.8 4.4 4.4"/>',
        "solid": '<circle cx="11" cy="11" r="7.2" fill="currentColor" stroke="none"/><path d="m16.6 16.6 3.4 3.4" stroke-width="3.4"/>',
        "duo": '<circle cx="11" cy="11" r="7" fill="currentColor" stroke="none" opacity="0.25"/><path d="m16.4 16.4 3.8 3.8" stroke-width="2.6"/>',
        "broken": '<path d="M17.4 14.2a6.6 6.6 0 1 0-3.1 3.1M5.2 8.4a6.6 6.6 0 0 1 3.2-3.2"/><path d="m15.8 15.8 4.4 4.4"/>',
        "badge": '<circle cx="10.6" cy="10.6" r="5"/><path d="m14.4 14.4 3.4 3.4"/>',
    },
    "bell": {
        "name": "铃铛",
        "line": '<path d="M12 3.5c-3.4 0-5.6 2.5-5.6 5.8v3.2L4.8 15.6a.8.8 0 0 0 .7 1.2h13a.8.8 0 0 0 .7-1.2l-1.6-3.1V9.3c0-3.3-2.2-5.8-5.6-5.8Z"/><path d="M9.8 19.6a2.3 2.3 0 0 0 4.4 0"/>',
        "solid": '<path fill="currentColor" stroke="none" d="M12 3.5c-3.4 0-5.6 2.5-5.6 5.8v3.2L4.8 15.6a.8.8 0 0 0 .7 1.2h13a.8.8 0 0 0 .7-1.2l-1.6-3.1V9.3c0-3.3-2.2-5.8-5.6-5.8Z"/><path d="M9.8 19.6a2.3 2.3 0 0 0 4.4 0" stroke="var(--surface)"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M12 3.5c-3.4 0-5.6 2.5-5.6 5.8v3.2L4.8 15.6a.8.8 0 0 0 .7 1.2h13a.8.8 0 0 0 .7-1.2l-1.6-3.1V9.3c0-3.3-2.2-5.8-5.6-5.8Z"/><path d="M9.8 19.6a2.3 2.3 0 0 0 4.4 0" stroke-width="2.2"/>',
        "broken": '<path d="M8.2 5.4a5.5 5.5 0 0 0-1.8 3.9v3.2l-1.6 3.1a.8.8 0 0 0 .7 1.2h13a.8.8 0 0 0 .7-1.2l-1.6-3.1V9.3c0-1.5-.5-2.8-1.4-3.9M12 3.5c-.7 0-1.4.1-2 .4"/><path d="M9.8 19.6a2.3 2.3 0 0 0 4.4 0"/>',
        "badge": '<path d="M12 5c-2.8 0-4.6 2-4.6 4.8v2.6l-1.3 2.6a.6.6 0 0 0 .6.9h10.6a.6.6 0 0 0 .6-.9l-1.3-2.6V9.8C16.6 7 14.8 5 12 5Z"/><path d="M10.2 18a1.9 1.9 0 0 0 3.6 0"/>',
    },
    "settings": {
        "name": "设置",
        "line": '<path d="M4 7h2.8M11.2 7H20M4 12h9.3M17.7 12H20M4 17h.8M9.2 17H20"/><circle cx="9" cy="7" r="2.2"/><circle cx="15.5" cy="12" r="2.2"/><circle cx="7" cy="17" r="2.2"/>',
        "solid": '<g fill="currentColor" stroke="none"><rect x="4" y="6" width="16" height="2" rx="1"/><rect x="4" y="11" width="16" height="2" rx="1"/><rect x="4" y="16" width="16" height="2" rx="1"/></g><g fill="var(--surface)" stroke="currentColor" stroke-width="1.6"><circle cx="9" cy="7" r="2.6"/><circle cx="15.5" cy="12" r="2.6"/><circle cx="7" cy="17" r="2.6"/></g>',
        "duo": '<g stroke-width="4.5" opacity="0.25"><path d="M5.5 7h13M5.5 12h13M5.5 17h13"/></g><g fill="currentColor" stroke="none"><circle cx="9" cy="7" r="2.3"/><circle cx="15.5" cy="12" r="2.3"/><circle cx="7" cy="17" r="2.3"/></g>',
        "broken": '<path d="M4 7h2.6M11 7h4M18.6 7H20M4 12h7.8M16.2 12H20M4 17h1M8.4 17H20"/><circle cx="9" cy="7" r="2.2"/><circle cx="15.5" cy="12" r="2.2"/><circle cx="7" cy="17" r="2.2"/>',
        "badge": '<path d="M4.6 7h2M10.6 7h8.8M4.6 12h7M15.2 12h4.2M4.6 17h1.4M9.6 17h9.8"/><circle cx="8.6" cy="7" r="1.8"/><circle cx="14.6" cy="12" r="1.8"/><circle cx="7" cy="17" r="1.8"/>',
    },
    "heart": {
        "name": "喜欢",
        "line": '<path d="M12 20s-7.2-4.4-8.8-9.2C2.1 7.4 4.2 4.6 7.2 4.6c2 0 3.6 1.1 4.8 2.9 1.2-1.8 2.8-2.9 4.8-2.9 3 0 5.1 2.8 4 6.2C19.2 15.6 12 20 12 20Z"/>',
        "solid": '<path fill="currentColor" stroke="none" d="M12 20s-7.2-4.4-8.8-9.2C2.1 7.4 4.2 4.6 7.2 4.6c2 0 3.6 1.1 4.8 2.9 1.2-1.8 2.8-2.9 4.8-2.9 3 0 5.1 2.8 4 6.2C19.2 15.6 12 20 12 20Z"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M12 20s-7.2-4.4-8.8-9.2C2.1 7.4 4.2 4.6 7.2 4.6c2 0 3.6 1.1 4.8 2.9 1.2-1.8 2.8-2.9 4.8-2.9 3 0 5.1 2.8 4 6.2C19.2 15.6 12 20 12 20Z"/><path d="M17.6 4.4c1.7.7 2.6 2.1 2.7 3.9" stroke-width="2.2"/>',
        "broken": '<path d="M12 20s-4-2.5-6.6-5.8M3.2 10.8c-.4-3.4 1.8-6.2 4.6-6.2 1.7 0 3.1.8 4.2 2.3M12 20s4-2.5 6.6-5.8M20.8 10.8c.4-3.4-1.8-6.2-4.6-6.2-1.7 0-3.1.8-4.2 2.3"/>',
        "badge": '<path d="M12 17.6s-5-3-5-6.4c0-1.9 1.5-3.2 3.1-3.2 1 0 1.6.5 1.9.9.3-.4.9-.9 1.9-.9 1.6 0 3.1 1.3 3.1 3.2 0 3.4-5 6.4-5 6.4Z"/>',
    },
    "star": {
        "name": "星标",
        "line": '<path d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z"/>',
        "solid": '<path fill="currentColor" stroke="none" d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="m12 3.6 2.5 5.1 5.6.8-4 4 .9 5.6-5-2.7-5 2.7.9-5.6-4-4 5.6-.8L12 3.6Z"/><circle cx="12" cy="12.6" r="1.7" fill="currentColor" stroke="none"/>',
        "broken": '<path d="M10.4 6.2 12 3.6l1.6 2.6M16.4 9.7l3.7.5-2.7 2.7M15.6 15.5l.8 4.9-4.4-2.4M8.4 15.5l-4.4 2.4.8-4.9M3.9 10.2l3.7-.5"/>',
        "badge": '<path d="m12 6.4 1.6 3.2 3.5.5-2.5 2.5.6 3.5-3.2-1.7-3.2 1.7.6-3.5-2.5-2.5 3.5-.5L12 6.4Z"/>',
    },
    "user": {
        "name": "用户",
        "line": '<circle cx="12" cy="8.2" r="3.8"/><path d="M4.8 20.2a7.2 7.2 0 0 1 14.4 0"/>',
        "solid": '<circle cx="12" cy="8" r="4" fill="currentColor" stroke="none"/><path fill="currentColor" stroke="none" d="M4.6 20.4a7.4 7.4 0 0 1 14.8 0Z"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M4.6 20.4a7.4 7.4 0 0 1 14.8 0Z"/><circle cx="12" cy="8" r="3.6" fill="currentColor" stroke="none"/>',
        "broken": '<circle cx="12" cy="8.2" r="3.8"/><path d="M5.4 18.4a7.2 7.2 0 0 1 5-3.2M18.6 18.4a7.2 7.2 0 0 0-5-3.2"/>',
        "badge": '<circle cx="12" cy="9" r="3"/><path d="M5.8 18.4a6.4 6.4 0 0 1 12.4 0"/>',
    },
    "camera": {
        "name": "相机",
        "line": '<path d="M4 8.2A1.7 1.7 0 0 1 5.7 6.5h2.1l1.3-2h5.8l1.3 2h2.1A1.7 1.7 0 0 1 20 8.2v9.1a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 17.3V8.2Z"/><circle cx="12" cy="12.6" r="3.4"/>',
        "solid": '<path fill="currentColor" stroke="none" fill-rule="evenodd" d="M4 8.2A1.7 1.7 0 0 1 5.7 6.5h2.1l1.3-2h5.8l1.3 2h2.1A1.7 1.7 0 0 1 20 8.2v9.1a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 17.3V8.2ZM12 9.2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Z"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M4 8.2A1.7 1.7 0 0 1 5.7 6.5h2.1l1.3-2h5.8l1.3 2h2.1A1.7 1.7 0 0 1 20 8.2v9.1a1.7 1.7 0 0 1-1.7 1.7H5.7A1.7 1.7 0 0 1 4 17.3V8.2Z"/><circle cx="12" cy="12.6" r="3" fill="currentColor" stroke="none"/><circle cx="12" cy="12.6" r="1.4" fill="var(--surface)" stroke="none"/>',
        "broken": '<path d="M9.1 6.5H5.7A1.7 1.7 0 0 0 4 8.2v7.1A1.7 1.7 0 0 0 5.7 19h12.6a1.7 1.7 0 0 0 1.7-1.7v-2.2M20 12.6V8.2a1.7 1.7 0 0 0-1.7-1.7h-2.1l-1.3-2h-2.4"/><circle cx="12" cy="12.6" r="3.4"/><path d="M16.6 9.8h.4"/>',
        "badge": '<rect x="5" y="7" width="14" height="11" rx="2.4"/><circle cx="12" cy="12.5" r="2.8"/><path d="m9 7 1.2-1.8h3.6L15 7"/>',
    },
    "mail": {
        "name": "邮件",
        "line": '<rect x="3.2" y="5.4" width="17.6" height="13.2" rx="2.2"/><path d="m4.2 7.2 7.8 5.6 7.8-5.6"/>',
        "solid": '<rect x="3.6" y="5.6" width="16.8" height="12.8" rx="2.2" fill="currentColor" stroke="none"/><path d="m4.6 7.4 7.4 5.3 7.4-5.3" stroke="var(--surface)"/>',
        "duo": '<rect x="3.6" y="5.6" width="16.8" height="12.8" rx="2.2" fill="currentColor" stroke="none" opacity="0.25"/><path d="m4.6 7.4 7.4 5.3 7.4-5.3" stroke-width="1.9"/>',
        "broken": '<path d="M8.6 5.6H5.8a2.2 2.2 0 0 0-2.2 2.2v1.6M20.4 9.4V7.8a2.2 2.2 0 0 0-2.2-2.2h-2.8M3.6 12.6v3.6a2.2 2.2 0 0 0 2.2 2.2h12.4a2.2 2.2 0 0 0 2.2-2.2v-3.6"/><path d="m4.6 7.4 7.4 5.3 7.4-5.3"/>',
        "badge": '<rect x="4.6" y="6.4" width="14.8" height="11.2" rx="2"/><path d="m5.6 8 6.4 4.6L18.4 8"/>',
    },
    "lock": {
        "name": "锁",
        "line": '<path d="M7.6 10.4V8.2a4.4 4.4 0 0 1 8.8 0v2.2"/><rect x="5.4" y="10.4" width="13.2" height="9.4" rx="2"/><path d="M12 14.2v1.8"/>',
        "solid": '<path d="M8 10.4V8a4 4 0 0 1 8 0v2.4" stroke-width="2.6"/><rect x="5.4" y="10.4" width="13.2" height="9.2" rx="2" fill="currentColor" stroke="none"/><circle cx="12" cy="14.4" r="1.5" fill="var(--surface)" stroke="none"/><path d="M12 15.6v1.6" stroke="var(--surface)" stroke-width="1.6"/>',
        "duo": '<rect x="5.4" y="10.4" width="13.2" height="9.2" rx="2" fill="currentColor" stroke="none" opacity="0.25"/><path d="M7.6 10.4V8.2a4.4 4.4 0 0 1 8.8 0v2.2" stroke-width="2.2"/><circle cx="12" cy="14.4" r="1.5" fill="currentColor" stroke="none"/>',
        "broken": '<path d="M8.6 10.4V8a3.4 3.4 0 0 1 6-2.2M15.4 8.6v1.8"/><path d="M9.8 10.4H7.4a2 2 0 0 0-2 2v5.2a2 2 0 0 0 2 2h9.2a2 2 0 0 0 2-2v-5.2a2 2 0 0 0-2-2h-2.4"/><path d="M12 13.8v2.4"/>',
        "badge": '<path d="M8.6 10V8.4a3.4 3.4 0 0 1 6.8 0V10"/><rect x="6.4" y="10" width="11.2" height="8" rx="1.8"/><path d="M12 13v2"/>',
    },
    "download": {
        "name": "下载",
        "line": '<path d="M12 3.8v10.4M8.2 10.8 12 14.6l3.8-3.8M4.5 19.5h15"/>',
        "solid": '<path d="M12 3.8v10.2" stroke-width="3"/><path d="m8.2 10.4 3.8 3.8 3.8-3.8" stroke-width="3"/><path d="M4.5 19.5h15" stroke-width="3"/>',
        "duo": '<path d="M4.5 19.5h15" stroke-width="4.5" opacity="0.25"/><path d="M12 3.8v10.2M8.2 10.4l3.8 3.8 3.8-3.8" stroke-width="2.4"/>',
        "broken": '<path d="M12 3.8v10.2M8.4 10.4l3.6 3.6 3.6-3.6M4.5 16.4v1.6a1.5 1.5 0 0 0 1.5 1.5h12a1.5 1.5 0 0 0 1.5-1.5v-1.6"/>',
        "badge": '<path d="M12 5.4v7.2M8.8 9.6l3.2 3.2 3.2-3.2"/><path d="M5.4 17.6h13.2"/>',
    },
    "calendar": {
        "name": "日历",
        "line": '<rect x="4" y="5.5" width="16" height="14.5" rx="2.2"/><path d="M4 9.8h16M8.4 3.4v3.4M15.6 3.4v3.4"/>',
        "solid": '<rect x="4" y="5.5" width="16" height="14.5" rx="2.2" fill="currentColor" stroke="none"/><path d="M4 9.8h16" stroke="var(--surface)" stroke-width="1.6"/><g fill="var(--surface)" stroke="none"><circle cx="8.4" cy="13.4" r="1"/><circle cx="12" cy="13.4" r="1"/><circle cx="15.6" cy="13.4" r="1"/></g><path d="M8.4 3.4v2.2M15.6 3.4v2.2" stroke-width="2"/>',
        "duo": '<rect x="4" y="5.5" width="16" height="14.5" rx="2.2" fill="currentColor" stroke="none" opacity="0.25"/><path d="M4 9.8h16" stroke-width="2.2"/><path d="M8.4 3.4v3.4M15.6 3.4v3.4"/>',
        "broken": '<path d="M8.4 3.4v3.4M15.6 3.4v3.4M4 9.8h16M12 14.4h.1M8.4 14.4h.1M15.6 14.4h.1"/><path d="M4 7.7A2.2 2.2 0 0 1 6.2 5.5M17.8 5.5A2.2 2.2 0 0 1 20 7.7v8a2.2 2.2 0 0 1-2.2 2.2H6.2A2.2 2.2 0 0 1 4 15.7"/>',
        "badge": '<rect x="4.6" y="6" width="14.8" height="13" rx="2"/><path d="M4.6 9.6h14.8M8.6 4.4v2.4M15.4 4.4v2.4"/><path d="M8.2 13h.1M12 13h.1M15.8 13h.1"/>',
    },
    "clock": {
        "name": "时钟",
        "line": '<circle cx="12" cy="12" r="8.4"/><path d="M12 7.2V12l3.2 1.9"/>',
        "solid": '<circle cx="12" cy="12" r="8.6" fill="currentColor" stroke="none"/><path d="M12 7.2V12l3.2 1.9" stroke="var(--surface)" stroke-width="1.8"/>',
        "duo": '<circle cx="12" cy="12" r="8.6" fill="currentColor" stroke="none" opacity="0.25"/><path d="M12 7.2V12l3.2 1.9" stroke-width="2"/>',
        "broken": '<path d="M14.9 4a8.4 8.4 0 0 1 5.4 6.3M20 15.4a8.4 8.4 0 0 1-10.6 4.7M4.1 10.2A8.4 8.4 0 0 1 8.5 4.3"/><path d="M12 7.2V12l3.2 1.9"/>',
        "badge": '<circle cx="12" cy="12" r="7.6"/><path d="M12 7.8V12l2.8 1.7"/>',
    },
    "chat": {
        "name": "消息",
        "line": '<path d="M4 6.6A2.2 2.2 0 0 1 6.2 4.4h11.6A2.2 2.2 0 0 1 20 6.6v7.6a2.2 2.2 0 0 1-2.2 2.2H9l-5 4V6.6Z"/>',
        "solid": '<path fill="currentColor" stroke="none" d="M4 6.6A2.2 2.2 0 0 1 6.2 4.4h11.6A2.2 2.2 0 0 1 20 6.6v7.6a2.2 2.2 0 0 1-2.2 2.2H9l-5 4V6.6Z"/><g fill="var(--surface)" stroke="none"><circle cx="8.4" cy="10.4" r="1"/><circle cx="12" cy="10.4" r="1"/><circle cx="15.6" cy="10.4" r="1"/></g>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M4 6.6A2.2 2.2 0 0 1 6.2 4.4h11.6A2.2 2.2 0 0 1 20 6.6v7.6a2.2 2.2 0 0 1-2.2 2.2H9l-5 4V6.6Z"/><g fill="currentColor" stroke="none"><circle cx="8.4" cy="10.4" r="1.1"/><circle cx="12" cy="10.4" r="1.1"/><circle cx="15.6" cy="10.4" r="1.1"/></g>',
        "broken": '<path d="M9 18.2v-1.8H6.2A2.2 2.2 0 0 1 4 14.2V6.6a2.2 2.2 0 0 1 2.2-2.2M9.8 4.4h8A2.2 2.2 0 0 1 20 6.6v5.2a2.2 2.2 0 0 1-1.4 2"/><path d="M8.4 10.4h.1M12 10.4h.1M15.6 10.4h.1"/>',
        "badge": '<path d="M5.6 7a2 2 0 0 1 2-2h8.8a2 2 0 0 1 2 2v5.6a2 2 0 0 1-2 2H10l-4.4 3.4V7Z"/>',
    },
    "cart": {
        "name": "购物车",
        "line": '<path d="M3.6 4.6h2.2l2.4 11h9.6l2.2-8H7"/><circle cx="9.6" cy="19.4" r="1.5"/><circle cx="16.6" cy="19.4" r="1.5"/>',
        "solid": '<path d="M3.6 4.6h2.2l2.4 11h9.6l2.2-8H7" stroke-width="2.4"/><circle cx="9.6" cy="19.4" r="1.8" fill="currentColor" stroke="none"/><circle cx="16.6" cy="19.4" r="1.8" fill="currentColor" stroke="none"/>',
        "duo": '<path d="M3.6 4.6h2.2l2.4 11h9.6l2.2-8H7" stroke-width="2.4" opacity="0.25"/><circle cx="9.6" cy="19.4" r="1.8" fill="currentColor" stroke="none"/><circle cx="16.6" cy="19.4" r="1.8" fill="currentColor" stroke="none"/><path d="m7.4 7.6 11.8.2" opacity="0.25" stroke-width="2.4"/>',
        "broken": '<path d="M3.6 4.6h2.2M9 15.6h6.8l2.2-8M7 7.6h13"/><circle cx="9.6" cy="19.4" r="1.5"/><circle cx="16.6" cy="19.4" r="1.5"/><path d="m5.8 4.6 2.4 11"/>',
        "badge": '<path d="M5.6 5.4h1.8l2 9.4h8.4l1.8-6.8H8"/><circle cx="10" cy="18" r="1.3"/><circle cx="16" cy="18" r="1.3"/>',
    },
    "play": {
        "name": "播放",
        "line": '<circle cx="12" cy="12" r="8.4"/><path d="M10.2 8.8 15.4 12l-5.2 3.2V8.8Z"/>',
        "solid": '<circle cx="12" cy="12" r="8.6" fill="currentColor" stroke="none"/><path fill="var(--surface)" stroke="none" d="m10.2 8.6 5 3.4-5 3.4V8.6Z"/>',
        "duo": '<circle cx="12" cy="12" r="8.6" fill="currentColor" stroke="none" opacity="0.25"/><path fill="currentColor" stroke="none" d="m10.2 8.6 5 3.4-5 3.4V8.6Z"/>',
        "broken": '<path d="M14.9 4a8.4 8.4 0 0 1 5.4 6.3M20 15.4a8.4 8.4 0 0 1-10.6 4.7M4.1 10.2A8.4 8.4 0 0 1 8.5 4.3"/><path d="M10.2 8.8 14.6 12l-4.4 3.2Z"/>',
        "badge": '<circle cx="12" cy="12" r="8"/><path d="m10.4 9 4.6 3-4.6 3V9Z"/>',
    },
    "trash": {
        "name": "垃圾桶",
        "line": '<path d="M4.8 6.4h14.4M9.4 6.4V4.8a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.6M6.6 6.4l.8 12.2a1.8 1.8 0 0 0 1.8 1.7h5.6a1.8 1.8 0 0 0 1.8-1.7l.8-12.2M10.2 10v6M13.8 10v6"/>',
        "solid": '<path d="M4.8 6.4h14.4" stroke-width="2.4"/><path fill="currentColor" stroke="none" d="M6.6 6.4h10.8l-.7 12a1.9 1.9 0 0 1-1.9 1.8H9.2a1.9 1.9 0 0 1-1.9-1.8l-.7-12Z"/><path d="M10.1 9.6v7M13.9 9.6v7" stroke="var(--surface)" stroke-width="1.6"/><path d="M9.4 6.4V4.8a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.6" stroke-width="2"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M6.6 6.4h10.8l-.7 12a1.9 1.9 0 0 1-1.9 1.8H9.2a1.9 1.9 0 0 1-1.9-1.8l-.7-12Z"/><path d="M4.8 6.4h14.4M9.4 6.4V4.8a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.6" stroke-width="2"/><path d="M10.2 10v6M13.8 10v6"/>',
        "broken": '<path d="M4.8 6.4h5M12.4 6.4h6.8M9.4 6.4V5a1.2 1.2 0 0 1 1.2-1.2h2.8a1.2 1.2 0 0 1 1.2 1.2v1.4"/><path d="M6.6 8.8l.5 9.8a1.9 1.9 0 0 0 1.9 1.8h6a1.9 1.9 0 0 0 1.9-1.8l.3-5.4M17.3 10.6l-.1-1.8M10.2 10v6M13.8 10v6"/>',
        "badge": '<path d="M5.6 6.4h12.8M9.6 6.4V5a1 1 0 0 1 1-1h2.8a1 1 0 0 1 1 1v1.4"/><path d="M7.2 6.4h9.6l-.7 11a1.8 1.8 0 0 1-1.8 1.6H9.7a1.8 1.8 0 0 1-1.8-1.6l-.7-11Z"/><path d="M10.2 9.4v6M13.8 9.4v6"/>',
    },
    "edit": {
        "name": "编辑",
        "line": '<path d="M14.2 5.2l4.6 4.6L9.4 19.2l-5.4.6.6-5.4L14.2 5.2Z"/><path d="m12.6 6.8 4.6 4.6"/>',
        "solid": '<path fill="currentColor" stroke="none" d="M14.2 5.2l4.6 4.6L9.4 19.2l-5.4.6.6-5.4L14.2 5.2Z"/><path d="m12.6 6.8 4.6 4.6" stroke="var(--surface)"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M14.2 5.2l4.6 4.6L9.4 19.2l-5.4.6.6-5.4L14.2 5.2Z"/><path fill="currentColor" stroke="none" d="m4 19.8.4-4 3.6 3.6-4 .4Z"/><path d="m12.6 6.8 4.6 4.6"/>',
        "broken": '<path d="m14.2 5.2 4.6 4.6M9.4 19.2l-5.4.6.6-5.4M11 7l6 6M6.2 15l2.8 2.8"/>',
        "badge": '<path d="m13.6 6 4.4 4.4-8.4 8.4-5 .6.6-5L13.6 6Z"/><path d="m12.2 7.4 4.4 4.4"/>',
    },
    "share": {
        "name": "分享",
        "line": '<circle cx="6.2" cy="12" r="2.4"/><circle cx="17.4" cy="6" r="2.4"/><circle cx="17.4" cy="18" r="2.4"/><path d="m8.4 10.9 6.8-3.7M8.4 13.1l6.8 3.7"/>',
        "solid": '<g fill="currentColor" stroke="none"><circle cx="6.2" cy="12" r="2.6"/><circle cx="17.4" cy="6" r="2.6"/><circle cx="17.4" cy="18" r="2.6"/></g><path d="m8.4 10.9 6.8-3.7M8.4 13.1l6.8 3.7" stroke-width="2"/>',
        "duo": '<g fill="currentColor" stroke="none" opacity="0.25"><circle cx="6.2" cy="12" r="2.6"/><circle cx="17.4" cy="6" r="2.6"/><circle cx="17.4" cy="18" r="2.6"/></g><path d="m8.4 10.9 6.8-3.7M8.4 13.1l6.8 3.7" stroke-width="2"/>',
        "broken": '<circle cx="6.2" cy="12" r="2.4"/><circle cx="17.4" cy="6" r="2.4"/><circle cx="17.4" cy="18" r="2.4"/><path d="m8.4 10.9 2.8-1.5M13.9 8.6l3.5-1.9M8.4 13.1l2.8 1.5M14 15.3l3.4 1.9"/>',
        "badge": '<circle cx="6.2" cy="12" r="1.9"/><circle cx="17.4" cy="6" r="1.9"/><circle cx="17.4" cy="18" r="1.9"/><path d="m8 11 7-3.8M8 13l7 3.8"/>',
    },
    "bookmark": {
        "name": "书签",
        "line": '<path d="M6.4 5.4a1.8 1.8 0 0 1 1.8-1.8h7.6a1.8 1.8 0 0 1 1.8 1.8v15l-5.6-3.8-5.6 3.8v-15Z"/>',
        "solid": '<path fill="currentColor" stroke="none" d="M6.4 5.4a1.8 1.8 0 0 1 1.8-1.8h7.6a1.8 1.8 0 0 1 1.8 1.8v15l-5.6-3.8-5.6 3.8v-15Z"/><path d="M9.4 7.4h5.2" stroke="var(--surface)" stroke-width="1.6"/>',
        "duo": '<path fill="currentColor" stroke="none" opacity="0.25" d="M6.4 5.4a1.8 1.8 0 0 1 1.8-1.8h7.6a1.8 1.8 0 0 1 1.8 1.8v15l-5.6-3.8-5.6 3.8v-15Z"/><path d="M9.4 7.4h5.2" stroke-width="1.8"/>',
        "broken": '<path d="M6.4 9V5.4a1.8 1.8 0 0 1 1.8-1.8h7.6a1.8 1.8 0 0 1 1.8 1.8V9M17.6 12.4v8l-5.6-3.8-5.6 3.8v-5"/>',
        "badge": '<path d="M7.4 5.8a1.6 1.6 0 0 1 1.6-1.6h6a1.6 1.6 0 0 1 1.6 1.6v12.8L12 15.2l-4.6 3.4V5.8Z"/>',
    },
}

VARIANTS = [
    ("line", "线性", "经典线性轮廓"),
    ("bold", "加粗", "加粗线性，小尺寸清晰"),
    ("fill", "填充", "实心体 + 镂空细节"),
    ("duo", "双色", "主体淡层 + 重点实色"),
    ("broken", "断线", "分段开口的呼吸感构成"),
]

HTML_TPL = """<div class="ic-stage">
  <div class="ic-frame">
    <span class="ic-art" id="ic-art">{svg}</span>
  </div>
  <div class="ic-sizes" role="group" aria-label="预览尺寸">
    <button class="ic-size" type="button" data-size="16">16</button>
    <button class="ic-size is-active" type="button" data-size="24">24</button>
    <button class="ic-size" type="button" data-size="32">32</button>
    <button class="ic-size" type="button" data-size="48">48</button>
  </div>
  <p class="ic-caption">{name} · 24px 网格绘制 · 支持任意尺寸</p>
</div>
"""


def wrap(paths, variant):
    if variant == "line":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                + paths + "</svg>")
    if variant == "bold":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                + paths + "</svg>")
    if variant in ("fill", "duo"):
        # markup 自带 fill/stroke 声明，默认细描边供描边子元素继承
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                + paths + "</svg>")
    if variant == "broken":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                + paths + "</svg>")


def meta_ts(slug, name, desc, sub, tags):
    return f'''import type {{ UIResourceMeta }} from "@/types/resource";

export const meta: UIResourceMeta = {{
  id: "{slug}",
  slug: "{slug}",
  name: "{name}",
  description: "{desc}",
  category: "icons",
  subcategory: "{sub}",
  type: "icon",
  tags: {json.dumps(tags, ensure_ascii=False)},
  technologies: ["SVG"],
  styles: ["极简"],
  difficulty: "beginner",
  isNew: true,
  responsive: true,
  previewBackground: "light",
  compatibility: ["Chrome 90+", "Firefox 90+", "Safari 15+", "Edge 90+"],
  author: "VibeUI Team",
  version: "2.0.0",
  createdAt: "2026-09-07",
  updatedAt: "2026-09-07",
  dir: "icons/line-icons/{slug}",
}};
'''


# 清理旧自动变体目录后整体重建
OLD_VARIANTS = ["line", "bold", "dot", "duo", "grad", "badge", "fill", "broken"]
removed = 0
for base in ICONS:
    for v in OLD_VARIANTS:
        d = f"{BASE}/line-icons/icon-{base}-{v}"
        if os.path.isdir(d):
            shutil.rmtree(d)
            removed += 1
print(f"removed {removed} old variant dirs")

count = 0
slugs = []
for base, art in ICONS.items():
    for vslug, vname, vdesc in VARIANTS:
        slug = f"icon-{base}-{vslug}"
        d = f"{BASE}/line-icons/{slug}/files"
        os.makedirs(d, exist_ok=True)
        art_key = {"line": "line", "bold": "line", "fill": "solid", "duo": "duo", "broken": "broken"}[vslug]
        svg = wrap(art[art_key], vslug)
        open(f"{d}/index.html", "w", encoding="utf-8").write(
            HTML_TPL.format(svg=svg, name=f"{art['name']} · {vname}"))
        shutil.copyfile(f"{REF}/styles.css", f"{d}/styles.css")
        shutil.copyfile(f"{REF}/script.js", f"{d}/script.js")
        name = f"{art['name']}图标 · {vname}"
        desc = f"{art['name']}图标的{vname}风格：{vdesc}，24px 网格手绘。"
        tags = [art["name"], vname, "图标", "常用", vdesc[:6]]
        open(f"{BASE}/line-icons/{slug}/metadata.ts", "w", encoding="utf-8").write(
            meta_ts(slug, name, desc, vname, tags))
        slugs.append(slug)
        count += 1

print(f"generated {count} icons (20 base x 5 designs)")
print("first/last:", slugs[0], slugs[-1])
