#!/usr/bin/env bash
# Run this ONCE on the droplet, AFTER `make prod-up` (which starts Nginx in
# HTTP-only "bootstrap" mode -- see nginx/nginx.bootstrap.conf.template).
# This script obtains the first Let's Encrypt certificate, then switches
# Nginx over to the full HTTPS config.
#
# Usage: ./scripts/init_certbot.sh yourdomain.com you@yourdomain.com [pay.yourdomain.com]
#
# The optional 3rd argument is the BTCPay Server subdomain (see
# docker-compose.btcpay.yml, nginx/nginx.prod.conf.template) — only pass it
# if crypto checkout is actually enabled and that DNS record already points
# at this droplet. Passed together with the main domain, Certbot bundles
# both into ONE certificate (filed under $DOMAIN's name) rather than two
# separate ones, which is why the BTCPay Nginx block reuses that same
# certificate path instead of having its own.
set -euo pipefail

DOMAIN="${1:?Usage: $0 <domain> <email> [btcpay-domain]}"
EMAIL="${2:?Usage: $0 <domain> <email> [btcpay-domain]}"
BTCPAY_DOMAIN="${3:-}"
COMPOSE="docker compose -f docker-compose.yml -f docker-compose.prod.yml"

DOMAIN_ARGS=(-d "$DOMAIN")
if [ -n "$BTCPAY_DOMAIN" ]; then
  DOMAIN_ARGS+=(-d "$BTCPAY_DOMAIN")
fi

echo "Requesting certificate from Let's Encrypt for ${DOMAIN_ARGS[*]}..."
$COMPOSE run --rm certbot \
  certonly --webroot -w /var/www/certbot \
  "${DOMAIN_ARGS[@]}" \
  --email "$EMAIL" --agree-tos --no-eff-email

echo "Certificate issued. Rendering full HTTPS Nginx config..."
if [ -n "$BTCPAY_DOMAIN" ]; then
  echo "Including the BTCPay Server block for $BTCPAY_DOMAIN — uncomment it in nginx/nginx.prod.conf.template first if you haven't."
  DOMAIN="$DOMAIN" BTCPAY_DOMAIN="$BTCPAY_DOMAIN" envsubst '${DOMAIN} ${BTCPAY_DOMAIN}' < nginx/nginx.prod.conf.template > nginx/nginx.prod.conf
else
  DOMAIN="$DOMAIN" envsubst '${DOMAIN}' < nginx/nginx.prod.conf.template > nginx/nginx.prod.conf
fi

echo "Restarting Nginx with HTTPS enabled..."
$COMPOSE restart nginx

echo "Done. Visit https://$DOMAIN to confirm HTTPS is working."
echo "The 'certbot' service in docker-compose.prod.yml auto-renews every 12h from now on."
