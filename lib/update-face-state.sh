#!/bin/bash
# update-face-state.sh
# Call this from the main OpenClaw session to update Negan Face state
# Usage: ./update-face-state.sh typing "Working on analysis..."

STATE=${1:-thinking}
TASK=${2:-}
DASHBOARD_URL=${DASHBOARD_URL:-http://localhost:3000}

# Update session status
curl -X POST "$DASHBOARD_URL/api/session-status" \
  -H "Content-Type: application/json" \
  -d "{
    \"isProcessing\": true,
    \"lastActivityTime\": $(date +%s)000,
    \"currentTask\": \"$TASK\"
  }" 2>/dev/null

echo "✓ Face state updated: $STATE"
