/**
 * Full-page demo HTML templates for the top 10 styles.
 * Each template is a self-contained HTML string with inline CSS.
 */

function makeDemo(title: string, css: string, bodyContent: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>${title}</title>
<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; }
${css}
</style>
</head>
<body>
${bodyContent}
</body>
</html>`
}

const minimalism = makeDemo(
  'Minimalism Demo',
  `body { background: #fff; color: #000; }
header { padding: 2rem 4rem; border-bottom: 1px solid #eee; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; font-weight: 700; }
header nav a { margin-left: 2rem; text-decoration: none; color: #000; font-size: 0.875rem; }
.hero { padding: 6rem 4rem; max-width: 800px; }
.hero h2 { font-size: 3rem; font-weight: 700; line-height: 1.1; margin-bottom: 1.5rem; }
.hero p { font-size: 1.125rem; color: #666; line-height: 1.6; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; padding: 4rem; }
.card { border: 1px solid #eee; padding: 2rem; }
.card h3 { font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem; }
.card p { font-size: 0.875rem; color: #666; }
footer { padding: 2rem 4rem; border-top: 1px solid #eee; font-size: 0.75rem; color: #999; }`,
  `<header><h1>Minimal</h1><nav><a href="#">Work</a><a href="#">About</a><a href="#">Contact</a></nav></header>
<section class="hero"><h2>Less is more. Design with purpose.</h2><p>Clean interfaces that focus on content and functionality. Every element serves a purpose.</p></section>
<section class="cards"><div class="card"><h3>Clarity</h3><p>Remove the unnecessary to reveal the essential.</p></div><div class="card"><h3>Function</h3><p>Every element has a clear purpose and role.</p></div><div class="card"><h3>Space</h3><p>White space is not empty, it is full of possibility.</p></div></section>
<footer>2024 Minimal Design System</footer>`
)

const neumorphism = makeDemo(
  'Neumorphism Demo',
  `body { background: #e8e8e8; color: #333; padding: 2rem; }
header { background: #e8e8e8; padding: 1.5rem 2rem; border-radius: 14px; box-shadow: -5px -5px 15px rgba(255,255,255,0.8), 5px 5px 15px rgba(0,0,0,0.1); margin-bottom: 2rem; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; color: #555; }
.hero { padding: 4rem 2rem; text-align: center; margin-bottom: 2rem; }
.hero h2 { font-size: 2rem; color: #444; margin-bottom: 1rem; }
.hero p { color: #777; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; margin-bottom: 2rem; }
.card { background: #e8e8e8; padding: 2rem; border-radius: 14px; box-shadow: -5px -5px 15px rgba(255,255,255,0.8), 5px 5px 15px rgba(0,0,0,0.1); }
.card h3 { color: #555; margin-bottom: 0.5rem; }
.card p { color: #777; font-size: 0.875rem; }
footer { text-align: center; padding: 2rem; color: #999; font-size: 0.75rem; }`,
  `<header><h1>SoftUI</h1><span style="color:#999">Dashboard</span></header>
<section class="hero"><h2>Soft & Elegant</h2><p>A gentle approach to interface design with depth and subtlety.</p></section>
<section class="cards"><div class="card"><h3>Wellness</h3><p>Track your daily mindfulness goals.</p></div><div class="card"><h3>Activity</h3><p>Monitor fitness progress gently.</p></div><div class="card"><h3>Balance</h3><p>Find harmony in your routine.</p></div></section>
<footer>Neumorphic Design System</footer>`
)

const glassmorphism = makeDemo(
  'Glassmorphism Demo',
  `body { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; color: #fff; }
header { backdrop-filter: blur(15px); background: rgba(255,255,255,0.1); border-bottom: 1px solid rgba(255,255,255,0.2); padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; }
header nav a { margin-left: 1.5rem; color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.875rem; }
.hero { padding: 5rem 3rem; text-align: center; }
.hero h2 { font-size: 2.5rem; margin-bottom: 1rem; }
.hero p { color: rgba(255,255,255,0.7); max-width: 600px; margin: 0 auto; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; padding: 0 3rem 3rem; }
.card { backdrop-filter: blur(15px); background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.2); border-radius: 16px; padding: 2rem; }
.card h3 { margin-bottom: 0.5rem; font-size: 1.1rem; }
.card p { font-size: 0.875rem; color: rgba(255,255,255,0.7); }
footer { text-align: center; padding: 2rem; color: rgba(255,255,255,0.5); font-size: 0.75rem; }`,
  `<header><h1>GlassUI</h1><nav><a href="#">Features</a><a href="#">Pricing</a><a href="#">About</a></nav></header>
<section class="hero"><h2>See Through the Future</h2><p>Beautiful frosted glass interfaces that bring depth and elegance to modern applications.</p></section>
<section class="cards"><div class="card"><h3>Transparency</h3><p>Layered depth with frosted overlays.</p></div><div class="card"><h3>Elegance</h3><p>Premium visual hierarchy through blur.</p></div><div class="card"><h3>Modern</h3><p>Contemporary design for forward-thinking brands.</p></div></section>
<footer>Glassmorphism Design System</footer>`
)

const brutalism = makeDemo(
  'Brutalism Demo',
  `body { background: #fff; color: #000; font-family: monospace; }
header { padding: 1rem 2rem; border-bottom: 4px solid #000; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 2rem; font-weight: 900; text-transform: uppercase; }
header nav a { margin-left: 1rem; color: #000; text-decoration: none; font-weight: 700; border: 2px solid #000; padding: 0.25rem 0.5rem; }
.hero { padding: 4rem 2rem; border-bottom: 4px solid #000; }
.hero h2 { font-size: 4rem; font-weight: 900; text-transform: uppercase; line-height: 1; }
.hero p { font-size: 1.25rem; margin-top: 1rem; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); }
.card { border: 4px solid #000; padding: 2rem; }
.card:nth-child(1) { background: #FF0000; color: #fff; }
.card:nth-child(2) { background: #0000FF; color: #fff; }
.card:nth-child(3) { background: #FFFF00; color: #000; }
.card h3 { font-size: 1.5rem; font-weight: 900; text-transform: uppercase; margin-bottom: 0.5rem; }
.card p { font-size: 0.875rem; }
footer { border-top: 4px solid #000; padding: 1rem 2rem; font-weight: 700; text-transform: uppercase; }`,
  `<header><h1>BRUTAL</h1><nav><a href="#">WORK</a><a href="#">INFO</a></nav></header>
<section class="hero"><h2>RAW. UNPOLISHED. REAL.</h2><p>Design stripped to its bones. No pretense.</p></section>
<section class="cards"><div class="card"><h3>POWER</h3><p>Bold statements through stark contrast.</p></div><div class="card"><h3>TRUTH</h3><p>Honest design without decoration.</p></div><div class="card"><h3>EDGE</h3><p>Breaking conventions intentionally.</p></div></section>
<footer>BRUTALIST SYSTEM 2024</footer>`
)

const hyperrealism3D = makeDemo(
  '3D Hyperrealism Demo',
  `body { background: #001F3F; color: #fff; font-family: system-ui, sans-serif; }
header { padding: 1.5rem 3rem; background: linear-gradient(180deg, rgba(0,31,63,0.9), rgba(0,31,63,0.7)); display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; color: #FFD700; }
.hero { padding: 5rem 3rem; text-align: center; perspective: 1000px; }
.hero h2 { font-size: 2.5rem; color: #FFD700; margin-bottom: 1rem; text-shadow: 0 2px 10px rgba(255,215,0,0.3); }
.hero p { color: #C0C0C0; max-width: 600px; margin: 0 auto; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; padding: 3rem; }
.card { background: linear-gradient(145deg, #002a4f, #001a35); border-radius: 12px; padding: 2rem; box-shadow: 0 10px 30px rgba(0,0,0,0.5), 0 1px 0 rgba(255,215,0,0.1); }
.card h3 { color: #FFD700; margin-bottom: 0.75rem; }
.card p { color: #aaa; font-size: 0.875rem; }
footer { text-align: center; padding: 2rem; color: #666; font-size: 0.75rem; border-top: 1px solid #0a2a4a; }`,
  `<header><h1>IMMERSIVE</h1><span style="color:#C0C0C0">3D Experience</span></header>
<section class="hero"><h2>Enter the Third Dimension</h2><p>Rich textures, realistic lighting, and spatial depth create immersive digital experiences.</p></section>
<section class="cards"><div class="card"><h3>Depth</h3><p>Multi-layer parallax and perspective transforms.</p></div><div class="card"><h3>Realism</h3><p>Physics-based lighting and shadow systems.</p></div><div class="card"><h3>Immersion</h3><p>Full spatial experiences with 3D navigation.</p></div></section>
<footer>3D Hyperrealism System</footer>`
)

const vibrantBlock = makeDemo(
  'Vibrant Block Design Demo',
  `body { background: #111; color: #fff; font-family: system-ui, sans-serif; }
header { padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; background: #BF00FF; }
header h1 { font-size: 1.5rem; font-weight: 800; }
.hero { padding: 5rem 3rem; background: linear-gradient(135deg, #39FF14, #00FFFF); color: #000; }
.hero h2 { font-size: 3rem; font-weight: 900; margin-bottom: 1rem; }
.hero p { font-size: 1.25rem; max-width: 600px; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3rem; padding: 3rem; }
.card { padding: 2.5rem; border-radius: 0; }
.card:nth-child(1) { background: #FF1493; }
.card:nth-child(2) { background: #FFAA00; color: #000; }
.card:nth-child(3) { background: #39FF14; color: #000; }
.card h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
.card p { font-size: 0.9rem; }
footer { padding: 2rem 3rem; background: #BF00FF; font-weight: 700; text-align: center; }`,
  `<header><h1>VIVID</h1><span>Bold Energy</span></header>
<section class="hero"><h2>BURST WITH COLOR</h2><p>Energetic interfaces that demand attention with bold blocks of vibrant color.</p></section>
<section class="cards"><div class="card"><h3>Energy</h3><p>High-impact visuals that captivate users instantly.</p></div><div class="card"><h3>Bold</h3><p>Fearless color combinations that stand out.</p></div><div class="card"><h3>Play</h3><p>Playful interactions with vibrant feedback.</p></div></section>
<footer>VIBRANT DESIGN SYSTEM</footer>`
)

const darkMode = makeDemo(
  'Dark Mode Demo',
  `body { background: #000; color: #e0e0e0; font-family: system-ui, sans-serif; }
header { padding: 1.5rem 3rem; border-bottom: 1px solid #222; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; color: #39FF14; text-shadow: 0 0 10px rgba(57,255,20,0.3); }
header nav a { margin-left: 1.5rem; color: #aaa; text-decoration: none; font-size: 0.875rem; }
.hero { padding: 5rem 3rem; }
.hero h2 { font-size: 2.5rem; color: #fff; margin-bottom: 1rem; }
.hero p { color: #888; max-width: 600px; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; padding: 0 3rem 3rem; }
.card { background: #121212; border: 1px solid #222; border-radius: 8px; padding: 2rem; }
.card h3 { color: #0080FF; margin-bottom: 0.5rem; text-shadow: 0 0 8px rgba(0,128,255,0.2); }
.card p { color: #888; font-size: 0.875rem; }
footer { text-align: center; padding: 2rem; color: #444; font-size: 0.75rem; border-top: 1px solid #222; }`,
  `<header><h1>DARKMODE</h1><nav><a href="#">Dashboard</a><a href="#">Settings</a><a href="#">Profile</a></nav></header>
<section class="hero"><h2>Embrace the Dark</h2><p>OLED-optimized interfaces designed for eye comfort, power efficiency, and elegant nighttime use.</p></section>
<section class="cards"><div class="card"><h3>Power</h3><p>OLED pixel-off saves battery life significantly.</p></div><div class="card"><h3>Comfort</h3><p>Reduced eye strain in low-light environments.</p></div><div class="card"><h3>Focus</h3><p>Content stands out against deep black backgrounds.</p></div></section>
<footer>Dark Mode Design System</footer>`
)

const accessible = makeDemo(
  'Accessible Design Demo',
  `body { background: #fff; color: #1a1a1a; font-family: system-ui, sans-serif; font-size: 18px; line-height: 1.6; }
header { padding: 1.5rem 3rem; border-bottom: 3px solid #1a1a1a; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.5rem; font-weight: 700; }
header nav a { margin-left: 1.5rem; color: #0056b3; text-decoration: underline; font-size: 1rem; padding: 0.5rem; }
header nav a:focus { outline: 3px solid #0056b3; outline-offset: 2px; }
.hero { padding: 4rem 3rem; max-width: 800px; }
.hero h2 { font-size: 2.5rem; font-weight: 700; margin-bottom: 1rem; }
.hero p { color: #333; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; padding: 0 3rem 3rem; }
.card { border: 2px solid #1a1a1a; border-radius: 4px; padding: 2rem; }
.card h3 { font-size: 1.25rem; margin-bottom: 0.75rem; }
.card p { color: #333; }
footer { padding: 2rem 3rem; border-top: 3px solid #1a1a1a; font-size: 1rem; }`,
  `<a href="#main" style="position:absolute;left:-9999px;top:0;padding:1rem;background:#0056b3;color:#fff;">Skip to content</a>
<header><h1>Accessible</h1><nav aria-label="Main"><a href="#">Home</a><a href="#">About</a><a href="#">Contact</a></nav></header>
<main id="main"><section class="hero"><h2>Design for Everyone</h2><p>WCAG AAA compliant interfaces ensuring no user is left behind. Every interaction is keyboard-accessible.</p></section>
<section class="cards" aria-label="Features"><div class="card"><h3>Inclusive</h3><p>Every user can navigate and interact effectively.</p></div><div class="card"><h3>Clear</h3><p>High contrast, large text, semantic structure.</p></div><div class="card"><h3>Universal</h3><p>Works with screen readers, keyboards, and assistive devices.</p></div></section></main>
<footer>Accessible Design System - WCAG AAA</footer>`
)

const claymorphism = makeDemo(
  'Claymorphism Demo',
  `body { background: #f0e6ff; color: #333; font-family: system-ui, sans-serif; }
header { margin: 1.5rem; padding: 1.5rem 2rem; background: #fff; border-radius: 20px; border: 3px solid #e0d0f0; box-shadow: inset -2px -2px 8px rgba(0,0,0,0.05), 4px 4px 12px rgba(0,0,0,0.1); display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; color: #7c3aed; font-weight: 700; }
.hero { padding: 4rem 3rem; text-align: center; }
.hero h2 { font-size: 2.25rem; color: #5b21b6; margin-bottom: 1rem; }
.hero p { color: #666; max-width: 500px; margin: 0 auto; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; padding: 0 2rem 2rem; }
.card { background: #fff; padding: 2rem; border-radius: 20px; border: 3px solid #e0d0f0; box-shadow: inset -2px -2px 8px rgba(0,0,0,0.05), 4px 4px 12px rgba(0,0,0,0.1); }
.card h3 { color: #7c3aed; margin-bottom: 0.5rem; font-size: 1.1rem; }
.card p { color: #666; font-size: 0.875rem; }
footer { text-align: center; padding: 2rem; color: #999; font-size: 0.75rem; }`,
  `<header><h1>ClayUI</h1><span style="color:#999">Playful Design</span></header>
<section class="hero"><h2>Soft, Playful, Fun</h2><p>Toy-like interfaces that make interaction delightful with chunky elements and pastel colors.</p></section>
<section class="cards"><div class="card"><h3>Playful</h3><p>Bubbly shapes that invite exploration.</p></div><div class="card"><h3>Soft</h3><p>Gentle shadows create comfortable depth.</p></div><div class="card"><h3>Joyful</h3><p>Every interaction brings a smile.</p></div></section>
<footer>Claymorphism Design System</footer>`
)

const auroraUI = makeDemo(
  'Aurora UI Demo',
  `body { background: #0a0020; color: #fff; font-family: system-ui, sans-serif; min-height: 100vh; overflow-x: hidden; }
body::before { content: ''; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: radial-gradient(ellipse at 20% 50%, rgba(0,128,255,0.3), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(255,20,147,0.2), transparent 50%), radial-gradient(ellipse at 50% 80%, rgba(0,255,255,0.2), transparent 50%); z-index: -1; }
header { padding: 1.5rem 3rem; display: flex; justify-content: space-between; align-items: center; }
header h1 { font-size: 1.25rem; background: linear-gradient(90deg, #0080FF, #FF1493); -webkit-background-clip: text; -webkit-text-fill-color: transparent; font-weight: 700; }
header nav a { margin-left: 1.5rem; color: rgba(255,255,255,0.7); text-decoration: none; font-size: 0.875rem; }
.hero { padding: 5rem 3rem; text-align: center; }
.hero h2 { font-size: 2.5rem; margin-bottom: 1rem; background: linear-gradient(135deg, #00FFFF, #0080FF, #FF1493); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.hero p { color: rgba(255,255,255,0.6); max-width: 600px; margin: 0 auto; }
.cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; padding: 0 3rem 3rem; }
.card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 2rem; backdrop-filter: blur(10px); }
.card h3 { color: #00FFFF; margin-bottom: 0.5rem; }
.card p { color: rgba(255,255,255,0.6); font-size: 0.875rem; }
footer { text-align: center; padding: 2rem; color: rgba(255,255,255,0.3); font-size: 0.75rem; }`,
  `<header><h1>AURORA</h1><nav><a href="#">Explore</a><a href="#">Create</a><a href="#">Connect</a></nav></header>
<section class="hero"><h2>Colors of the Cosmos</h2><p>Flowing gradients inspired by the Northern Lights, creating mesmerizing and atmospheric interfaces.</p></section>
<section class="cards"><div class="card"><h3>Flow</h3><p>Smooth gradient transitions that never repeat.</p></div><div class="card"><h3>Glow</h3><p>Atmospheric luminescence that guides the eye.</p></div><div class="card"><h3>Dream</h3><p>Ethereal aesthetics for premium experiences.</p></div></section>
<footer>Aurora UI Design System</footer>`
)

export const fullPageDemos: Record<number, string> = {
  1: minimalism,
  2: neumorphism,
  3: glassmorphism,
  4: brutalism,
  5: hyperrealism3D,
  6: vibrantBlock,
  7: darkMode,
  8: accessible,
  9: claymorphism,
  10: auroraUI,
}
