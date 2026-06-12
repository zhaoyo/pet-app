import type { PokemonCard } from './charmanderCards';
export type { PokemonCard };

export const EEVEE_CARDS: PokemonCard[] = [
  // ── ⭐ 普通：各世代像素图 ──────────────────────────────
  { id: 'eevee-gen1-red-blue', name: '初代伊布',       rarity: 1, image: '/eevee/versions/generation-i/red-blue/133.png', isAnimated: false, cost: 100, description: '1996年红蓝版登场，拥有8种进化的神奇精灵' },
  { id: 'eevee-gen1-yellow',   name: '黄版伊布',       rarity: 1, image: '/eevee/versions/generation-i/yellow/133.png',   isAnimated: false, cost: 100, description: '皮卡丘版中竞争对手的起始精灵' },
  { id: 'eevee-gen2-gold',     name: '金版伊布',       rarity: 1, image: '/eevee/versions/generation-ii/gold/133.png',    isAnimated: false, cost: 100, description: '金版新增了水伊布和太阳伊布' },
  { id: 'eevee-gen2-silver',   name: '银版伊布',       rarity: 1, image: '/eevee/versions/generation-ii/silver/133.png',  isAnimated: false, cost: 100, description: '银版中可爱的通用形象' },
  { id: 'eevee-gen2-crystal',  name: '水晶版伊布',     rarity: 1, image: '/eevee/versions/generation-ii/crystal/133.png', isAnimated: false, cost: 100, description: '水晶版特殊风格' },
  { id: 'eevee-gen3-rs',       name: '红宝石伊布',     rarity: 1, image: '/eevee/versions/generation-iii/ruby-sapphire/133.png', isAnimated: false, cost: 100, description: '第三世代全面重绘，毛绒绒质感更强' },
  { id: 'eevee-gen3-emerald',  name: '绿宝石伊布',     rarity: 1, image: '/eevee/versions/generation-iii/emerald/133.png', isAnimated: false, cost: 100, description: '绿宝石版本，大眼睛更加灵动' },
  { id: 'eevee-gen3-frlg',     name: '火红叶绿伊布',   rarity: 1, image: '/eevee/versions/generation-iii/firered-leafgreen/133.png', isAnimated: false, cost: 100, description: '火红叶绿，伊布进化路线大全开' },
  { id: 'eevee-gen4-dp',       name: '钻石珍珠伊布',   rarity: 1, image: '/eevee/versions/generation-iv/diamond-pearl/133.png', isAnimated: false, cost: 100, description: '第四世代新增叶伊布和冰伊布' },
  { id: 'eevee-gen4-pt',       name: '白金伊布',       rarity: 1, image: '/eevee/versions/generation-iv/platinum/133.png', isAnimated: false, cost: 100, description: '白金版，毛领更加蓬松' },
  { id: 'eevee-gen5-bw',       name: '黑白伊布',       rarity: 1, image: '/eevee/versions/generation-v/black-white/133.png', isAnimated: false, cost: 100, description: '第五世代高清像素' },
  { id: 'eevee-gen6-xy',       name: 'XY伊布',         rarity: 1, image: '/eevee/versions/generation-vi/x-y/133.png',   isAnimated: false, cost: 100, description: '6代新增妖精伊布的时代' },
  { id: 'eevee-gen7-usum',     name: '究极日月伊布',   rarity: 1, image: '/eevee/versions/generation-vii/ultra-sun-ultra-moon/133.png', isAnimated: false, cost: 100, description: 'Let\'s GO主角登场前夕' },
  { id: 'eevee-gen8-bdsp',     name: '晶灿钻石伊布',   rarity: 1, image: '/eevee/versions/generation-viii/brilliant-diamond-shining-pearl/133.png', isAnimated: false, cost: 100, description: '3D圆润重制，绒毛感超强' },
  { id: 'eevee-gen9-sv',       name: '朱紫伊布',       rarity: 1, image: '/eevee/versions/generation-ix/scarlet-violet/133.png', isAnimated: false, cost: 100, description: '最新世代高清渲染' },

  // ── ⭐⭐ 稀有：动态 GIF ────────────────────────────────
  { id: 'eevee-anim-bw',       name: '黑白动态伊布',   rarity: 2, image: '/eevee/versions/generation-v/black-white/animated/133.gif', isAnimated: true, cost: 200, description: '摇尾巴的动态伊布，毛绒绒活泼' },
  { id: 'eevee-anim-bw-shiny', name: '异色黑白动态',   rarity: 2, image: '/eevee/versions/generation-v/black-white/animated/shiny/133.gif', isAnimated: true, cost: 200, description: '银白异色动态伊布，梦幻闪亮' },
  { id: 'eevee-showdown',      name: '对战动态伊布',   rarity: 2, image: '/eevee/other/showdown/133.gif', isAnimated: true, cost: 200, description: '对战界面专用，抖动耳朵备战' },
  { id: 'eevee-showdown-shiny',name: '异色对战动态',   rarity: 2, image: '/eevee/other/showdown/shiny/133.gif', isAnimated: true, cost: 200, description: '银白异色对战动态' },

  // ── ⭐⭐⭐ 精品：HOME 3D ───────────────────────────────
  { id: 'eevee-home',          name: 'HOME 3D伊布',    rarity: 3, image: '/eevee/other/home/133.png', isAnimated: false, cost: 500, description: 'Pokemon HOME顶级3D渲染，蓬松毛领细节极佳' },
  { id: 'eevee-home-female',   name: 'HOME 3D雌性伊布',rarity: 3, image: '/eevee/other/home/female/133.png', isAnimated: false, cost: 500, description: 'HOME雌性版本，尾巴末端有心形花纹' },
  { id: 'eevee-home-shiny',    name: 'HOME异色伊布',   rarity: 3, image: '/eevee/other/home/shiny/133.png', isAnimated: false, cost: 500, description: 'HOME银白异色版，高贵典雅' },
  { id: 'eevee-home-shiny-f',  name: 'HOME异色雌性伊布',rarity: 3, image: '/eevee/other/home/shiny/female/133.png', isAnimated: false, cost: 500, description: 'HOME异色雌性版，双重稀有' },

  // ── ⭐⭐⭐⭐ 传说：官方高清插图 ──────────────────────────
  { id: 'eevee-artwork',       name: '官方插图伊布',   rarity: 4, image: '/eevee/other/official-artwork/133.png', isAnimated: false, cost: 1000, description: '官方正式插图，蓬松尾巴的可爱站姿' },
  { id: 'eevee-artwork-shiny', name: '异色官方插图',   rarity: 4, image: '/eevee/other/official-artwork/shiny/133.png', isAnimated: false, cost: 1000, description: '银白异色官方插图，粉丝最爱' },
  { id: 'eevee-oras-shiny',    name: 'ORAS异色伊布',   rarity: 4, image: '/eevee/versions/generation-vi/omegaruby-alphasapphire/shiny/133.png', isAnimated: false, cost: 1000, description: 'ΩRαS版本银白异色' },

  // ── ⭐⭐⭐⭐⭐ 限定：Dream World ─────────────────────────
  { id: 'eevee-dreamworld',    name: 'Dream World伊布',rarity: 5, image: '/eevee/other/dream-world/133.svg', isAnimated: false, cost: 2000, description: '梦想世界限定插图，侧卧回眸的治愈系造型' },
];
