import type { PokemonCard } from './charmanderCards';
export type { PokemonCard };

export const MEOWTH_CARDS: PokemonCard[] = [
  // ── ⭐ 普通：各世代像素图 ──────────────────────────────
  { id: 'meowth-gen1-red-blue', name: '初代喵喵',      rarity: 1, image: '/meowth/versions/generation-i/red-blue/52.png', isAnimated: false, cost: 100, description: '1996年红蓝版登场，火箭队标志性宠物' },
  { id: 'meowth-gen1-yellow',   name: '黄版喵喵',      rarity: 1, image: '/meowth/versions/generation-i/yellow/52.png',   isAnimated: false, cost: 100, description: '动画中会说话的喵喵，最有个性' },
  { id: 'meowth-gen2-gold',     name: '金版喵喵',      rarity: 1, image: '/meowth/versions/generation-ii/gold/52.png',    isAnimated: false, cost: 100, description: '第二世代重绘，额头金币闪亮' },
  { id: 'meowth-gen2-silver',   name: '银版喵喵',      rarity: 1, image: '/meowth/versions/generation-ii/silver/52.png',  isAnimated: false, cost: 100, description: '银版中可爱的猫系精灵' },
  { id: 'meowth-gen2-crystal',  name: '水晶版喵喵',    rarity: 1, image: '/meowth/versions/generation-ii/crystal/52.png', isAnimated: false, cost: 100, description: '水晶版特殊风格渲染' },
  { id: 'meowth-gen3-rs',       name: '红宝石喵喵',    rarity: 1, image: '/meowth/versions/generation-iii/ruby-sapphire/52.png', isAnimated: false, cost: 100, description: '第三世代全面重绘，爪子更加精细' },
  { id: 'meowth-gen3-emerald',  name: '绿宝石喵喵',    rarity: 1, image: '/meowth/versions/generation-iii/emerald/52.png', isAnimated: false, cost: 100, description: '绿宝石版本，表情更加调皮' },
  { id: 'meowth-gen3-frlg',     name: '火红叶绿喵喵',  rarity: 1, image: '/meowth/versions/generation-iii/firered-leafgreen/52.png', isAnimated: false, cost: 100, description: '重制版致敬初代，经典猫猫形象' },
  { id: 'meowth-gen4-dp',       name: '钻石珍珠喵喵',  rarity: 1, image: '/meowth/versions/generation-iv/diamond-pearl/52.png', isAnimated: false, cost: 100, description: '第四世代细腻像素' },
  { id: 'meowth-gen4-pt',       name: '白金喵喵',      rarity: 1, image: '/meowth/versions/generation-iv/platinum/52.png', isAnimated: false, cost: 100, description: '白金版，表情更加狡黠' },
  { id: 'meowth-gen5-bw',       name: '黑白喵喵',      rarity: 1, image: '/meowth/versions/generation-v/black-white/52.png', isAnimated: false, cost: 100, description: '第五世代高清像素' },
  { id: 'meowth-gen6-xy',       name: 'XY喵喵',        rarity: 1, image: '/meowth/versions/generation-vi/x-y/52.png',   isAnimated: false, cost: 100, description: '6代像素图，有了阿罗拉形态的时代' },
  { id: 'meowth-gen7-usum',     name: '究极日月喵喵',  rarity: 1, image: '/meowth/versions/generation-vii/ultra-sun-ultra-moon/52.png', isAnimated: false, cost: 100, description: '阿罗拉版本同期的关都喵喵' },
  { id: 'meowth-gen8-bdsp',     name: '晶灿钻石喵喵',  rarity: 1, image: '/meowth/versions/generation-viii/brilliant-diamond-shining-pearl/52.png', isAnimated: false, cost: 100, description: '3D圆润重制，猫猫更加可爱' },
  { id: 'meowth-gen9-sv',       name: '朱紫喵喵',      rarity: 1, image: '/meowth/versions/generation-ix/scarlet-violet/52.png', isAnimated: false, cost: 100, description: '最新世代高清渲染' },

  // ── ⭐⭐ 稀有：动态 GIF ────────────────────────────────
  { id: 'meowth-anim-bw',       name: '黑白动态喵喵',  rarity: 2, image: '/meowth/versions/generation-v/black-white/animated/52.gif', isAnimated: true, cost: 200, description: '摇着尾巴的动态喵喵，活灵活现' },
  { id: 'meowth-anim-bw-shiny', name: '异色黑白动态',  rarity: 2, image: '/meowth/versions/generation-v/black-white/animated/shiny/52.gif', isAnimated: true, cost: 200, description: '金色异色动态版，奢华感满满' },
  { id: 'meowth-showdown',      name: '对战动态喵喵',  rarity: 2, image: '/meowth/other/showdown/52.gif', isAnimated: true, cost: 200, description: '对战界面专用，爪子挥舞攻击' },
  { id: 'meowth-showdown-shiny',name: '异色对战动态',  rarity: 2, image: '/meowth/other/showdown/shiny/52.gif', isAnimated: true, cost: 200, description: '金色异色对战动态，财运滚滚' },

  // ── ⭐⭐⭐ 精品：HOME 3D ───────────────────────────────
  { id: 'meowth-home',          name: 'HOME 3D喵喵',   rarity: 3, image: '/meowth/other/home/52.png', isAnimated: false, cost: 500, description: 'Pokemon HOME高清3D渲染，毛发细节精美' },
  { id: 'meowth-home-shiny',    name: 'HOME异色喵喵',  rarity: 3, image: '/meowth/other/home/shiny/52.png', isAnimated: false, cost: 500, description: 'HOME金色异色版，闪亮登场' },

  // ── ⭐⭐⭐⭐ 传说：官方高清插图 ──────────────────────────
  { id: 'meowth-artwork',       name: '官方插图喵喵',  rarity: 4, image: '/meowth/other/official-artwork/52.png', isAnimated: false, cost: 1000, description: '官方正式插图，调皮可爱的猫猫站姿' },
  { id: 'meowth-artwork-shiny', name: '异色官方插图',  rarity: 4, image: '/meowth/other/official-artwork/shiny/52.png', isAnimated: false, cost: 1000, description: '金色异色官方插图，富贵逼人' },
  { id: 'meowth-oras-shiny',    name: 'ORAS异色喵喵',  rarity: 4, image: '/meowth/versions/generation-vi/omegaruby-alphasapphire/shiny/52.png', isAnimated: false, cost: 1000, description: 'ΩRαS版本金色异色' },

  // ── ⭐⭐⭐⭐⭐ 限定：Dream World ─────────────────────────
  { id: 'meowth-dreamworld',    name: 'Dream World喵喵',rarity: 5, image: '/meowth/other/dream-world/52.svg', isAnimated: false, cost: 2000, description: '梦想世界限定插图，蜷缩伸懒腰的慵懒姿态' },
];
