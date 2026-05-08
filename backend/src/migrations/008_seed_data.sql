-- 打卡类型种子数据
INSERT OR IGNORE INTO checkin_types (id, name, icon, points) VALUES
  (1,  '完成作业', '📚', 10),
  (2,  '运动锻炼', '🏃', 15),
  (3,  '整理房间', '🏠', 10),
  (4,  '阅读20分钟', '📖', 10),
  (5,  '练习乐器', '🎵', 15),
  (6,  '刷牙漱口', '🦷', 5),
  (7,  '早睡早起', '🌙', 10),
  (8,  '多喝水', '💧', 5),
  (9,  '帮助家人', '❤️', 15),
  (10, '预习功课', '✏️', 10);

-- 宠物学校课程
INSERT OR IGNORE INTO courses (id, name, icon, price, description, animation_key) VALUES
  (1, '唱歌', '🎤', 50,  '让宠物学会唱歌，表演时会唱出动听的歌曲', 'anim-sing'),
  (2, '跳舞', '💃', 60,  '让宠物学会跳舞，会跳各种风格的舞蹈', 'anim-dance'),
  (3, '讲笑话', '😄', 40, '让宠物学会讲笑话，总能逗你开心', 'anim-joke'),
  (4, '弹钢琴', '🎹', 80, '让宠物成为钢琴家，演奏优美的旋律', 'anim-piano'),
  (5, '弹吉他', '🎸', 80, '让宠物成为吉他手，弹出酷炫的旋律', 'anim-guitar'),
  (6, '画画', '🎨', 60,  '让宠物学会绘画，创作美丽的画作', 'anim-paint'),
  (7, '陪聊', '💬', 30,  '让宠物成为最好的倾听者和聊天伙伴', 'anim-chat');

-- 商店物品 - 帽子（头顶位置：头部 cy≈100 上方，cx=200）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (1, '草莓帽', 'hat', 'hat', 30, '可爱的草莓形状帽子',
   '<g><ellipse cx="200" cy="112" rx="62" ry="20" fill="#FF6B6B" stroke="#D63031" stroke-width="2"/><ellipse cx="200" cy="108" rx="58" ry="16" fill="#FF6B6B"/><polygon points="178,110 200,72 222,110" fill="#55EFC4" stroke="#27AE60" stroke-width="1.5"/><circle cx="168" cy="98" r="5" fill="#FDCB6E" opacity="0.9"/><circle cx="230" cy="100" r="4" fill="#FDCB6E" opacity="0.9"/><circle cx="195" cy="76" r="4" fill="#FDCB6E" opacity="0.9"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxlbGxpcHNlIGN4PSI2MCIgY3k9IjM4IiByeD0iNTUiIHJ5PSIxOCIgZmlsbD0iI0ZGNkI2QiIvPjxwb2x5Z29uIHBvaW50cz0iNDQsMzYgNjAsMCA3NiwzNiIgZmlsbD0iIzU1RUZDNCI+PC9wb2x5Z29uPjwvc3ZnPg=='),
  (2, '魔法帽', 'hat', 'hat', 50, '神秘的魔法师帽子，带有星星装饰',
   '<g><polygon points="200,62 170,128 230,128" fill="#6C5CE7" stroke="#A29BFE" stroke-width="2"/><ellipse cx="200" cy="128" rx="48" ry="12" fill="#5A4BD1"/><circle cx="196" cy="92" r="6" fill="#FDCB6E"/><circle cx="208" cy="106" r="4" fill="#A29BFE"/><circle cx="190" cy="110" r="3" fill="#55EFC4"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgODAiPjxwb2x5Z29uIHBvaW50cz0iNjAsMCA0MCw3MCA4MCw3MCIgZmlsbD0iIzZDNUNFNyIvPjxlbGxpcHNlIGN4PSI2MCIgY3k9IjcwIiByeD0iNDIiIHJ5PSIxMCIgZmlsbD0iIzVBNEJEMSIvPjwvc3ZnPg=='),
  (3, '花环头圈', 'hat', 'hat', 25, '美丽的花朵编织头圈',
   '<g><ellipse cx="200" cy="108" rx="72" ry="13" fill="none" stroke="#FD79A8" stroke-width="3"/><circle cx="148" cy="108" r="10" fill="#FF7675"/><circle cx="168" cy="100" r="8" fill="#FDCB6E"/><circle cx="200" cy="97" r="10" fill="#A29BFE"/><circle cx="232" cy="100" r="8" fill="#55EFC4"/><circle cx="252" cy="108" r="10" fill="#FD79A8"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDAgMzAiPjxlbGxpcHNlIGN4PSI3MCIgY3k9IjE1IiByeD0iNjUiIHJ5PSIxMiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkQ3OUE4IiBzdHJva2Utd2lkdGg9IjMiLz48L3N2Zz4=');

-- 商店物品 - 眼镜（眼部位置：cy≈185，眼睛间距约 174~226）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (4, '彩虹眼镜', 'glasses', 'glasses', 35, '五彩缤纷的时尚眼镜',
   '<g><circle cx="174" cy="185" r="20" fill="none" stroke="#FF6B6B" stroke-width="3"/><circle cx="226" cy="185" r="20" fill="none" stroke="#74B9FF" stroke-width="3"/><line x1="154" y1="185" x2="136" y2="183" stroke="#636E72" stroke-width="2.5"/><line x1="194" y1="185" x2="206" y2="185" stroke="#636E72" stroke-width="2.5"/><line x1="246" y1="185" x2="264" y2="183" stroke="#636E72" stroke-width="2.5"/><circle cx="174" cy="185" r="12" fill="#FF6B6B" opacity="0.25"/><circle cx="226" cy="185" r="12" fill="#74B9FF" opacity="0.25"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDAgNTAiPjxjaXJjbGUgY3g9IjQwIiBjeT0iMjUiIHI9IjE4IiBmaWxsPSJub25lIiBzdHJva2U9IiNGRjZCNkIiIHN0cm9rZS13aWR0aD0iMyIvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjI1IiByPSIxOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNzRCOUZGIiBzdHJva2Utd2lkdGg9IjMiLz48bGluZSB4MT0iNTgiIHkxPSIyNSIgeDI9IjgyIiB5Mj0iMjUiIHN0cm9rZT0iIzYzNkU3MiIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+'),
  (5, '心形墨镜', 'glasses', 'glasses', 45, '可爱的心形粉色墨镜',
   '<g><path d="M174,196 C160,182 140,182 140,196 C140,210 174,224 174,224 C174,224 208,210 208,196 C208,182 188,182 174,196Z" fill="#FD79A8" opacity="0.75" stroke="#E84393" stroke-width="2"/><path d="M226,196 C212,182 192,182 192,196 C192,210 226,224 226,224 C226,224 260,210 260,196 C260,182 240,182 226,196Z" fill="#FD79A8" opacity="0.75" stroke="#E84393" stroke-width="2"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNDAgNzAiPjxwYXRoIGQ9Ik0zNSw0MCBDMjAsMjUgMCwyNSAwLDQwIEMwLDU1IDM1LDcwIDM1LDcwIEM0MCw1NSA3MCw1NSA3MCw0MCBDNzAsMjUgNTAsMjUgMzUsNDBaIiBmaWxsPSIjRkQ3OUE4IiBvcGFjaXR5PSIwLjciLz48L3N2Zz4=');

-- 商店物品 - 上衣（上身位置：cy≈318，rx≈64）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (6, '彩色条纹衫', 'clothes', 'top', 40, '活泼的彩色条纹T恤',
   '<g><path d="M140,278 L260,278 L278,314 L248,324 L248,368 L152,368 L152,324 L122,314 Z" fill="#A29BFE" stroke="#6C5CE7" stroke-width="2"/><line x1="152" y1="298" x2="248" y2="298" stroke="#FD79A8" stroke-width="4.5"/><line x1="152" y1="316" x2="248" y2="316" stroke="#FDCB6E" stroke-width="4.5"/><line x1="152" y1="334" x2="248" y2="334" stroke="#55EFC4" stroke-width="4.5"/><line x1="152" y1="352" x2="248" y2="352" stroke="#74B9FF" stroke-width="4.5"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAgMTAwIj48cGF0aCBkPSJNMjAsMCBMMTYwLDAgTDE4MCw0MCBMMTQwLDUwIEwxNDAsOTAgTDQwLDkwIEw0MCw1MCBMMC40MCBaIiBmaWxsPSIjQTI5QkZFIi8+PC9zdmc+'),
  (7, '公主裙', 'clothes', 'top', 60, '梦幻的粉色公主裙上衣',
   '<g><path d="M144,278 L256,278 L272,312 L244,322 L244,366 L156,366 L156,322 L128,312 Z" fill="#FD79A8" stroke="#E84393" stroke-width="2"/><path d="M162,322 Q200,308 238,322" fill="none" stroke="white" stroke-width="2.5"/><circle cx="200" cy="336" r="9" fill="#FDCB6E"/><path d="M156,366 Q200,392 244,366" fill="#FFC0D0" stroke="#FD79A8" stroke-width="2"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNzAgMTIwIj48cGF0aCBkPSJNMzAsMCBMMTQwLDAgTDE2MCwzNSBMMTMwLDQ1IEwxMzAsMTAwIEw0MCwxMDAgTDQwLDQ1IEwxMCwzNSBaIiBmaWxsPSIjRkQ3OUE4Ii8+PC9zdmc+');

-- 商店物品 - 裤子（下身位置：cy≈378，rx≈54）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (8, '牛仔裤', 'pants', 'bottom', 35, '经典蓝色牛仔裤',
   '<g><path d="M152,346 L248,346 L268,418 L216,418 L200,374 L184,418 L132,418 L152,346 Z" fill="#74B9FF" stroke="#0984E3" stroke-width="2"/><line x1="200" y1="346" x2="200" y2="374" stroke="#0984E3" stroke-width="2"/><rect x="156" y="352" width="32" height="22" rx="3" fill="#5BA3F5" stroke="#0984E3" stroke-width="1.5"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxODAgMTMwIj48cGF0aCBkPSJNMjAsMCBMMTQwLDAgTDE2MCwxMjAgTDEwMCwxMjAgTDkwLDcwIEw4MCwxMjAgTDIwLDEyMCBMNDAsMCBaIiBmaWxsPSIjNzRCOUZGIi8+PC9zdmc+');

-- 商店物品 - 鞋子（脚部位置：左脚 cx≈162 cy≈437，右脚 cx≈238 cy≈437）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (9, '彩虹运动鞋', 'shoes', 'shoes', 45, '色彩鲜艳的运动鞋',
   '<g><ellipse cx="162" cy="438" rx="28" ry="15" fill="#FF7675" stroke="#D63031" stroke-width="2"/><rect x="138" y="426" width="48" height="12" rx="6" fill="#FDCB6E"/><ellipse cx="238" cy="438" rx="28" ry="15" fill="#74B9FF" stroke="#0984E3" stroke-width="2"/><rect x="214" y="426" width="48" height="12" rx="6" fill="#A29BFE"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgNTAiPjxlbGxpcHNlIGN4PSI1NSIgY3k9IjMwIiByeD0iNDUiIHJ5PSIxOCIgZmlsbD0iI0ZGNzY3NSIvPjxlbGxpcHNlIGN4PSIxOTUiIGN5PSIzMCIgcng9IjQ1IiByeT0iMTgiIGZpbGw9IiM3NEI5RkYiLz48L3N2Zz4=');

-- 商店物品 - 饰品（脖子位置：cy≈258，cx=200）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (10, '星星项链', 'jewelry', 'jewelry', 25, '闪亮的星星形状项链',
   '<g><path d="M200,246 L204,257 L216,257 L207,264 L210,276 L200,269 L190,276 L193,264 L184,257 L196,257 Z" fill="#FDCB6E" stroke="#E17055" stroke-width="1.5"/><path d="M136,258 Q168,252 184,257" stroke="#E17055" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M216,257 Q232,252 264,258" stroke="#E17055" stroke-width="2.2" fill="none" stroke-linecap="round"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNjAiPjxwYXRoIGQ9Ik02MCw1IEw2NSwyMCBMODAsMjAgTDY4LDMwIEw3Myw0NSBMNjAsMzUgTDQ3LDQ1IEw1MiwzMCBMNDAsMjAgTDU1LDIwIFoiIGZpbGw9IiNGRENBNkUiLz48L3N2Zz4=');

-- 商店物品 - 家具
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (11, '彩虹书桌', 'furniture', NULL, 80, '五彩缤纷的可爱书桌',
   NULL,
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgODAiPjxyZWN0IHg9IjEwIiB5PSIyMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxNSIgZmlsbD0iI0E0OUJGRSIgcng9IjMiLz48cmVjdCB4PSIyMCIgeT0iMzUiIHdpZHRoPSIxMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI0ZEQ0I2RSIvPjxyZWN0IHg9IjkwIiB5PSIzNSIgd2lkdGg9IjEwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjRkRDQjZFIi8+PC9zdmc+'),
  (12, '粉色小床', 'furniture', NULL, 120, '梦幻的粉色可爱小床',
   NULL,
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTAwIj48cmVjdCB4PSIxMCIgeT0iNTAiIHdpZHRoPSIxNDAiIGhlaWdodD0iMzAiIGZpbGw9IiNGRDc5QTgiIHJ4PSI1Ii8+PHJlY3QgeD0iMTAiIHk9IjMwIiB3aWR0aD0iNDAiIGhlaWdodD0iMjUiIGZpbGw9IiNGRkMwQ0IiIHJ4PSI1Ii8+PHJlY3QgeD0iMTAiIHk9IjgwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIGZpbGw9IiNFODQzOTMiLz48cmVjdCB4PSIxMzAiIHk9IjgwIiB3aWR0aD0iMjAiIGhlaWdodD0iMTUiIGZpbGw9IiNFODQzOTMiLz48L3N2Zz4='),
  (13, '星星地毯', 'furniture', NULL, 60, '铺满星星的温馨地毯',
   NULL,
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNjAgMTAwIj48ZWxsaXBzZSBjeD0iODAiIGN5PSI1MCIgcng9IjcwIiByeT0iNDUiIGZpbGw9IiM2QzVDRTciIG9wYWNpdHk9IjAuOCIvPjx0ZXh0IHg9IjgwIiB5PSI1NSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1zaXplPSIzMCI+4piFPC90ZXh0Pjwvc3ZnPg=='),
  (14, '可爱书架', 'furniture', NULL, 90, '放满书本的彩色书架',
   NULL,
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTIwIj48cmVjdCB4PSI1IiB5PSI1IiB3aWR0aD0iOTAiIGhlaWdodD0iMTEwIiBmaWxsPSJub25lIiBzdHJva2U9IiM4RDZFNjMiIHN0cm9rZS13aWR0aD0iMyIvPjxsaW5lIHgxPSI1IiB5MT0iNDUiIHgyPSI5NSIgeTI9IjQ1IiBzdHJva2U9IiM4RDZFNjMiIHN0cm9rZS13aWR0aD0iMiIvPjxsaW5lIHgxPSI1IiB5MT0iODAiIHgyPSI5NSIgeTI9IjgwIiBzdHJva2U9IiM4RDZFNjMiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg=='),
  (15, '彩色台灯', 'furniture', NULL, 50, '可爱的彩色小台灯',
   NULL,
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MCAxMDAiPjxwb2x5Z29uIHBvaW50cz0iMTAsMjAgNzAsMjAgNTAsNTAgMzAsNTAiIGZpbGw9IiNGRENCNkUiLz48bGluZSB4MT0iNDAiIHkxPSI1MCIgeDI9IjQwIiB5Mj0iOTAiIHN0cm9rZT0iIzYzNkU3MiIgc3Ryb2tlLXdpZHRoPSIzIi8+PGVsbGlwc2UgY3g9IjQwIiBjeT0iOTUiIHJ4PSIyMCIgcnk9IjUiIGZpbGw9IiM4RDZFNWM2Ii8+PC9zdmc+');

-- 商店物品 - 包包（背部位置：右侧 cx≈272, cy≈318）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (16, '彩虹小背包', 'bag', 'bag', 40, '五彩缤纷的可爱小背包',
   '<g><rect x="258" y="288" width="52" height="64" rx="10" fill="#A29BFE" stroke="#6C5CE7" stroke-width="2"/><rect x="270" y="282" width="28" height="12" rx="6" fill="#6C5CE7"/><circle cx="284" cy="322" r="6" fill="#FDCB6E"/><line x1="278" y1="322" x2="290" y2="322" stroke="#E17055" stroke-width="2"/><line x1="268" y1="300" x2="268" y2="344" stroke="#6C5CE7" stroke-width="1.5" opacity="0.5"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MCA4MCI+PHJlY3QgeD0iNSIgeT0iMTUiIHdpZHRoPSI1MCIgaGVpZ2h0PSI2MCIgcng9IjEwIiBmaWxsPSIjQTI5QkZFIi8+PC9zdmc+');

-- 商店物品 - 鲜花（头部右侧装饰：cx≈270, cy≈150）
INSERT OR IGNORE INTO shop_items (id, name, category, slot, price, description, svg_data, thumbnail) VALUES
  (17, '玫瑰花束', 'flower', 'flower', 20, '浪漫的红色玫瑰花束',
   '<g><line x1="268" y1="188" x2="268" y2="142" stroke="#55EFC4" stroke-width="3"/><circle cx="268" cy="130" r="16" fill="#FF7675"/><circle cx="256" cy="140" r="13" fill="#D63031"/><circle cx="280" cy="140" r="13" fill="#FF6B6B"/><circle cx="268" cy="128" r="6" fill="#FDCB6E" opacity="0.7"/></g>',
   'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MCA4MCI+PGxpbmUgeDE9IjI1IiB5MT0iODAiIHgyPSIyNSIgeTI9IjMwIiBzdHJva2U9IiM1NUVGQzQiIHN0cm9rZS13aWR0aD0iMyIvPjxjaXJjbGUgY3g9IjI1IiBjeT0iMjAiIHI9IjE1IiBmaWxsPSIjRkY3Njc1Ii8+PC9zdmc+');

-- 管理员账号 (密码: admin123)
INSERT OR IGNORE INTO users (id, username, password, role, points) VALUES
  (1, 'admin', '$2a$10$EnUtGoxaK9JhxQDqX2trYOzlqPIP0Yszc3ln6w7EmC4hn2DH0O7CW', 'admin', 9999);
