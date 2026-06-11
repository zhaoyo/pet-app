export type Rarity = 1 | 2 | 3 | 4 | 5;

export interface PikachuCard {
  id: string;
  name: string;
  rarity: Rarity;        // 1=普通 2=稀有 3=精品 4=传说 5=限定
  image: string;         // 相对于 /public 的路径
  isAnimated: boolean;
  cost: number;          // 抽卡积分消耗
  description: string;
}

export const RARITY_LABEL: Record<Rarity, string> = {
  1: '普通',
  2: '稀有',
  3: '精品',
  4: '传说',
  5: '限定',
};

export const RARITY_COLOR: Record<Rarity, string> = {
  1: '#9CA3AF',
  2: '#3B82F6',
  3: '#A855F7',
  4: '#F59E0B',
  5: '#EC4899',
};

export const RARITY_COST: Record<Rarity, number> = {
  1: 100,
  2: 500,
  3: 1500,
  4: 5000,
  5: 10000,
};

export const PIKACHU_CARDS: PikachuCard[] = [
  // ── ⭐ 普通：各世代像素图 ──────────────────────────────
  {
    id: 'gen1-red-blue',
    name: '初代皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-i/red-blue/25.png',
    isAnimated: false,
    cost: 100,
    description: '1996年红蓝版登场，胖胖的可爱造型',
  },
  {
    id: 'gen1-yellow',
    name: '黄版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-i/yellow/25.png',
    isAnimated: false,
    cost: 100,
    description: '皮卡丘版专属主角',
  },
  {
    id: 'gen2-gold',
    name: '金版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-ii/gold/25.png',
    isAnimated: false,
    cost: 100,
    description: '第二世代金银版，开始变苗条',
  },
  {
    id: 'gen2-silver',
    name: '银版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-ii/silver/25.png',
    isAnimated: false,
    cost: 100,
    description: '银版皮卡丘，沉稳低调',
  },
  {
    id: 'gen2-crystal',
    name: '水晶版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-ii/crystal/25.png',
    isAnimated: false,
    cost: 100,
    description: '水晶版专属配色',
  },
  {
    id: 'gen3-ruby-sapphire',
    name: '宝石版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-iii/ruby-sapphire/25.png',
    isAnimated: false,
    cost: 100,
    description: '第三世代红宝石蓝宝石',
  },
  {
    id: 'gen3-emerald',
    name: '绿宝石皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-iii/emerald/25.png',
    isAnimated: false,
    cost: 100,
    description: '绿宝石版，神秘感十足',
  },
  {
    id: 'gen3-firered',
    name: '火红版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-iii/firered-leafgreen/25.png',
    isAnimated: false,
    cost: 100,
    description: '火红叶绿复刻版',
  },
  {
    id: 'gen4-diamond-pearl',
    name: '钻石珍珠皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-iv/diamond-pearl/25.png',
    isAnimated: false,
    cost: 100,
    description: '第四世代，画质大幅提升',
  },
  {
    id: 'gen4-platinum',
    name: '白金版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-iv/platinum/25.png',
    isAnimated: false,
    cost: 100,
    description: '白金版限定配色',
  },
  {
    id: 'gen5-black-white',
    name: '黑白版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-v/black-white/25.png',
    isAnimated: false,
    cost: 100,
    description: '第五世代黑白版',
  },
  {
    id: 'gen6-xy',
    name: 'XY版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-vi/x-y/25.png',
    isAnimated: false,
    cost: 100,
    description: '第六世代3D时代来临',
  },
  {
    id: 'gen7-usun',
    name: '究极日月皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-vii/ultra-sun-ultra-moon/25.png',
    isAnimated: false,
    cost: 100,
    description: '第七世代阿罗拉地区',
  },
  {
    id: 'gen8-bdsp',
    name: '晶灿钻石皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-viii/brilliant-diamond-shining-pearl/25.png',
    isAnimated: false,
    cost: 100,
    description: '第八世代晶灿复刻',
  },
  {
    id: 'gen9-scarlet-violet',
    name: '朱紫版皮卡丘',
    rarity: 1,
    image: '/pikachu/versions/generation-ix/scarlet-violet/25.png',
    isAnimated: false,
    cost: 100,
    description: '最新第九世代朱紫版',
  },

  // ── ⭐⭐ 稀有：动态 GIF ────────────────────────────────
  {
    id: 'animated-bw',
    name: '黑白动态皮卡丘',
    rarity: 2,
    image: '/pikachu/versions/generation-v/black-white/animated/25.gif',
    isAnimated: true,
    cost: 500,
    description: '黑白版战斗动画，活力满满',
  },
  {
    id: 'animated-bw-female',
    name: '黑白动态♀皮卡丘',
    rarity: 2,
    image: '/pikachu/versions/generation-v/black-white/animated/female/25.gif',
    isAnimated: true,
    cost: 500,
    description: '雌性皮卡丘，心形尾巴',
  },
  {
    id: 'animated-bw-shiny',
    name: '黑白闪光动态',
    rarity: 2,
    image: '/pikachu/versions/generation-v/black-white/animated/shiny/25.gif',
    isAnimated: true,
    cost: 500,
    description: '闪光色动态版，金色光芒',
  },
  {
    id: 'showdown',
    name: 'Showdown对战皮卡丘',
    rarity: 2,
    image: '/pikachu/other/showdown/25.gif',
    isAnimated: true,
    cost: 500,
    description: '竞技场对战专用动画',
  },
  {
    id: 'showdown-female',
    name: 'Showdown对战♀',
    rarity: 2,
    image: '/pikachu/other/showdown/female/25.gif',
    isAnimated: true,
    cost: 500,
    description: '雌性Showdown对战版',
  },
  {
    id: 'showdown-shiny',
    name: 'Showdown闪光版',
    rarity: 2,
    image: '/pikachu/other/showdown/shiny/25.gif',
    isAnimated: true,
    cost: 500,
    description: '闪光色Showdown动画',
  },

  // ── ⭐⭐⭐ 精品：Home 3D ───────────────────────────────
  {
    id: 'home',
    name: 'HOME 3D皮卡丘',
    rarity: 3,
    image: '/pikachu/other/home/25.png',
    isAnimated: false,
    cost: 1500,
    description: 'Pokémon HOME高清3D渲染，精致细腻',
  },
  {
    id: 'home-female',
    name: 'HOME 3D ♀皮卡丘',
    rarity: 3,
    image: '/pikachu/other/home/female/25.png',
    isAnimated: false,
    cost: 1500,
    description: '雌性HOME版，心形尾巴更清晰',
  },
  {
    id: 'home-shiny',
    name: 'HOME 3D闪光版',
    rarity: 3,
    image: '/pikachu/other/home/shiny/25.png',
    isAnimated: false,
    cost: 1500,
    description: '3D闪光皮卡丘，金银交辉',
  },
  {
    id: 'home-shiny-female',
    name: 'HOME 3D闪光♀',
    rarity: 3,
    image: '/pikachu/other/home/shiny/female/25.png',
    isAnimated: false,
    cost: 1500,
    description: '最精致的雌性闪光版',
  },

  // ── ✨ 传说：官方高清插图 ─────────────────────────────
  {
    id: 'official-artwork',
    name: '官方高清皮卡丘',
    rarity: 4,
    image: '/pikachu/other/official-artwork/25.png',
    isAnimated: false,
    cost: 5000,
    description: '官方最高清插图，标志性形象',
  },
  {
    id: 'official-artwork-shiny',
    name: '官方高清闪光版',
    rarity: 4,
    image: '/pikachu/other/official-artwork/shiny/25.png',
    isAnimated: false,
    cost: 5000,
    description: '官方高清闪光插图，极为珍贵',
  },
  {
    id: 'gen6-oras-shiny',
    name: 'OR/AS闪光皮卡丘',
    rarity: 4,
    image: '/pikachu/versions/generation-vi/omegaruby-alphasapphire/shiny/25.png',
    isAnimated: false,
    cost: 5000,
    description: '欧米伽红宝石闪光版',
  },

  // ── 👑 限定：Dream World SVG ──────────────────────────
  {
    id: 'dream-world',
    name: '梦境世界皮卡丘',
    rarity: 5,
    image: '/pikachu/other/dream-world/25.svg',
    isAnimated: false,
    cost: 10000,
    description: '梦境世界专属矢量形象，全服唯一风格，无限清晰',
  },
];

export const CARDS_BY_RARITY = (rarity: Rarity) =>
  PIKACHU_CARDS.filter(c => c.rarity === rarity);
