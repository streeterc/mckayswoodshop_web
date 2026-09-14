#!/usr/bin/env bash
# Run this ONCE on the droplet, AFTER `make prod-up` (which starts Nginx in
# HTTP-only "bootstrap" mode -- see nginx/nginx.bootstrap.conf.template).
# This script obtains the first Let's Encrypt certificate, then switches
# Nginx over to the full HTTPS config.
#
# Usage: ./scripts/init_certbot.sh yourdomain.com you@yourdomain.com
set -euo pipefail

DOMAIN="${1:?Usage: $0 <domain> <email>}"
EMAIL="${2:?Usage: $0 <domain> <email>}"
COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"

echo "Requesting certificate from Let's Encrypt for $DOMAIN..."
$COMPOSE run --rm certbot \
  certonly --webroot -w /var/www/certbot \
  -d "$DOMAIN" \
  --email "$EMAIL" --agree-tos --no-eff-email

echo "Certificate issued. Rendering full HTTPS Nginx config..."
DOMAIN="$DOMAIN" envsubst '${DOMAIN}' < nginx/nginx.prod.conf.template > nginx/nginx.prod.conf

echo "Restarting Nginx with HTTPS enabled..."
$COMPOSE restart nginx

echo "Done. Visit https://$DOMAIN to confirm HTTPS is working."
echo "The 'certbot' service in docker-compose.prod.yml auto-renews every 12h from now on."
