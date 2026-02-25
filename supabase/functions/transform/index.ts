import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// 食物艺术数据库
const foodArtDatabase = {
  themes: ['田园风光', '美食肖像', '萌宠食艺', '创意食艺'],
  colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2'],
  stories: [
    '在这片由新鲜蔬果构成的田园里，番茄小太阳温暖地照耀着，翠绿的西兰花树木随风轻摆。每一颗果实都承载着大地的祝福，提醒我们要珍惜自然的馈赠，用健康的生活方式拥抱美好的明天。',
    '当苹果遇见了艺术，它绽放出最灿烂的笑容。这幅由葡萄、橙子和草莓共同创作的肖像，诉说着生命的美好。每一个色彩都在跳跃，每一口甜蜜都在传递：生活，本该如此多彩！',
    '可爱的小狗由蓬松的面包构成，圆圆的眼睛是两颗晶莹的蓝莓。它在奶酪铺成的小路上欢快地奔跑，尾巴是用弯弯的香蕉做成的。这个温馨的画面告诉我们：快乐其实很简单，就藏在 everyday 的美食里。',
    '在宇宙的深处，漂浮着由星星糖构成的银河。巧克力星球缓缓旋转，散发出甜蜜的光芒。这是一幅属于梦想家的画作，提醒我们：即使是最遥远的梦想，也可以从眼前的美食开始品尝。'
  ],
  quotes: [
    '美食是生活的艺术，每一口都是对美好的致敬。',
    '用色彩点亮生活，用美食温暖心灵。',
    '创意无限，美味无边。',
    '在食物中寻找快乐，在快乐中品味人生。'
  ]
};

// 生成食物艺术 SVG
function generateFoodArt() {
  const themeColor = foodArtDatabase.colors[Math.floor(Math.random() * foodArtDatabase.colors.length)];
  const randomIndex = Math.floor(Math.random() * foodArtDatabase.themes.length);
  
  // 生成 SVG
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1a1a1a"/>
        <stop offset="50%" style="stop-color:${themeColor}40"/>
        <stop offset="100%" style="stop-color:#0a0a0a"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#bg)"/>
    
    <circle cx="300" cy="200" r="150" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.3"/>
    <circle cx="300" cy="200" r="120" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.5"/>
    <circle cx="300" cy="200" r="90" fill="none" stroke="#D4AF37" stroke-width="2"/>
    
    <circle cx="300" cy="200" r="70" fill="${themeColor}"/>
    <circle cx="300" cy="200" r="70" fill="none" stroke="#D4AF37" stroke-width="3"/>
    
    ${Array.from({length: 8}, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const x = 300 + Math.cos(angle) * 45;
      const y = 200 + Math.sin(angle) * 45;
      const color = i % 2 === 0 ? '#D4AF37' : '#F4D03F';
      return `<circle cx="${x}" cy="${y}" r="12" fill="${color}"/>`;
    }).join('')}
    
    <circle cx="300" cy="200" r="18" fill="#8B4513"/>
    
    <text x="300" y="360" font-family="serif" font-size="16" fill="#D4AF37" text-anchor="middle">CAFA FOOD ART · ${foodArtDatabase.themes[randomIndex]}</text>
  </svg>`;
  
  return {
    svg: `data:image/svg+xml;base64,${btoa(svg)}`,
    theme: foodArtDatabase.themes[randomIndex],
    story: foodArtDatabase.stories[randomIndex],
    quote: foodArtDatabase.quotes[randomIndex]
  };
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    
    // Health check
    if (url.pathname === '/health') {
      return new Response(
        JSON.stringify({ status: 'ok', message: 'Food Art Transformer API 运行正常' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Transform endpoint
    if (url.pathname === '/transform' && req.method === 'POST') {
      const formData = await req.formData();
      const image = formData.get('image');
      
      if (!image) {
        return new Response(
          JSON.stringify({ error: '请上传图片' }),
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Generate food art
      const result = generateFoodArt();
      
      return new Response(
        JSON.stringify({
          success: true,
          transformedImage: result.svg,
          foodName: result.theme,
          foodStory: result.story,
          quote: result.quote
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
    
    // Default response
    return new Response(
      JSON.stringify({
        name: 'CAFA Food Art Transformer API',
        version: '1.0.0',
        endpoints: {
          health: 'GET /health',
          transform: 'POST /transform'
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});