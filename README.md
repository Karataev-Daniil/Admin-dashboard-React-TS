# ProductDash

**ProductDash** is a training admin panel for managing products, orders, and users.
The project imitates a real dashboard with analytics, filters, data editing, and a responsive layout.

Built with a focus on **React** app architecture, type safety, and a clean UI.

## Description

The project was created to practice typical frontend tasks:
working with tables, application state, routing, and user interfaces.

**No backend is used** data is stored locally. This lets you focus on the frontend,
code structure, and component interaction.

## Key features

### Dashboard

- Cards with key metrics
- Order statuses
- Sales distribution by category
- Inventory level
- Recent activity

### Products

- Catalog browsing
- Filtering by category, status, and stock
- Product editing
- Pagination

### Orders

- Orders list
- Filtering by status
- Updating order status
- Pagination

### Users

- Users list
- Filtering by role and status
- Sorting
- Profile editing

### Interface

- Fully responsive design
- Responsive navigation
- Unified style system

## Technologies

| Technology | Version |
|-----------|---------|
| **React** | 18 |
| **TypeScript** | - |
| **Vite** | - |
| **React Router** | - |
| **CSS Modules** | - |
| **LocalForage** | - |
| **ESLint** | - |

## Installation and run

```bash
git clone https://github.com/yourusername/productdash.git
cd productdash
npm install
```

### Development mode

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Architecture

**Global state** is implemented via the **React Context API**.
Data (products, orders, users) is stored in local storage using **LocalForage**.

The project is split into functional modules without overloaded components.

## Data types

### Order

```typescript
interface Order {
  id: string
  productId: string
  quantity: number
  price: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled'
  date: string
  customer: string
}
```

### Product

```typescript
interface Product {
  id: string
  name: string
  type: string
  stock: number
  price: number
  status: 'active' | 'inactive'
  dateAdded: string
}
```

### User

```typescript
interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'user'
  status: 'active' | 'inactive'
  dateAdded: string
}
```

## Project goals

- Practice building admin panels
- **React** application architecture
- State management and routing
- Type safety with **TypeScript**
- Encapsulated styles and a consistent UI

## Contacts

**GitHub**: https://github.com/Karataev-Daniil

**Email**: dirings52445@gmail.com