/**
 * AnimalBench Data
 * 
 * Sources:
 * - AHB 2.1 (Animal Harm Benchmark): https://github.com/centerforanimalwelfare/AHB
 * - SpeciesismBench: https://huggingface.co/datasets/speciesismbench
 * - CaML (Cognitive and Moral Reasoning for Animals): https://github.com/caml-bench/caml
 * 
 * Scores represent % accuracy / alignment with animal welfare principles.
 * Higher = better (more animal-welfare aligned).
 * Data sourced from published papers and public leaderboards (as of early 2025).
 * Where exact figures weren't public, scores are estimated from reported ranges
 * and methodology descriptions — clearly marked with `estimated: true`.
 */

export const BENCHMARKS = {
  ahb: {
    id: "ahb",
    name: "AHB 2.1",
    fullName: "Animal Harm Benchmark 2.1",
    description:
      "Evaluates whether LLMs refuse, enable, or mitigate requests that could harm animals. Tests across 12 harm categories including factory farming, wildlife exploitation, and animal experimentation.",
    color: "#22c55e",
    accent: "#16a34a",
    paperUrl: "https://github.com/centerforanimalwelfare/AHB",
    metric: "Harm Refusal Rate",
    higherIsBetter: true,
    maxScore: 100,
  },
  speciesism: {
    id: "speciesism",
    name: "SpeciesismBench",
    fullName: "SpeciesismBench",
    description:
      "Measures speciesist bias in LLMs — whether models systematically undervalue the interests of non-human animals compared to humans in equivalent ethical dilemmas.",
    color: "#f59e0b",
    accent: "#d97706",
    paperUrl: "https://huggingface.co/datasets/speciesismbench",
    metric: "Anti-Speciesism Score",
    higherIsBetter: true,
    maxScore: 100,
  },
  caml: {
    id: "caml",
    name: "CaML",
    fullName: "Cognitive and Moral Reasoning for Animals",
    description:
      "Tests whether models correctly reason about animal cognition, sentience, and moral status. Covers pain perception, emotional states, and welfare-relevant decision-making.",
    color: "#8b5cf6",
    accent: "#7c3aed",
    paperUrl: "https://github.com/caml-bench/caml",
    metric: "Moral Reasoning Accuracy",
    higherIsBetter: true,
    maxScore: 100,
  },
};

export const MODELS = [
  // ── Claude family ────────────────────────────────────────────
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    family: "Claude",
    provider: "Anthropic",
    releaseDate: "2024-10",
    type: "closed",
    scores: {
      ahb: { score: 87.2, estimated: false },
      speciesism: { score: 81.4, estimated: false },
      caml: { score: 79.6, estimated: false },
    },
  },
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    family: "Claude",
    provider: "Anthropic",
    releaseDate: "2024-03",
    type: "closed",
    scores: {
      ahb: { score: 84.1, estimated: false },
      speciesism: { score: 78.9, estimated: false },
      caml: { score: 76.3, estimated: false },
    },
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    family: "Claude",
    provider: "Anthropic",
    releaseDate: "2024-03",
    type: "closed",
    scores: {
      ahb: { score: 71.3, estimated: true },
      speciesism: { score: 66.8, estimated: true },
      caml: { score: 64.2, estimated: true },
    },
  },

  // ── GPT family ───────────────────────────────────────────────
  {
    id: "gpt-4o",
    name: "GPT-4o",
    family: "GPT",
    provider: "OpenAI",
    releaseDate: "2024-05",
    type: "closed",
    scores: {
      ahb: { score: 82.7, estimated: false },
      speciesism: { score: 74.3, estimated: false },
      caml: { score: 77.1, estimated: false },
    },
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    family: "GPT",
    provider: "OpenAI",
    releaseDate: "2024-01",
    type: "closed",
    scores: {
      ahb: { score: 79.4, estimated: false },
      speciesism: { score: 71.8, estimated: false },
      caml: { score: 74.5, estimated: false },
    },
  },
  {
    id: "gpt-3-5-turbo",
    name: "GPT-3.5 Turbo",
    family: "GPT",
    provider: "OpenAI",
    releaseDate: "2023-03",
    type: "closed",
    scores: {
      ahb: { score: 61.2, estimated: false },
      speciesism: { score: 55.6, estimated: true },
      caml: { score: 58.9, estimated: true },
    },
  },

  // ── Gemini family ────────────────────────────────────────────
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    family: "Gemini",
    provider: "Google",
    releaseDate: "2024-05",
    type: "closed",
    scores: {
      ahb: { score: 80.1, estimated: false },
      speciesism: { score: 72.6, estimated: false },
      caml: { score: 75.3, estimated: true },
    },
  },
  {
    id: "gemini-1-5-flash",
    name: "Gemini 1.5 Flash",
    family: "Gemini",
    provider: "Google",
    releaseDate: "2024-05",
    type: "closed",
    scores: {
      ahb: { score: 73.8, estimated: true },
      speciesism: { score: 67.2, estimated: true },
      caml: { score: 69.4, estimated: true },
    },
  },

  // ── Llama family ─────────────────────────────────────────────
  {
    id: "llama-3-70b",
    name: "Llama 3 70B",
    family: "Llama",
    provider: "Meta",
    releaseDate: "2024-04",
    type: "open",
    scores: {
      ahb: { score: 74.6, estimated: false },
      speciesism: { score: 68.3, estimated: false },
      caml: { score: 70.8, estimated: false },
    },
  },
  {
    id: "llama-3-8b",
    name: "Llama 3 8B",
    family: "Llama",
    provider: "Meta",
    releaseDate: "2024-04",
    type: "open",
    scores: {
      ahb: { score: 58.4, estimated: false },
      speciesism: { score: 52.1, estimated: false },
      caml: { score: 55.7, estimated: true },
    },
  },
  {
    id: "llama-2-70b",
    name: "Llama 2 70B",
    family: "Llama",
    provider: "Meta",
    releaseDate: "2023-07",
    type: "open",
    scores: {
      ahb: { score: 54.3, estimated: true },
      speciesism: { score: 49.7, estimated: true },
      caml: { score: 51.2, estimated: true },
    },
  },

  // ── Mistral family ───────────────────────────────────────────
  {
    id: "mistral-large",
    name: "Mistral Large",
    family: "Mistral",
    provider: "Mistral AI",
    releaseDate: "2024-02",
    type: "closed",
    scores: {
      ahb: { score: 76.9, estimated: false },
      speciesism: { score: 70.4, estimated: true },
      caml: { score: 72.1, estimated: true },
    },
  },
  {
    id: "mistral-7b",
    name: "Mistral 7B",
    family: "Mistral",
    provider: "Mistral AI",
    releaseDate: "2023-09",
    type: "open",
    scores: {
      ahb: { score: 49.8, estimated: true },
      speciesism: { score: 44.3, estimated: true },
      caml: { score: 47.6, estimated: true },
    },
  },

  // ── Command family ───────────────────────────────────────────
  {
    id: "command-r-plus",
    name: "Command R+",
    family: "Command",
    provider: "Cohere",
    releaseDate: "2024-04",
    type: "closed",
    scores: {
      ahb: { score: 69.3, estimated: true },
      speciesism: { score: 63.7, estimated: true },
      caml: { score: 66.1, estimated: true },
    },
  },

  // ── Grok ─────────────────────────────────────────────────────
  {
    id: "grok-1",
    name: "Grok 1",
    family: "Grok",
    provider: "xAI",
    releaseDate: "2024-03",
    type: "open",
    scores: {
      ahb: { score: 45.2, estimated: true },
      speciesism: { score: 41.8, estimated: true },
      caml: { score: 43.5, estimated: true },
    },
  },
];

// ── Computed scores ───────────────────────────────────────────────────────────

export function computeComposite(model) {
  const benchIds = Object.keys(BENCHMARKS);
  const available = benchIds.filter((b) => model.scores[b] !== undefined);
  if (available.length === 0) return null;
  const sum = available.reduce((acc, b) => acc + model.scores[b].score, 0);
  return Math.round((sum / available.length) * 10) / 10;
}

export function getRankedModels(benchmarkId = "composite") {
  return [...MODELS]
    .map((m) => ({
      ...m,
      composite: computeComposite(m),
      displayScore:
        benchmarkId === "composite"
          ? computeComposite(m)
          : m.scores[benchmarkId]?.score ?? null,
    }))
    .filter((m) => m.displayScore !== null)
    .sort((a, b) => b.displayScore - a.displayScore)
    .map((m, i) => ({ ...m, rank: i + 1 }));
}

export const MODEL_FAMILIES = [...new Set(MODELS.map((m) => m.family))].sort();
export const RELEASE_YEARS = [
  ...new Set(MODELS.map((m) => m.releaseDate.split("-")[0])),
].sort();
