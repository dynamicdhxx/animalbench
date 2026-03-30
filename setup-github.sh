#!/usr/bin/env bash
# Run this script once to push AnimalBench to GitHub
# Usage: bash setup-github.sh

set -e

echo "🐾 AnimalBench — GitHub Setup"
echo "================================"
echo ""

# Check git is installed
if ! command -v git &> /dev/null; then
    echo "❌ git not found. Install from https://git-scm.com"
    exit 1
fi

# Init repo
git init
git add .
git commit -m "feat: initial AnimalBench leaderboard

- Aggregates AHB 2.1, SpeciesismBench, and CaML benchmark results
- 15 models tracked with composite scoring
- Filtering by family, type, year, and search
- Embeddable widget (iframe + JS snippet)
- CSV export for researchers
- Sub-2s load time (single-file zero-build static site)
- Fully mobile responsive"

echo ""
echo "✅ Local repo initialized."
echo ""
echo "Next steps:"
echo "  1. Create a new GitHub repo at https://github.com/new"
echo "     Name it: animalbench"
echo "     Keep it public, don't initialize with README"
echo ""
echo "  2. Run these commands:"
echo "     git remote add origin https://github.com/YOUR_USERNAME/animalbench.git"
echo "     git branch -M main"
echo "     git push -u origin main"
echo ""
echo "  3. Enable GitHub Pages:"
echo "     Settings → Pages → Source: Deploy from branch → main / root"
echo ""
echo "  4. Your site will be live at:"
echo "     https://YOUR_USERNAME.github.io/animalbench"
echo ""
echo "  5. Update the GitHub link in index.html (search for 'yourusername')"
