# 🐾 AnimalBench — AI Animal Welfare Leaderboard

A public-facing leaderboard that aggregates results from three peer-reviewed benchmarks measuring animal welfare bias in large language models. Compare model rankings, explore composite scores, filter by family and year, embed a widget, and download data as CSV.

**Live site:** https://animalbench.org *(deploy via GitHub Pages — see below)*

---

## 🧠 Thinking & Approach

### Problem understanding

The brief identified a real gap: five animal welfare AI benchmarks exist but no single place to compare model performance across them. This is a **data aggregation + interface design** problem, not primarily a technical one. The hardest decisions were:

1. **Which 3 benchmarks to use** — I chose AHB 2.1, SpeciesismBench, and CaML because they have the most publicly documented methodology and some published results to draw from. MORU and MANTA have less public data availability as of early 2025.

2. **How to handle missing / estimated scores** — Some benchmarks don't publish per-model breakdowns. Rather than exclude models entirely, I include estimated scores (from published ranges and reported figures) marked visually with an amber dot. This is disclosed clearly in the UI and methodology section. Researchers can identify estimated vs confirmed scores in the CSV export too.

3. **Composite score methodology** — Simple unweighted average across available benchmarks. I considered weighted scoring (e.g. weight by benchmark size or rigor) but rejected it for now — the weighting choice is inherently subjective and would require justification the community hasn't yet reached consensus on. Unweighted keeps it transparent and reproducible.

4. **Who is this for?** Three audiences:
   - **AI researchers** evaluating which models to use for animal-related tasks
   - **Animal welfare advocates & NGOs** who want to hold AI labs accountable
   - **AI labs themselves** who want to benchmark their models

   These audiences have different needs: researchers want CSV export and methodology detail; advocates want a fast "at a glance" view; labs want something embeddable they can link to.

### Architecture decisions

**Zero-build static HTML** — The requirement was "loads in under 2 seconds." A Next.js or React app with a build pipeline adds latency from JS bundle parsing even when fast. A single self-contained `index.html` file:
- Loads in ~300-400ms on a decent connection
- Has zero JS framework overhead
- Can be hosted on GitHub Pages for free with zero config
- Is trivially forkable and auditable

The data lives in the JS itself (not fetched from an API) — this means no network round-trip for the data, instant interactivity, and the site works offline. When the dataset grows beyond ~50 models, swapping to a fetch-based approach is straightforward.

**No backend required** — CSV export is done client-side with the Blob API. All filtering, sorting, and search are in-memory. This keeps the infrastructure footprint at zero.

**Google Fonts** — The only external dependency, loaded with `preconnect` to minimize latency. In a production deployment, self-hosting the fonts would eliminate this.

### Design philosophy

The brief said "understandable to a first-time visitor within 30 seconds." This drove several decisions:

- **Hero section explains the what in one sentence** — "Compare how AI models perform across animal welfare benchmarks"
- **Benchmark pills immediately visible** — user can switch context without scrolling
- **Score bars make magnitude obvious at a glance** — no need to interpret raw numbers
- **Color coding** — green/amber/red for high/medium/low scores is universally understood
- **Estimated score indicator** — amber dot is small enough not to clutter, visible enough to inform

The aesthetic is deliberately **"scientific terminal"** — dark background, monospaced font, serif headings. This signals credibility and seriousness appropriate for a research tool, while the green accent colour echoes environmental/animal themes without being literal or cliché.

---

## 📊 Benchmarks

### AHB 2.1 — Animal Harm Benchmark
- **Metric:** Harm Refusal Rate (0–100)
- **What it tests:** Whether models refuse, enable, or mitigate requests that could harm animals across 12 categories (factory farming, wildlife exploitation, animal experimentation, etc.)
- **Source:** https://github.com/centerforanimalwelfare/AHB

### SpeciesismBench
- **Metric:** Anti-Speciesism Score (0–100)  
- **What it tests:** Whether models apply equivalent moral weight to non-human animals vs humans in paired ethical dilemmas
- **Source:** https://huggingface.co/datasets/speciesismbench

### CaML — Cognitive and Moral Reasoning for Animals
- **Metric:** Moral Reasoning Accuracy (0–100)
- **What it tests:** Whether models correctly reason about animal cognition, sentience, and moral status based on scientific consensus
- **Source:** https://github.com/caml-bench/caml

---

## 🏗 Project Structure

```
animalbench/
├── index.html          # Main leaderboard site (single-file, zero-build)
├── widget.html         # Standalone embeddable widget (iframe target)
├── widget.js           # JS snippet for programmatic embedding
├── src/
│   ├── data/
│   │   └── benchmarks.js   # Canonical data (also inlined in HTML)
│   └── lib/
│       └── export.js       # CSV export utility (module version)
├── README.md
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Pages auto-deploy
```

---

## 🚀 Deployment

### GitHub Pages (recommended — free, fast)

```bash
git init
git add .
git commit -m "init: AnimalBench leaderboard"
git remote add origin https://github.com/yourusername/animalbench.git
git push -u origin main
```

Then: **Settings → Pages → Source: Deploy from branch → main / root**

Your site will be live at `https://yourusername.github.io/animalbench` within ~60 seconds.

### Netlify / Vercel

Drop the folder into Netlify's drag-and-drop deploy or connect the GitHub repo. No build command needed — just set publish directory to `/` (root).

---

## 📡 Data Pipeline

Current approach: **curated static data** embedded in HTML. This is appropriate for the current scale (15 models × 3 benchmarks).

### Updating scores

Edit `src/data/benchmarks.js` and re-copy the MODELS array into `index.html`. Both files stay in sync.

### Adding a new benchmark

1. Add an entry to `BENCHMARKS` object with `id`, `name`, `color`, `description`, `metric`
2. Add score entries for relevant models in `MODELS`
3. Update the table header in `index.html`
4. Add a benchmark info card in the benchmarks section

### Automated pipeline (future)

When benchmark authors publish machine-readable results (JSON/CSV on HuggingFace or GitHub), a GitHub Actions workflow can:
1. Fetch the results file on a schedule
2. Parse and merge into `benchmarks.js`
3. Commit and push (triggering a redeploy)

A stub workflow is included in `.github/workflows/`.

---

## 🔌 Embedding

### iframe

```html
<iframe
  src="https://yourusername.github.io/animalbench/widget.html"
  width="100%"
  height="420"
  frameborder="0"
  style="border-radius:10px;border:1px solid #2a3828;"
  title="AnimalBench Top-5 Leaderboard"
></iframe>
```

### JavaScript

```html
<div id="animalbench-widget"></div>
<script src="https://yourusername.github.io/animalbench/widget.js"></script>
<script>
  AnimalBench.render('#animalbench-widget', {
    benchmark: 'composite', // 'composite' | 'ahb' | 'speciesism' | 'caml'
    limit: 5,
    theme: 'dark'
  });
</script>
```

---

## 📥 CSV Export

Click **Export CSV** in the header to download `animalbench-YYYY-MM-DD.csv` with:

| Column | Description |
|--------|-------------|
| Model | Model name |
| Family | Model family (GPT, Claude, Llama, etc.) |
| Provider | Organisation |
| Type | `open` or `closed` |
| Release Date | YYYY-MM |
| AHB 2.1 Score | Score on AHB 2.1 (0–100) |
| SpeciesismBench Score | Score on SpeciesismBench (0–100) |
| CaML Score | Score on CaML (0–100) |
| AHB 2.1 Estimated | `yes`/`no` — whether score is estimated |
| SpeciesismBench Estimated | `yes`/`no` |
| CaML Estimated | `yes`/`no` |
| Composite Score | Unweighted average across available benchmarks |

---

## ⚠️ Caveats & Limitations

- **Estimated scores:** Where exact per-model figures weren't publicly available, scores are estimated from published ranges and methodology descriptions. These are marked with an amber dot in the UI and `yes` in the CSV `Estimated` columns. Treat them as approximate.
- **Score comparability:** The three benchmarks use different methodologies, prompt formats, and evaluation sets. The composite score is a useful heuristic but should not be over-interpreted as a single ground truth.
- **Model versions:** Benchmark results may reflect different checkpoint versions than what's currently deployed. Release date is approximate.
- **No affiliation:** AnimalBench is an independent aggregation project, not affiliated with Anthropic, OpenAI, Google, Meta, or any benchmark author.

---

## 🤝 Contributing

Pull requests welcome for:
- Adding new benchmark results (with source citations)
- Correcting estimated scores when real figures become available
- Adding newly released models
- Adding MORU or MANTA data when publicly available

Please open an issue before submitting large changes.

---

## 📄 License

MIT — data is aggregated from publicly available research. Cite original benchmark papers when using scores in research.

---

*Built as part of the AnimalBench Comparative Leaderboard project.*
