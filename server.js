const express = require('express');
const multer = require('multer');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 配置 multer 用于文件上传
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB 限制
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('只支持 JPEG, PNG, GIF, WEBP 格式的图片'));
    }
  }
});

// 食物艺术 SVG 模板
const foodArtTemplates = {
  // 风景 - 用水果和蔬菜构建
  landscape: {
    name: '田园风光',
    description: '用新鲜蔬果构建的宁静田园',
    generateSVG: (colors) => generateLandscapeSVG(colors)
  },
  // 人物 - 用食物构建
  portrait: {
    name: '美食肖像',
    description: '用精致食材编织的人物画像',
    generateSVG: (colors) => generatePortraitSVG(colors)
  },
  // 动物 - 用食物构建
  animal: {
    name: '萌宠食艺',
    description: '用可爱食材打造的动物朋友',
    generateSVG: (colors) => generateAnimalSVG(colors)
  },
  // 抽象/其他 - 创意食物艺术
  creative: {
    name: '创意食艺',
    description: '用缤纷食材创作的抽象艺术',
    generateSVG: (colors) => generateCreativeSVG(colors)
  }
};

// 生成田园风景 SVG
function generateLandscapeSVG(colors) {
  const primaryColor = colors[0] || '#4CAF50';
  const secondaryColor = colors[1] || '#FF9800';
  const accentColor = colors[2] || '#2196F3';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#87CEEB"/>
      <stop offset="100%" style="stop-color:#E0F6FF"/>
    </linearGradient>
    <linearGradient id="sun" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#FFD700"/>
      <stop offset="100%" style="stop-color:#FFA500"/>
    </linearGradient>
  </defs>
  
  <!-- 天空 -->
  <rect width="800" height="600" fill="url(#sky)"/>
  
  <!-- 太阳 (橙子) -->
  <circle cx="100" cy="100" r="50" fill="url(#sun)"/>
  <circle cx="85" cy="85" r="8" fill="#FFA500" opacity="0.5"/>
  <circle cx="115" cy="95" r="6" fill="#FFA500" opacity="0.4"/>
  
  <!-- 云朵 (花椰菜) -->
  <g fill="#F5F5F5" opacity="0.9">
    <circle cx="200" cy="80" r="30"/>
    <circle cx="230" cy="70" r="35"/>
    <circle cx="260" cy="80" r="30"/>
    <circle cx="230" cy="90" r="25"/>
  </g>
  <g fill="#F5F5F5" opacity="0.8">
    <circle cx="600" cy="120" r="25"/>
    <circle cx="625" cy="110" r="30"/>
    <circle cx="650" cy="120" r="25"/>
  </g>
  
  <!-- 远山 (生菜山丘) -->
  <path d="M0,400 Q200,250 400,350 T800,300 L800,600 L0,600 Z" fill="#81C784"/>
  <path d="M0,450 Q300,350 600,400 T800,380 L800,600 L0,600 Z" fill="#66BB6A"/>
  
  <!-- 田地 (各种蔬菜田) -->
  <rect x="0" y="450" width="800" height="150" fill="#8D6E63"/>
  
  <!-- 胡萝卜田 -->
  <g fill="#FF7043">
    <ellipse cx="100" cy="480" rx="8" ry="20"/>
    <ellipse cx="130" cy="490" rx="8" ry="22"/>
    <ellipse cx="160" cy="485" rx="8" ry="20"/>
    <ellipse cx="190" cy="495" rx="8" ry="23"/>
  </g>
  <!-- 胡萝卜叶子 -->
  <g fill="#66BB6A">
    <path d="M92,465 Q100,445 108,465"/>
    <path d="M122,475 Q130,455 138,475"/>
    <path d="M152,470 Q160,450 168,470"/>
    <path d="M182,480 Q190,460 198,480"/>
  </g>
  
  <!-- 番茄田 -->
  <g fill="#EF5350">
    <circle cx="300" cy="500" r="15"/>
    <circle cx="340" cy="510" r="16"/>
    <circle cx="380" cy="505" r="15"/>
    <circle cx="320" cy="530" r="14"/>
    <circle cx="360" cy="535" r="15"/>
  </g>
  <!-- 番茄蒂 -->
  <g fill="#4CAF50">
    <path d="M295,490 L300,485 L305,490 L300,495 Z"/>
    <path d="M335,500 L340,495 L345,500 L340,505 Z"/>
    <path d="M375,495 L380,490 L385,495 L380,500 Z"/>
  </g>
  
  <!-- 南瓜田 -->
  <g fill="#FF9800">
    <ellipse cx="550" cy="520" rx="35" ry="28"/>
    <ellipse cx="520" cy="530" rx="30" ry="24"/>
    <ellipse cx="590" cy="525" rx="32" ry="26"/>
  </g>
  <!-- 南瓜纹理 -->
  <g stroke="#F57C00" stroke-width="2" fill="none">
    <path d="M540,500 Q550,520 540,540"/>
    <path d="M560,500 Q550,520 560,540"/>
  </g>
  
  <!-- 树木 (西兰花) -->
  <g transform="translate(50, 350)">
    <rect x="15" y="50" width="10" height="50" fill="#8D6E63"/>
    <circle cx="20" cy="40" r="30" fill="#4CAF50"/>
    <circle cx="5" cy="50" r="20" fill="#43A047"/>
    <circle cx="35" cy="50" r="20" fill="#43A047"/>
    <circle cx="20" cy="20" r="22" fill="#66BB6A"/>
  </g>
  
  <g transform="translate(700, 320)">
    <rect x="20" y="60" width="12" height="60" fill="#8D6E63"/>
    <circle cx="26" cy="45" r="35" fill="#4CAF50"/>
    <circle cx="8" cy="55" r="22" fill="#43A047"/>
    <circle cx="44" cy="55" r="22" fill="#43A047"/>
    <circle cx="26" cy="20" r="25" fill="#66BB6A"/>
  </g>
  
  <!-- 小路 (面包片路径) -->
  <path d="M400,600 Q420,550 400,500 Q380,450 400,400" 
        stroke="#D7CCC8" stroke-width="40" fill="none" stroke-linecap="round"/>
  <path d="M400,600 Q420,550 400,500 Q380,450 400,400" 
        stroke="#BCAAA4" stroke-width="35" fill="none" stroke-linecap="round"/>
  
  <!-- 蝴蝶 (花瓣) -->
  <g transform="translate(500, 200)">
    <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#E91E63" opacity="0.8"/>
    <ellipse cx="0" cy="10" rx="12" ry="18" fill="#E91E63" opacity="0.8"/>
    <ellipse cx="25" cy="-8" rx="15" ry="20" fill="#F48FB1" opacity="0.8"/>
    <ellipse cx="25" cy="8" rx="12" ry="18" fill="#F48FB1" opacity="0.8"/>
    <rect x="10" y="-15" width="5" height="30" rx="2" fill="#5D4037"/>
  </g>
  
  <!-- 标题 -->
  <text x="400" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#2E7D32">🥗 蔬果田园 🥗</text>
</svg>`;
}

// 生成人物肖像 SVG
function generatePortraitSVG(colors) {
  const primaryColor = colors[0] || '#FF9800';
  const secondaryColor = colors[1] || '#F5F5F5';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bg" cx="50%" cy="50%" r="50%">
      <stop offset="0%" style="stop-color:#FFF8E1"/>
      <stop offset="100%" style="stop-color:#FFECB3"/>
    </radialGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="600" fill="url(#bg)"/>
  
  <!-- 脸部轮廓 (面包/煎饼) -->
  <ellipse cx="400" cy="300" rx="180" ry="200" fill="#FFCC80"/>
  <ellipse cx="400" cy="300" rx="170" ry="190" fill="#FFE0B2"/>
  
  <!-- 脸部光泽 -->
  <ellipse cx="340" cy="240" rx="40" ry="30" fill="#FFF3E0" opacity="0.6"/>
  
  <!-- 头发 (面条/意大利面) -->
  <g fill="none" stroke="#FFD54F" stroke-width="8" stroke-linecap="round">
    <path d="M250,200 Q280,150 320,180"/>
    <path d="M280,170 Q310,120 350,160"/>
    <path d="M320,150 Q350,100 390,140"/>
    <path d="M360,140 Q390,90 430,130"/>
    <path d="M400,135 Q430,85 470,125"/>
    <path d="M440,140 Q470,90 510,130"/>
    <path d="M480,160 Q510,110 550,150"/>
    <path d="M520,190 Q550,140 580,180"/>
  </g>
  <g fill="none" stroke="#FFCA28" stroke-width="6" stroke-linecap="round">
    <path d="M270,220 Q300,180 330,210"/>
    <path d="M320,200 Q350,160 380,190"/>
    <path d="M370,190 Q400,150 430,180"/>
    <path d="M420,185 Q450,145 480,175"/>
    <path d="M470,195 Q500,155 530,185"/>
  </g>
  
  <!-- 眼睛 (橄榄/葡萄) -->
  <g>
    <!-- 左眼 -->
    <ellipse cx="330" cy="280" rx="35" ry="40" fill="#FFF"/>
    <circle cx="330" cy="280" r="25" fill="#8BC34A"/>
    <circle cx="330" cy="280" r="15" fill="#33691E"/>
    <circle cx="338" cy="272" r="6" fill="#FFF"/>
    <!-- 眉毛 (葱段) -->
    <path d="M290,240 Q330,230 370,245" stroke="#4CAF50" stroke-width="8" stroke-linecap="round" fill="none"/>
  </g>
  
  <g>
    <!-- 右眼 -->
    <ellipse cx="470" cy="280" rx="35" ry="40" fill="#FFF"/>
    <circle cx="470" cy="280" r="25" fill="#8BC34A"/>
    <circle cx="470" cy="280" r="15" fill="#33691E"/>
    <circle cx="478" cy="272" r="6" fill="#FFF"/>
    <!-- 眉毛 -->
    <path d="M430,245 Q470,230 510,240" stroke="#4CAF50" stroke-width="8" stroke-linecap="round" fill="none"/>
  </g>
  
  <!-- 鼻子 (胡萝卜) -->
  <path d="M400,300 L385,360 L400,370 L415,360 Z" fill="#FF7043"/>
  <ellipse cx="400" cy="370" rx="15" ry="8" fill="#FF8A65"/>
  
  <!-- 腮红 (番茄片) -->
  <ellipse cx="280" cy="340" rx="30" ry="20" fill="#EF5350" opacity="0.4"/>
  <ellipse cx="520" cy="340" rx="30" ry="20" fill="#EF5350" opacity="0.4"/>
  
  <!-- 嘴巴 (草莓/樱桃) -->
  <path d="M350,400 Q400,450 450,400" stroke="#E91E63" stroke-width="15" stroke-linecap="round" fill="none"/>
  <ellipse cx="375" cy="415" rx="10" ry="8" fill="#F48FB1"/>
  <ellipse cx="425" cy="415" rx="10" ry="8" fill="#F48FB1"/>
  
  <!-- 耳朵 (蘑菇) -->
  <g transform="translate(180, 300)">
    <ellipse cx="0" cy="0" rx="30" ry="40" fill="#D7CCC8"/>
    <path d="M-25,-10 Q0,-50 25,-10" fill="#8D6E63"/>
  </g>
  <g transform="translate(620, 300)">
    <ellipse cx="0" cy="0" rx="30" ry="40" fill="#D7CCC8"/>
    <path d="M-25,-10 Q0,-50 25,-10" fill="#8D6E63"/>
  </g>
  
  <!-- 领结 (蝴蝶结意面) -->
  <g transform="translate(400, 520)">
    <path d="M0,0 Q-30,-20 -50,0 Q-30,20 0,0" fill="#FFCC80" stroke="#FFB74D" stroke-width="2"/>
    <path d="M0,0 Q30,-20 50,0 Q30,20 0,0" fill="#FFCC80" stroke="#FFB74D" stroke-width="2"/>
    <circle cx="0" cy="0" r="10" fill="#FFB74D"/>
  </g>
  
  <!-- 装饰元素 - 漂浮的食物 -->
  <g opacity="0.7">
    <circle cx="100" cy="100" r="20" fill="#FF7043"/>
    <circle cx="700" cy="150" r="25" fill="#66BB6A"/>
    <circle cx="150" cy="500" r="18" fill="#FFD54F"/>
    <circle cx="650" cy="480" r="22" fill="#EF5350"/>
  </g>
  
  <!-- 标题 -->
  <text x="400" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#E65100">🍝 美食肖像 🍝</text>
</svg>`;
}

// 生成动物 SVG
function generateAnimalSVG(colors) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky2" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:#B3E5FC"/>
      <stop offset="100%" style="stop-color:#E1F5FE"/>
    </linearGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="600" fill="url(#sky2)"/>
  
  <!-- 地面 (草地沙拉) -->
  <rect x="0" y="450" width="800" height="150" fill="#A5D6A7"/>
  <g fill="#81C784">
    <path d="M0,450 Q50,430 100,450 Q150,470 200,450 Q250,430 300,450 Q350,470 400,450 Q450,430 500,450 Q550,470 600,450 Q650,430 700,450 Q750,470 800,450 L800,600 L0,600 Z"/>
  </g>
  
  <!-- 小猫主体 (橙子/柑橘) -->
  <g transform="translate(400, 350)">
    <!-- 身体 -->
    <ellipse cx="0" cy="50" rx="100" ry="80" fill="#FF9800"/>
    <ellipse cx="0" cy="50" rx="90" ry="70" fill="#FFB74D"/>
    
    <!-- 身体纹理 -->
    <g fill="#F57C00" opacity="0.5">
      <ellipse cx="-30" cy="30" rx="15" ry="10"/>
      <ellipse cx="20" cy="60" rx="12" ry="8"/>
      <ellipse cx="-20" cy="80" rx="14" ry="9"/>
      <ellipse cx="40" cy="40" rx="10" ry="7"/>
    </g>
    
    <!-- 头部 -->
    <circle cx="0" cy="-30" r="70" fill="#FF9800"/>
    <circle cx="0" cy="-30" r="60" fill="#FFB74D"/>
    
    <!-- 耳朵 (橙子切片) -->
    <path d="M-50,-70 L-70,-120 L-20,-85 Z" fill="#FF9800"/>
    <path d="M-55,-75 L-68,-110 L-30,-85 Z" fill="#FFE0B2"/>
    <path d="M50,-70 L70,-120 L20,-85 Z" fill="#FF9800"/>
    <path d="M55,-75 L68,-110 L30,-85 Z" fill="#FFE0B2"/>
    
    <!-- 眼睛 (橄榄) -->
    <ellipse cx="-25" cy="-40" rx="18" ry="22" fill="#FFF"/>
    <circle cx="-25" cy="-40" r="12" fill="#4CAF50"/>
    <circle cx="-25" cy="-40" r="6" fill="#1B5E20"/>
    <circle cx="-22" cy="-45" r="4" fill="#FFF"/>
    
    <ellipse cx="25" cy="-40" rx="18" ry="22" fill="#FFF"/>
    <circle cx="25" cy="-40" r="12" fill="#4CAF50"/>
    <circle cx="25" cy="-40" r="6" fill="#1B5E20"/>
    <circle cx="28" cy="-45" r="4" fill="#FFF"/>
    
    <!-- 鼻子 (小番茄) -->
    <ellipse cx="0" cy="-15" rx="8" ry="6" fill="#EF5350"/>
    
    <!-- 嘴巴 -->
    <path d="M-15,-5 Q0,5 15,-5" stroke="#E65100" stroke-width="3" fill="none"/>
    
    <!-- 胡须 (葱丝) -->
    <g stroke="#C8E6C9" stroke-width="2">
      <line x1="-80" y1="-20" x2="-50" y2="-15"/>
      <line x1="-80" y1="-10" x2="-50" y2="-10"/>
      <line x1="-80" y1="0" x2="-50" y2="-5"/>
      <line x1="80" y1="-20" x2="50" y2="-15"/>
      <line x1="80" y1="-10" x2="50" y2="-10"/>
      <line x1="80" y1="0" x2="50" y2="-5"/>
    </g>
    
    <!-- 脸颊 (桃子) -->
    <ellipse cx="-50" cy="-20" rx="15" ry="10" fill="#FFAB91" opacity="0.6"/>
    <ellipse cx="50" cy="-20" rx="15" ry="10" fill="#FFAB91" opacity="0.6"/>
    
    <!-- 尾巴 (香蕉) -->
    <path d="M80,80 Q130,60 120,20 Q110,-10 90,0" stroke="#FFE082" stroke-width="25" fill="none" stroke-linecap="round"/>
    <path d="M80,80 Q130,60 120,20" stroke="#FFD54F" stroke-width="20" fill="none" stroke-linecap="round"/>
    
    <!-- 爪子 (棉花糖) -->
    <ellipse cx="-40" cy="110" rx="20" ry="15" fill="#FFF"/>
    <ellipse cx="40" cy="110" rx="20" ry="15" fill="#FFF"/>
  </g>
  
  <!-- 周围的小装饰 -->
  <g>
    <!-- 蝴蝶1 -->
    <g transform="translate(200, 200)">
      <ellipse cx="0" cy="-10" rx="12" ry="15" fill="#CE93D8"/>
      <ellipse cx="0" cy="10" rx="10" ry="13" fill="#CE93D8"/>
      <ellipse cx="20" cy="-8" rx="12" ry="15" fill="#E1BEE7"/>
      <ellipse cx="20" cy="8" rx="10" ry="13" fill="#E1BEE7"/>
      <rect x="8" y="-12" width="4" height="24" rx="2" fill="#6A1B9A"/>
    </g>
    
    <!-- 蝴蝶2 -->
    <g transform="translate(600, 250)">
      <ellipse cx="0" cy="-10" rx="10" ry="13" fill="#90CAF9"/>
      <ellipse cx="0" cy="10" rx="8" ry="11" fill="#90CAF9"/>
      <ellipse cx="18" cy="-8" rx="10" ry="13" fill="#BBDEFB"/>
      <ellipse cx="18" cy="8" rx="8" ry="11" fill="#BBDEFB"/>
      <rect x="7" y="-10" width="4" height="20" rx="2" fill="#1565C0"/>
    </g>
  </g>
  
  <!-- 花朵装饰 -->
  <g transform="translate(150, 480)">
    <circle cx="0" cy="0" r="15" fill="#F48FB1"/>
    <circle cx="0" cy="0" r="8" fill="#F8BBD0"/>
    <circle cx="-20" cy="-5" r="12" fill="#CE93D8"/>
    <circle cx="20" cy="-5" r="12" fill="#CE93D8"/>
    <circle cx="0" cy="-25" r="12" fill="#CE93D8"/>
  </g>
  
  <g transform="translate(650, 500)">
    <circle cx="0" cy="0" r="15" fill="#FFAB91"/>
    <circle cx="0" cy="0" r="8" fill="#FFCCBC"/>
    <circle cx="-20" cy="-5" r="12" fill="#FFCC80"/>
    <circle cx="20" cy="-5" r="12" fill="#FFCC80"/>
    <circle cx="0" cy="-25" r="12" fill="#FFCC80"/>
  </g>
  
  <!-- 标题 -->
  <text x="400" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#E65100">🍊 萌宠食艺 🍊</text>
</svg>`;
}

// 生成创意抽象 SVG
function generateCreativeSVG(colors) {
  const c1 = colors[0] || '#FF5722';
  const c2 = colors[1] || '#4CAF50';
  const c3 = colors[2] || '#2196F3';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="creativeBg" cx="50%" cy="50%" r="70%">
      <stop offset="0%" style="stop-color:#FFFDE7"/>
      <stop offset="100%" style="stop-color:#FFF9C4"/>
    </radialGradient>
  </defs>
  
  <!-- 背景 -->
  <rect width="800" height="600" fill="url(#creativeBg)"/>
  
  <!-- 中心太阳 (橙子切片) -->
  <g transform="translate(400, 300)">
    <!-- 外圈 -->
    <circle cx="0" cy="0" r="150" fill="#FF9800"/>
    <circle cx="0" cy="0" r="140" fill="#FFB74D"/>
    
    <!-- 橙子瓣 -->
    <g fill="#FFCC80">
      <path d="M0,0 L0,-135 A135,135 0 0,1 95,-95 Z"/>
      <path d="M0,0 L95,-95 A135,135 0 0,1 135,0 Z"/>
      <path d="M0,0 L135,0 A135,135 0 0,1 95,95 Z"/>
      <path d="M0,0 L95,95 A135,135 0 0,1 0,135 Z"/>
      <path d="M0,0 L0,135 A135,135 0 0,1 -95,95 Z"/>
      <path d="M0,0 L-95,95 A135,135 0 0,1 -135,0 Z"/>
      <path d="M0,0 L-135,0 A135,135 0 0,1 -95,-95 Z"/>
      <path d="M0,0 L-95,-95 A135,135 0 0,1 0,-135 Z"/>
    </g>
    
    <!-- 膜 -->
    <g stroke="#FFE0B2" stroke-width="2" fill="none">
      <line x1="0" y1="0" x2="0" y2="-135"/>
      <line x1="0" y1="0" x2="95" y2="-95"/>
      <line x1="0" y1="0" x2="135" y2="0"/>
      <line x1="0" y1="0" x2="95" y2="95"/>
      <line x1="0" y1="0" x2="0" y2="135"/>
      <line x1="0" y1="0" x2="-95" y2="95"/>
      <line x1="0" y1="0" x2="-135" y2="0"/>
      <line x1="0" y1="0" x2="-95" y2="-95"/>
    </g>
    
    <!-- 中心 -->
    <circle cx="0" cy="0" r="20" fill="#FFF8E1"/>
  </g>
  
  <!-- 轨道上的行星 (各种水果) -->
  <!-- 轨道1 -->
  <ellipse cx="400" cy="300" rx="220" ry="180" fill="none" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="5,5"/>
  
  <!-- 葡萄星球 -->
  <g transform="translate(620, 300)">
    <circle cx="-15" cy="-10" r="18" fill="#9C27B0"/>
    <circle cx="15" cy="-10" r="18" fill="#9C27B0"/>
    <circle cx="0" cy="10" r="18" fill="#9C27B0"/>
    <circle cx="-8" cy="0" r="12" fill="#AB47BC"/>
    <circle cx="8" cy="0" r="12" fill="#AB47BC"/>
    <circle cx="0" cy="-18" r="10" fill="#BA68C8"/>
  </g>
  
  <!-- 轨道2 -->
  <ellipse cx="400" cy="300" rx="280" ry="220" fill="none" stroke="#E0E0E0" stroke-width="1" stroke-dasharray="5,5"/>
  
  <!-- 西瓜星球 -->
  <g transform="translate(120, 300)">
    <circle cx="0" cy="0" r="35" fill="#4CAF50"/>
    <circle cx="0" cy="0" r="30" fill="#FF5252"/>
    <circle cx="0" cy="0" r="25" fill="#FF8A80"/>
    <!-- 西瓜籽 -->
    <g fill="#3E2723">
      <ellipse cx="-10" cy="-10" rx="3" ry="5"/>
      <ellipse cx="10" cy="-8" rx="3" ry="5"/>
      <ellipse cx="0" cy="12" rx="3" ry="5"/>
      <ellipse cx="-12" cy="8" rx="3" ry="5"/>
      <ellipse cx="12" cy="10" rx="3" ry="5"/>
    </g>
  </g>
  
  <!-- 草莓星球 -->
  <g transform="translate(400, 80)">
    <path d="M0,30 Q-25,30 -25,0 Q-25,-30 0,-35 Q25,-30 25,0 Q25,30 0,30" fill="#E91E63"/>
    <path d="M0,25 Q-20,25 -20,0 Q-20,-25 0,-28 Q20,-25 20,0 Q20,25 0,25" fill="#F48FB1"/>
    <!-- 草莓籽 -->
    <g fill="#FFEB3B">
      <circle cx="-10" cy="-10" r="1.5"/>
      <circle cx="10" cy="-8" r="1.5"/>
      <circle cx="0" cy="10" r="1.5"/>
      <circle cx="-12" cy="5" r="1.5"/>
      <circle cx="12" cy="8" r="1.5"/>
      <circle cx="-8" cy="-18" r="1.5"/>
      <circle cx="8" cy="-15" r="1.5"/>
    </g>
    <!-- 叶子 -->
    <path d="M0,-32 L-8,-45 L-3,-35 L0,-42 L3,-35 L8,-45 Z" fill="#4CAF50"/>
  </g>
  
  <!-- 蓝莓星球 -->
  <g transform="translate(400, 520)">
    <circle cx="0" cy="0" r="30" fill="#1976D2"/>
    <circle cx="0" cy="0" r="25" fill="#2196F3"/>
    <ellipse cx="-8" cy="-8" rx="8" ry="5" fill="#64B5F6" opacity="0.5"/>
    <!-- 蓝莓口 -->
    <path d="M-5,-5 Q0,0 5,-5" stroke="#0D47A1" stroke-width="2" fill="none"/>
  </g>
  
  <!-- 漂浮的食物粒子 -->
  <g opacity="0.8">
    <circle cx="100" cy="150" r="8" fill="#FF7043"/>
    <circle cx="700" cy="180" r="10" fill="#66BB6A"/>
    <circle cx="200" cy="500" r="7" fill="#FFD54F"/>
    <circle cx="600" cy="480" r="9" fill="#EF5350"/>
    <circle cx="80" cy="400" r="6" fill="#AB47BC"/>
    <circle cx="720" cy="420" r="8" fill="#42A5F5"/>
  </g>
  
  <!-- 星形装饰 (星果切片) -->
  <g transform="translate(250, 180)">
    <polygon points="0,-20 6,-6 20,-6 10,4 14,18 0,10 -14,18 -10,4 -20,-6 -6,-6" fill="#FFEB3B"/>
  </g>
  <g transform="translate(550, 200)">
    <polygon points="0,-15 5,-5 15,-5 8,2 11,14 0,8 -11,14 -8,2 -15,-5 -5,-5" fill="#FFEB3B"/>
  </g>
  <g transform="translate(200, 400)">
    <polygon points="0,-18 6,-6 18,-6 9,3 12,16 0,9 -12,16 -9,3 -18,-6 -6,-6" fill="#FFEB3B"/>
  </g>
  <g transform="translate(600, 380)">
    <polygon points="0,-16 5,-5 16,-5 8,2 11,15 0,8 -11,15 -8,2 -16,-5 -5,-5" fill="#FFEB3B"/>
  </g>
  
  <!-- 标题 -->
  <text x="400" y="50" text-anchor="middle" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#F57C00">🌟 创意食艺宇宙 🌟</text>
</svg>`;
}

// 分析图片颜色（模拟）
function analyzeImageColors(buffer) {
  // 基于文件大小和内容生成一些伪随机但一致的颜色
  const hash = buffer.reduce((acc, byte) => (acc + byte) % 1000, 0);
  
  const palettes = [
    ['#FF5722', '#FF9800', '#FFC107'], // 暖色调
    ['#4CAF50', '#8BC34A', '#CDDC39'], // 绿色调
    ['#2196F3', '#03A9F4', '#00BCD4'], // 蓝色调
    ['#9C27B0', '#E91E63', '#F44336'], // 紫红调
    ['#795548', '#8D6E63', '#A1887F'], // 棕色调
    ['#607D8B', '#90A4AE', '#B0BEC5'], // 灰蓝调
  ];
  
  return palettes[hash % palettes.length];
}

// 检测图片类型（模拟）
function detectImageType(buffer) {
  const hash = buffer.reduce((acc, byte) => (acc + byte) % 100, 0);
  
  if (hash < 25) return 'landscape';
  if (hash < 50) return 'portrait';
  if (hash < 75) return 'animal';
  return 'creative';
}

// 生成故事描述
function generateStory(imageType, colors) {
  const stories = {
    landscape: [
      "在这片神奇的蔬果田园里，每一颗胡萝卜都怀揣着成长的梦想，每一颗番茄都绽放着生命的热情。阳光像金色的蜂蜜一样洒在田野上，西兰花树木守护着这片充满希望的土地。愿你像这些小蔬菜一样，在生活的土壤中扎根，向着阳光茁壮成长！🌱",
      "这是一幅用大自然最珍贵的礼物绘制的田园画卷。橙子太阳温暖地照耀着，花椰菜云朵悠闲地飘过，而田地里的蔬菜们正在开一场欢乐的派对。生活就像这片田园，只要用心耕耘，总会收获满满的幸福！🥕",
      "当第一缕晨光穿透花椰菜云朵，蔬果田园便苏醒了。胡萝卜伸了个懒腰，番茄露出了红彤彤的笑脸，南瓜们则在低声交谈着今天的计划。这片土地教会我们：每一天都是新的开始，每一刻都值得期待！☀️"
    ],
    portrait: [
      "这位美食肖像的主角，是由最精致的食材编织而成。面条头发飘逸灵动，橄榄眼睛闪烁着智慧的光芒，草莓嘴巴总是挂着甜蜜的微笑。它告诉我们：美丽源于内心的丰富，就像这些食材汇聚成一幅动人的画卷。做最好的自己，你就是生活中最美的艺术品！🎨",
      "用意大利面的柔韧、橄榄的醇厚、草莓的甜美，我们创造了这张充满生命力的面孔。每一个食材都有它的故事，就像你的每一个经历都塑造了今天的你。拥抱自己的独特，因为你是这个世界上无可替代的存在！✨",
      "当面包的温润遇见蔬菜的清新，当水果的甜美融入面食的醇厚，这幅肖像便有了灵魂。它微笑着对你说：无论生活给你什么食材，你都可以烹饪出属于自己的美味人生。相信自己，你比想象中更棒！🌟"
    ],
    animal: [
      "这只可爱的小橘猫，是由阳光般的橙子和柔软的棉花糖组成的。它的橄榄眼睛里有星辰大海，香蕉尾巴摇动着快乐的节拍。它想告诉你：生活不必太复杂，像猫咪一样享受当下，晒晒太阳、伸伸懒腰，幸福就在这些简单的瞬间。喵~ 🐱",
      "在这个由食物构成的童话世界里，小橘猫是快乐的使者。它的毛发散发着柑橘的清香，它的脚步轻盈如蝴蝶。每当它走过，草地上就会开出花朵。愿你也像它一样，给身边的人带来温暖和欢乐！🌸",
      "小橘猫今天决定展开一场冒险！它要穿过生菜森林，越过番茄山丘，去寻找传说中的彩虹糖果。无论路途多远，它都充满信心。这就是生活的态度：保持好奇，勇敢探索，每一天都是一场精彩的冒险！🌈"
    ],
    creative: [
      "欢迎来到创意食艺宇宙！在这里，橙子是太阳，葡萄是星球，西瓜和草莓在轨道上跳舞。这个宇宙告诉我们：想象力是无限的，就像宇宙本身一样辽阔。不要限制你的梦想，因为你拥有创造无限可能的力量！🚀",
      "当艺术遇见美食，当创意碰撞色彩，这个奇妙的宇宙便诞生了。每一颗水果星球都有自己的故事，每一道光芒都代表着希望。你是自己宇宙的创造者，用热情点亮每一颗星星，用创意绘制属于你的银河！⭐",
      "在这个食艺宇宙中，一切皆有可能。橙子可以发光，蓝莓可以歌唱，星果可以许愿。这是一个关于可能性的宇宙——提醒你：不要被常规束缚，敢于想象，敢于不同，你就是那个让奇迹发生的人！🌟"
    ]
  };
  
  const typeStories = stories[imageType] || stories.creative;
  const hash = colors[0].charCodeAt(1) % typeStories.length;
  return typeStories[hash];
}

// 生成积极正能量语录
function generateQuote() {
  const quotes = [
    "生活就像一道菜，用心烹饪就会有美味的结果。",
    "你是自己人生的主厨，每一刻都可以创造精彩。",
    "像阳光下的水果一样，绽放你最甜美的笑容。",
    "每一天都是新鲜的食材，等待你用心烹制。",
    "相信自己，你拥有让生活更美好的所有原料。",
    "用感恩的心品尝生活，每一口都是甜蜜。",
    "你的独特就像珍稀食材，世界因你而更丰富。",
    "保持新鲜，保持活力，你是生活最美的风景。"
  ];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

// API 路由

// 健康检查
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Food Art Transformer API 运行正常',
    timestamp: new Date().toISOString()
  });
});

// 主页
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>🍕 食物艺术转化器 API</title>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 800px; 
          margin: 50px auto; 
          padding: 20px;
          background: linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%);
          color: #5D4037;
        }
        h1 { color: #E65100; }
        .endpoint { 
          background: #fff; 
          padding: 15px; 
          border-radius: 8px; 
          margin: 10px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        code { 
          background: #f5f5f5; 
          padding: 2px 6px; 
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        }
        .upload-form {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          margin-top: 20px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        input[type="file"] { margin: 10px 0; }
        button {
          background: #FF9800;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
        }
        button:hover { background: #F57C00; }
        .preview { margin-top: 20px; }
        .preview img { max-width: 100%; border-radius: 8px; }
      </style>
    </head>
    <body>
      <h1>🍕 食物艺术转化器 API 🍕</h1>
      <p>将您的图片转化为充满正能量的食物艺术作品！</p>
      
      <h2>API 端点</h2>
      <div class="endpoint">
        <strong>POST /api/transform</strong><br>
        上传图片进行转化<br>
        Content-Type: multipart/form-data<br>
        参数: <code>image</code> - 图片文件 (支持 JPG, PNG, GIF, WEBP)
      </div>
      
      <div class="endpoint">
        <strong>GET /health</strong><br>
        健康检查
      </div>
      
      <div class="upload-form">
        <h3>🎨 在线体验</h3>
        <form id="uploadForm">
          <input type="file" id="imageInput" accept="image/*" required><br>
          <button type="submit">✨ 开始转化</button>
        </form>
        <div id="result" class="preview"></div>
      </div>
      
      <script>
        document.getElementById('uploadForm').onsubmit = async (e) => {
          e.preventDefault();
          const fileInput = document.getElementById('imageInput');
          const file = fileInput.files[0];
          if (!file) {
            alert('请选择图片');
            return;
          }
          
          const resultDiv = document.getElementById('result');
          resultDiv.innerHTML = '<p>🎨 正在创作中，请稍候...</p>';
          
          // 读取文件为 base64
          const reader = new FileReader();
          reader.onload = async function(e) {
            const base64Image = e.target.result.split(',')[1];
            
            try {
              const response = await fetch('/api/transform', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  image: base64Image,
                  filename: file.name
                })
              });
              const data = await response.json();
              
              if (data.success) {
                const svgBase64 = btoa(unescape(encodeURIComponent(data.data.svgImage)));
                resultDiv.innerHTML = '\n                  <h3>✨ 转化成功！</h3>\n                  <p><strong>' + data.data.artworkName + '</strong></p>\n                  <p>' + data.data.description + '</p>\n                  <img src="data:image/svg+xml;base64,' + svgBase64 + '" alt="Food Art">\n                  <h4>📖 故事</h4>\n                  <p>' + data.data.story + '</p>\n                  <h4>💫 正能量语录</h4>\n                  <p><em>' + data.data.quote + '</em></p>\n                ';
              } else {
                resultDiv.innerHTML = '<p style="color:red">❌ 转化失败: ' + data.message + '</p>';
              }
            } catch (error) {
              resultDiv.innerHTML = '<p style="color:red">❌ 错误: ' + error.message + '</p>';
            }
          };
          reader.readAsDataURL(file);
        };
      </script>
    </body>
    </html>
  `);
});

// 图片转化 API - 支持 Base64
app.post('/api/transform', express.json({ limit: '10mb' }), async (req, res) => {
  try {
    const { image, filename } = req.body;
    
    if (!image) {
      return res.status(400).json({
        success: false,
        message: '请上传图片文件'
      });
    }

    // Base64 转 Buffer
    const imageBuffer = Buffer.from(image, 'base64');
    
    // 分析图片
    const colors = analyzeImageColors(imageBuffer);
    const imageType = detectImageType(imageBuffer);
    
    // 获取对应的模板
    const template = foodArtTemplates[imageType];
    
    // 生成 SVG 图片
    const svgImage = template.generateSVG(colors);
    
    // 生成故事和语录
    const story = generateStory(imageType, colors);
    const quote = generateQuote();
    
    // 构建响应
    const result = {
      success: true,
      data: {
        originalName: filename || 'uploaded-image',
        artworkName: template.name,
        description: template.description,
        imageType: imageType,
        dominantColors: colors,
        svgImage: svgImage,
        story: story,
        quote: quote,
        createdAt: new Date().toISOString()
      }
    };

    res.json(result);
    
  } catch (error) {
    console.error('转化错误:', error);
    res.status(500).json({
      success: false,
      message: '图片转化失败: ' + error.message
    });
  }
});

// 错误处理
app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '图片大小超过 10MB 限制'
      });
    }
  }
  res.status(500).json({
    success: false,
    message: error.message || '服务器错误'
  });
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🍕 食物艺术转化器 API 服务已启动`);
  console.log(`📍 访问地址: http://localhost:${PORT}`);
  console.log(`📖 API 文档: http://localhost:${PORT}/`);
  console.log(`💚 健康检查: http://localhost:${PORT}/health`);
});

module.exports = app;
