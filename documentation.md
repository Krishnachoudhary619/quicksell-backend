
# API Documentation

This document provides detailed information about all the APIs in the application.

## Table of Contents

- [Health](#health)
- [Catalog](#catalog)
- [Order](#order)
- [Product](#product)
- [Shop](#shop)
- [User](#user)

---

## Health

### GET /health

Checks the health of the application.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": "OK",
    "message": "Health check successful"
  }
  ```

---

## Catalog

### GET /catalog/:slug

Retrieves a catalog by its slug. This is a public route.

**Parameters:**

- `slug` (string): The slug of the catalog.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // catalog object
    },
    "message": "Catalog fetched successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Catalog not found"
  }
  ```

### POST /catalogs

Creates a new catalog. This is a private route.

**Request Body:**

```json
{
  "name": "My Catalog",
  "slug": "my-catalog"
}
```

**Responses:**

- **201 Created:**
  ```json
  {
    "success": true,
    "data": {
      // created catalog object
    },
    "message": "Catalog created successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Invalid request body"
  }
  ```

### PUT /catalogs/:id

Updates a catalog. This is a private route.

**Parameters:**

- `id` (string): The ID of the catalog.

**Request Body:**

```json
{
  "name": "Updated Catalog Name"
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated catalog object
    },
    "message": "Catalog updated successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Catalog not found"
  }
  ```

### DELETE /catalogs/:id

Deletes a catalog. This is a private route.

**Parameters:**

- `id` (string): The ID of the catalog.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": null,
    "message": "Catalog deleted successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Catalog not found"
  }
  ```

### GET /catalogs

Lists all catalogs for the authenticated user's shop. This is a private route.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": [
      // array of catalog objects
    ],
    "message": "Catalogs fetched successfully"
  }
  ```

### POST /catalogs/:id/products

Adds products to a catalog. This is a private route.

**Parameters:**

- `id` (string): The ID of the catalog.

**Request Body:**

```json
{
  "productIds": ["productId1", "productId2"]
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated catalog object
    },
    "message": "Products added to catalog successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Catalog not found"
  }
  ```

### DELETE /catalogs/:id/products/:productId

Removes a product from a catalog. This is a private route.

**Parameters:**

- `id` (string): The ID of the catalog.
- `productId` (string): The ID of the product.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated catalog object
    },
    "message": "Product removed from catalog successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Catalog or product not found"
  }
  ```

---

## Order

### POST /

Creates a new order.

**Request Body:**

```json
{
  "catalog_id": "catalogId",
  "items": [
    {
      "product_id": "productId",
      "quantity": 1
    }
  ]
}
```

**Responses:**

- **201 Created:**
  ```json
  {
    "success": true,
    "data": {
      // created order object
    },
    "message": "Order placed successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Invalid request body"
  }
  ```

### GET /

Lists all orders for the authenticated user's shop. This is a private route.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": [
      // array of order objects
    ],
    "message": "Orders fetched successfully"
  }
  ```

### GET /:id

Gets an order by its ID. This is a private route.

**Parameters:**

- `id` (string): The ID of the order.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // order object
    },
    "message": "Order details fetched successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Order not found"
  }
  ```

---

## Product

### POST /

Creates a new product. This is a private route.

**Request Body:**

```json
{
  "name": "My Product",
  "description": "Product description",
  "price": 100,
  "stock": 10
}
```

**Responses:**

- **201 Created:**
  ```json
  {
    "success": true,
    "data": {
      // created product object
    },
    "message": "Product created successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Invalid request body"
  }
  ```

### PUT /:id

Updates a product. This is a private route.

**Parameters:**

- `id` (string): The ID of the product.

**Request Body:**

```json
{
  "name": "Updated Product Name"
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated product object
    },
    "message": "Product updated successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Product not found"
  }
  ```

### DELETE /:id

Deletes a product. This is a private route.

**Parameters:**

- `id` (string): The ID of the product.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": null,
    "message": "Product deleted successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Product not found"
  }
  ```

### GET /

Lists all products for the authenticated user's shop. This is a private route.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": [
      // array of product objects
    ],
    "message": "Products fetched successfully"
  }
  ```

### PATCH /:id/stock

Updates the stock of a product. This is a private route.

**Parameters:**

- `id` (string): The ID of the product.

**Request Body:**

```json
{
  "stock": 20
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated product object
    },
    "message": "Product stock updated successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Product not found"
  }
  ```

---

## Shop

### GET /

Gets the details of the authenticated user's shop. This is a private route.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // shop object
    },
    "message": "Shop details fetched successfully"
  }
  ```

### PUT /

Updates the shop's profile. This is a private route restricted to admins.

**Request Body:**

```json
{
  "name": "My Awesome Shop"
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated shop object
    },
    "message": "Shop profile updated successfully"
  }
  ```

---

## User

### POST /staff

Creates a new staff user. This is a private route restricted to admins.

**Request Body:**

```json
{
  "email": "staff@example.com",
  "password": "password",
  "role": "staff"
}
```

**Responses:**

- **201 Created:**
  ```json
  {
    "success": true,
    "data": {
      // created user object
    },
    "message": "Staff created successfully"
  }
  ```
- **400 Bad Request:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "Invalid request body"
  }
  ```

### GET /staff

Lists all staff users. This is a private route restricted to admins.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": [
      // array of user objects
    ],
    "message": "Staff fetched successfully"
  }
  ```

### PATCH /staff/:id/status

Updates a staff user's status. This is a private route restricted to admins.

**Parameters:**

- `id` (string): The ID of the user.

**Request Body:**

```json
{
  "status": "inactive"
}
```

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // updated user object
    },
    "message": "Staff status updated successfully"
  }
  ```
- **404 Not Found:**
  ```json
  {
    "success": false,
    "data": null,
    "message": "User not found"
  }
  ```

### GET /me

Gets the profile of the authenticated user. This is a private route.

**Responses:**

- **200 OK:**
  ```json
  {
    "success": true,
    "data": {
      // user object
    },
    "message": "Profile fetched successfully"
  }
  ```
