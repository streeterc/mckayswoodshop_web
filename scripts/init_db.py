"""
Run inside the web container: `docker compose exec web python scripts/init_db.py`

Creates (or resets the password for) an admin user, and seeds a couple of
sample products so the store isn't empty in local dev.
"""
import getpass
import sys

sys.path.insert(0, ".")

from app.database import SessionLocal
from app.models import AdminUser, Product, ProductVariant, StoreSettings
from app.security import hash_password


def seed_admin(db):
    username = input("Admin username: ").strip()
    password = getpass.getpass("Admin password: ")
    existing = db.query(AdminUser).filter_by(username=username).first()
    if existing:
        existing.password_hash = hash_password(password)
        print(f"Updated password for existing admin '{username}'.")
    else:
        db.add(AdminUser(username=username, password_hash=hash_password(password)))
        print(f"Created admin user '{username}'.")
    db.commit()


def seed_sample_products(db):
    if db.query(Product).count() > 0:
        print("Products already exist — skipping sample product seed.")
        return

    board = Product(
        slug="walnut-cutting-board",
        name="Walnut Cutting Board",
        description=(
            "Solid walnut end-grain board, sanded smooth and finished with "
            "food-safe oil. Every board is a little different — grain and "
            "color vary piece to piece."
        ),
        base_price_cents=4500,
        image_path="/static/img/products/walnut-cutting-board.jpg",
        active=True,
    )
    board.variants = [
        ProductVariant(sku="BOARD-S", label="Small (8 x 5 in)", stock_count=10,
                        weight_oz=16.0, length_in=10.0, width_in=7.0, height_in=1.5),
        ProductVariant(sku="BOARD-M", label="Medium (12 x 7 in)", stock_count=15,
                        weight_oz=24.0, length_in=14.0, width_in=9.0, height_in=1.5),
        ProductVariant(sku="BOARD-L", label="Large (16 x 9 in)", stock_count=8,
                        weight_oz=32.0, length_in=18.0, width_in=11.0, height_in=2.0),
    ]
    knife = Product(
        slug="wood-butter-knife",
        name="Wood Butter Knife",
        description=(
            "A single-piece hand-carved butter knife, shaped and sanded "
            "from offcut hardwood so nothing in the shop goes to waste."
        ),
        base_price_cents=1800,
        image_path="/static/img/products/wood-butter-knife.jpg",
        active=True,
    )
    knife.variants = [
        ProductVariant(sku="KNIFE-01", label="Standard", stock_count=20,
                        weight_oz=3.0, length_in=8.0, width_in=2.0, height_in=1.0),
    ]

    db.add_all([board, knife])
    db.commit()
    print("Seeded sample products: Classic T-Shirt, Ceramic Mug.")


def seed_store_settings(db):
    if not db.get(StoreSettings, 1):
        db.add(StoreSettings(id=1))
        db.commit()
        print("Seeded default store settings.")


if __name__ == "__main__":
    db = SessionLocal()
    try:
        seed_admin(db)
        seed_sample_products(db)
        seed_store_settings(db)
    finally:
        db.close()
