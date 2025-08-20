from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["foodapp"]
users_collection = db["users"]
print("✅ MongoDB connected successfully!")

