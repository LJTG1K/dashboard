#!/bin/bash
# update-face-state.sh
# Call this from the main OpenClaw session to update Negan Face state
# Requires: DASHBOARD_URL environment variable set to your Vercel dashboard URL
# Usage: DASHBOARD_URL=https://my-dashboard.vercel.app ./update-face-state.sh typing "Working on analysis..."

if [ -z "$DASHBOARD_URL" ]; then
  echo "Error: DASHBOARD_URL environment variable not set"
  echo "Usage: DASHBOARD_URL=https://my-dashboard.vercel.app ./update-face-state.sh [state] [task]"
  exit 1
fi

STATE=${1:-thinking}
TASK=${2:-}
INTERNAL_KEY="negan-face-internal-api"

# Update session status
curl -s -X POST "$DASHBOARD_URL/api/session-status" \
  -H "Content-Type: application/json" \
  -H "x-negan-key: $INTERNAL_KEY" \
  -d "{
    \"isProcessing\": true,
    \"lastActivityTime\": $(date +%s)000,
    \"currentTask\": \"$TASK\"
  }" > /dev/null 2>&1

echo "✓ Face state updated: $STATE"
