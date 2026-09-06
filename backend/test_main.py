from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

def test_create_customer():
    response = client.post("/customers", json={
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "company": "Example Inc."
    })
    assert response.status_code == 200
    assert response.json() == {
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "1234567890",
        "company": "Example Inc."
    }

def test_get_customers():
    response = client.get("/customers")
    assert response.status_code == 200
    assert len(response.json()) > 0

def test_delete_customer():
    client.post("/customers", json={
        "id": 2,
        "name": "Jane Doe",
        "email": "jane@example.com",
        "phone": "0987654321",
        "company": "Another Inc."
    })
    response = client.delete("/customers/2")
    assert response.status_code == 200
    assert response.json() == {"message": "Customer deleted"}
    response = client.get("/customers")
    assert len(response.json()) == 1