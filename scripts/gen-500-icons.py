"""
500 icon resources: 100 new common icons x 5 normal variants
(line 1.7 / bold 2.5 / fill thickened / duo soft-backdrop / dot dotted).
All variants derive from the authored line geometry.
"""
import os
import shutil
import json

BASE = "src/registry/icons"
REF = "src/registry/icons/line-icons/icon-home/files"

ICONS = {
    "arrow-left": ("左箭头", '<path d="M19 12H5M11 6l-6 6 6 6"/>'),
    "arrow-right": ("右箭头", '<path d="M5 12h14M13 6l6 6-6 6"/>'),
    "arrow-up": ("上箭头", '<path d="M12 19V5M6 11l6-6 6 6"/>'),
    "arrow-down": ("下箭头", '<path d="M12 5v14M6 13l6 6 6-6"/>'),
    "chevron-left": ("左尖括号", '<path d="m14.5 6-6 6 6 6"/>'),
    "chevron-right": ("右尖括号", '<path d="m9.5 6 6 6-6 6"/>'),
    "chevron-up": ("上尖括号", '<path d="m6 14.5 6-6 6 6"/>'),
    "chevron-down": ("下尖括号", '<path d="m6 9.5 6 6 6-6"/>'),
    "check": ("对勾", '<path d="m5 12.5 4.5 4.5L19 7.5"/>'),
    "x": ("叉号", '<path d="m6 6 12 12M18 6 6 18"/>'),
    "minus": ("减号", '<path d="M5 12h14"/>'),
    "plus": ("加号", '<path d="M12 5v14M5 12h14"/>'),
    "check-circle": ("对勾圈", '<circle cx="12" cy="12" r="8.4"/><path d="m8.4 12.3 2.5 2.5 4.7-5.2"/>'),
    "x-circle": ("叉号圈", '<circle cx="12" cy="12" r="8.4"/><path d="m9.2 9.2 5.6 5.6M14.8 9.2l-5.6 5.6"/>'),
    "plus-circle": ("加号圈", '<circle cx="12" cy="12" r="8.4"/><path d="M12 8.4v7.2M8.4 12h7.2"/>'),
    "minus-circle": ("减号圈", '<circle cx="12" cy="12" r="8.4"/><path d="M8.4 12h7.2"/>'),
    "info": ("信息", '<circle cx="12" cy="12" r="8.4"/><path d="M12 11v5M12 8h.01"/>'),
    "help-circle": ("帮助圈", '<circle cx="12" cy="12" r="8.4"/><path d="M9.6 9.4a2.5 2.5 0 0 1 4.9.6c0 1.6-2.4 2-2.4 3.4M12 16.6h.01"/>'),
    "alert-triangle": ("警告三角", '<path d="M12 4.2 21 19.6H3L12 4.2Z"/><path d="M12 10v4M12 16.8h.01"/>'),
    "alert-circle": ("警告圈", '<circle cx="12" cy="12" r="8.4"/><path d="M12 8v5M12 16.6h.01"/>'),
    "refresh": ("刷新", '<path d="M20 12a8 8 0 1 1-2.3-5.6"/><path d="M20 3.6V7h-3.4"/>'),
    "undo": ("撤销", '<path d="M8 5 4 9l4 4"/><path d="M4 9h9.5a5.5 5.5 0 0 1 0 11H9"/>'),
    "redo": ("重做", '<path d="m16 5 4 4-4 4"/><path d="M20 9h-9.5a5.5 5.5 0 0 0 0 11H15"/>'),
    "eye": ("眼睛", '<path d="M3 12s3.4-6 9-6 9 6 9 6-3.4 6-9 6-9-6-9-6Z"/><circle cx="12" cy="12" r="2.6"/>'),
    "eye-off": ("隐藏", '<path d="m4.4 4.4 15.2 15.2M9.9 6.2A9.8 9.8 0 0 1 12 6c5.6 0 9 6 9 6a16 16 0 0 1-2.7 3.1M6.3 8.5A15.2 15.2 0 0 0 3 12s3.4 5 9 5a9 9 0 0 0 2.9-.5"/>'),
    "filter": ("筛选", '<path d="M4 5h16l-6.2 7.4v5.2l-3.6 2v-7.2L4 5Z"/>'),
    "grid": ("网格", '<rect x="4" y="4" width="7" height="7" rx="1.6"/><rect x="13" y="4" width="7" height="7" rx="1.6"/><rect x="4" y="13" width="7" height="7" rx="1.6"/><rect x="13" y="13" width="7" height="7" rx="1.6"/>'),
    "list": ("列表", '<path d="M8.4 6.4H20M8.4 12H20M8.4 17.6H20M4.6 6.4h.01M4.6 12h.01M4.6 17.6h.01"/>'),
    "layout": ("布局", '<rect x="3.6" y="4.4" width="16.8" height="15.2" rx="2"/><path d="M3.6 9.6h16.8M9.6 9.6v10"/>'),
    "columns": ("分栏", '<rect x="3.6" y="4.4" width="16.8" height="15.2" rx="2"/><path d="M12 4.4v15.2"/>'),
    "maximize": ("最大化", '<path d="M8 3.6H5.6a2 2 0 0 0-2 2V8M16 3.6h2.4a2 2 0 0 1 2 2V8M20.4 16v2.4a2 2 0 0 1-2 2H16M8 20.4H5.6a2 2 0 0 1-2-2V16"/>'),
    "minimize": ("最小化", '<path d="M8 3.6v2.4a2 2 0 0 1-2 2H3.6M16 3.6v2.4a2 2 0 0 0 2 2h2.4M20.4 16h-2.4a2 2 0 0 0-2 2v2.4M8 20.4V18a2 2 0 0 0-2-2H3.6"/>'),
    "external-link": ("外部链接", '<path d="M14 4.5h5.5V10M19 5l-8 8M9 5H6.5a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2H17a2 2 0 0 0 2-2V15"/>'),
    "link": ("链接", '<path d="M10.2 13.8a4 4 0 0 0 5.7 0l3-3a4 4 0 1 0-5.7-5.7l-1.6 1.6"/><path d="M13.8 10.2a4 4 0 0 0-5.7 0l-3 3a4 4 0 1 0 5.7 5.7l1.6-1.6"/>'),
    "anchor": ("船锚", '<circle cx="12" cy="5.4" r="2.2"/><path d="M12 7.6v12M5.4 12H3.6a8.4 8.4 0 0 0 16.8 0h-1.8"/>'),
    "paperclip": ("回形针", '<path d="m20 11.4-8.2 8.2a5 5 0 0 1-7-7l8.4-8.4a3.4 3.4 0 0 1 4.8 4.8l-8.4 8.4a1.8 1.8 0 0 1-2.6-2.6l7.8-7.8"/>'),
    "copy": ("复制", '<rect x="8.6" y="8.6" width="11" height="11" rx="2"/><path d="M15.4 5.6v-.4a1.8 1.8 0 0 0-1.8-1.8H6.2a1.8 1.8 0 0 0-1.8 1.8v7.4a1.8 1.8 0 0 0 1.8 1.8h.4"/>'),
    "clipboard": ("剪贴板", '<rect x="8" y="3.4" width="8" height="3.6" rx="1"/><path d="M16 5.2h2.4A1.6 1.6 0 0 1 20 6.8v12a1.6 1.6 0 0 1-1.6 1.6H5.6A1.6 1.6 0 0 1 4 18.8v-12a1.6 1.6 0 0 1 1.6-1.6H8"/>'),
    "scissors": ("剪刀", '<circle cx="6" cy="6" r="2.6"/><circle cx="6" cy="18" r="2.6"/><path d="M20 4 8.6 15.4M14.5 13.5 20 20M8.6 8.6l3.2 3.2"/>'),
    "folder": ("文件夹", '<path d="M3.6 6.8a1.8 1.8 0 0 1 1.8-1.8h4l2 2.4h7.2a1.8 1.8 0 0 1 1.8 1.8v8.6a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8V6.8Z"/>'),
    "folder-open": ("打开文件夹", '<path d="M3.6 6.8a1.8 1.8 0 0 1 1.8-1.8h4l2 2.4h7.2a1.8 1.8 0 0 1 1.8 1.8v1.2"/><path d="M3.8 18.6 6.2 10.6h14.4l-2.4 8H3.8Z"/>'),
    "file": ("文件", '<path d="M6.4 4.4A1.6 1.6 0 0 1 8 2.8h6l4.4 4.4v12.4a1.6 1.6 0 0 1-1.6 1.6H8a1.6 1.6 0 0 1-1.6-1.6V4.4Z"/><path d="M13.8 3v4.4h4.4"/>'),
    "file-text": ("文档", '<path d="M6.4 4.4A1.6 1.6 0 0 1 8 2.8h6l4.4 4.4v12.4a1.6 1.6 0 0 1-1.6 1.6H8a1.6 1.6 0 0 1-1.6-1.6V4.4Z"/><path d="M13.8 3v4.4h4.4M9 12h6M9 15.6h6"/>'),
    "book": ("书", '<path d="M5 19.2A2.2 2.2 0 0 1 7.2 17H19V3.6H7.2A2.2 2.2 0 0 0 5 5.8v13.4Z"/><path d="M5 19.2a2.2 2.2 0 0 0 2.2 2.2H19v-4.4"/>'),
    "book-open": ("翻开的书", '<path d="M12 6.4c-1.6-1.6-4-2.4-8-2.4v13.6c4 0 6.4.8 8 2.4 1.6-1.6 4-2.4 8-2.4V4c-4 0-6.4.8-8 2.4Z"/><path d="M12 6.4v13.6"/>'),
    "archive": ("归档", '<rect x="3.6" y="4" width="16.8" height="4.4" rx="1"/><path d="M5.2 8.4v9.4a2 2 0 0 0 2 2h9.6a2 2 0 0 0 2-2V8.4M10 12.4h4"/>'),
    "inbox": ("收件箱", '<path d="M3.6 13.4 6 5.4h12l2.4 8v4.8a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8v-4.8Z"/><path d="M3.6 13.4h4.8a3.6 3.6 0 0 0 7.2 0h4.8"/>'),
    "upload": ("上传", '<path d="M12 14.6V4.2M8.2 7.6 12 3.8l3.8 3.8M4.5 19.5h15"/>'),
    "send": ("发送", '<path d="M20.4 3.6 3.8 10.4l6.4 2.6 2.6 6.4 7.6-15.8Z"/><path d="m10.2 13 4.2-4.2"/>'),
    "phone": ("电话", '<path d="M6.8 3.8 9 3.4l1.8 4-1.8 1.8a12 12 0 0 0 5.8 5.8l1.8-1.8 4 1.8-.4 2.2a2 2 0 0 1-2 1.6C10.6 18.8 5.2 13.4 5.2 5.8a2 2 0 0 1 1.6-2Z"/>'),
    "message-circle": ("圆形消息", '<path d="M20.4 11.6a8.4 8.4 0 0 1-12.6 7.3L3.6 20.4l1.5-4.3A8.4 8.4 0 1 1 20.4 11.6Z"/>'),
    "video": ("视频", '<rect x="3.4" y="6.4" width="12.4" height="11.2" rx="2.2"/><path d="m15.8 10.4 4.8-2.8v8.8l-4.8-2.8"/>'),
    "mic": ("麦克风", '<rect x="9.2" y="3" width="5.6" height="10.4" rx="2.8"/><path d="M5.8 11.4a6.2 6.2 0 0 0 12.4 0M12 17.6v3.2"/>'),
    "mic-off": ("麦克风静音", '<path d="M9.2 6.4A2.8 2.8 0 0 1 14.8 7v3.4M12 14.6a2.8 2.8 0 0 1-2.8-2.8M5.8 11.4a6.2 6.2 0 0 0 9.6 5.2M12 17.6v3.2M4 4l16 16"/>'),
    "volume-2": ("音量", '<path d="M4 9.6h3L11.4 5.4v13.2L7 14.4H4V9.6Z"/><path d="M15 9.2a4 4 0 0 1 0 5.6M17.6 6.8a7.6 7.6 0 0 1 0 10.4"/>'),
    "volume-x": ("静音", '<path d="M4 9.6h3L11.4 5.4v13.2L7 14.4H4V9.6Z"/><path d="m15.4 9.8 4.4 4.4M19.8 9.8l-4.4 4.4"/>'),
    "tv": ("电视", '<rect x="3.4" y="6.4" width="17.2" height="11.6" rx="2"/><path d="m8 2.8 4 3.6 4-3.6"/>'),
    "tablet": ("平板", '<rect x="5.6" y="3" width="12.8" height="18" rx="2.2"/><path d="M11 17.8h2"/>'),
    "laptop": ("笔记本电脑", '<rect x="4.6" y="4.6" width="14.8" height="10" rx="1.6"/><path d="M2.6 18.6h18.8"/>'),
    "keyboard": ("键盘", '<rect x="2.6" y="6.4" width="18.8" height="11.2" rx="2"/><path d="M6.4 10h.01M10 10h.01M13.6 10h.01M17.2 10h.01M7.4 14h9.2"/>'),
    "mouse": ("鼠标", '<rect x="8" y="3" width="8" height="18" rx="4"/><path d="M12 7v3.4"/>'),
    "hard-drive": ("硬盘", '<path d="M3.6 13.4 6 5.6a1.8 1.8 0 0 1 1.7-1.2h8.6a1.8 1.8 0 0 1 1.7 1.2l2.4 7.8v4.8a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8v-4.8Z"/><path d="M3.6 13.4h16.8M7 17h.01M10.4 17h.01"/>'),
    "database": ("数据库", '<ellipse cx="12" cy="5.4" rx="7.6" ry="2.8"/><path d="M4.4 5.4v13.2c0 1.5 3.4 2.8 7.6 2.8s7.6-1.3 7.6-2.8V5.4"/><path d="M4.4 12c0 1.5 3.4 2.8 7.6 2.8s7.6-1.3 7.6-2.8"/>'),
    "server": ("服务器", '<rect x="3.6" y="4" width="16.8" height="7" rx="1.6"/><rect x="3.6" y="13" width="16.8" height="7" rx="1.6"/><path d="M7 7.5h.01M7 16.5h.01"/>'),
    "cloud": ("云", '<path d="M7.2 18.5h9.6a3.7 3.7 0 0 0 .6-7.35A5.7 5.7 0 0 0 6.3 10.4a4.05 4.05 0 0 0 .9 8.1Z"/>'),
    "droplet": ("水滴", '<path d="M12 3.4s5.4 6 5.4 10a5.4 5.4 0 0 1-10.8 0c0-4 5.4-10 5.4-10Z"/>'),
    "wind": ("风", '<path d="M3.4 8.4h10a2.8 2.8 0 1 0-2.8-2.8M3.4 12.6h15.4a2.8 2.8 0 1 1 2.8 2.8M3.4 16.8h7.6a2.4 2.4 0 1 1-2.4 2.4"/>'),
    "thermometer": ("温度计", '<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 9.4v4"/>'),
    "umbrella": ("雨伞", '<path d="M3.6 12.6a8.4 8.4 0 0 1 16.8 0H3.6Z"/><path d="M12 3.4v.4M12 12.6v5.4a2.2 2.2 0 0 1-4.4 0"/>'),
    "map": ("地图", '<path d="m9 4.4-5.4 2v13.2l5.4-2 6 2 5.4-2V4.4l-5.4 2-6-2Z"/><path d="M9 4.4v13.2M15 6.4v13.2"/>'),
    "map-pin": ("定位", '<path d="M12 21s-6.6-5.4-6.6-10.2a6.6 6.6 0 0 1 13.2 0C18.6 15.6 12 21 12 21Z"/><circle cx="12" cy="10.6" r="2.3"/>'),
    "navigation": ("导航", '<path d="m12 3 7.6 17-7.6-3.8L4.4 20 12 3Z"/>'),
    "compass": ("指南针", '<circle cx="12" cy="12" r="8.4"/><path d="m15.4 8.6-2 5-5 2 2-5 5-2Z"/>'),
    "globe": ("地球", '<circle cx="12" cy="12" r="8.4"/><path d="M3.6 12h16.8M12 3.6c2.5 2.3 3.8 5.1 3.8 8.4s-1.3 6.1-3.8 8.4c-2.5-2.3-3.8-5.1-3.8-8.4s1.3-6.1 3.8-8.4Z"/>'),
    "flag": ("旗帜", '<path d="M5.4 3.4v17.2"/><path d="M5.4 4.6c4-2 8 2 12 0v8c-4 2-8-2-12 0V4.6Z"/>'),
    "award": ("奖章", '<circle cx="12" cy="9" r="5.4"/><path d="m8.9 13.4-1.3 7.2L12 18l4.4 2.6-1.3-7.2"/>'),
    "activity": ("活动", '<path d="M3.4 12h3.8l2.4-6.8 4.4 13.6 2.4-6.8h4.6"/>'),
    "cast": ("投屏", '<path d="M3.6 6.8a1.8 1.8 0 0 1 1.8-1.8h13.2a1.8 1.8 0 0 1 1.8 1.8v10.4a1.8 1.8 0 0 1-1.8 1.8h-4.4"/><path d="M3.6 12.6a6.4 6.4 0 0 1 6.4 6.4M3.6 16.4a2.6 2.6 0 0 1 2.6 2.6M3.7 19.3h.01"/>'),
    "toggle-left": ("左开关", '<rect x="2.6" y="7" width="18.8" height="10" rx="5"/><circle cx="7.6" cy="12" r="2.6" fill="currentColor" stroke="none"/>'),
    "toggle-right": ("右开关", '<rect x="2.6" y="7" width="18.8" height="10" rx="5"/><circle cx="16.4" cy="12" r="2.6" fill="currentColor" stroke="none"/>'),
    "power": ("电源", '<path d="M12 3.6v8"/><path d="M6.8 6.8a7.4 7.4 0 1 0 10.4 0"/>'),
    "log-in": ("登录", '<path d="M14.4 3.6h3.2a2 2 0 0 1 2 2v12.8a2 2 0 0 1-2 2h-3.2"/><path d="m9.6 8.4 3.6 3.6-3.6 3.6M13.2 12H3.6"/>'),
    "log-out": ("登出", '<path d="M9.6 3.6H6.4a2 2 0 0 0-2 2v12.8a2 2 0 0 0 2 2h3.2"/><path d="m15.6 8.4 3.6 3.6-3.6 3.6M19.2 12H9.6"/>'),
    "key": ("钥匙", '<circle cx="8" cy="14.8" r="4.2"/><path d="m11 11.8 8.4-8.4M15.4 7.4l2.8 2.8M13 9.8l2 2"/>'),
    "shield": ("盾牌", '<path d="M12 2.8 20 6v6.4c0 4.8-3.4 8.1-8 9.6-4.6-1.5-8-4.8-8-9.6V6l8-3.2Z"/>'),
    "shield-off": ("盾牌失效", '<path d="M12 2.8 20 6v6.4c0 1.6-.4 3-1.1 4.3M16.6 20c-1.3 1-2.9 1.7-4.6 2-4.6-1.5-8-4.8-8-9.6V6l3.2-1.3M4 4l16 16"/>'),
    "tool": ("扳手", '<path d="M14.8 6.2a4.4 4.4 0 0 0-6 5.6L3.6 17a2 2 0 0 0 2.8 2.8l5.2-5.2a4.4 4.4 0 0 0 5.6-6l-3 3-2.8-.6-.6-2.8 3-3Z"/>'),
    "package": ("包裹", '<path d="m12 2.8 8 4v9.6l-8 4-8-4V6.8l8-4Z"/><path d="m4 6.8 8 4 8-4M12 10.8v9.6"/>'),
    "truck": ("卡车", '<path d="M2.6 6.4h11v10.4H2.6V6.4Z"/><path d="M13.6 10h4l3 3.4v3.4h-7V10Z"/><circle cx="6.6" cy="17.4" r="1.8"/><circle cx="16.6" cy="17.4" r="1.8"/>'),
    "shopping-bag": ("购物袋", '<path d="M5.6 8h12.8l-1 11.2a1.7 1.7 0 0 1-1.7 1.6H8.3a1.7 1.7 0 0 1-1.7-1.6L5.6 8Z"/><path d="M8.8 10V6.8a3.2 3.2 0 0 1 6.4 0V10"/>'),
    "tag": ("标签", '<path d="m12.6 3.6 7 7a1.8 1.8 0 0 1 0 2.5l-6.5 6.5a1.8 1.8 0 0 1-2.5 0l-7-7V5.4a1.8 1.8 0 0 1 1.8-1.8h7.2Z"/><circle cx="8.4" cy="8.4" r="1.4"/>'),
    "gift": ("礼物", '<rect x="4" y="8" width="16" height="4" rx="1"/><path d="M5.6 12v6.8a1.6 1.6 0 0 0 1.6 1.6h9.6a1.6 1.6 0 0 0 1.6-1.6V12M12 8v12.4M12 8s-4.6.4-4.6-2.2A2.2 2.2 0 0 1 12 5.4a2.2 2.2 0 0 1 4.6.4C16.6 8.4 12 8 12 8Z"/>'),
    "ticket": ("票券", '<path d="M3.6 8.4a1.8 1.8 0 0 1 1.8-1.8h13.2a1.8 1.8 0 0 1 1.8 1.8v2.2a1.8 1.8 0 0 0 0 3.6v2.2a1.8 1.8 0 0 1-1.8 1.8H5.4a1.8 1.8 0 0 1-1.8-1.8v-2.2a1.8 1.8 0 0 0 0-3.6V8.4Z"/><path d="M13.6 7v10" stroke-dasharray="2 2.4"/>'),
    "credit-card": ("信用卡", '<rect x="3.4" y="5.6" width="17.2" height="12.8" rx="2.2"/><path d="M3.4 10h17.2M6.8 14.6h4"/>'),
    "wallet": ("钱包", '<path d="M20.4 8.4V6.6a1.8 1.8 0 0 0-1.8-1.8H5.4a1.8 1.8 0 0 0-1.8 1.8v10.8a1.8 1.8 0 0 0 1.8 1.8h13.2a1.8 1.8 0 0 0 1.8-1.8v-1.8"/><path d="M20.4 8.4h-6a2.4 2.4 0 0 0 0 4.8h6V8.4Z"/>'),
    "coins": ("硬币", '<circle cx="9" cy="9" r="5.4"/><path d="M15.4 6.7a5.4 5.4 0 1 1-8.7 8.7"/>'),
    "trend-up": ("上涨", '<path d="m3.6 17 5.4-5.4 3.6 3.6 7.8-7.8"/><path d="M14.6 7.4h5.8v5.8"/>'),
    "trend-down": ("下跌", '<path d="m3.6 7 5.4 5.4 3.6-3.6 7.8 7.8"/><path d="M14.6 16.6h5.8v-5.8"/>'),
    "zap": ("闪电", '<path d="M13 2.8 5.2 13.4h5.4L10 21.2l8.2-10.6h-5.4L13 2.8Z"/>'),
    "thumbs-up": ("点赞", '<path d="M7.4 10.6v9.8H4.6a1 1 0 0 1-1-1v-7.8a1 1 0 0 1 1-1h2.8Z"/><path d="M7.4 10.6 12 3.4a2.4 2.4 0 0 1 2.4 2.4v3.6h5a1.8 1.8 0 0 1 1.8 2.1l-1.1 6.6a1.8 1.8 0 0 1-1.8 1.5H7.4V10.6Z"/>'),
}

assert len(ICONS) == 100, len(ICONS)
VARIANTS = [
    ("line", "线性", "经典 1.7 描边线性风格"),
    ("bold", "加粗", "2.5 粗描边，小尺寸依旧清晰"),
    ("fill", "填充", "加厚填充的实心观感"),
    ("duo", "双色", "柔光底 + 线条的层次风格"),
    ("dot", "圆点", "圆点沿轮廓排布的轻快风格"),
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


def build_svg(paths: str, variant: str) -> str:
    if variant == "line":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" '
                'aria-hidden="true">' + paths + "</svg>")
    if variant == "bold":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" '
                'aria-hidden="true">' + paths + "</svg>")
    if variant == "fill":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" '
                'stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" '
                'aria-hidden="true">' + paths + "</svg>")
    if variant == "duo":
        return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
                'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
                + f'<g stroke-width="5.5" stroke-opacity="0.16">{paths}</g>'
                + '<g stroke-width="1.7">' + paths + "</g></svg>")
    # dot
    return ('<svg class="ic-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" '
            'stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" '
            'stroke-dasharray="0.1 3.4" aria-hidden="true">' + paths + "</svg>")


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
  version: "1.0.0",
  createdAt: "2026-09-08",
  updatedAt: "2026-09-08",
  dir: "icons/line-icons/{slug}",
}};
'''


count = 0
slugs = []
for base, (zh, paths) in ICONS.items():
    for vslug, vname, vdesc in VARIANTS:
        slug = f"icon-{base}-{vslug}"
        d = f"{BASE}/line-icons/{slug}/files"
        os.makedirs(d, exist_ok=True)
        svg = build_svg(paths, vslug)
        open(f"{d}/index.html", "w", encoding="utf-8").write(
            HTML_TPL.format(svg=svg, name=f"{zh} · {vname}"))
        shutil.copyfile(f"{REF}/styles.css", f"{d}/styles.css")
        shutil.copyfile(f"{REF}/script.js", f"{d}/script.js")
        name = f"{zh}图标 · {vname}"
        desc = f"{zh}图标的{vname}风格版本：{vdesc}，24px 网格绘制。"
        tags = [zh, vname, "线性", "图标", "常用"]
        open(f"{BASE}/line-icons/{slug}/metadata.ts", "w", encoding="utf-8").write(
            meta_ts(slug, name, desc, vname, tags))
        slugs.append(slug)
        count += 1

print(f"generated {count} icon variants for {len(ICONS)} base icons")
print("first/last:", slugs[0], slugs[-1])
