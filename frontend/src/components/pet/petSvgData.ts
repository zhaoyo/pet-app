import type { PetType } from '../../types/pet';

/**
 * Q版宠物SVG — 大头小身比例（类动森风格）
 * viewBox: 0 0 400 500
 *
 * 固定分层结构（渲染顺序从下到上）：
 *   body-tail  — 尾巴
 *   body-feet  — 脚/腿
 *   body-lower — 下身（腰~膝）
 *   body-upper — 上身（躯干）
 *   body-neck  — 脖子
 *   body-head  — 头部（含耳朵）
 *   body-face  — 脸部细节（眼/鼻/嘴/腮红）
 *
 * 装备slot覆盖位置：
 *   hat      → body-head之上
 *   glasses  → body-face之上（眼区）
 *   jewelry  → body-neck之上
 *   top      → body-upper之上
 *   bottom   → body-lower之上
 *   shoes    → body-feet之上
 *   bag      → body-upper右侧
 *
 * Q版比例基准：
 *   头部   cx=200 cy=188 rx=95 ry=88
 *   上身   cx=200 cy=318 rx=62 ry=52
 *   下身   cx=200 cy=378 rx=52 ry=38
 *   脖子   cx=200 cy=258 rx=26 ry=20
 *   腿/脚  cy=415~440
 */
export function getPetBaseSvg(type: PetType): string {
  const pets: Record<PetType, string> = {

    // ───────────────────── 小狗 ─────────────────────
    dog: `
      <g id="body-tail">
        <path d="M258,300 Q310,255 295,210 Q282,175 308,158"
              stroke="#E8A85A" stroke-width="18" fill="none" stroke-linecap="round"/>
        <path d="M258,302 Q309,258 295,214"
              stroke="#FDE8C0" stroke-width="7" fill="none" stroke-linecap="round"/>
      </g>
      <g id="body-feet">
        <!-- 左后腿 -->
        <ellipse cx="162" cy="415" rx="22" ry="30" fill="#E8A85A"/>
        <ellipse cx="162" cy="438" rx="24" ry="13" fill="#D4904A" rx="24"/>
        <!-- 右后腿 -->
        <ellipse cx="238" cy="415" rx="22" ry="30" fill="#E8A85A"/>
        <ellipse cx="238" cy="438" rx="24" ry="13" fill="#D4904A"/>
        <!-- 小爪趾 -->
        <circle cx="152" cy="444" r="5" fill="#C8804A"/>
        <circle cx="163" cy="447" r="5" fill="#C8804A"/>
        <circle cx="174" cy="444" r="5" fill="#C8804A"/>
        <circle cx="228" cy="444" r="5" fill="#C8804A"/>
        <circle cx="239" cy="447" r="5" fill="#C8804A"/>
        <circle cx="250" cy="444" r="5" fill="#C8804A"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="54" ry="40" fill="#F0B870"/>
        <ellipse cx="200" cy="374" rx="34" ry="26" fill="#FDE8C0"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="64" ry="54" fill="#F5C880"/>
        <ellipse cx="200" cy="315" rx="40" ry="34" fill="#FDE8C0"/>
        <!-- 前臂 -->
        <ellipse cx="148" cy="330" rx="18" ry="28" fill="#E8A85A" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="18" ry="28" fill="#E8A85A" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="352" rx="16" ry="11" fill="#D4904A" transform="rotate(-5,143,352)"/>
        <ellipse cx="257" cy="352" rx="16" ry="11" fill="#D4904A" transform="rotate(5,257,352)"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="28" ry="22" fill="#F0B870"/>
      </g>
      <g id="body-head">
        <!-- 耳朵 -->
        <ellipse cx="138" cy="148" rx="30" ry="40" fill="#D4904A" transform="rotate(-12,138,148)"/>
        <ellipse cx="138" cy="152" rx="18" ry="28" fill="#B87840" transform="rotate(-12,138,152)"/>
        <ellipse cx="262" cy="148" rx="30" ry="40" fill="#D4904A" transform="rotate(12,262,148)"/>
        <ellipse cx="262" cy="152" rx="18" ry="28" fill="#B87840" transform="rotate(12,262,152)"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="96" ry="90" fill="#F5C880"/>
      </g>
      <g id="body-face">
        <!-- 腮红 -->
        <ellipse cx="148" cy="208" rx="20" ry="13" fill="#FF9999" opacity="0.55"/>
        <ellipse cx="252" cy="208" rx="20" ry="13" fill="#FF9999" opacity="0.55"/>
        <!-- 眼白 -->
        <circle cx="174" cy="185" r="19" fill="white"/>
        <circle cx="226" cy="185" r="19" fill="white"/>
        <!-- 虹膜 -->
        <circle cx="176" cy="187" r="13" fill="#3A2A18"/>
        <circle cx="228" cy="187" r="13" fill="#3A2A18"/>
        <!-- 眼睛高光 -->
        <circle cx="171" cy="182" r="6" fill="#7BAAD0"/>
        <circle cx="223" cy="182" r="6" fill="#7BAAD0"/>
        <circle cx="169" cy="180" r="3" fill="white"/>
        <circle cx="221" cy="180" r="3" fill="white"/>
        <circle cx="180" cy="192" r="1.8" fill="white"/>
        <circle cx="232" cy="192" r="1.8" fill="white"/>
        <!-- 鼻子 -->
        <ellipse cx="200" cy="210" rx="14" ry="9" fill="#C07040"/>
        <ellipse cx="200" cy="208" rx="8" ry="5" fill="#8B4820"/>
        <ellipse cx="197" cy="207" r="2.5" fill="white" opacity="0.45"/>
        <!-- 嘴巴 -->
        <line x1="200" y1="219" x2="200" y2="225" stroke="#8B4820" stroke-width="2"/>
        <path d="M190,225 Q200,233 210,225" stroke="#8B4820" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <!-- 眉毛 -->
        <path d="M163,170 Q174,165 185,169" stroke="#C07840" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M215,169 Q226,165 237,170" stroke="#C07840" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小猫 ─────────────────────
    cat: `
      <g id="body-tail">
        <path d="M260,300 Q335,268 342,210 Q348,162 322,140"
              stroke="#BCC5C6" stroke-width="17" fill="none" stroke-linecap="round"/>
        <path d="M260,303 Q333,271 340,214"
              stroke="#E8ECEC" stroke-width="7" fill="none" stroke-linecap="round"/>
      </g>
      <g id="body-feet">
        <ellipse cx="162" cy="415" rx="21" ry="28" fill="#C8D2D2"/>
        <ellipse cx="238" cy="415" rx="21" ry="28" fill="#C8D2D2"/>
        <ellipse cx="162" cy="436" rx="23" ry="12" fill="#B0BCBC"/>
        <ellipse cx="238" cy="436" rx="23" ry="12" fill="#B0BCBC"/>
        <circle cx="152" cy="441" r="4.5" fill="#A0AAAA"/>
        <circle cx="163" cy="443" r="4.5" fill="#A0AAAA"/>
        <circle cx="174" cy="441" r="4.5" fill="#A0AAAA"/>
        <circle cx="228" cy="441" r="4.5" fill="#A0AAAA"/>
        <circle cx="239" cy="443" r="4.5" fill="#A0AAAA"/>
        <circle cx="250" cy="441" r="4.5" fill="#A0AAAA"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="52" ry="38" fill="#CDD6D6"/>
        <ellipse cx="200" cy="374" rx="33" ry="25" fill="#EFF2F2"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="62" ry="52" fill="#D5DBDB"/>
        <ellipse cx="200" cy="315" rx="38" ry="32" fill="#EFF2F2"/>
        <ellipse cx="148" cy="330" rx="17" ry="26" fill="#C0CACA" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="17" ry="26" fill="#C0CACA" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="350" rx="15" ry="10" fill="#A8B8B8" transform="rotate(-5,143,350)"/>
        <ellipse cx="257" cy="350" rx="15" ry="10" fill="#A8B8B8" transform="rotate(5,257,350)"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="27" ry="20" fill="#CDD6D6"/>
      </g>
      <g id="body-head">
        <!-- 三角耳 -->
        <polygon points="142,158 118,96 178,138" fill="#C0CACA"/>
        <polygon points="258,158 282,96 222,138" fill="#C0CACA"/>
        <polygon points="144,154 126,103 175,136" fill="#F4B8C8"/>
        <polygon points="256,154 274,103 225,136" fill="#F4B8C8"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="95" ry="88" fill="#D5DBDB"/>
      </g>
      <g id="body-face">
        <ellipse cx="148" cy="208" rx="19" ry="12" fill="#FFB0C8" opacity="0.5"/>
        <ellipse cx="252" cy="208" rx="19" ry="12" fill="#FFB0C8" opacity="0.5"/>
        <!-- 猫眼（竖瞳） -->
        <ellipse cx="174" cy="185" rx="18" ry="18" fill="white"/>
        <ellipse cx="226" cy="185" rx="18" ry="18" fill="white"/>
        <ellipse cx="174" cy="185" rx="13" ry="15" fill="#5BAD8A"/>
        <ellipse cx="226" cy="185" rx="13" ry="15" fill="#5BAD8A"/>
        <ellipse cx="174" cy="185" rx="6" ry="13" fill="#1A1A2E"/>
        <ellipse cx="226" cy="185" rx="6" ry="13" fill="#1A1A2E"/>
        <circle cx="169" cy="180" r="3" fill="white"/>
        <circle cx="221" cy="180" r="3" fill="white"/>
        <!-- 猫鼻 -->
        <path d="M195,210 L200,214 L205,210 Q200,205 195,210Z" fill="#E8A0B0"/>
        <!-- 嘴巴 -->
        <line x1="200" y1="214" x2="200" y2="221" stroke="#C07090" stroke-width="1.8"/>
        <path d="M191,221 Q200,229 209,221" stroke="#C07090" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <!-- 胡须 -->
        <line x1="145" y1="206" x2="182" y2="211" stroke="#999" stroke-width="1.5" opacity="0.7"/>
        <line x1="143" y1="214" x2="181" y2="215" stroke="#999" stroke-width="1.5" opacity="0.7"/>
        <line x1="218" y1="211" x2="255" y2="206" stroke="#999" stroke-width="1.5" opacity="0.7"/>
        <line x1="219" y1="215" x2="257" y2="214" stroke="#999" stroke-width="1.5" opacity="0.7"/>
        <path d="M163,170 Q174,165 185,169" stroke="#AABABA" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M215,169 Q226,165 237,170" stroke="#AABABA" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小狐狸 ─────────────────────
    fox: `
      <g id="body-tail">
        <path d="M262,300 Q340,258 348,192 Q355,140 330,115"
              stroke="#D4700E" stroke-width="22" fill="none" stroke-linecap="round"/>
        <path d="M262,304 Q338,263 346,197 Q352,148 330,122"
              stroke="#FDE8C0" stroke-width="9" fill="none" stroke-linecap="round"/>
        <ellipse cx="330" cy="110" rx="20" ry="26" fill="white"/>
      </g>
      <g id="body-feet">
        <ellipse cx="162" cy="415" rx="22" ry="29" fill="#C8600C"/>
        <ellipse cx="238" cy="415" rx="22" ry="29" fill="#C8600C"/>
        <ellipse cx="162" cy="437" rx="24" ry="12" fill="#A84E08"/>
        <ellipse cx="238" cy="437" rx="24" ry="12" fill="#A84E08"/>
        <circle cx="152" cy="443" r="5" fill="#904208"/>
        <circle cx="163" cy="445" r="5" fill="#904208"/>
        <circle cx="174" cy="443" r="5" fill="#904208"/>
        <circle cx="228" cy="443" r="5" fill="#904208"/>
        <circle cx="239" cy="445" r="5" fill="#904208"/>
        <circle cx="250" cy="443" r="5" fill="#904208"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="54" ry="40" fill="#E07820"/>
        <ellipse cx="200" cy="374" rx="34" ry="26" fill="#FDE8C0"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="64" ry="54" fill="#E67E22"/>
        <ellipse cx="200" cy="315" rx="40" ry="34" fill="#FDE8C0"/>
        <ellipse cx="148" cy="330" rx="18" ry="27" fill="#C86810" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="18" ry="27" fill="#C86810" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="351" rx="16" ry="11" fill="#A85408" transform="rotate(-5,143,351)"/>
        <ellipse cx="257" cy="351" rx="16" ry="11" fill="#A85408" transform="rotate(5,257,351)"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="28" ry="21" fill="#E07820"/>
      </g>
      <g id="body-head">
        <!-- 三角耳 -->
        <polygon points="140,155 116,88 178,132" fill="#D4700E"/>
        <polygon points="260,155 284,88 222,132" fill="#D4700E"/>
        <polygon points="142,151 124,96 175,130" fill="#F8C06A"/>
        <polygon points="258,151 276,96 225,130" fill="#F8C06A"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="96" ry="90" fill="#E67E22"/>
        <!-- 口鼻区浅色 -->
        <ellipse cx="200" cy="208" rx="52" ry="35" fill="#FDE8C0"/>
      </g>
      <g id="body-face">
        <ellipse cx="145" cy="210" rx="18" ry="12" fill="#FF9999" opacity="0.5"/>
        <ellipse cx="255" cy="210" rx="18" ry="12" fill="#FF9999" opacity="0.5"/>
        <circle cx="174" cy="183" r="19" fill="white"/>
        <circle cx="226" cy="183" r="19" fill="white"/>
        <circle cx="176" cy="185" r="13" fill="#2C3E50"/>
        <circle cx="228" cy="185" r="13" fill="#2C3E50"/>
        <circle cx="171" cy="180" r="6" fill="#7BAA50"/>
        <circle cx="223" cy="180" r="6" fill="#7BAA50"/>
        <circle cx="169" cy="178" r="3" fill="white"/>
        <circle cx="221" cy="178" r="3" fill="white"/>
        <!-- 鼻子 -->
        <ellipse cx="200" cy="207" rx="9" ry="6" fill="#2C3E50"/>
        <ellipse cx="198" cy="205" r="2.5" fill="white" opacity="0.45"/>
        <!-- 嘴巴 -->
        <line x1="200" y1="213" x2="200" y2="220" stroke="#8B4500" stroke-width="2"/>
        <path d="M191,220 Q200,228 209,220" stroke="#8B4500" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M162,170 Q174,165 186,169" stroke="#B85808" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M214,169 Q226,165 238,170" stroke="#B85808" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小乌龟 ─────────────────────
    turtle: `
      <g id="body-tail">
        <path d="M268,345 Q308,332 314,312" stroke="#2ECC71" stroke-width="13" fill="none" stroke-linecap="round"/>
      </g>
      <g id="body-feet">
        <!-- 四只短腿 -->
        <ellipse cx="150" cy="402" rx="26" ry="18" fill="#2ECC71" transform="rotate(-25,150,402)"/>
        <ellipse cx="250" cy="402" rx="26" ry="18" fill="#2ECC71" transform="rotate(25,250,402)"/>
        <ellipse cx="158" cy="438" rx="26" ry="18" fill="#2ECC71" transform="rotate(15,158,438)"/>
        <ellipse cx="242" cy="438" rx="26" ry="18" fill="#2ECC71" transform="rotate(-15,242,438)"/>
        <!-- 趾 -->
        <circle cx="135" cy="406" r="5" fill="#27AE60"/>
        <circle cx="145" cy="412" r="5" fill="#27AE60"/>
        <circle cx="265" cy="406" r="5" fill="#27AE60"/>
        <circle cx="255" cy="412" r="5" fill="#27AE60"/>
      </g>
      <g id="body-lower">
        <!-- 龟壳下半 -->
        <ellipse cx="200" cy="370" rx="70" ry="45" fill="#27AE60"/>
        <ellipse cx="200" cy="370" rx="55" ry="35" fill="#2ECC71"/>
      </g>
      <g id="body-upper">
        <!-- 龟壳上半（拱形） -->
        <ellipse cx="200" cy="318" rx="75" ry="62" fill="#27AE60"/>
        <ellipse cx="200" cy="315" rx="60" ry="50" fill="#2ECC71"/>
        <!-- 龟壳纹路 -->
        <path d="M200,268 Q238,278 252,310 Q245,346 200,352 Q155,346 148,310 Q162,278 200,268Z"
              fill="#27AE60" opacity="0.45"/>
        <path d="M152,298 Q176,286 200,284 Q224,286 248,298" stroke="#27AE60" stroke-width="2.5" fill="none"/>
        <path d="M148,328 Q174,318 200,316 Q226,318 252,328" stroke="#27AE60" stroke-width="2.5" fill="none"/>
        <line x1="176" y1="276" x2="172" y2="358" stroke="#27AE60" stroke-width="2.5"/>
        <line x1="200" y1="272" x2="200" y2="360" stroke="#27AE60" stroke-width="2.5"/>
        <line x1="224" y1="276" x2="228" y2="358" stroke="#27AE60" stroke-width="2.5"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="26" ry="20" fill="#2ECC71"/>
      </g>
      <g id="body-head">
        <ellipse cx="200" cy="188" rx="88" ry="82" fill="#2ECC71"/>
        <ellipse cx="182" cy="170" rx="30" ry="20" fill="#48D68A" opacity="0.38"/>
      </g>
      <g id="body-face">
        <ellipse cx="150" cy="208" rx="18" ry="11" fill="#AAFFCC" opacity="0.55"/>
        <ellipse cx="250" cy="208" rx="18" ry="11" fill="#AAFFCC" opacity="0.55"/>
        <circle cx="174" cy="186" r="18" fill="white"/>
        <circle cx="226" cy="186" r="18" fill="white"/>
        <circle cx="176" cy="188" r="12" fill="#2C3E50"/>
        <circle cx="228" cy="188" r="12" fill="#2C3E50"/>
        <circle cx="171" cy="183" r="5.5" fill="#4A90D9"/>
        <circle cx="223" cy="183" r="5.5" fill="#4A90D9"/>
        <circle cx="169" cy="181" r="3" fill="white"/>
        <circle cx="221" cy="181" r="3" fill="white"/>
        <path d="M184,212 Q200,222 216,212" stroke="#1A8A45" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M163,171 Q174,166 185,170" stroke="#1A8A45" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M215,170 Q226,166 237,171" stroke="#1A8A45" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小兔子 ─────────────────────
    rabbit: `
      <g id="body-tail">
        <circle cx="108" cy="350" r="20" fill="white"/>
        <circle cx="108" cy="350" r="13" fill="#F0F0F0"/>
      </g>
      <g id="body-feet">
        <ellipse cx="162" cy="415" rx="22" ry="29" fill="#EBEBEB"/>
        <ellipse cx="238" cy="415" rx="22" ry="29" fill="#EBEBEB"/>
        <ellipse cx="162" cy="437" rx="24" ry="12" fill="#D5D5D5"/>
        <ellipse cx="238" cy="437" rx="24" ry="12" fill="#D5D5D5"/>
        <circle cx="152" cy="442" r="4.5" fill="#C8C8C8"/>
        <circle cx="163" cy="445" r="4.5" fill="#C8C8C8"/>
        <circle cx="174" cy="442" r="4.5" fill="#C8C8C8"/>
        <circle cx="228" cy="442" r="4.5" fill="#C8C8C8"/>
        <circle cx="239" cy="445" r="4.5" fill="#C8C8C8"/>
        <circle cx="250" cy="442" r="4.5" fill="#C8C8C8"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="54" ry="40" fill="#F0F0F0"/>
        <ellipse cx="200" cy="374" rx="34" ry="26" fill="white"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="64" ry="54" fill="#F5F5F5"/>
        <ellipse cx="200" cy="315" rx="40" ry="34" fill="white"/>
        <ellipse cx="148" cy="330" rx="18" ry="27" fill="#E8E8E8" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="18" ry="27" fill="#E8E8E8" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="351" rx="16" ry="11" fill="#D0D0D0" transform="rotate(-5,143,351)"/>
        <ellipse cx="257" cy="351" rx="16" ry="11" fill="#D0D0D0" transform="rotate(5,257,351)"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="27" ry="20" fill="#F0F0F0"/>
      </g>
      <g id="body-head">
        <!-- 长耳朵 -->
        <ellipse cx="163" cy="112" rx="23" ry="65" fill="#F0F0F0" transform="rotate(-6,163,112)"/>
        <ellipse cx="237" cy="112" rx="23" ry="65" fill="#F0F0F0" transform="rotate(6,237,112)"/>
        <ellipse cx="163" cy="110" rx="13" ry="53" fill="#FFB6C8" transform="rotate(-6,163,110)"/>
        <ellipse cx="237" cy="110" rx="13" ry="53" fill="#FFB6C8" transform="rotate(6,237,110)"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="95" ry="88" fill="#F5F5F5"/>
      </g>
      <g id="body-face">
        <ellipse cx="148" cy="208" rx="20" ry="13" fill="#FFB0C0" opacity="0.55"/>
        <ellipse cx="252" cy="208" rx="20" ry="13" fill="#FFB0C0" opacity="0.55"/>
        <circle cx="174" cy="184" r="19" fill="white"/>
        <circle cx="226" cy="184" r="19" fill="white"/>
        <circle cx="176" cy="186" r="13" fill="#2C3E50"/>
        <circle cx="228" cy="186" r="13" fill="#2C3E50"/>
        <circle cx="171" cy="181" r="6" fill="#C080D0"/>
        <circle cx="223" cy="181" r="6" fill="#C080D0"/>
        <circle cx="169" cy="179" r="3" fill="white"/>
        <circle cx="221" cy="179" r="3" fill="white"/>
        <circle cx="180" cy="191" r="1.8" fill="white"/>
        <circle cx="232" cy="191" r="1.8" fill="white"/>
        <!-- 兔鼻 -->
        <path d="M195,210 L200,214 L205,210 Q200,205 195,210Z" fill="#FF8FA3"/>
        <line x1="200" y1="214" x2="200" y2="221" stroke="#E05070" stroke-width="1.8"/>
        <path d="M191,221 Q200,229 209,221" stroke="#E05070" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <path d="M163,169 Q174,164 185,168" stroke="#C0C0C8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M215,168 Q226,164 237,169" stroke="#C0C0C8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小鸟 ─────────────────────
    bird: `
      <g id="body-tail">
        <path d="M200,430 Q174,462 158,478" stroke="#2980B9" stroke-width="14" fill="none" stroke-linecap="round"/>
        <path d="M200,430 Q200,464 196,482" stroke="#3498DB" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M200,430 Q226,462 242,478" stroke="#2980B9" stroke-width="14" fill="none" stroke-linecap="round"/>
      </g>
      <g id="body-feet">
        <!-- 鸟爪 -->
        <line x1="170" y1="428" x2="170" y2="445" stroke="#F39C12" stroke-width="5" stroke-linecap="round"/>
        <line x1="158" y1="445" x2="170" y2="445" stroke="#F39C12" stroke-width="4" stroke-linecap="round"/>
        <line x1="170" y1="445" x2="170" y2="458" stroke="#F39C12" stroke-width="4" stroke-linecap="round"/>
        <line x1="170" y1="445" x2="182" y2="452" stroke="#F39C12" stroke-width="4" stroke-linecap="round"/>
        <line x1="230" y1="428" x2="230" y2="445" stroke="#F39C12" stroke-width="5" stroke-linecap="round"/>
        <line x1="218" y1="445" x2="230" y2="445" stroke="#F39C12" stroke-width="4" stroke-linecap="round"/>
        <line x1="230" y1="445" x2="230" y2="458" stroke="#F39C12" stroke-width="4" stroke-linecap="round"/>
        <line x1="230" y1="445" x2="242" y2="452" stroke="#F39C12" stroke-width="4" stroke-linecap="round"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="400" rx="48" ry="32" fill="#3498DB"/>
        <ellipse cx="200" cy="396" rx="30" ry="22" fill="#7FC8EE"/>
      </g>
      <g id="body-upper">
        <!-- 翅膀 -->
        <ellipse cx="140" cy="325" rx="52" ry="26" fill="#2980B9" transform="rotate(-18,140,325)"/>
        <ellipse cx="260" cy="325" rx="52" ry="26" fill="#2980B9" transform="rotate(18,260,325)"/>
        <ellipse cx="132" cy="322" rx="38" ry="17" fill="#5DADE2" transform="rotate(-18,132,322)"/>
        <ellipse cx="268" cy="322" rx="38" ry="17" fill="#5DADE2" transform="rotate(18,268,322)"/>
        <!-- 躯干 -->
        <ellipse cx="200" cy="318" rx="58" ry="50" fill="#3498DB"/>
        <ellipse cx="200" cy="314" rx="36" ry="32" fill="#7FC8EE"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="26" ry="20" fill="#3498DB"/>
      </g>
      <g id="body-head">
        <!-- 头冠羽毛 -->
        <ellipse cx="198" cy="136" rx="10" ry="22" fill="#2980B9" transform="rotate(-6,198,136)"/>
        <ellipse cx="212" cy="140" rx="8" ry="17" fill="#3498DB" transform="rotate(8,212,140)"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="92" ry="86" fill="#3498DB"/>
        <ellipse cx="184" cy="168" rx="30" ry="20" fill="#5DADE2" opacity="0.4"/>
      </g>
      <g id="body-face">
        <ellipse cx="148" cy="208" rx="18" ry="11" fill="#FFD0B0" opacity="0.5"/>
        <ellipse cx="252" cy="208" rx="18" ry="11" fill="#FFD0B0" opacity="0.5"/>
        <circle cx="173" cy="184" r="19" fill="white"/>
        <circle cx="227" cy="184" r="19" fill="white"/>
        <circle cx="175" cy="186" r="13" fill="#1A1A2E"/>
        <circle cx="229" cy="186" r="13" fill="#1A1A2E"/>
        <circle cx="170" cy="181" r="6" fill="#4A90D9"/>
        <circle cx="224" cy="181" r="6" fill="#4A90D9"/>
        <circle cx="168" cy="179" r="3" fill="white"/>
        <circle cx="222" cy="179" r="3" fill="white"/>
        <!-- 鸟嘴 -->
        <path d="M188,213 L200,226 L212,213 Q200,207 188,213Z" fill="#F39C12"/>
        <line x1="188" y1="220" x2="212" y2="220" stroke="#D08000" stroke-width="1.5"/>
        <path d="M162,169 Q174,164 186,168" stroke="#2070AA" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M214,168 Q226,164 238,169" stroke="#2070AA" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小海豚 ─────────────────────
    dolphin: `
      <g id="body-tail">
        <!-- 尾鳍 -->
        <path d="M200,440 Q168,466 146,476" stroke="#5DADE2" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M200,440 Q232,466 254,476" stroke="#5DADE2" stroke-width="16" fill="none" stroke-linecap="round"/>
        <path d="M146,476 Q168,483 200,470 Q232,483 254,476" stroke="#4A9EC4" stroke-width="3" fill="none"/>
      </g>
      <g id="body-feet">
        <!-- 无腿，用流线型底部代替 -->
        <ellipse cx="200" cy="435" rx="40" ry="15" fill="#4A9EC4"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="385" rx="58" ry="44" fill="#5DADE2"/>
        <ellipse cx="200" cy="380" rx="38" ry="30" fill="#AED6F1"/>
      </g>
      <g id="body-upper">
        <!-- 背鳍 -->
        <path d="M196,248 Q182,218 198,232 Q214,218 204,248Z" fill="#4A9EC4"/>
        <!-- 胸鳍 -->
        <ellipse cx="132" cy="335" rx="48" ry="22" fill="#4A9EC4" transform="rotate(-22,132,335)"/>
        <ellipse cx="268" cy="335" rx="48" ry="22" fill="#4A9EC4" transform="rotate(22,268,335)"/>
        <!-- 躯干 -->
        <ellipse cx="200" cy="318" rx="66" ry="56" fill="#5DADE2"/>
        <ellipse cx="200" cy="314" rx="42" ry="36" fill="#AED6F1"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="28" ry="20" fill="#5DADE2"/>
      </g>
      <g id="body-head">
        <ellipse cx="200" cy="188" rx="94" ry="88" fill="#5DADE2"/>
        <!-- 嘴吻 -->
        <ellipse cx="200" cy="214" rx="44" ry="25" fill="#7FC4E8"/>
        <ellipse cx="182" cy="170" rx="30" ry="20" fill="#85C8EE" opacity="0.38"/>
      </g>
      <g id="body-face">
        <ellipse cx="148" cy="210" rx="18" ry="11" fill="#B0E8FF" opacity="0.55"/>
        <ellipse cx="252" cy="210" rx="18" ry="11" fill="#B0E8FF" opacity="0.55"/>
        <circle cx="174" cy="184" r="18" fill="white"/>
        <circle cx="226" cy="184" r="18" fill="white"/>
        <circle cx="176" cy="186" r="12" fill="#1A3A5C"/>
        <circle cx="228" cy="186" r="12" fill="#1A3A5C"/>
        <circle cx="171" cy="181" r="5.5" fill="#4A80C0"/>
        <circle cx="223" cy="181" r="5.5" fill="#4A80C0"/>
        <circle cx="169" cy="179" r="3" fill="white"/>
        <circle cx="221" cy="179" r="3" fill="white"/>
        <!-- 海豚微笑 -->
        <path d="M164,228 Q200,242 236,228" stroke="#3A8AB8" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M162,169 Q174,164 186,168" stroke="#3A8AB8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M214,168 Q226,164 238,169" stroke="#3A8AB8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小老虎 ─────────────────────
    tiger: `
      <g id="body-tail">
        <path d="M264,298 Q340,256 350,190 Q358,144 335,120"
              stroke="#E67E22" stroke-width="20" fill="none" stroke-linecap="round"/>
        <path d="M264,302 Q338,260 348,195 Q355,150 335,128"
              stroke="#6B3A0A" stroke-width="7" fill="none" stroke-dasharray="18,13" opacity="0.7"/>
      </g>
      <g id="body-feet">
        <ellipse cx="162" cy="415" rx="23" ry="30" fill="#D06010"/>
        <ellipse cx="238" cy="415" rx="23" ry="30" fill="#D06010"/>
        <ellipse cx="162" cy="438" rx="25" ry="13" fill="#B04E08"/>
        <ellipse cx="238" cy="438" rx="25" ry="13" fill="#B04E08"/>
        <circle cx="151" cy="444" r="5" fill="#904008"/>
        <circle cx="163" cy="447" r="5" fill="#904008"/>
        <circle cx="175" cy="444" r="5" fill="#904008"/>
        <circle cx="225" cy="444" r="5" fill="#904008"/>
        <circle cx="237" cy="447" r="5" fill="#904008"/>
        <circle cx="249" cy="444" r="5" fill="#904008"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="55" ry="41" fill="#D4700E"/>
        <ellipse cx="200" cy="374" rx="35" ry="27" fill="#FAD7A0"/>
        <!-- 体侧条纹 -->
        <path d="M157,360 Q153,378 157,396" stroke="#6B3A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.6"/>
        <path d="M243,360 Q247,378 243,396" stroke="#6B3A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.6"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="66" ry="55" fill="#E67E22"/>
        <ellipse cx="200" cy="315" rx="42" ry="35" fill="#FAD7A0"/>
        <ellipse cx="148" cy="330" rx="19" ry="28" fill="#C86010" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="19" ry="28" fill="#C86010" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="352" rx="17" ry="12" fill="#A84E08" transform="rotate(-5,143,352)"/>
        <ellipse cx="257" cy="352" rx="17" ry="12" fill="#A84E08" transform="rotate(5,257,352)"/>
        <!-- 躯干条纹 -->
        <path d="M163,278 Q160,308 163,338" stroke="#6B3A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.6"/>
        <path d="M200,274 Q200,304 200,338" stroke="#6B3A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.6"/>
        <path d="M237,278 Q240,308 237,338" stroke="#6B3A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.6"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="28" ry="21" fill="#E07820"/>
      </g>
      <g id="body-head">
        <!-- 三角耳 -->
        <polygon points="138,156 114,90 176,134" fill="#E67E22"/>
        <polygon points="262,156 286,90 224,134" fill="#E67E22"/>
        <polygon points="140,152 122,98 173,132" fill="#F8C06A"/>
        <polygon points="260,152 278,98 227,132" fill="#F8C06A"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="97" ry="91" fill="#E67E22"/>
        <!-- 口鼻区 -->
        <ellipse cx="200" cy="210" rx="55" ry="37" fill="#FAD7A0"/>
        <!-- 头部条纹 -->
        <path d="M142,163 Q155,183 144,179" stroke="#6B3A0A" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M258,163 Q245,183 256,179" stroke="#6B3A0A" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.7"/>
        <path d="M170,144 L174,166" stroke="#6B3A0A" stroke-width="3" opacity="0.7"/>
        <path d="M200,140 L200,163" stroke="#6B3A0A" stroke-width="3" opacity="0.7"/>
        <path d="M230,144 L226,166" stroke="#6B3A0A" stroke-width="3" opacity="0.7"/>
      </g>
      <g id="body-face">
        <ellipse cx="147" cy="212" rx="19" ry="12" fill="#FFAAAA" opacity="0.5"/>
        <ellipse cx="253" cy="212" rx="19" ry="12" fill="#FFAAAA" opacity="0.5"/>
        <circle cx="174" cy="184" r="19" fill="white"/>
        <circle cx="226" cy="184" r="19" fill="white"/>
        <circle cx="176" cy="186" r="13" fill="#2C3E50"/>
        <circle cx="228" cy="186" r="13" fill="#2C3E50"/>
        <circle cx="171" cy="181" r="6" fill="#8FCA6A"/>
        <circle cx="223" cy="181" r="6" fill="#8FCA6A"/>
        <circle cx="169" cy="179" r="3" fill="white"/>
        <circle cx="221" cy="179" r="3" fill="white"/>
        <ellipse cx="200" cy="210" rx="10" ry="7" fill="#B05030"/>
        <ellipse cx="198" cy="208" r="3" fill="white" opacity="0.45"/>
        <line x1="200" y1="217" x2="200" y2="224" stroke="#784212" stroke-width="2"/>
        <path d="M190,224 Q200,232 210,224" stroke="#784212" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <line x1="147" y1="212" x2="182" y2="215" stroke="#aaa" stroke-width="1.5" opacity="0.7"/>
        <line x1="218" y1="215" x2="253" y2="212" stroke="#aaa" stroke-width="1.5" opacity="0.7"/>
        <path d="M163,169 Q174,164 185,168" stroke="#B85808" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M215,168 Q226,164 237,169" stroke="#B85808" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小狮子 ─────────────────────
    lion: `
      <g id="body-tail">
        <path d="M266,300 Q336,262 346,200 Q352,155 332,130"
              stroke="#D4AC0D" stroke-width="16" fill="none" stroke-linecap="round"/>
        <ellipse cx="332" cy="123" rx="20" ry="26" fill="#E67E22"/>
        <ellipse cx="332" cy="121" rx="12" ry="19" fill="#F39C12"/>
      </g>
      <g id="body-feet">
        <ellipse cx="162" cy="415" rx="23" ry="30" fill="#E8A860"/>
        <ellipse cx="238" cy="415" rx="23" ry="30" fill="#E8A860"/>
        <ellipse cx="162" cy="438" rx="25" ry="13" fill="#D09050"/>
        <ellipse cx="238" cy="438" rx="25" ry="13" fill="#D09050"/>
        <circle cx="151" cy="444" r="5" fill="#B07840"/>
        <circle cx="163" cy="447" r="5" fill="#B07840"/>
        <circle cx="175" cy="444" r="5" fill="#B07840"/>
        <circle cx="225" cy="444" r="5" fill="#B07840"/>
        <circle cx="237" cy="447" r="5" fill="#B07840"/>
        <circle cx="249" cy="444" r="5" fill="#B07840"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="55" ry="41" fill="#F0B27A"/>
        <ellipse cx="200" cy="374" rx="35" ry="27" fill="#FDEBD0"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="66" ry="56" fill="#F0B27A"/>
        <ellipse cx="200" cy="315" rx="42" ry="36" fill="#FDEBD0"/>
        <ellipse cx="148" cy="330" rx="19" ry="28" fill="#D49060" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="19" ry="28" fill="#D49060" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="352" rx="17" ry="12" fill="#C07848" transform="rotate(-5,143,352)"/>
        <ellipse cx="257" cy="352" rx="17" ry="12" fill="#C07848" transform="rotate(5,257,352)"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="28" ry="21" fill="#E8A870"/>
      </g>
      <g id="body-head">
        <!-- 鬃毛三层 -->
        <circle cx="200" cy="192" r="118" fill="#C68B2A" opacity="0.30"/>
        <circle cx="200" cy="192" r="106" fill="#D4A030" opacity="0.45"/>
        <circle cx="200" cy="192" r="96" fill="#E8B840" opacity="0.55"/>
        <!-- 耳朵（在鬃毛后面） -->
        <polygon points="140,158 118,96 178,136" fill="#F0B27A"/>
        <polygon points="260,158 282,96 222,136" fill="#F0B27A"/>
        <polygon points="142,154 126,104 175,134" fill="#F8C471"/>
        <polygon points="258,154 274,104 225,134" fill="#F8C471"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="192" rx="90" ry="84" fill="#F0B27A"/>
        <!-- 口鼻区 -->
        <ellipse cx="200" cy="213" rx="55" ry="36" fill="#FDEBD0"/>
      </g>
      <g id="body-face">
        <ellipse cx="148" cy="214" rx="19" ry="12" fill="#FFAAAA" opacity="0.5"/>
        <ellipse cx="252" cy="214" rx="19" ry="12" fill="#FFAAAA" opacity="0.5"/>
        <circle cx="174" cy="188" r="19" fill="white"/>
        <circle cx="226" cy="188" r="19" fill="white"/>
        <circle cx="176" cy="190" r="13" fill="#2C3E50"/>
        <circle cx="228" cy="190" r="13" fill="#2C3E50"/>
        <circle cx="171" cy="185" r="6" fill="#C8A030"/>
        <circle cx="223" cy="185" r="6" fill="#C8A030"/>
        <circle cx="169" cy="183" r="3" fill="white"/>
        <circle cx="221" cy="183" r="3" fill="white"/>
        <ellipse cx="200" cy="212" rx="12" ry="8" fill="#C07040"/>
        <ellipse cx="197" cy="210" r="3.5" fill="white" opacity="0.45"/>
        <line x1="200" y1="220" x2="200" y2="227" stroke="#A05030" stroke-width="2"/>
        <path d="M190,227 Q200,235 210,227" stroke="#A05030" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <circle cx="168" cy="214" r="2.5" fill="#C09060" opacity="0.6"/>
        <circle cx="160" cy="218" r="2.5" fill="#C09060" opacity="0.6"/>
        <circle cx="232" cy="214" r="2.5" fill="#C09060" opacity="0.6"/>
        <circle cx="240" cy="218" r="2.5" fill="#C09060" opacity="0.6"/>
        <path d="M163,173 Q174,168 185,172" stroke="#B08030" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M215,172 Q226,168 237,173" stroke="#B08030" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>`,

    // ───────────────────── 小熊猫 ─────────────────────
    red_panda: `
      <g id="body-tail">
        <path d="M265,296 Q345,258 358,195 Q366,150 342,124"
              stroke="#C0392B" stroke-width="22" fill="none" stroke-linecap="round"/>
        <path d="M265,300 Q343,262 356,200 Q363,155 342,132"
              stroke="#2C1A0A" stroke-width="8" fill="none" stroke-dasharray="20,14" opacity="0.65"/>
      </g>
      <g id="body-feet">
        <ellipse cx="162" cy="415" rx="22" ry="29" fill="#A03020"/>
        <ellipse cx="238" cy="415" rx="22" ry="29" fill="#A03020"/>
        <ellipse cx="162" cy="437" rx="24" ry="12" fill="#882818"/>
        <ellipse cx="238" cy="437" rx="24" ry="12" fill="#882818"/>
        <circle cx="152" cy="442" r="4.5" fill="#701808"/>
        <circle cx="163" cy="445" r="4.5" fill="#701808"/>
        <circle cx="174" cy="442" r="4.5" fill="#701808"/>
        <circle cx="228" cy="442" r="4.5" fill="#701808"/>
        <circle cx="239" cy="445" r="4.5" fill="#701808"/>
        <circle cx="250" cy="442" r="4.5" fill="#701808"/>
      </g>
      <g id="body-lower">
        <ellipse cx="200" cy="378" rx="54" ry="40" fill="#B03020"/>
        <ellipse cx="200" cy="374" rx="34" ry="26" fill="#F5F0EC"/>
        <!-- 条纹 -->
        <path d="M157,360 Q153,378 157,396" stroke="#2C1A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.55"/>
        <path d="M243,360 Q247,378 243,396" stroke="#2C1A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.55"/>
      </g>
      <g id="body-upper">
        <ellipse cx="200" cy="318" rx="65" ry="55" fill="#C0392B"/>
        <ellipse cx="200" cy="315" rx="41" ry="35" fill="#F5F0EC"/>
        <ellipse cx="148" cy="330" rx="18" ry="27" fill="#A03020" transform="rotate(-10,148,330)"/>
        <ellipse cx="252" cy="330" rx="18" ry="27" fill="#A03020" transform="rotate(10,252,330)"/>
        <ellipse cx="143" cy="351" rx="16" ry="11" fill="#882818" transform="rotate(-5,143,351)"/>
        <ellipse cx="257" cy="351" rx="16" ry="11" fill="#882818" transform="rotate(5,257,351)"/>
        <!-- 躯干条纹 -->
        <path d="M163,278 Q160,308 163,338" stroke="#2C1A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.55"/>
        <path d="M200,274 Q200,304 200,338" stroke="#2C1A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.55"/>
        <path d="M237,278 Q240,308 237,338" stroke="#2C1A0A" stroke-width="4.5" fill="none" stroke-linecap="round" opacity="0.55"/>
      </g>
      <g id="body-neck">
        <ellipse cx="200" cy="258" rx="27" ry="20" fill="#C0392B"/>
      </g>
      <g id="body-head">
        <!-- 圆耳朵 -->
        <ellipse cx="142" cy="146" rx="26" ry="34" fill="#C0392B" transform="rotate(-10,142,146)"/>
        <ellipse cx="258" cy="146" rx="26" ry="34" fill="#C0392B" transform="rotate(10,258,146)"/>
        <ellipse cx="142" cy="144" rx="16" ry="24" fill="#F5F0EC" transform="rotate(-10,142,144)"/>
        <ellipse cx="258" cy="144" rx="16" ry="24" fill="#F5F0EC" transform="rotate(10,258,144)"/>
        <!-- 大圆头 -->
        <ellipse cx="200" cy="188" rx="95" ry="88" fill="#C0392B"/>
        <!-- 眼睛周围白色面具 -->
        <ellipse cx="172" cy="184" rx="28" ry="24" fill="#F5F0EC"/>
        <ellipse cx="228" cy="184" rx="28" ry="24" fill="#F5F0EC"/>
        <!-- 口鼻区 -->
        <ellipse cx="200" cy="214" rx="52" ry="33" fill="#F5F0EC"/>
        <!-- 泪痕 -->
        <path d="M156,196 Q152,210 149,222" stroke="#8B2018" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.55"/>
        <path d="M244,196 Q248,210 251,222" stroke="#8B2018" stroke-width="3" fill="none" stroke-linecap="round" opacity="0.55"/>
      </g>
      <g id="body-face">
        <ellipse cx="148" cy="214" rx="18" ry="11" fill="#FF9090" opacity="0.5"/>
        <ellipse cx="252" cy="214" rx="18" ry="11" fill="#FF9090" opacity="0.5"/>
        <circle cx="174" cy="184" r="18" fill="white"/>
        <circle cx="226" cy="184" r="18" fill="white"/>
        <circle cx="176" cy="186" r="12" fill="#1A1A2E"/>
        <circle cx="228" cy="186" r="12" fill="#1A1A2E"/>
        <circle cx="171" cy="181" r="5.5" fill="#6B3A8A"/>
        <circle cx="223" cy="181" r="5.5" fill="#6B3A8A"/>
        <circle cx="169" cy="179" r="3" fill="white"/>
        <circle cx="221" cy="179" r="3" fill="white"/>
        <circle cx="181" cy="191" r="1.8" fill="white"/>
        <circle cx="233" cy="191" r="1.8" fill="white"/>
        <path d="M195,212 L200,217 L205,212 Q200,207 195,212Z" fill="#2C1A0A"/>
        <ellipse cx="198" cy="210" rx="2.5" ry="1.8" fill="white" opacity="0.4"/>
        <line x1="200" y1="217" x2="200" y2="224" stroke="#2C1A0A" stroke-width="1.8"/>
        <path d="M191,224 Q200,232 209,224" stroke="#2C1A0A" stroke-width="2.2" fill="none" stroke-linecap="round"/>
        <line x1="148" y1="214" x2="183" y2="217" stroke="#888" stroke-width="1.5" opacity="0.6"/>
        <line x1="217" y1="217" x2="252" y2="214" stroke="#888" stroke-width="1.5" opacity="0.6"/>
        <path d="M163,169 Q174,164 185,168" stroke="#8B2018" stroke-width="2.8" fill="none" stroke-linecap="round"/>
        <path d="M215,168 Q226,164 237,169" stroke="#8B2018" stroke-width="2.8" fill="none" stroke-linecap="round"/>
      </g>`,
  };

  return pets[type] || pets.dog;
}
