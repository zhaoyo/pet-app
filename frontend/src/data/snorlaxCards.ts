import type { PokemonCard } from './charmanderCards';
export type { PokemonCard };

export const SNORLAX_CARDS: PokemonCard[] = [
  // ── ⭐ 普通：各世代像素图 ──────────────────────────────
  { id: 'snorlax-gen1-red-blue', name: '初代卡比兽',   rarity: 1, image: '/snorlax/versions/generation-i/red-blue/143.png', isAnimated: false, cost: 100, description: '1996年红蓝版登场，堵路的睡觉大山' },
  { id: 'snorlax-gen1-yellow',   name: '黄版卡比兽',   rarity: 1, image: '/snorlax/versions/generation-i/yellow/143.png',   isAnimated: false, cost: 100, description: '皮卡丘版中依旧挡住必经之路' },
  { id: 'snorlax-gen2-gold',     name: '金版卡比兽',   rarity: 1, image: '/snorlax/versions/generation-ii/gold/143.png',    isAnimated: false, cost: 100, description: '第二世代重绘，圆滚滚更加可爱' },
  { id: 'snorlax-gen2-silver',   name: '银版卡比兽',   rarity: 1, image: '/snorlax/versions/generation-ii/silver/143.png',  isAnimated: false, cost: 100, description: '银版中的睡眠标志性精灵' },
  { id: 'snorlax-gen2-crystal',  name: '水晶版卡比兽', rarity: 1, image: '/snorlax/versions/generation-ii/crystal/143.png', isAnimated: false, cost: 100, description: '水晶版特殊风格，肚皮更加圆润' },
  { id: 'snorlax-gen3-rs',       name: '红宝石卡比兽', rarity: 1, image: '/snorlax/versions/generation-iii/ruby-sapphire/143.png', isAnimated: false, cost: 100, description: '第三世代全面重绘，体型更加威武' },
  { id: 'snorlax-gen3-emerald',  name: '绿宝石卡比兽', rarity: 1, image: '/snorlax/versions/generation-iii/emerald/143.png', isAnimated: false, cost: 100, description: '绿宝石版本，闭目养神的神态' },
  { id: 'snorlax-gen3-frlg',     name: '火红叶绿卡比兽',rarity: 1, image: '/snorlax/versions/generation-iii/firered-leafgreen/143.png', isAnimated: false, cost: 100, description: '重制版，初代堵路传说再现' },
  { id: 'snorlax-gen4-dp',       name: '钻石珍珠卡比兽',rarity: 1, image: '/snorlax/versions/generation-iv/diamond-pearl/143.png', isAnimated: false, cost: 100, description: '第四世代精细像素' },
  { id: 'snorlax-gen4-pt',       name: '白金卡比兽',   rarity: 1, image: '/snorlax/versions/generation-iv/platinum/143.png', isAnimated: false, cost: 100, description: '白金版，睡相更加安详' },
  { id: 'snorlax-gen5-bw',       name: '黑白卡比兽',   rarity: 1, image: '/snorlax/versions/generation-v/black-white/143.png', isAnimated: false, cost: 100, description: '第五世代高清像素' },
  { id: 'snorlax-gen6-xy',       name: 'XY卡比兽',     rarity: 1, image: '/snorlax/versions/generation-vi/x-y/143.png',   isAnimated: false, cost: 100, description: '6代像素图，卡比兽依旧是人气常青树' },
  { id: 'snorlax-gen7-usum',     name: '究极日月卡比兽',rarity: 1, image: '/snorlax/versions/generation-vii/ultra-sun-ultra-moon/143.png', isAnimated: false, cost: 100, description: '阿罗拉风格渲染' },
  { id: 'snorlax-gen8-bdsp',     name: '晶灿钻石卡比兽',rarity: 1, image: '/snorlax/versions/generation-viii/brilliant-diamond-shining-pearl/143.png', isAnimated: false, cost: 100, description: '3D圆润重制，体积感超强' },
  { id: 'snorlax-gen9-sv',       name: '朱紫卡比兽',   rarity: 1, image: '/snorlax/versions/generation-ix/scarlet-violet/143.png', isAnimated: false, cost: 100, description: '最新世代高清渲染' },

  // ── ⭐⭐ 稀有：动态 GIF ────────────────────────────────
  { id: 'snorlax-anim-bw',       name: '黑白动态卡比兽',rarity: 2, image: '/snorlax/versions/generation-v/black-white/animated/143.gif', isAnimated: true, cost: 200, description: '难得一见的卡比兽动态，微微抖动打呼噜' },
  { id: 'snorlax-anim-bw-shiny', name: '异色黑白动态', rarity: 2, image: '/snorlax/versions/generation-v/black-white/animated/shiny/143.gif', isAnimated: true, cost: 200, description: '蓝色异色动态卡比兽，冰系梦幻感' },
  { id: 'snorlax-showdown',      name: '对战动态卡比兽',rarity: 2, image: '/snorlax/other/showdown/143.gif', isAnimated: true, cost: 200, description: '对战界面专用，慵懒参战的卡比兽' },
  { id: 'snorlax-showdown-shiny',name: '异色对战动态', rarity: 2, image: '/snorlax/other/showdown/shiny/143.gif', isAnimated: true, cost: 200, description: '蓝色异色对战动态，睡觉也要参战' },

  // ── ⭐⭐⭐ 精品：HOME 3D ───────────────────────────────
  { id: 'snorlax-home',          name: 'HOME 3D卡比兽',rarity: 3, image: '/snorlax/other/home/143.png', isAnimated: false, cost: 500, description: 'Pokemon HOME顶级3D渲染，圆滚滚的体型极具质感' },
  { id: 'snorlax-home-shiny',    name: 'HOME异色卡比兽',rarity: 3, image: '/snorlax/other/home/shiny/143.png', isAnimated: false, cost: 500, description: 'HOME蓝色异色版，独特梦幻配色' },

  // ── ⭐⭐⭐⭐ 传说：官方高清插图 ──────────────────────────
  { id: 'snorlax-artwork',       name: '官方插图卡比兽',rarity: 4, image: '/snorlax/other/official-artwork/143.png', isAnimated: false, cost: 1000, description: '官方正式插图，仰天大睡的招牌造型' },
  { id: 'snorlax-artwork-shiny', name: '异色官方插图', rarity: 4, image: '/snorlax/other/official-artwork/shiny/143.png', isAnimated: false, cost: 1000, description: '蓝色异色官方插图，稀有程度极高' },
  { id: 'snorlax-oras-shiny',    name: 'ORAS异色卡比兽',rarity: 4, image: '/snorlax/versions/generation-vi/omegaruby-alphasapphire/shiny/143.png', isAnimated: false, cost: 1000, description: 'ΩRαS版本蓝色异色' },

  // ── ⭐⭐⭐⭐⭐ 限定：Dream World ─────────────────────────
  { id: 'snorlax-dreamworld',    name: 'Dream World卡比兽',rarity: 5, image: '/snorlax/other/dream-world/143.svg', isAnimated: false, cost: 2000, description: '梦想世界限定插图，侧躺酣睡的治愈系造型' },
];
