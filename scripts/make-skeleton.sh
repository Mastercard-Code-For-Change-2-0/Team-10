#!/usr/bin/env bash
set -euo pipefail

# Create a clean skeleton/ folder mirroring the repo structure,
# keeping only a single small file per directory and .gitkeep placeholders.
# Excludes node_modules, build artifacts, logs, .git and env files.

ROOT_DIR=$(cd "$(dirname "$0")/.." && pwd)
SKELETON_DIR="$ROOT_DIR/skeleton"

rm -rf "$SKELETON_DIR"
mkdir -p "$SKELETON_DIR"

EXCLUDES=(
  ".git"
  "node_modules"
  "client/node_modules"
  "server/node_modules"
  "frontend/node_modules"
  "client/build"
  "server/logs"
  "*.DS_Store"
  "*.env"
  "server/.env"
  "client/.env"
)

# rsync base structure without files, then we'll selectively add one file per dir
RSYNC_EXCLUDES=()
for e in "${EXCLUDES[@]}"; do RSYNC_EXCLUDES+=(--exclude "$e"); done

# Copy directories only
rsync -a -f"+ */" -f"- *" "${RSYNC_EXCLUDES[@]}" "$ROOT_DIR/" "$SKELETON_DIR/"

# For each directory, copy exactly one small file if present; otherwise create .gitkeep
find "$SKELETON_DIR" -type d \( \
  -name .git -o -name node_modules -o -name build -o -name logs \
\) -prune -o -type d -print | while read -r dir; do
  # Find candidate files in the corresponding source dir
  SRC_DIR="$ROOT_DIR${dir#$SKELETON_DIR}"
  # Skip the skeleton dir itself to avoid recursion
  if [[ "$SRC_DIR" == "$SKELETON_DIR"* ]]; then
    continue
  fi
  # Skip excluded dirs
  skip=false
  for e in "${EXCLUDES[@]}"; do
    if [[ "$SRC_DIR" == *"$e"* ]]; then skip=true; break; fi
  done
  $skip && continue

  # Prefer small text/code files
  candidate=$(find "$SRC_DIR" -maxdepth 1 -type f \
    ! -name "*.env" ! -name "*.DS_Store" ! -name "package-lock.json" \
    ! -name "yarn.lock" ! -name "pnpm-lock.yaml" \
    -name "*.md" -o -name "*.js" -o -name "*.jsx" -o -name "*.ts" -o -name "*.tsx" \
    -o -name "*.json" -o -name "*.txt" -o -name "*.sh" | head -n 1 || true)

  if [[ -n "${candidate:-}" ]]; then
    cp "$candidate" "$dir/"
  else
    # If no candidate files, ensure the dir exists with a .gitkeep
    touch "$dir/.gitkeep"
  fi
done

# Top-level README for the skeleton
cat > "$SKELETON_DIR/README.md" <<'EOF'
# Project Skeleton

This archive mirrors the folder structure with exactly one file per folder (or .gitkeep as placeholder). Use it as a lightweight starting point for teammates.

Notes:
- Heavy folders like node_modules, build, logs, and env files are excluded.
- Add real files as you progress; keep structure intact.
EOF

# Zip the skeleton for sharing
cd "$SKELETON_DIR/.."
zip -r skeleton.zip skeleton >/dev/null

echo "Skeleton created at $SKELETON_DIR and zipped to $(pwd)/skeleton.zip"
