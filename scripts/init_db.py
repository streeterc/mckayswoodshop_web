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

    tee = Product(
        slug="classic-tee",
        name="Classic T-Shirt",
        description="Soft, everyday tee in your brand colors.",
        base_price_cents=2500,
        active=True,
    )
    tee.variants = [
        ProductVariant(sku="TEE-S", label="Small", stock_count=10),
        ProductVariant(sku="TEE-M", label="Medium", stock_count=15),
        ProductVariant(sku="TEE-L", label="Large", stock_count=8),
    ]
    mug = Product(
        slug="ceramic-mug",
        name="Ceramic Mug",
        description="12oz mug, dishwasher safe.",
        base_price_cents=1800,
        active=True,
    )
    mug.variants = [ProductVariant(sku="MUG-01", label="Standard", stock_count=20)]

    db.add_all([tee, mug])
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
