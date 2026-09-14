#!/usr/bin/env bash
# Sync the local repo to the droplet and restart the production stack.
# Usage: ./scripts/deploy.sh user@your-droplet-ip /path/on/droplet
set -euo pipefail

REMOTE="${1:?Usage: $0 <user@host> <remote_path>}"
REMOTE_PATH="${2:?Usage: $0 <user@host> <remote_path>}"

echo "Syncing files to $REMOTE:$REMOTE_PATH ..."
rsync -avz --delete \
  --exclude '.git' \
  --exclude '.env.dev' \
  --exclude '__pycache__' \
  --exclude '*.pyc' \
  --exclude 'nginx/nginx.prod.conf' \
  ./ "$REMOTE:$REMOTE_PATH"

echo "Rebuilding and restarting the stack on the droplet..."
ssh "$REMOTE" "cd $REMOTE_PATH && \
  docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d --build && \
  docker compose -f docker-compose.yml -f docker-compose.prod.yml exec -T web alembic upgrade head"

echo "Deploy complete."
