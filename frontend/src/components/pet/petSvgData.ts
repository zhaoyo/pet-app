import type { PetType } from '../../types/pet';

// Extracted to top-level to avoid rolldown rc.17 template-literal parse bug
// in very large object literals
const THUNDER_SHEEP_SVG = `
      <g id="body-tail">
        <!-- 闪电尾巴球 -->
        <polygon points="310,348 298,368 306,368 294,392 322,366 312,366"
          fill="#FFD700" stroke="#E8A000" stroke-width="1.5" stroke-linejoin="round"/>
        <circle cx="302" cy="372" r="10" fill="#FFE840" opacity="0.5"/>
      </g>

      <g id="body-feet">
        <!-- 后腿 短粗，黄色蹄 -->
        <ellipse cx="163" cy="418" rx="28" ry="34" fill="#F0F0F0"/>
        <ellipse cx="237" cy="418" rx="28" ry="34" fill="#F0F0F0"/>
        <!-- 蹄子 黄色 -->
        <ellipse cx="163" cy="450" rx="26" ry="14" fill="#FFD700" stroke="#E8A000" stroke-width="1.2"/>
        <line x1="163" y1="444" x2="163" y2="458" stroke="#E8A000" stroke-width="1.5"/>
        <ellipse cx="237" cy="450" rx="26" ry="14" fill="#FFD700" stroke="#E8A000" stroke-width="1.2"/>
        <line x1="237" y1="444" x2="237" y2="458" stroke="#E8A000" stroke-width="1.5"/>
      </g>

      <g id="body-lower">
        <!-- 蓬松身体主体：多个叠加圆形模拟羊毛 -->
        <ellipse cx="200" cy="340" rx="90" ry="80" fill="#EFEFEF"/>
        <!-- 羊毛团簇 -->
        <circle cx="148" cy="330" r="38" fill="#F8F8F8"/>
        <circle cx="172" cy="308" r="34" fill="#F4F4F4"/>
        <circle cx="200" cy="302" r="36" fill="#F8F8F8"/>
        <circle cx="228" cy="308" r="34" fill="#F4F4F4"/>
        <circle cx="252" cy="330" r="38" fill="#F8F8F8"/>
        <circle cx="145" cy="358" r="30" fill="#EFEFEF"/>
        <circle cx="255" cy="358" r="30" fill="#EFEFEF"/>
        <!-- 肚子浅黄色 -->
        <ellipse cx="200" cy="350" rx="50" ry="44" fill="#FFFBE8" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <!-- 左前腿（举起），黄蹄 -->
        <ellipse cx="110" cy="285" rx="24" ry="42" fill="#F0F0F0" transform="rotate(-48,110,285)"/>
        <ellipse cx="75" cy="244" rx="18" ry="12" fill="#FFD700" stroke="#E8A000" stroke-width="1.2" transform="rotate(-48,75,244)"/>
        <!-- 右前腿（举起） -->
        <ellipse cx="290" cy="285" rx="24" ry="42" fill="#F0F0F0" transform="rotate(48,290,285)"/>
        <ellipse cx="325" cy="244" rx="18" ry="12" fill="#FFD700" stroke="#E8A000" stroke-width="1.2" transform="rotate(48,325,244)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="280" rx="46" ry="28" fill="#F0F0F0"/>
      </g>

      <g id="body-head">
        <!-- 耳朵（圆形，黄内） -->
        <ellipse cx="108" cy="170" rx="34" ry="38" fill="#EFEFEF"/>
        <ellipse cx="108" cy="172" rx="20" ry="24" fill="#FFD700"/>
        <ellipse cx="292" cy="170" rx="34" ry="38" fill="#EFEFEF"/>
        <ellipse cx="292" cy="172" rx="20" ry="24" fill="#FFD700"/>

        <!-- 大圆头 白色 -->
        <circle cx="200" cy="178" r="128" fill="#F8F8F8"/>

        <!-- 头顶蓬松羊毛 -->
        <circle cx="168" cy="62"  r="30" fill="#F4F4F4"/>
        <circle cx="200" cy="52"  r="34" fill="#F8F8F8"/>
        <circle cx="232" cy="62"  r="30" fill="#F4F4F4"/>
        <circle cx="150" cy="82"  r="24" fill="#EFEFEF"/>
        <circle cx="250" cy="82"  r="24" fill="#EFEFEF"/>

        <!-- 闪电角（头顶中央，黄色，闪电形） -->
        <polygon points="200,44 191,74 198,74 186,106 214,72 206,72"
          fill="#FFD700" stroke="#E8A000" stroke-width="1.8" stroke-linejoin="round"/>

        <!-- 脸部白色区 -->
        <ellipse cx="200" cy="216" rx="62" ry="50" fill="#FFFBE8"/>

        <!-- 鼻子 小椭圆 粉色 -->
        <ellipse cx="200" cy="200" rx="10" ry="7" fill="#FFB0B8"/>
        <!-- 嘴 W形微笑 -->
        <path d="M188,212 Q195,220 200,214 Q205,220 212,212"
          stroke="#888" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </g>

      <g id="body-face">
        <!-- 左眼 宝可梦大眼 蓝色虹膜 -->
        <circle cx="163" cy="162" r="26" fill="white"/>
        <circle cx="165" cy="165" r="18" fill="#3A7ACC"/>
        <circle cx="165" cy="165" r="11" fill="#1A2A4A"/>
        <circle cx="157" cy="156" r="7"  fill="white"/>
        <circle cx="170" cy="161" r="3.5" fill="white" opacity="0.85"/>

        <!-- 右眼 -->
        <circle cx="237" cy="162" r="26" fill="white"/>
        <circle cx="239" cy="165" r="18" fill="#3A7ACC"/>
        <circle cx="239" cy="165" r="11" fill="#1A2A4A"/>
        <circle cx="231" cy="156" r="7"  fill="white"/>
        <circle cx="244" cy="161" r="3.5" fill="white" opacity="0.85"/>

        <!-- 腮红 淡蓝色（像电气的感觉） -->
        <ellipse cx="126" cy="198" rx="30" ry="18" fill="#A8D4FF" opacity="0.55"/>
        <ellipse cx="274" cy="198" rx="30" ry="18" fill="#A8D4FF" opacity="0.55"/>

        <!-- 左小蹄手（举起，黄色） -->
        <ellipse cx="72" cy="234" rx="20" ry="16" fill="#FFD700" stroke="#E8A000" stroke-width="1.2"/>
        <line x1="72" y1="228" x2="72" y2="242" stroke="#E8A000" stroke-width="1.5"/>

        <!-- 右小蹄手 -->
        <ellipse cx="328" cy="234" rx="20" ry="16" fill="#FFD700" stroke="#E8A000" stroke-width="1.2"/>
        <line x1="328" y1="228" x2="328" y2="242" stroke="#E8A000" stroke-width="1.5"/>

        <!-- 闪电腮纹（像皮卡丘的红圆腮，但这里是小闪电形纹路） -->
        <polygon points="118,188 113,200 119,200 112,214 126,200 120,200"
          fill="#FFE640" opacity="0.7" stroke="#E8A000" stroke-width="0.8" stroke-linejoin="round"/>
        <polygon points="282,188 277,200 283,200 276,214 290,200 284,200"
          fill="#FFE640" opacity="0.7" stroke="#E8A000" stroke-width="0.8" stroke-linejoin="round"/>
      </g>
    `;

const BLOOM_SPRITE_SVG = `
      <g id="body-tail">
        <!-- 小卷藤蔓尾 -->
        <path d="M296,374 Q338,340 330,300 Q324,278 308,274"
          stroke="#4CAF50" stroke-width="10" fill="none" stroke-linecap="round"/>
        <path d="M296,374 Q336,342 328,302"
          stroke="#80E080" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- 尾端小花蕾 -->
        <circle cx="307" cy="270" r="12" fill="#FF9EC8"/>
        <circle cx="307" cy="270" r="7"  fill="#FFE0EE"/>
      </g>

      <g id="body-feet">
        <!-- 腿 浅绿 -->
        <ellipse cx="163" cy="420" rx="28" ry="36" fill="#6DC86D"/>
        <ellipse cx="237" cy="420" rx="28" ry="36" fill="#6DC86D"/>
        <!-- 花形脚底 -->
        <ellipse cx="163" cy="450" rx="30" ry="16" fill="#A8E6A8"/>
        <circle cx="149" cy="447" r="6" fill="#FF9EC8"/>
        <circle cx="163" cy="444" r="6" fill="#FF9EC8"/>
        <circle cx="177" cy="447" r="6" fill="#FF9EC8"/>
        <ellipse cx="237" cy="450" rx="30" ry="16" fill="#A8E6A8"/>
        <circle cx="223" cy="447" r="6" fill="#FF9EC8"/>
        <circle cx="237" cy="444" r="6" fill="#FF9EC8"/>
        <circle cx="251" cy="447" r="6" fill="#FF9EC8"/>
      </g>

      <g id="body-lower">
        <!-- 花瓣裙形身体 -->
        <ellipse cx="200" cy="342" rx="90" ry="80" fill="#5CBB5C"/>
        <!-- 花瓣裙边（5片花瓣围绕底部） -->
        <ellipse cx="148" cy="400" rx="30" ry="20" fill="#FF9EC8" transform="rotate(-30,148,400)"/>
        <ellipse cx="174" cy="414" rx="30" ry="20" fill="#FFB8D8" transform="rotate(-10,174,414)"/>
        <ellipse cx="200" cy="418" rx="30" ry="20" fill="#FF9EC8"/>
        <ellipse cx="226" cy="414" rx="30" ry="20" fill="#FFB8D8" transform="rotate(10,226,414)"/>
        <ellipse cx="252" cy="400" rx="30" ry="20" fill="#FF9EC8" transform="rotate(30,252,400)"/>
        <!-- 肚子浅色 -->
        <ellipse cx="200" cy="332" rx="52" ry="56" fill="#A8E8A8" opacity="0.85"/>
        <!-- 肚子中央花纹 -->
        <circle cx="200" cy="330" r="16" fill="#80D880" opacity="0.6"/>
        <circle cx="200" cy="330" r="8"  fill="#FF9EC8" opacity="0.7"/>
      </g>

      <g id="body-upper">
        <!-- 左臂 叶片形 -->
        <ellipse cx="112" cy="286" rx="26" ry="44" fill="#4CAF50" transform="rotate(-50,112,286)"/>
        <ellipse cx="112" cy="286" rx="14" ry="30" fill="#80D880" transform="rotate(-50,112,286)"/>
        <!-- 右臂 -->
        <ellipse cx="288" cy="286" rx="26" ry="44" fill="#4CAF50" transform="rotate(50,288,286)"/>
        <ellipse cx="288" cy="286" rx="14" ry="30" fill="#80D880" transform="rotate(50,288,286)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="280" rx="48" ry="28" fill="#5CBB5C"/>
        <ellipse cx="200" cy="276" rx="32" ry="20" fill="#A8E8A8" opacity="0.85"/>
      </g>

      <g id="body-head">
        <!-- 叶片耳（扁菱形） -->
        <ellipse cx="100" cy="158" rx="36" ry="52" fill="#4CAF50" transform="rotate(20,100,158)"/>
        <ellipse cx="100" cy="158" rx="20" ry="34" fill="#80D880" transform="rotate(20,100,158)"/>
        <ellipse cx="300" cy="158" rx="36" ry="52" fill="#4CAF50" transform="rotate(-20,300,158)"/>
        <ellipse cx="300" cy="158" rx="20" ry="34" fill="#80D880" transform="rotate(-20,300,158)"/>

        <!-- 大圆头 绿色 -->
        <circle cx="200" cy="180" r="128" fill="#6DC86D"/>

        <!-- 头顶花冠（5片花瓣 + 中心） -->
        <ellipse cx="200" cy="34"  rx="22" ry="34" fill="#FFD0E8"/>
        <ellipse cx="164" cy="48"  rx="22" ry="34" fill="#FF9EC8" transform="rotate(-36,164,48)"/>
        <ellipse cx="140" cy="82"  rx="22" ry="34" fill="#FFD0E8" transform="rotate(-72,140,82)"/>
        <ellipse cx="236" cy="48"  rx="22" ry="34" fill="#FF9EC8" transform="rotate(36,236,48)"/>
        <ellipse cx="260" cy="82"  rx="22" ry="34" fill="#FFD0E8" transform="rotate(72,260,82)"/>
        <!-- 花冠中心黄色花蕊 -->
        <circle cx="200" cy="72" r="22" fill="#FFE040"/>
        <circle cx="200" cy="72" r="12" fill="#FFB800"/>
        <!-- 花蕊小点 -->
        <circle cx="193" cy="67" r="3" fill="#FF8800"/>
        <circle cx="207" cy="67" r="3" fill="#FF8800"/>
        <circle cx="200" cy="62" r="3" fill="#FF8800"/>
        <circle cx="200" cy="78" r="3" fill="#FF8800"/>

        <!-- 脸部浅色区 -->
        <ellipse cx="200" cy="218" rx="64" ry="52" fill="#A8E8A8"/>

        <!-- 花形小鼻 -->
        <circle cx="200" cy="200" r="8"  fill="#FF9EC8"/>
        <circle cx="200" cy="200" r="4"  fill="#FFE0EE"/>
        <!-- 嘴 弧形微笑 -->
        <path d="M188,214 Q200,226 212,214"
          stroke="#3A7A3A" stroke-width="2.2" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <!-- 左眼 琥珀/棕金色虹膜 宝可梦风格 -->
        <circle cx="162" cy="163" r="27" fill="white"/>
        <circle cx="164" cy="166" r="19" fill="#C87A18"/>
        <circle cx="164" cy="166" r="12" fill="#7A3A00"/>
        <circle cx="156" cy="157" r="7"  fill="white"/>
        <circle cx="169" cy="162" r="3.5" fill="white" opacity="0.85"/>

        <!-- 右眼 -->
        <circle cx="238" cy="163" r="27" fill="white"/>
        <circle cx="240" cy="166" r="19" fill="#C87A18"/>
        <circle cx="240" cy="166" r="12" fill="#7A3A00"/>
        <circle cx="232" cy="157" r="7"  fill="white"/>
        <circle cx="245" cy="162" r="3.5" fill="white" opacity="0.85"/>

        <!-- 腮红 粉色 带小花纹 -->
        <ellipse cx="122" cy="202" rx="30" ry="18" fill="#FF9EC8" opacity="0.45"/>
        <circle cx="114" cy="200" r="4" fill="#FFB8D8" opacity="0.6"/>
        <circle cx="122" cy="196" r="4" fill="#FFB8D8" opacity="0.6"/>
        <circle cx="130" cy="200" r="4" fill="#FFB8D8" opacity="0.6"/>

        <ellipse cx="278" cy="202" rx="30" ry="18" fill="#FF9EC8" opacity="0.45"/>
        <circle cx="270" cy="200" r="4" fill="#FFB8D8" opacity="0.6"/>
        <circle cx="278" cy="196" r="4" fill="#FFB8D8" opacity="0.6"/>
        <circle cx="286" cy="200" r="4" fill="#FFB8D8" opacity="0.6"/>

        <!-- 左手：叶片形手掌 -->
        <ellipse cx="72" cy="232" rx="22" ry="18" fill="#4CAF50"/>
        <ellipse cx="72" cy="232" rx="12" ry="10" fill="#80D880"/>
        <ellipse cx="54" cy="218" rx="9"  ry="14" fill="#4CAF50" transform="rotate(-25,54,218)"/>
        <ellipse cx="70" cy="212" rx="9"  ry="14" fill="#4CAF50" transform="rotate(-8,70,212)"/>
        <ellipse cx="86" cy="214" rx="9"  ry="14" fill="#4CAF50" transform="rotate(10,86,214)"/>
        <ellipse cx="99" cy="222" rx="8"  ry="13" fill="#4CAF50" transform="rotate(25,99,222)"/>

        <!-- 右手：叶片形手掌 -->
        <ellipse cx="328" cy="232" rx="22" ry="18" fill="#4CAF50"/>
        <ellipse cx="328" cy="232" rx="12" ry="10" fill="#80D880"/>
        <ellipse cx="301" cy="222" rx="8"  ry="13" fill="#4CAF50" transform="rotate(-25,301,222)"/>
        <ellipse cx="314" cy="214" rx="9"  ry="14" fill="#4CAF50" transform="rotate(-10,314,214)"/>
        <ellipse cx="330" cy="212" rx="9"  ry="14" fill="#4CAF50" transform="rotate(8,330,212)"/>
        <ellipse cx="346" cy="218" rx="9"  ry="14" fill="#4CAF50" transform="rotate(25,346,218)"/>
      </g>
    `;

/**
 * 卡通宠物SVG — 第一张参考图风格
 * 特征：大圆头(占60%)、小圆身体、短腿、黑色描边、大眼睛+高光、粉腮红
 * viewBox: 0 0 400 500
 *
 * 关键比例（以小狗为例）：
 *   头部圆心 cy=175, r=130  → 顶y=45, 底y=305
 *   身体椭圆 cy=340, ry=80  → 顶y=260 (与头底重叠45px，自然衔接)
 *   腿部     cy=430
 *   手臂     cy=310, 从身体两侧伸出
 */
export function getPetBaseSvg(type: PetType): string {
  const pets: Record<PetType, string> = {

    // ══════════════════════════════════════════════
    //  小狗  参照Image#7: 奶黄色大圆头、深棕垂耳、挥手姿势、白脚掌
    // ══════════════════════════════════════════════
    dog: `
      <g id="body-tail">
        <!-- 小尾巴，右侧翘起 -->
        <ellipse cx="308" cy="355" rx="18" ry="26"
          fill="#C8A060"
          transform="rotate(-40,308,355)"/>
        <ellipse cx="308" cy="355" rx="11" ry="18"
          fill="#E8C880"
          transform="rotate(-40,308,355)"/>
      </g>

      <g id="body-feet">
        <!-- 左腿 短粗 -->
        <ellipse cx="162" cy="428" rx="32" ry="36"
          fill="#C8A060"/>
        <!-- 右腿 短粗 -->
        <ellipse cx="238" cy="428" rx="32" ry="36"
          fill="#C8A060"/>
        <!-- 左脚掌 白色大脚 -->
        <ellipse cx="162" cy="455" rx="34" ry="20"
          fill="#F0EAD8"/>
        <!-- 左脚趾纹 -->
        <ellipse cx="150" cy="450" rx="9" ry="7" fill="#E0D4C0"/>
        <ellipse cx="163" cy="447" rx="9" ry="7" fill="#E0D4C0"/>
        <ellipse cx="176" cy="450" rx="9" ry="7" fill="#E0D4C0"/>
        <!-- 右脚掌 -->
        <ellipse cx="238" cy="455" rx="34" ry="20"
          fill="#F0EAD8"/>
        <!-- 右脚趾纹 -->
        <ellipse cx="226" cy="450" rx="9" ry="7" fill="#E0D4C0"/>
        <ellipse cx="239" cy="447" rx="9" ry="7" fill="#E0D4C0"/>
        <ellipse cx="252" cy="450" rx="9" ry="7" fill="#E0D4C0"/>
      </g>

      <g id="body-lower">
        <!-- 身体，圆润，奶黄色 -->
        <ellipse cx="200" cy="338" rx="88" ry="82"
          fill="#C8A060"/>
        <!-- 胸口浅色绒毛区 -->
        <ellipse cx="200" cy="330" rx="52" ry="58"
          fill="#E8D090" opacity="0.85"/>
      </g>

      <g id="body-upper">
        <!-- 左臂 — 举起，向左上方伸出 -->
        <ellipse cx="112" cy="290" rx="28" ry="46"
          fill="#C8A060"
          transform="rotate(-50,112,290)"/>
        <!-- 右臂 — 举起，向右上方伸出 -->
        <ellipse cx="288" cy="290" rx="28" ry="46"
          fill="#C8A060"
          transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <!-- 脖子/胸口衔接 -->
        <ellipse cx="200" cy="282" rx="50" ry="32"
          fill="#C8A060"/>
        <!-- 胸口绒毛 -->
        <ellipse cx="200" cy="278" rx="34" ry="24"
          fill="#E8D090" opacity="0.85"/>
      </g>

      <g id="body-head">
        <!-- 左垂耳（先画，被头覆盖根部） -->
        <ellipse cx="82" cy="195" rx="42" ry="80"
          fill="#A87840"
          transform="rotate(8,82,195)"/>
        <!-- 右垂耳 -->
        <ellipse cx="318" cy="195" rx="42" ry="80"
          fill="#A87840"
          transform="rotate(-8,318,195)"/>

        <!-- 大圆头 奶黄色 -->
        <circle cx="200" cy="178" r="132"
          fill="#D4B070"/>

        <!-- 头顶几缕刘海 -->
        <ellipse cx="185" cy="52" rx="16" ry="22"
          fill="#C8A060" transform="rotate(-12,185,52)"/>
        <ellipse cx="200" cy="47" rx="14" ry="20"
          fill="#C8A060"/>
        <ellipse cx="215" cy="52" rx="16" ry="22"
          fill="#C8A060" transform="rotate(12,215,52)"/>

        <!-- 脸部浅色区（鼻口周围） -->
        <ellipse cx="200" cy="215" rx="60" ry="48"
          fill="#EDD8A8"/>

        <!-- 鼻子 深棕椭圆 -->
        <ellipse cx="200" cy="200" rx="14" ry="11"
          fill="#5A3010"/>

        <!-- 嘴 微笑 -->
        <path d="M189,213 Q200,226 211,213"
          stroke="#5A3010" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <!-- 左眼 大而圆，深棕色 -->
        <circle cx="163" cy="160" r="26" fill="white"/>
        <circle cx="165" cy="163" r="19" fill="#3D1E08"/>
        <circle cx="165" cy="163" r="12" fill="#1A0800"/>
        <!-- 大高光 -->
        <circle cx="155" cy="153" r="7"  fill="white"/>
        <circle cx="168" cy="158" r="4"  fill="white" opacity="0.8"/>

        <!-- 右眼 -->
        <circle cx="237" cy="160" r="26" fill="white"/>
        <circle cx="239" cy="163" r="19" fill="#3D1E08"/>
        <circle cx="239" cy="163" r="12" fill="#1A0800"/>
        <circle cx="229" cy="153" r="7"  fill="white"/>
        <circle cx="242" cy="158" r="4"  fill="white" opacity="0.8"/>

        <!-- 腮红 粉色柔和 -->
        <ellipse cx="128" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <ellipse cx="272" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>

        <!-- 左手掌（在最顶层，不被头遮住） -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#E8B898"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#E8B898" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#E8B898" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#E8B898" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#E8B898" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#E8B898" transform="rotate(-38,54,242)"/>

        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#E8B898"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#E8B898" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#E8B898" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#E8B898" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#E8B898" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#E8B898" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小猫  蓝灰色，三角耳，绿眼，胡须
    // ══════════════════════════════════════════════
    cat: `
      <g id="body-tail">
        <path d="M295,380 Q370,330 355,255 Q344,210 322,196"
          stroke="#8888AA" stroke-width="22" fill="none" stroke-linecap="round"/>
        <path d="M295,380 Q368,332 353,257"
          stroke="#C0C0D8" stroke-width="10" fill="none" stroke-linecap="round"/>
        <circle cx="320" cy="190" r="20" fill="#D0D0E8"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#8888AA"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#8888AA"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#C0C0D8"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#C0C0D8"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#9898B8"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#D8D8F0" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#8888AA" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#8888AA" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#9898B8"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#D8D8F0" opacity="0.9"/>
      </g>

      <g id="body-head">
        <!-- 三角耳 -->
        <polygon points="118,100 76,16 172,70" fill="#9898B8"/>
        <polygon points="116,98 92,32 162,68" fill="#F4B0C4"/>
        <polygon points="282,100 228,16 324,70" fill="#9898B8"/>
        <polygon points="284,98 238,32 308,68" fill="#F4B0C4"/>

        <circle cx="200" cy="178" r="132" fill="#B0B0D0"/>

        <ellipse cx="200" cy="218" rx="58" ry="46" fill="#D8D8F0"/>
        <polygon points="200,202 193,212 207,212" fill="#FF9EC8"/>
        <path d="M193,212 Q200,220 207,212" stroke="#8888AA" stroke-width="2" fill="none"/>
        <path d="M200,212 Q190,219 182,223" stroke="#8080A0" stroke-width="1.8" fill="none"/>
        <path d="M200,212 Q210,219 218,223" stroke="#8080A0" stroke-width="1.8" fill="none"/>
        <line x1="118" y1="208" x2="172" y2="213" stroke="#8080A0" stroke-width="1.5" opacity="0.6"/>
        <line x1="114" y1="219" x2="172" y2="219" stroke="#8080A0" stroke-width="1.5" opacity="0.6"/>
        <line x1="228" y1="213" x2="282" y2="208" stroke="#8080A0" stroke-width="1.5" opacity="0.6"/>
        <line x1="228" y1="219" x2="286" y2="219" stroke="#8080A0" stroke-width="1.5" opacity="0.6"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="160" r="26" fill="white"/>
        <circle cx="165" cy="163" r="18" fill="#3A8A3A"/>
        <circle cx="165" cy="163" r="10" fill="#1A1A1A"/>
        <circle cx="156" cy="154" r="7"  fill="white"/>
        <circle cx="168" cy="159" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="160" r="26" fill="white"/>
        <circle cx="239" cy="163" r="18" fill="#3A8A3A"/>
        <circle cx="239" cy="163" r="10" fill="#1A1A1A"/>
        <circle cx="230" cy="154" r="7"  fill="white"/>
        <circle cx="242" cy="159" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <ellipse cx="272" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#C8B8D0"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#C8B8D0" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#C8B8D0" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#C8B8D0" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#C8B8D0" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#C8B8D0" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#C8B8D0"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#C8B8D0" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#C8B8D0" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#C8B8D0" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#C8B8D0" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#C8B8D0" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小狐狸  橙色，尖耳，白面，蓬松尾
    // ══════════════════════════════════════════════
    fox: `
      <g id="body-tail">
        <path d="M295,380 Q375,320 358,240 Q346,194 320,180"
          stroke="#CC5E18" stroke-width="26" fill="none" stroke-linecap="round"/>
        <path d="M295,380 Q373,322 356,242"
          stroke="#EE9858" stroke-width="13" fill="none" stroke-linecap="round"/>
        <circle cx="318" cy="174" r="22" fill="#F4EEE0"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#B04E10"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#B04E10"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#E07830"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#E07830"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#CC6828"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#F4EEE0" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#B04E10" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#B04E10" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#CC6828"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#F4EEE0" opacity="0.9"/>
      </g>

      <g id="body-head">
        <!-- 尖耳 -->
        <polygon points="114,98 68,12 176,66" fill="#CC6828"/>
        <polygon points="112,96 84,30 162,64" fill="#F4C0A0"/>
        <polygon points="286,98 224,12 332,66" fill="#CC6828"/>
        <polygon points="288,96 238,30 316,64" fill="#F4C0A0"/>

        <circle cx="200" cy="178" r="132" fill="#DC7838"/>

        <!-- 白色面部 -->
        <ellipse cx="200" cy="198" rx="84" ry="76" fill="#F4EEE0"/>

        <ellipse cx="200" cy="200" rx="13" ry="10" fill="#2A1008"/>
        <path d="M191,210 Q200,222 209,210" stroke="#3A1810" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="160" r="26" fill="white"/>
        <circle cx="165" cy="163" r="18" fill="#1A1A1A"/>
        <circle cx="156" cy="154" r="7"  fill="white"/>
        <circle cx="168" cy="159" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="160" r="26" fill="white"/>
        <circle cx="239" cy="163" r="18" fill="#1A1A1A"/>
        <circle cx="230" cy="154" r="7"  fill="white"/>
        <circle cx="242" cy="159" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <ellipse cx="272" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#F0C898"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#F0C898" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#F0C898" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#F0C898" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#F0C898" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#F0C898" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#F0C898"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#F0C898" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#F0C898" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#F0C898" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#F0C898" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#F0C898" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小乌龟  绿色，龟壳纹
    // ══════════════════════════════════════════════
    turtle: `
      <g id="body-tail">
        <ellipse cx="306" cy="368" rx="16" ry="10" fill="#3A8A40" transform="rotate(-30,306,368)"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#3A8A40"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#3A8A40"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#5AAA60"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#5AAA60"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="92" ry="84" fill="#2A7030"/>
        <ellipse cx="200" cy="334" rx="66" ry="60" fill="#3A8A40"/>
        <ellipse cx="200" cy="330" rx="38" ry="34" fill="none" stroke="#1E5A22" stroke-width="1.5" opacity="0.5"/>
        <line x1="200" y1="254" x2="200" y2="422" stroke="#1E5A22" stroke-width="1.5" opacity="0.35"/>
        <line x1="108" y1="338" x2="292" y2="338" stroke="#1E5A22" stroke-width="1.5" opacity="0.35"/>
        <line x1="130" y1="280" x2="270" y2="396" stroke="#1E5A22" stroke-width="1" opacity="0.25"/>
        <line x1="270" y1="280" x2="130" y2="396" stroke="#1E5A22" stroke-width="1" opacity="0.25"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#3A8A40" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#3A8A40" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#4A9A50"/>
      </g>

      <g id="body-head">
        <circle cx="200" cy="178" r="130" fill="#52A058"/>
        <ellipse cx="200" cy="216" rx="58" ry="46" fill="#78C07E"/>
        <ellipse cx="200" cy="200" rx="12" ry="9" fill="#1E4A22"/>
        <path d="M191,210 Q200,222 209,210" stroke="#1E4A22" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="160" r="26" fill="white"/>
        <circle cx="165" cy="163" r="18" fill="#1A1A1A"/>
        <circle cx="156" cy="154" r="7"  fill="white"/>
        <circle cx="168" cy="159" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="160" r="26" fill="white"/>
        <circle cx="239" cy="163" r="18" fill="#1A1A1A"/>
        <circle cx="230" cy="154" r="7"  fill="white"/>
        <circle cx="242" cy="159" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="200" rx="30" ry="19" fill="#F09080" opacity="0.5"/>
        <ellipse cx="272" cy="200" rx="30" ry="19" fill="#F09080" opacity="0.5"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#78C07E"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#78C07E" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#78C07E" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#78C07E" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#78C07E" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#78C07E" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#78C07E"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#78C07E" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#78C07E" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#78C07E" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#78C07E" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#78C07E" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小兔子  白色，长耳，粉鼻，红眼
    // ══════════════════════════════════════════════
    rabbit: `
      <g id="body-tail">
        <circle cx="302" cy="378" r="18" fill="#E8E8E8"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#C8C8C8"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#C8C8C8"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#EBEBEB"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#EBEBEB"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#D8D8D8"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#F6F2F2" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#C8C8C8" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#C8C8C8" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#D8D8D8"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#F6F2F2" opacity="0.9"/>
      </g>

      <g id="body-head">
        <!-- 长耳（先画） -->
        <ellipse cx="152" cy="58" rx="32" ry="82" fill="#D8D8D8"/>
        <ellipse cx="152" cy="62" rx="20" ry="66" fill="#F8B8CC"/>
        <ellipse cx="248" cy="58" rx="32" ry="82" fill="#D8D8D8"/>
        <ellipse cx="248" cy="62" rx="20" ry="66" fill="#F8B8CC"/>

        <circle cx="200" cy="180" r="130" fill="#F0F0F0"/>

        <ellipse cx="200" cy="218" rx="14" ry="10" fill="#F8B8CC"/>
        <path d="M191,227 Q200,238 209,227" stroke="#B0A0A8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="162" r="26" fill="white"/>
        <circle cx="165" cy="165" r="18" fill="#CC3366"/>
        <circle cx="165" cy="165" r="10" fill="#1A1A1A"/>
        <circle cx="156" cy="156" r="7"  fill="white"/>
        <circle cx="168" cy="161" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="162" r="26" fill="white"/>
        <circle cx="239" cy="165" r="18" fill="#CC3366"/>
        <circle cx="239" cy="165" r="10" fill="#1A1A1A"/>
        <circle cx="230" cy="156" r="7"  fill="white"/>
        <circle cx="242" cy="161" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <ellipse cx="272" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#F0D8E0"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#F0D8E0" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#F0D8E0" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#F0D8E0" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#F0D8E0" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#F0D8E0" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#F0D8E0"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#F0D8E0" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#F0D8E0" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#F0D8E0" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#F0D8E0" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#F0D8E0" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小鸟  黄色，橙嘴，翅膀
    // ══════════════════════════════════════════════
    bird: `
      <g id="body-tail">
        <ellipse cx="308" cy="352" rx="32" ry="12" fill="#C8A010" transform="rotate(-40,308,352)"/>
        <ellipse cx="318" cy="340" rx="26" ry="10" fill="#E0C020" transform="rotate(-55,318,340)"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="432" rx="26" ry="36" fill="#C07808"/>
        <ellipse cx="238" cy="432" rx="26" ry="36" fill="#C07808"/>
        <line x1="148" y1="462" x2="132" y2="476" stroke="#C07808" stroke-width="5" stroke-linecap="round"/>
        <line x1="148" y1="462" x2="148" y2="478" stroke="#C07808" stroke-width="5" stroke-linecap="round"/>
        <line x1="148" y1="462" x2="164" y2="476" stroke="#C07808" stroke-width="5" stroke-linecap="round"/>
        <line x1="252" y1="462" x2="236" y2="476" stroke="#C07808" stroke-width="5" stroke-linecap="round"/>
        <line x1="252" y1="462" x2="252" y2="478" stroke="#C07808" stroke-width="5" stroke-linecap="round"/>
        <line x1="252" y1="462" x2="268" y2="476" stroke="#C07808" stroke-width="5" stroke-linecap="round"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#ECC820"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#F8F0B8" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <!-- 翅膀举起 -->
        <ellipse cx="106" cy="282" rx="52" ry="42" fill="#C8A010" transform="rotate(-55,106,282)"/>
        <ellipse cx="106" cy="284" rx="38" ry="30" fill="#DEB818" transform="rotate(-55,106,284)"/>
        <ellipse cx="294" cy="282" rx="52" ry="42" fill="#C8A010" transform="rotate(55,294,282)"/>
        <ellipse cx="294" cy="284" rx="38" ry="30" fill="#DEB818" transform="rotate(55,294,284)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#ECC820"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#F8F0B8" opacity="0.9"/>
      </g>

      <g id="body-head">
        <!-- 头顶羽毛 -->
        <ellipse cx="192" cy="36" rx="12" ry="24" fill="#C8A010" transform="rotate(-10,192,36)"/>
        <ellipse cx="208" cy="32" rx="10" ry="20" fill="#E0B820" transform="rotate(8,208,32)"/>

        <circle cx="200" cy="178" r="130" fill="#F4D428"/>

        <!-- 橙色嘴 -->
        <ellipse cx="200" cy="216" rx="26" ry="16" fill="#E07808"/>
        <ellipse cx="200" cy="206" rx="26" ry="14" fill="#F09020"/>
        <line x1="174" y1="211" x2="226" y2="211" stroke="#A05006" stroke-width="2"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="158" r="26" fill="white"/>
        <circle cx="165" cy="161" r="18" fill="#1A1A1A"/>
        <circle cx="156" cy="152" r="7"  fill="white"/>
        <circle cx="168" cy="157" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="158" r="26" fill="white"/>
        <circle cx="239" cy="161" r="18" fill="#1A1A1A"/>
        <circle cx="230" cy="152" r="7"  fill="white"/>
        <circle cx="242" cy="157" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="196" rx="30" ry="19" fill="#F09080" opacity="0.5"/>
        <ellipse cx="272" cy="196" rx="30" ry="19" fill="#F09080" opacity="0.5"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小海豚  蓝色，白腹，鳍
    // ══════════════════════════════════════════════
    dolphin: `
      <g id="body-tail">
        <path d="M272,418 Q322,386 350,350 Q330,330 300,346 Q288,390 272,412" fill="#4A88B4"/>
        <path d="M272,418 Q230,448 200,458 Q218,438 228,414" fill="#4A88B4"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="432" rx="36" ry="42" fill="#3A78A4"/>
        <ellipse cx="238" cy="432" rx="36" ry="42" fill="#3A78A4"/>
        <ellipse cx="162" cy="458" rx="34" ry="20" fill="#5494BE"/>
        <ellipse cx="238" cy="458" rx="34" ry="20" fill="#5494BE"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#5494BE"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#D0E8F4" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <!-- 背鳍 -->
        <path d="M186,234 Q222,174 256,202 Q234,226 190,232" fill="#3A78A4"/>
        <!-- 侧鳍举起 -->
        <ellipse cx="106" cy="272" rx="50" ry="28" fill="#3A78A4" transform="rotate(-55,106,272)"/>
        <ellipse cx="294" cy="272" rx="50" ry="28" fill="#3A78A4" transform="rotate(55,294,272)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#5494BE"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#D0E8F4" opacity="0.9"/>
      </g>

      <g id="body-head">
        <circle cx="200" cy="178" r="130" fill="#5EA0C8"/>
        <ellipse cx="200" cy="214" rx="68" ry="50" fill="#D0E8F4"/>
        <path d="M160,218 Q200,236 240,218" stroke="#3A78A4" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="156" r="26" fill="white"/>
        <circle cx="165" cy="159" r="18" fill="#1A1A1A"/>
        <circle cx="156" cy="150" r="7"  fill="white"/>
        <circle cx="168" cy="155" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="156" r="26" fill="white"/>
        <circle cx="239" cy="159" r="18" fill="#1A1A1A"/>
        <circle cx="230" cy="150" r="7"  fill="white"/>
        <circle cx="242" cy="155" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="196" rx="30" ry="19" fill="#F09080" opacity="0.5"/>
        <ellipse cx="272" cy="196" rx="30" ry="19" fill="#F09080" opacity="0.5"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小老虎  橙色，黑虎纹，圆耳
    // ══════════════════════════════════════════════
    tiger: `
      <g id="body-tail">
        <path d="M292,365 Q368,308 350,234 Q340,190 316,176"
          stroke="#C06010" stroke-width="22" fill="none" stroke-linecap="round"/>
        <path d="M314,256 Q334,248 340,260" stroke="#1A1A1A" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M308,230 Q328,222 334,234" stroke="#1A1A1A" stroke-width="7" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#9A4A08"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#9A4A08"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#C06010"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#C06010"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#C86818"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#F4DCA8" opacity="0.9"/>
        <path d="M145,278 Q159,266 149,254" stroke="#1A1A1A" stroke-width="5" fill="none" stroke-linecap="round"/>
        <path d="M255,278 Q241,266 251,254" stroke="#1A1A1A" stroke-width="5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#9A4A08" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#9A4A08" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#C86818"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#F4DCA8" opacity="0.9"/>
      </g>

      <g id="body-head">
        <circle cx="106" cy="104" r="38" fill="#C86818"/>
        <circle cx="106" cy="104" r="23" fill="#EEA848"/>
        <circle cx="294" cy="104" r="38" fill="#C86818"/>
        <circle cx="294" cy="104" r="23" fill="#EEA848"/>

        <circle cx="200" cy="178" r="130" fill="#D87820"/>

        <!-- 虎纹 -->
        <path d="M174,52 Q184,36 180,22"  stroke="#1A1A1A" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M200,46 Q200,30 200,16"  stroke="#1A1A1A" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M226,52 Q216,36 220,22"  stroke="#1A1A1A" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M102,160 Q86,170 72,163"  stroke="#1A1A1A" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M96,180 Q80,186 66,181"   stroke="#1A1A1A" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M298,160 Q314,170 328,163" stroke="#1A1A1A" stroke-width="4" fill="none" stroke-linecap="round"/>
        <path d="M304,180 Q320,186 334,181" stroke="#1A1A1A" stroke-width="4" fill="none" stroke-linecap="round"/>

        <ellipse cx="200" cy="214" rx="56" ry="42" fill="#F4DCA8"/>
        <ellipse cx="200" cy="198" rx="12" ry="9" fill="#2A1008"/>
        <path d="M191,208 Q200,220 209,208" stroke="#3A1810" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <line x1="116" y1="204" x2="166" y2="208" stroke="#5A3010" stroke-width="1.6" opacity="0.5"/>
        <line x1="112" y1="214" x2="166" y2="214" stroke="#5A3010" stroke-width="1.6" opacity="0.5"/>
        <line x1="234" y1="208" x2="284" y2="204" stroke="#5A3010" stroke-width="1.6" opacity="0.5"/>
        <line x1="234" y1="214" x2="288" y2="214" stroke="#5A3010" stroke-width="1.6" opacity="0.5"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="160" r="26" fill="white"/>
        <circle cx="165" cy="163" r="18" fill="#1A1A1A"/>
        <circle cx="156" cy="154" r="7"  fill="white"/>
        <circle cx="168" cy="159" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="160" r="26" fill="white"/>
        <circle cx="239" cy="163" r="18" fill="#1A1A1A"/>
        <circle cx="230" cy="154" r="7"  fill="white"/>
        <circle cx="242" cy="159" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <ellipse cx="272" cy="200" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#E8A870"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#E8A870" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#E8A870" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#E8A870" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#E8A870" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#E8A870" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#E8A870"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#E8A870" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#E8A870" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#E8A870" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#E8A870" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#E8A870" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小狮子  金黄，棕鬃毛
    // ══════════════════════════════════════════════
    lion: `
      <g id="body-tail">
        <path d="M292,368 Q362,314 344,240 Q332,196 308,182"
          stroke="#B07818" stroke-width="20" fill="none" stroke-linecap="round"/>
        <circle cx="306" cy="176" r="22" fill="#704E10"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#906010"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#906010"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#B07818"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#B07818"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#B07818"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#F4E0A0" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#906010" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#906010" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#B07818"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#F4E0A0" opacity="0.9"/>
      </g>

      <g id="body-head">
        <!-- 鬃毛 -->
        <circle cx="200" cy="174" r="148" fill="#704E10"/>
        <circle cx="98"  cy="72"  r="32" fill="#B07818"/>
        <circle cx="98"  cy="72"  r="19" fill="#D89030"/>
        <circle cx="302" cy="72"  r="32" fill="#B07818"/>
        <circle cx="302" cy="72"  r="19" fill="#D89030"/>
        <!-- 脸 -->
        <circle cx="200" cy="174" r="116" fill="#D09828"/>
        <ellipse cx="200" cy="214" rx="58" ry="44" fill="#F4E0A0"/>
        <ellipse cx="200" cy="198" rx="12" ry="9" fill="#2A1008"/>
        <path d="M191,208 Q200,220 209,208" stroke="#3A1810" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <line x1="116" y1="204" x2="166" y2="208" stroke="#705010" stroke-width="1.6" opacity="0.5"/>
        <line x1="112" y1="214" x2="166" y2="214" stroke="#705010" stroke-width="1.6" opacity="0.5"/>
        <line x1="234" y1="208" x2="284" y2="204" stroke="#705010" stroke-width="1.6" opacity="0.5"/>
        <line x1="234" y1="214" x2="288" y2="214" stroke="#705010" stroke-width="1.6" opacity="0.5"/>
      </g>

      <g id="body-face">
        <circle cx="163" cy="156" r="26" fill="white"/>
        <circle cx="165" cy="159" r="18" fill="#1A1A1A"/>
        <circle cx="156" cy="150" r="7"  fill="white"/>
        <circle cx="168" cy="155" r="4"  fill="white" opacity="0.8"/>
        <circle cx="237" cy="156" r="26" fill="white"/>
        <circle cx="239" cy="159" r="18" fill="#1A1A1A"/>
        <circle cx="230" cy="150" r="7"  fill="white"/>
        <circle cx="242" cy="155" r="4"  fill="white" opacity="0.8"/>
        <ellipse cx="128" cy="196" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <ellipse cx="272" cy="196" rx="32" ry="20" fill="#F09080" opacity="0.55"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#E8C878"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#E8C878" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#E8C878" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#E8C878" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#E8C878" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#E8C878" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#E8C878"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#E8C878" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#E8C878" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#E8C878" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#E8C878" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#E8C878" transform="rotate(38,346,242)"/>
      </g>
    `,

    // ══════════════════════════════════════════════
    //  小红熊猫  棕红，眼罩，环纹尾
    // ══════════════════════════════════════════════
    red_panda: `
      <g id="body-tail">
        <path d="M288,366 Q364,308 346,232 Q334,186 308,172"
          stroke="#921E0C" stroke-width="24" fill="none" stroke-linecap="round"/>
        <path d="M322,284 Q342,276 348,288" stroke="#EEE0C0" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M316,258 Q336,250 342,262" stroke="#EEE0C0" stroke-width="9" fill="none" stroke-linecap="round"/>
        <path d="M308,234 Q328,226 334,238" stroke="#EEE0C0" stroke-width="9" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-feet">
        <ellipse cx="162" cy="428" rx="32" ry="36" fill="#821408"/>
        <ellipse cx="238" cy="428" rx="32" ry="36" fill="#821408"/>
        <ellipse cx="162" cy="455" rx="34" ry="20" fill="#A02C18"/>
        <ellipse cx="238" cy="455" rx="34" ry="20" fill="#A02C18"/>
      </g>

      <g id="body-lower">
        <ellipse cx="200" cy="338" rx="88" ry="82" fill="#A02C18"/>
        <ellipse cx="200" cy="330" rx="52" ry="58" fill="#EEE0C0" opacity="0.9"/>
      </g>

      <g id="body-upper">
        <ellipse cx="112" cy="290" rx="28" ry="46" fill="#821408" transform="rotate(-50,112,290)"/>
        <ellipse cx="288" cy="290" rx="28" ry="46" fill="#821408" transform="rotate(50,288,290)"/>
      </g>

      <g id="body-neck">
        <ellipse cx="200" cy="282" rx="50" ry="32" fill="#A02C18"/>
        <ellipse cx="200" cy="278" rx="34" ry="24" fill="#EEE0C0" opacity="0.9"/>
      </g>

      <g id="body-head">
        <circle cx="100" cy="102" r="40" fill="#A02C18"/>
        <circle cx="100" cy="102" r="25" fill="#EEE0C0"/>
        <circle cx="300" cy="102" r="40" fill="#A02C18"/>
        <circle cx="300" cy="102" r="25" fill="#EEE0C0"/>

        <circle cx="200" cy="178" r="130" fill="#B83020"/>

        <!-- 眼罩 -->
        <ellipse cx="158" cy="166" rx="38" ry="34" fill="#1A0808" opacity="0.78"/>
        <ellipse cx="242" cy="166" rx="38" ry="34" fill="#1A0808" opacity="0.78"/>

        <ellipse cx="200" cy="214" rx="54" ry="40" fill="#EEE0C0"/>
        <ellipse cx="200" cy="198" rx="11" ry="8" fill="#2A1008"/>
        <path d="M191,208 Q200,220 209,208" stroke="#3A1808" stroke-width="2.5" fill="none" stroke-linecap="round"/>
      </g>

      <g id="body-face">
        <circle cx="158" cy="162" r="14" fill="white"/>
        <circle cx="158" cy="164" r="10" fill="#1A1A1A"/>
        <circle cx="153" cy="159" r="4" fill="white"/>
        <circle cx="242" cy="162" r="14" fill="white"/>
        <circle cx="242" cy="164" r="10" fill="#1A1A1A"/>
        <circle cx="237" cy="159" r="4" fill="white"/>
        <ellipse cx="124" cy="200" rx="28" ry="18" fill="#F09080" opacity="0.55"/>
        <ellipse cx="276" cy="200" rx="28" ry="18" fill="#F09080" opacity="0.55"/>
        <!-- 左手掌 -->
        <ellipse cx="76" cy="238" rx="24" ry="20" fill="#D8A090"/>
        <ellipse cx="59" cy="225" rx="9" ry="13" fill="#D8A090" transform="rotate(-22,59,225)"/>
        <ellipse cx="72" cy="218" rx="9" ry="13" fill="#D8A090" transform="rotate(-7,72,218)"/>
        <ellipse cx="86" cy="217" rx="9" ry="13" fill="#D8A090" transform="rotate(7,86,217)"/>
        <ellipse cx="99" cy="223" rx="8" ry="13" fill="#D8A090" transform="rotate(22,99,223)"/>
        <ellipse cx="54" cy="242" rx="8" ry="11" fill="#D8A090" transform="rotate(-38,54,242)"/>
        <!-- 右手掌 -->
        <ellipse cx="324" cy="238" rx="24" ry="20" fill="#D8A090"/>
        <ellipse cx="301" cy="223" rx="8" ry="13" fill="#D8A090" transform="rotate(-22,301,223)"/>
        <ellipse cx="314" cy="217" rx="9" ry="13" fill="#D8A090" transform="rotate(-7,314,217)"/>
        <ellipse cx="328" cy="218" rx="9" ry="13" fill="#D8A090" transform="rotate(7,328,218)"/>
        <ellipse cx="341" cy="225" rx="9" ry="13" fill="#D8A090" transform="rotate(22,341,225)"/>
        <ellipse cx="346" cy="242" rx="8" ry="11" fill="#D8A090" transform="rotate(38,346,242)"/>
      </g>
    `,
  };

  // Computed-key assignment to work around rolldown rc.17 bug with underscore object keys
  (pets as any)['thunder_sheep'] = THUNDER_SHEEP_SVG;
  (pets as any)['bloom_sprite'] = BLOOM_SPRITE_SVG;

  return pets[type] ?? pets.dog;
}
