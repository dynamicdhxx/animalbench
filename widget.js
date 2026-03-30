/**
 * AnimalBench Widget
 * Usage:
 *   <div id="animalbench-widget"></div>
 *   <script src="https://animalbench.org/widget.js"></script>
 *   <script>AnimalBench.render('#animalbench-widget', { benchmark: 'composite', limit: 5, theme: 'dark' });</script>
 */
(function(global) {
  const MODELS = [
    { name:'Claude 3.5 Sonnet', provider:'Anthropic', scores:{ ahb:87.2, speciesism:81.4, caml:79.6 } },
    { name:'Claude 3 Opus',     provider:'Anthropic', scores:{ ahb:84.1, speciesism:78.9, caml:76.3 } },
    { name:'GPT-4o',            provider:'OpenAI',    scores:{ ahb:82.7, speciesism:74.3, caml:77.1 } },
    { name:'GPT-4 Turbo',       provider:'OpenAI',    scores:{ ahb:79.4, speciesism:71.8, caml:74.5 } },
    { name:'Gemini 1.5 Pro',    provider:'Google',    scores:{ ahb:80.1, speciesism:72.6, caml:75.3 } },
    { name:'Mistral Large',     provider:'Mistral AI',scores:{ ahb:76.9, speciesism:70.4, caml:72.1 } },
    { name:'Llama 3 70B',       provider:'Meta',      scores:{ ahb:74.6, speciesism:68.3, caml:70.8 } },
    { name:'Claude 3 Haiku',    provider:'Anthropic', scores:{ ahb:71.3, speciesism:66.8, caml:64.2 } },
    { name:'Command R+',        provider:'Cohere',    scores:{ ahb:69.3, speciesism:63.7, caml:66.1 } },
    { name:'Grok 1',            provider:'xAI',       scores:{ ahb:45.2, speciesism:41.8, caml:43.5 } },
  ];

  function composite(m) {
    const vals = Object.values(m.scores);
    return Math.round(vals.reduce((s,v)=>s+v,0)/vals.length*10)/10;
  }

  function scoreColor(s) {
    return s >= 75 ? '#5aff8c' : s >= 55 ? '#ffd166' : '#ff6b6b';
  }

  function render(selector, opts) {
    opts = Object.assign({ benchmark:'composite', limit:5, theme:'dark' }, opts);
    const el = document.querySelector(selector);
    if (!el) return;

    const isDark = opts.theme !== 'light';
    const bg    = isDark ? '#0a0f0d' : '#ffffff';
    const text  = isDark ? '#e8f0e8' : '#1a1a1a';
    const muted = isDark ? '#4a5e4a' : '#888888';
    const bdr   = isDark ? '#2a3828' : '#e0e0e0';
    const rowBdr= isDark ? '#1e2b1e' : '#f0f0f0';

    const rankColors = ['#ffd700','#c0c0c0','#cd7f32',muted,muted];

    const sorted = MODELS
      .map(m => ({ ...m, val: opts.benchmark === 'composite' ? composite(m) : (m.scores[opts.benchmark] || composite(m)) }))
      .sort((a,b) => b.val - a.val)
      .slice(0, opts.limit);

    const rows = sorted.map((m,i) => {
      const col = scoreColor(m.val);
      return `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;border-bottom:1px solid ${rowBdr};">
        <span style="color:${rankColors[i]};font-weight:700;font-size:11px;width:14px;text-align:center;">${i+1}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-weight:700;font-size:12px;color:${text};white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${m.name}</div>
          <div style="font-size:10px;color:${muted};">${m.provider}</div>
        </div>
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="width:48px;height:4px;background:${isDark?'#182018':'#f0f0f0'};border-radius:2px;overflow:hidden;">
            <div style="height:100%;width:${m.val}%;background:${col};border-radius:2px;"></div>
          </div>
          <span style="font-weight:700;font-size:12px;color:${col};min-width:28px;text-align:right;">${m.val.toFixed(1)}</span>
        </div>
      </div>`;
    }).join('');

    const benchLabel = { composite:'Composite', ahb:'AHB 2.1', speciesism:'SpeciesismBench', caml:'CaML' }[opts.benchmark] || 'Composite';

    el.innerHTML = `<div style="font-family:'Space Mono',monospace;background:${bg};border:1px solid ${bdr};border-radius:10px;padding:16px;">
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;padding-bottom:10px;border-bottom:1px solid ${bdr};">
        <span style="font-size:14px;font-weight:600;color:${text};">🐾 AnimalBench</span>
        <span style="font-size:10px;color:#5aff8c;background:rgba(90,255,140,0.1);padding:2px 6px;border-radius:4px;letter-spacing:0.08em;">${benchLabel.toUpperCase()}</span>
      </div>
      ${rows}
      <div style="margin-top:10px;text-align:center;font-size:10px;color:${muted};">
        <a href="https://animalbench.org" target="_blank" style="color:#5aff8c;text-decoration:none;">Full leaderboard →</a>
      </div>
    </div>`;
  }

  global.AnimalBench = { render };
})(window);
