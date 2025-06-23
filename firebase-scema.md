# 🗄 Firebase Schema – Freelance CRM

## 🔹 Collection: clients
Each document represents one client.

**Fields:**
- `id`: string (auto-generated)
- `name`: string
- `email`: string
- `phone`: string
- `company`: string
- `notes`: string (optional)
- `createdAt`: timestamp

## 🔹 Collection: invoices
Each document represents an invoice linked to a client.

**Fields:**
- `id`: string (auto-generated)
- `clientId`: string (foreign key – links to client)
- `items`: array of objects { description, quantity, rate }
- `total`: number (calculated)
- `status`: string ("Paid" or "Unpaid")
- `issueDate`: date
- `dueDate`: date
- `createdAt`: timestamp

**Example `items`:**
```json
[
  { "description": "Web design", "quantity": 2, "rate": 150 },
  { "description": "SEO audit", "quantity": 1, "rate": 100 }
]