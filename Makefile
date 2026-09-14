.PHONY: up down logs migrate seed-admin shell db-shell prod-up prod-down prod-migrate

# --- Local development ---
up:
	docker compose --env-file .env.dev up --build

down:
	docker compose down

logs:
	docker compose logs -f web

migrate:
	docker compose exec web alembic upgrade head

seed-admin:
	docker compose exec -it web python scripts/init_db.py

shell:
	docker compose exec web bash

db-shell:
	docker compose exec db psql -U siteapp -d siteapp

# --- Production (run these on the droplet) ---
render-nginx-bootstrap:
	@set -a; . ./.env.prod; set +a; \
	envsubst '$${DOMAIN}' < nginx/nginx.bootstrap.conf.template > nginx/nginx.prod.conf; \
	echo "Rendered bootstrap (HTTP-only) nginx config for domain: $$DOMAIN"

prod-up: render-nginx-bootstrap
	docker compose -f docker-compose.yml -f docker-compose.prod.yml --env-file .env.prod up -d --build
	@echo "Stack is up on HTTP only. Next run: ./scripts/init_certbot.sh <domain> <email>"

prod-down:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml down

prod-migrate:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml exec web alembic upgrade head

prod-logs:
	docker compose -f docker-compose.yml -f docker-compose.prod.yml logs -f web
