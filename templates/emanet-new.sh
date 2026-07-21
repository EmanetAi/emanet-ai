#!/usr/bin/env bash
# emanet-new.sh — scaffold a new project from Emanet's vetted MIT/Apache templates.
# Usage:  ./emanet-new.sh <key> <dir>      e.g. ./emanet-new.sh saas my-app
#         ./emanet-new.sh                  list keys
#         ./emanet-new.sh --check          self-test (no network)
# Needs: node/npx (degit). Strips git history so <dir> is a clean start.
set -euo pipefail

# key -> "<kind>|<source>"  ; kind: degit | git | cmd
declare -A T=(
  [shop]="git|https://github.com/medusajs/medusa"           # full headless commerce backend
  [storefront]="degit|medusajs/nextjs-starter-medusa"        # Next.js storefront for Medusa
  [commerce]="degit|vercel/commerce"                         # storefront on any backend
  [bagisto]="git|https://github.com/bagisto/bagisto"         # Laravel all-in-one shop
  [saas]="degit|ixartz/SaaS-Boilerplate"                     # auth+billing+tenants
  [web]="cmd|npm create t3-app@latest"                       # typesafe full-stack starter
  [next]="degit|ixartz/Next-js-Boilerplate"                  # plain Next.js boilerplate
  [dashboard]="degit|satnaing/shadcn-admin"                  # admin dashboard
  [landing]="cmd|npm create astro@latest -- --template arthelokyo/astrowind"  # fast static marketing
  [blog]="degit|timlrx/tailwind-nextjs-starter-blog"         # MDX blog
  [ai]="degit|vercel/ai-chatbot"                             # AI chatbot (Apache-2.0)
  [api]="degit|fastapi/full-stack-fastapi-template"          # Python FastAPI full-stack
  [mobile]="git|https://github.com/obytes/react-native-template-obytes"  # Expo cross-platform
)

list() { echo "Keys:"; for k in $(echo "${!T[@]}" | tr ' ' '\n' | sort); do
  echo "  $k -> ${T[$k]#*|}"; done; }

if [[ "${1:-}" == "--check" ]]; then
  # self-check: every entry well-formed (kind|source, kind in known set)
  fail=0
  for k in "${!T[@]}"; do
    kind="${T[$k]%%|*}"; src="${T[$k]#*|}"
    case "$kind" in degit|git|cmd) ;; *) echo "BAD kind for $k: $kind"; fail=1;; esac
    [[ -n "$src" && "$src" != "${T[$k]}" ]] || { echo "BAD source for $k"; fail=1; }
  done
  [[ $fail -eq 0 ]] && echo "OK: ${#T[@]} keys valid" || exit 1
  exit 0
fi

[[ $# -lt 1 ]] && { list; exit 0; }
key="$1"; dir="${2:-}"
[[ -n "${T[$key]:-}" ]] || { echo "Unknown key: $key"; list; exit 1; }
[[ -n "$dir" ]] || { echo "Need a target dir: ./emanet-new.sh $key <dir>"; exit 1; }
[[ -e "$dir" ]] && { echo "'$dir' already exists — aborting."; exit 1; }

kind="${T[$key]%%|*}"; src="${T[$key]#*|}"
case "$kind" in
  degit) npx --yes degit "$src" "$dir" ;;
  git)   git clone --depth 1 "$src" "$dir" && rm -rf "$dir/.git" ;;
  cmd)   eval "$src \"$dir\"" ;;
esac
echo "Scaffolded '$dir' from $src. cd $dir && (npm install || pnpm install)"
