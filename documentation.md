
# API Documentation

This document provides detailed information about the API endpoints for this project.

## Table of Contents

- [Authentication](#authentication)
  - [POST /auth/signup](#post-authsignup)
  - [POST /auth/login](#post-authlogin)
  - [POST /auth/refresh-token](#post-authrefresh-token)
  - [POST /auth/logout](#post-authlogout)
- [Users](#users)
  - [POST /users/staff](#post-usersstaff)
  - [GET /users/staff](#get-usersstaff)
  - [PATCH /users/staff/:id/status](#patch-usersstaffidstatus)
  - [GET /users/me](#get-usersme)
- [Shop](#shop)
  - [POST /shop](#post-shop)
  - [GET /shop](#get-shop)
  - [PATCH /shop](#patch-shop)
- [Products](#products)
  - [POST /products](#post-products)
  - [GET /products](#get-products)
  - [GET /products/:id](#get-productsid)
  - [PATCH /products/:id](#patch-productsid)
  - [DELETE /products/:id](#delete-productsid)
- [Catalogs](#catalogs)
  - [POST /catalogs](#post-catalogs)
  - [GET /catalogs](#get-catalogs)
  - [GET /:slug](#get-slug)
  - [GET /catalogs/:id](#get-catalogsid)
  - [PATCH /catalogs/:id](#patch-catalogsid)
  - [DELETE /catalogs/:id](#delete-catalogsid)
  - [POST /catalogs/:id/products](#post-catalogsidproducts)
  - [DELETE /catalogs/:id/products](#delete-catalogsidproducts)
  - [PATCH /catalogs/:id/products/order](#patch-catalogsidproductsorder)
- [Orders](#orders)
  - [POST /orders](#post-orders)
- [Health](#health)
  - [GET /health](#get-health)

---

## Authentication

### POST /auth/signup
Creates a new shop and an admin user for that shop.

**Request Body:**
```json
{
  "shop_name": "My Awesome Shop",
  "shop_phone": "1234567890",
  "name": "Admin User",
  "phone": "0987654321"
}
```

**Response:**
```json
{
  "message": "Shop created successfully. OTP sent to your phone.",
  "data": {
    "otp_session_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
  }
}
```

### POST /auth/login
Logs in a user and returns an access token and a refresh token.

**Request Body:**
```json
{
  "phone": "0987654321",
  "otp": "123456"
}
```

**Response:**
```json
{
    "message": "Login successful",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGEzYWY1ZC1lYjYyLTQxNWYtOTUxZS00YjI5ZDA0YjYyYjUiLCJzaG9wSWQiOiJiZTRlN2Q4OC05YjA5LTQ0MDUtYjE1Zi1kZTBlZGE0NDVmYWMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTY0NzEwODcsImV4cCI6MTcxNjQ3MTk4N30.i-2g2j-wAsA7fFEN2GmFwBfN8g9zY1Uo3t2a2e3n5Yw",
        "refreshToken": "e63a8c3e-8e8e-4f3b-8c6c-8e8e8e8e8e8e"
    }
}
```

### POST /auth/refresh-token
Refreshes an access token.

**Request Body:**
```json
{
  "refreshToken": "e63a8c3e-8e8e-4f3b-8c6c-8e8e8e8e8e8e"
}
```

**Response:**
```json
{
    "message": "Token refreshed successfully",
    "data": {
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGEzYWY1ZC1lYjYyLTQxNWYtOTUxZS00YjI5ZDA0YjYyYjUiLCJzaG9wSWQiOiJiZTRlN2Q4OC05YjA5LTQ0MDUtYjE1Zi1kZTBlZGE0NDVmYWMiLCJyb2xlIjoiQURNSU4iLCJpYXQiOjE3MTY0NzEwODcsImV4cCI6MTcxNjQ3MTk4N30.i-2g2j-wAsA7fFEN2GmFwBfN8g9zY1Uo3t2a2e3n5Yw"
    }
}
```

### POST /auth/logout
Logs out a user.

**Response:**
```json
{
  "message": "Logout successful"
}
```

---

## Users

### POST /users/staff
Creates a new staff user.

**Request Body:**
```json
{
  "name": "Staff User",
  "phone": "1122334455",
  "role": "STAFF"
}
```

**Response:**
```json
{
    "message": "Staff created successfully",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "role": "STAFF",
        "name": "Staff User",
        "phone": "1122334455",
        "email": null,
        "profile_image_url": null,
        "is_active": true,
        "last_login_at": null,
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

### GET /users/staff
Lists all staff users.

**Response:**
```json
{
    "message": "Staff listed successfully",
    "data": [
        {
            "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
            "role": "STAFF",
            "name": "Staff User",
            "phone": "1122334455",
            "email": null,
            "profile_image_url": null,
            "is_active": true,
            "last_login_at": null,
            "created_at": "2024-05-23T12:35:45.000Z",
            "updated_at": "2024-05-23T12:35:45.000Z"
        }
    ]
}
```

### PATCH /users/staff/:id/status
Updates the status of a staff user.

**Request Body:**
```json
{
  "is_active": false
}
```

**Response:**
```json
{
    "message": "Staff status updated successfully",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "is_active": false
    }
}
```

### GET /users/me
Gets the profile of the currently authenticated user.

**Response:**
```json
{
    "message": "Profile fetched successfully",
    "data": {
        "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "role": "ADMIN",
        "name": "Admin User",
        "phone": "0987654321",
        "email": "admin@example.com",
        "profile_image_url": null,
        "is_active": true,
        "last_login_at": "2024-05-23T12:35:45.000Z",
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

---

## Shop

### POST /shop
Creates a new shop.

**Request Body:**
```json
{
  "shop_name": "My Awesome Shop",
  "shop_phone": "1234567890"
}
```

**Response:**
```json
{
    "message": "Shop created successfully",
    "data": {
        "id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "shop_name": "My Awesome Shop",
        "shop_phone": "1234567890",
        "shop_email": null,
        "shop_address": null,
        "shop_logo_url": null,
        "shop_images": null,
        "is_active": true,
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

### GET /shop
Gets the details of a shop.

**Response:**
```json
{
    "message": "Shop details fetched successfully",
    "data": {
        "id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "shop_name": "My Awesome Shop",
        "shop_phone": "1234567890",
        "shop_email": "shop@example.com",
        "shop_address": "123 Main St, Anytown, USA",
        "shop_logo_url": "https://example.com/logo.png",
        "shop_images": "[]",
        "is_active": true,
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

### PATCH /shop
Updates the details of a shop.

**Request Body:**
```json
{
  "shop_name": "My Updated Shop Name",
  "shop_email": "new.email@example.com"
}
```

**Response:**
```json
{
    "message": "Shop updated successfully",
    "data": {
        "id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "shop_name": "My Updated Shop Name",
        "shop_phone": "1234567890",
        "shop_email": "new.email@example.com",
        "shop_address": "123 Main St, Anytown, USA",
        "shop_logo_url": "https://example.com/logo.png",
        "shop_images": "[]",
        "is_active": true,
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

---

## Products

### POST /products
Creates a new product.

**Request Body:**
```json
{
  "product_name": "Sample Product",
  "price": 99.99,
  "stock_quantity": 100
}
```

**Response:**
```json
{
    "message": "Product created successfully",
    "data": {
        "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "sku_code": "SKU123",
        "product_name": "Sample Product",
        "description": "This is a sample product.",
        "price": 99.99,
        "currency": "INR",
        "stock_quantity": 100,
        "is_active": true,
        "thumbnail_url": null,
        "image_urls": null,
        "category": null,
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

### GET /products
Lists all products.

**Response:**
```json
{
    "message": "Products listed successfully",
    "data": [
        {
            "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
            "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
            "sku_code": "SKU123",
            "product_name": "Sample Product",
            "description": "This is a sample product.",
            "price": 99.99,
            "currency": "INR",
            "stock_quantity": 100,
            "is_active": true,
            "thumbnail_url": null,
            "image_urls": null,
            "category": null,
            "created_at": "2024-05-23T12:35:45.000Z",
            "updated_at": "2024-05-23T12:35:45.000Z"
        }
    ]
}
```

### GET /products/:id
Gets a single product by its ID.

**Response:**
```json
{
    "message": "Product fetched successfully",
    "data": {
        "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "sku_code": "SKU123",
        "product_name": "Sample Product",
        "description": "This is a sample product.",
        "price": 99.99,
        "currency": "INR",
        "stock_quantity": 100,
        "is_active": true,
        "thumbnail_url": null,
        "image_urls": null,
        "category": null,
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

### PATCH /products/:id
Updates a product.

**Request Body:**
```json
{
  "price": 129.99,
  "stock_quantity": 90
}
```

**Response:**
```json
{
    "message": "Product updated successfully",
    "data": {
        "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
        "price": 129.99,
        "stock_quantity": 90
    }
}
```

### DELETE /products/:id
Deletes a product.

**Response:**
```json
{
  "message": "Product deleted successfully"
}
```

---

## Catalogs

### POST /catalogs
Creates a new catalog.

**Request Body:**
```json
{
  "catalog_name": "Summer Collection"
}
```

**Response:**
```json
{
    "message": "Catalog created successfully",
    "data": {
        "id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "catalog_name": "Summer Collection",
        "catalog_slug": "summer-collection-12345",
        "is_active": true,
        "created_by": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z"
    }
}
```

### GET /catalogs
Lists all catalogs.

**Response:**
```json
{
    "message": "Catalogs listed successfully",
    "data": [
        {
            "id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
            "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
            "catalog_name": "Summer Collection",
            "catalog_slug": "summer-collection-12345",
            "is_active": true,
            "created_by": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "created_at": "2024-05-23T12:35:45.000Z",
            "updated_at": "2024-05-23T12:35:45.000Z"
        }
    ]
}
```

### GET /:slug
Gets a catalog by its slug.

**Response:**
```json
{
    "message": "Catalog fetched successfully",
    "data": {
        "id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "catalog_name": "Summer Collection",
        "catalog_slug": "summer-collection-12345",
        "is_active": true,
        "products": [
            {
                "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
                "product_name": "Sample Product",
                "price": 99.99
            }
        ]
    }
}
```

### GET /catalogs/:id
Gets a single catalog by its ID.

**Response:**
```json
{
    "message": "Catalog fetched successfully",
    "data": {
        "id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "catalog_name": "Summer Collection",
        "catalog_slug": "summer-collection-12345",
        "is_active": true,
        "created_by": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
        "created_at": "2024-05-23T12:35:45.000Z",
        "updated_at": "2024-05-23T12:35:45.000Z",
        "products": [
            {
                "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
                "display_order": 0,
                "product": {
                    "id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
                    "product_name": "Sample Product",
                    "price": 99.99
                }
            }
        ]
    }
}
```

### PATCH /catalogs/:id
Updates a catalog.

**Request Body:**
```json
{
  "catalog_name": "Winter Collection",
  "is_active": false
}
```

**Response:**
```json
{
    "message": "Catalog updated successfully",
    "data": {
        "id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
        "catalog_name": "Winter Collection",
        "is_active": false
    }
}
```

### DELETE /catalogs/:id
Deletes a catalog.

**Response:**
```json
{
  "message": "Catalog deleted successfully"
}
```

### POST /catalogs/:id/products
Adds products to a catalog.

**Request Body:**
```json
{
  "product_ids": ["c1d2e3f4-g5h6-7890-1234-567890abcdef"]
}
```

**Response:**
```json
{
  "message": "Products added to catalog successfully"
}
```

### DELETE /catalogs/:id/products
Removes products from a catalog.

**Request Body:**
```json
{
  "product_ids": ["c1d2e3f4-g5h6-7890-1234-567890abcdef"]
}
```

**Response:**
```json
{
  "message": "Products removed from catalog successfully"
}
```

### PATCH /catalogs/:id/products/order
Updates the display order of products in a catalog.

**Request Body:**
```json
{
  "products": [
    { "product_id": "c1d2e3f4-g5h6-7890-1234-567890abcdef", "display_order": 1 }
  ]
}
```

**Response:**
```json
{
  "message": "Product display order updated successfully"
}
```

---

## Orders

### POST /orders
Creates a new order.

**Request Body:**
```json
{
  "catalog_id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
  "order_items": [
    {
      "product_id": "c1d2e3f4-g5h6-7890-1234-567890abcdef",
      "quantity": 2
    }
  ]
}
```

**Response:**
```json
{
    "message": "Order created successfully",
    "data": {
        "id": "e1f2g3h4-i5j6-7890-1234-567890abcdef",
        "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef",
        "catalog_id": "d1e2f3g4-h5i6-7890-1234-567890abcdef",
        "order_items": "[{\"product_id\":\"c1d2e3f4-g5h6-7890-1234-567890abcdef\",\"quantity\":2}]",
        "total_items": 2,
        "order_source": "CATALOG_LINK",
        "whatsapp_sent": false,
        "created_at": "2024-05-23T12:35:45.000Z"
    }
}
```

---

## Health

### GET /health
Checks the health of the API.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-05-23T12:35:45.000Z"
}
```
