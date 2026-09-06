from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Customer(BaseModel):
    id: int
    name: str
    email: str
    phone: str
    company: str

customers = []

@app.get("/customers", response_model=List[Customer])
def get_customers():
    return customers

@app.post("/customers", response_model=Customer)
def create_customer(customer: Customer):
    customers.append(customer)
    return customer

@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):
    global customers
    customers = [c for c in customers if c.id != customer_id]
    return {"message": "Customer deleted"}