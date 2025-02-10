from datetime import datetime, timedelta
import random
import uuid
import csv

# Define the categories and types
categories = [
    "HOME", "TRANSPORT", "FOOD", "FASHION", "HEALTH_AND_WELLNESS",
    "ENTERTAINMENT", "PETS", "TRIPS", "TECHNOLOGY", "EDUCATION",
    "TAXES", "INSURANCE", "BANKING_COMMITMENTS", "BUSINESS", "OTHERS"
]

types = ["EXPENSE", "INCOME"]

# Generate random data
def random_date_within_year():
    today = datetime.utcnow()
    past_date = today - timedelta(days=random.randint(0, 365))
    return past_date.isoformat() + "Z"

def generate_random_transaction():
    created_at = random_date_within_year()
    category = random.choice(categories)
    type = random.choice(types)
    return {
        "id": str(uuid.uuid4()),
        "value": random.randint(10000, 3000000),  # Random value between 100 and 10000
        "description": f"Random {type} for {category}",
        "category": category,
        "created_at": created_at,
        "updated_at": created_at,  # For simplicity, same as created_at
        "userId": "aa0cfd13-398a-4482-bbfc-850fee4bade5",
        "type": type
    }

# Generate 10 random transactions
random_transactions = [generate_random_transaction() for _ in range(30)]

# Define the file path
file_path = "./random_transactions.csv"

# headers for the csv
headers = ["id", "value", "description", "category", "created_at", "updated_at", "userId", "type"]

# Write to CSV
with open(file_path, mode="w", newline="") as file:
    writer = csv.DictWriter(file, fieldnames=headers)
    writer.writeheader()
    writer.writerows(random_transactions)
