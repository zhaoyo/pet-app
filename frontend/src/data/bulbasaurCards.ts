import type { PokemonCard } from './charmanderCards';
export type { PokemonCard };

export const BULBASAUR_CARDS: PokemonCard[] = [
  // ── ⭐ 普通：各世代像素图 ──────────────────────────────
  { id: 'bulba-gen1-red-blue', name: '初代妙蛙种子', rarity: 1, image: '/bulbasaur/versions/generation-i/red-blue/1.png', isAnimated: false, cost: 100, description: '1996年红蓝版登场，球状种子背负萌芽' },
  { id: 'bulba-gen1-yellow',   name: '黄版妙蛙种子', rarity: 1, image: '/bulbasaur/versions/generation-i/yellow/1.png',   isAnimated: false, cost: 100, description: '皮卡丘版中的草系好伙伴' },
  { id: 'bulba-gen2-gold',     name: '金版妙蛙种子', rarity: 1, image: '/bulbasaur/versions/generation-ii/gold/1.png',    isAnimated: false, cost: 100, description: '金版重新演绎，色彩更鲜明' },
  { id: 'bulba-gen2-silver',   name: '银版妙蛙种子', rarity: 1, image: '/bulbasaur/versions/generation-ii/silver/1.png',  isAnimated: false, cost: 100, description: '银版中的草系入门精灵' },
  { id: 'bulba-gen2-crystal',  name: '水晶版妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-ii/crystal/1.png', isAnimated: false, cost: 100, description: '水晶版限定风格，略带神秘感' },
  { id: 'bulba-gen3-rs',       name: '红宝石妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-iii/ruby-sapphire/1.png', isAnimated: false, cost: 100, description: '第三世代全面重绘，比例更精准' },
  { id: 'bulba-gen3-emerald',  name: '绿宝石妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-iii/emerald/1.png', isAnimated: false, cost: 100, description: '绿宝石版本，背上花苞初绽' },
  { id: 'bulba-gen3-frlg',     name: '火红叶绿妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-iii/firered-leafgreen/1.png', isAnimated: false, cost: 100, description: '火红叶绿重制，致敬初代经典' },
  { id: 'bulba-gen4-dp',       name: '钻石珍珠妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-iv/diamond-pearl/1.png', isAnimated: false, cost: 100, description: '第四世代精细化像素' },
  { id: 'bulba-gen4-pt',       name: '白金妙蛙种子',  rarity: 1, image: '/bulbasaur/versions/generation-iv/platinum/1.png', isAnimated: false, cost: 100, description: '白金版本，眼神更加灵动' },
  { id: 'bulba-gen5-bw',       name: '黑白妙蛙种子',  rarity: 1, image: '/bulbasaur/versions/generation-v/black-white/1.png', isAnimated: false, cost: 100, description: '第五世代高清像素，清晰度大幅提升' },
  { id: 'bulba-gen6-xy',       name: 'XY妙蛙种子',    rarity: 1, image: '/bulbasaur/versions/generation-vi/x-y/1.png',   isAnimated: false, cost: 100, description: '3DS时代全面3D化后的像素回归' },
  { id: 'bulba-gen7-usum',     name: '究极日月妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-vii/ultra-sun-ultra-moon/1.png', isAnimated: false, cost: 100, description: '阿罗拉风格重绘' },
  { id: 'bulba-gen8-bdsp',     name: '晶灿钻石妙蛙种子',rarity: 1, image: '/bulbasaur/versions/generation-viii/brilliant-diamond-shining-pearl/1.png', isAnimated: false, cost: 100, description: '怀旧重制，3D圆润可爱风' },
  { id: 'bulba-gen9-sv',       name: '朱紫妙蛙种子',  rarity: 1, image: '/bulbasaur/versions/generation-ix/scarlet-violet/1.png', isAnimated: false, cost: 100, description: '最新世代高清渲染版本' },

  // ── ⭐⭐ 稀有：动态 GIF ────────────────────────────────
  { id: 'bulba-anim-bw',       name: '黑白动态妙蛙种子',rarity: 2, image: '/bulbasaur/versions/generation-v/black-white/animated/1.gif', isAnimated: true,  cost: 200, description: '第五世代首次引入战斗动画，摇摆花苞' },
  { id: 'bulba-anim-bw-shiny', name: '异色黑白动态',   rarity: 2, image: '/bulbasaur/versions/generation-v/black-white/animated/shiny/1.gif', isAnimated: true, cost: 200, description: '异色版本动态精灵，蓝绿花苞' },
  { id: 'bulba-showdown',      name: '对战动态妙蛙种子',rarity: 2, image: '/bulbasaur/other/showdown/1.gif', isAnimated: true, cost: 200, description: '对战界面专用动态精灵' },
  { id: 'bulba-showdown-shiny',name: '异色对战动态',   rarity: 2, image: '/bulbasaur/other/showdown/shiny/1.gif', isAnimated: true, cost: 200, description: '异色对战动态，罕见蓝绿配色' },

  // ── ⭐⭐⭐ 精品：HOME 3D ───────────────────────────────
  { id: 'bulba-home',          name: 'HOME 3D妙蛙种子',rarity: 3, image: '/bulbasaur/other/home/1.png', isAnimated: false, cost: 500, description: 'Pokemon HOME高清3D渲染，花苞细节丰富' },
  { id: 'bulba-home-shiny',    name: 'HOME异色妙蛙种子',rarity: 3, image: '/bulbasaur/other/home/shiny/1.png', isAnimated: false, cost: 500, description: 'HOME异色版，蓝色系梦幻配色' },

  // ── ⭐⭐⭐⭐ 传说：官方高清插图 ──────────────────────────
  { id: 'bulba-artwork',       name: '官方插图妙蛙种子',rarity: 4, image: '/bulbasaur/other/official-artwork/1.png', isAnimated: false, cost: 1000, description: '官方正式插图，背上花苞盛放' },
  { id: 'bulba-artwork-shiny', name: '异色官方插图',    rarity: 4, image: '/bulbasaur/other/official-artwork/shiny/1.png', isAnimated: false, cost: 1000, description: '异色官方插图，蓝色系稀有配色' },
  { id: 'bulba-oras-shiny',    name: 'ORAS异色妙蛙种子',rarity: 4, image: '/bulbasaur/versions/generation-vi/omegaruby-alphasapphire/shiny/1.png', isAnimated: false, cost: 1000, description: 'ΩRαS版本异色，复古又精致' },

  // ── ⭐⭐⭐⭐⭐ 限定：Dream World ─────────────────────────
  { id: 'bulba-dreamworld',    name: 'Dream World妙蛙种子',rarity: 5, image: '/bulbasaur/other/dream-world/1.svg', isAnimated: false, cost: 2000, description: '梦想世界限定插图，圆润可爱风格' },
];
