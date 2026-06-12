import type { PokemonCard } from './charmanderCards';
export type { PokemonCard };

export const CHARIZARD_CARDS: PokemonCard[] = [
  // ── ⭐ 普通：各世代像素图 ──────────────────────────────
  { id: 'char6-gen1-red-blue', name: '初代喷火龙',    rarity: 1, image: '/charizard/versions/generation-i/red-blue/6.png', isAnimated: false, cost: 100, description: '1996年红蓝版登场，初代最强御三家终态' },
  { id: 'char6-gen1-yellow',   name: '黄版喷火龙',    rarity: 1, image: '/charizard/versions/generation-i/yellow/6.png',   isAnimated: false, cost: 100, description: '皮卡丘版中的强大对手' },
  { id: 'char6-gen2-gold',     name: '金版喷火龙',    rarity: 1, image: '/charizard/versions/generation-ii/gold/6.png',    isAnimated: false, cost: 100, description: '第二世代重绘，橙色火焰气质更强' },
  { id: 'char6-gen2-silver',   name: '银版喷火龙',    rarity: 1, image: '/charizard/versions/generation-ii/silver/6.png',  isAnimated: false, cost: 100, description: '银版中的传奇精灵形象' },
  { id: 'char6-gen2-crystal',  name: '水晶版喷火龙',  rarity: 1, image: '/charizard/versions/generation-ii/crystal/6.png', isAnimated: false, cost: 100, description: '水晶版独特风格渲染' },
  { id: 'char6-gen3-rs',       name: '红宝石喷火龙',  rarity: 1, image: '/charizard/versions/generation-iii/ruby-sapphire/6.png', isAnimated: false, cost: 100, description: '第三世代全面重绘，翅膀更加雄壮' },
  { id: 'char6-gen3-emerald',  name: '绿宝石喷火龙',  rarity: 1, image: '/charizard/versions/generation-iii/emerald/6.png', isAnimated: false, cost: 100, description: '绿宝石版本，尾焰熊熊燃烧' },
  { id: 'char6-gen3-frlg',     name: '火红叶绿喷火龙',rarity: 1, image: '/charizard/versions/generation-iii/firered-leafgreen/6.png', isAnimated: false, cost: 100, description: '火红叶绿重制，向初代致敬' },
  { id: 'char6-gen4-dp',       name: '钻石珍珠喷火龙',rarity: 1, image: '/charizard/versions/generation-iv/diamond-pearl/6.png', isAnimated: false, cost: 100, description: '第四世代精细化像素表达' },
  { id: 'char6-gen4-pt',       name: '白金喷火龙',    rarity: 1, image: '/charizard/versions/generation-iv/platinum/6.png', isAnimated: false, cost: 100, description: '白金版，气势更加磅礴' },
  { id: 'char6-gen5-bw',       name: '黑白喷火龙',    rarity: 1, image: '/charizard/versions/generation-v/black-white/6.png', isAnimated: false, cost: 100, description: '第五世代高清像素，比例完美' },
  { id: 'char6-gen6-xy',       name: 'XY喷火龙',      rarity: 1, image: '/charizard/versions/generation-vi/x-y/6.png',   isAnimated: false, cost: 100, description: '6代像素图，拥有超进化的时代' },
  { id: 'char6-gen7-usum',     name: '究极日月喷火龙', rarity: 1, image: '/charizard/versions/generation-vii/ultra-sun-ultra-moon/6.png', isAnimated: false, cost: 100, description: '阿罗拉风格，火焰更显威猛' },
  { id: 'char6-gen8-bdsp',     name: '晶灿钻石喷火龙', rarity: 1, image: '/charizard/versions/generation-viii/brilliant-diamond-shining-pearl/6.png', isAnimated: false, cost: 100, description: '3D圆润风格重制' },
  { id: 'char6-gen9-sv',       name: '朱紫喷火龙',    rarity: 1, image: '/charizard/versions/generation-ix/scarlet-violet/6.png', isAnimated: false, cost: 100, description: '最新世代高清渲染' },

  // ── ⭐⭐ 稀有：动态 GIF ────────────────────────────────
  { id: 'char6-anim-bw',       name: '黑白动态喷火龙', rarity: 2, image: '/charizard/versions/generation-v/black-white/animated/6.gif', isAnimated: true, cost: 200, description: '展翅翱翔的动态精灵，霸气十足' },
  { id: 'char6-anim-bw-shiny', name: '异色黑白动态',   rarity: 2, image: '/charizard/versions/generation-v/black-white/animated/shiny/6.gif', isAnimated: true, cost: 200, description: '黑色异色喷火龙动态，极为稀有' },
  { id: 'char6-showdown',      name: '对战动态喷火龙',  rarity: 2, image: '/charizard/other/showdown/6.gif', isAnimated: true, cost: 200, description: '对战界面动态精灵，火焰尾巴摇曳' },
  { id: 'char6-showdown-shiny',name: '异色对战动态',   rarity: 2, image: '/charizard/other/showdown/shiny/6.gif', isAnimated: true, cost: 200, description: '黑色异色对战动态，传说级别' },

  // ── ⭐⭐⭐ 精品：HOME 3D ───────────────────────────────
  { id: 'char6-home',          name: 'HOME 3D喷火龙',  rarity: 3, image: '/charizard/other/home/6.png', isAnimated: false, cost: 500, description: 'Pokemon HOME顶级3D渲染，鳞片纹理清晰' },
  { id: 'char6-home-shiny',    name: 'HOME异色喷火龙',  rarity: 3, image: '/charizard/other/home/shiny/6.png', isAnimated: false, cost: 500, description: 'HOME黑色异色版，神秘黑龙形象' },

  // ── ⭐⭐⭐⭐ 传说：官方高清插图 ──────────────────────────
  { id: 'char6-artwork',       name: '官方插图喷火龙',  rarity: 4, image: '/charizard/other/official-artwork/6.png', isAnimated: false, cost: 1000, description: '官方正式插图，展翅怒吼的王者姿态' },
  { id: 'char6-artwork-shiny', name: '异色官方插图',    rarity: 4, image: '/charizard/other/official-artwork/shiny/6.png', isAnimated: false, cost: 1000, description: '黑色异色官方插图，最受欢迎的异色之一' },
  { id: 'char6-oras-shiny',    name: 'ORAS异色喷火龙',  rarity: 4, image: '/charizard/versions/generation-vi/omegaruby-alphasapphire/shiny/6.png', isAnimated: false, cost: 1000, description: 'ΩRαS超进化时代的异色版本' },

  // ── ⭐⭐⭐⭐⭐ 限定：Dream World ─────────────────────────
  { id: 'char6-dreamworld',    name: 'Dream World喷火龙',rarity: 5, image: '/charizard/other/dream-world/6.svg', isAnimated: false, cost: 2000, description: '梦想世界限定插图，侧身展翅的帅气造型' },
];
