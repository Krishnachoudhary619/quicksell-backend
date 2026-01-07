# API Documentation

This documentation provides a comprehensive guide to the backend API, designed for frontend developers. It outlines all the necessary information to interact with the API effectively, including authentication, authorization, error handling, and detailed endpoint descriptions.

## Global Sections

### 1. Authentication

Authentication is handled via JSON Web Tokens (JWT). Every request to a private endpoint must include an `Authorization` header with a Bearer token.

**Example Header:**

```
Authorization: Bearer <YOUR_JWT_TOKEN>
```

**Authentication Failure:**

If a valid token is not provided for a protected route, the API will respond with a `401 Unauthorized` error.

```json
{
  "success": false,
  "data": null,
  "message": "Authentication failed: No token provided"
}
```

### 2. Authorization

The API defines three levels of access for its routes:

-   **PUBLIC:** These routes are open and do not require any authentication.
-   **STAFF:** These routes are accessible to users with the `STAFF` or `ADMIN` role.
-   **ADMIN:** These routes are restricted to users with the `ADMIN` role only.

The required role for each endpoint is specified in its documentation.

### 3. Standard Error Response Format

The API uses a standard error response format for all failed requests.

-   **400 Bad Request**

    Indicates a client-side error, such as invalid JSON or missing required fields.

    ```json
    {
      "success": false,
      "data": null,
      "message": "Invalid request body"
    }
    ```

-   **401 Unauthorized**

    Indicates that the request requires authentication, but a valid token was not provided.

    ```json
    {
      "success": false,
      "data": null,
      "message": "Authentication failed: Invalid token"
    }
    ```

-   **403 Forbidden**

    Indicates that the authenticated user does not have the necessary permissions to access the resource.

    ```json
    {
      "success": false,
      "data": null,
      "message": "Forbidden: You do not have access to this resource"
    }
    ```

-   **404 Not Found**

    Indicates that the requested resource could not be found on the server.

    ```json
    {
      "success": false,
      "data": null,
      "message": "Resource not found"
    }
    ```

-   **500 Internal Server Error**

    Indicates a server-side error.

    ```json
    {
      "success": false,
      "data": null,
      "message": "An unexpected error occurred"
    }
    ```

---

## API Endpoints

### Health Check

-   **Endpoint:** `/health`
-   **Method:** `GET`
-   **Access:** `PUBLIC`
-   **Description:** Checks the health of the API.

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "status": "UP",
    "timestamp": "2023-10-27T10:00:00.000Z"
  },
  "message": "API is healthy"
}
```

### Shop

#### Get Shop Details

-   **Endpoint:** `/shop/:shop_id`
-   **Method:** `GET`
-   **Access:** `STAFF`
-   **URL Params:**
    -   `shop_id` (string, required)

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "shop_name": "The Corner Store",
    "shop_phone": "+1234567890",
    "shop_email": "contact@thecornerstore.com",
    "shop_address": "123 Main Street, Anytown, USA",
    "shop_logo_url": "https://example.com/logo.png",
    "shop_images": "["https://example.com/image1.png", "https://example.com/image2.png"]",
    "is_active": true,
    "created_at": "2023-01-01T12:00:00.000Z",
    "updated_at": "2023-01-01T12:00:00.000Z"
  },
  "message": "Shop details retrieved successfully"
}
```

### User

#### Get User Details

-   **Endpoint:** `/users/:user_id`
-   **Method:** `GET`
-   **Access:** `STAFF`
-   **URL Params:**
    -   `user_id` (string, required)

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "shop_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "role": "ADMIN",
    "name": "John Doe",
    "phone": "+1987654321",
    "email": "john.doe@example.com",
    "profile_image_url": "https://example.com/profile.jpg",
    "is_active": true,
    "last_login_at": "2023-10-26T18:30:00.000Z",
    "created_at": "2023-01-15T09:00:00.000Z",
    "updated_at": "2023-10-26T18:30:00.000Z"
  },
  "message": "User details retrieved successfully"
}
```

### Products

#### Get All Products

-   **Endpoint:** `/products`
-   **Method:** `GET`
-   **Access:** `STAFF`

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": [
    {
      "id": "p1a2b3c4-d5e6-f789-0123-456789abcdef",
      "shop_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "sku_code": "TS-BLK-L",
      "product_name": "Black T-Shirt",
      "description": "A comfortable black t-shirt made from 100% cotton.",
      "price": 25.99,
      "currency": "INR",
      "stock_quantity": 100,
      "is_active": true,
      "thumbnail_url": "https://example.com/tshirt_thumb.jpg",
      "image_urls": "["https://example.com/tshirt_front.jpg", "https://example.com/tshirt_back.jpg"]",
      "category": "Apparel",
      "created_at": "2023-02-01T10:00:00.000Z",
      "updated_at": "2023-02-01T10:00:00.000Z"
    },
    {
      "id": "p2b3c4d5-e6f7-8901-2345-67890abcdef1",
      "shop_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
      "sku_code": "MUG-WHT",
      "product_name": "White Coffee Mug",
      "description": "A classic white ceramic coffee mug.",
      "price": 12.50,
      "currency": "INR",
      "stock_quantity": 50,
      "is_active": true,
      "thumbnail_url": "https://example.com/mug_thumb.jpg",
      "image_urls": "["https://example.com/mug_front.jpg", "https://example.com/mug_side.jpg"]",
      "category": "Homeware",
      "created_at": "2023-03-10T14:20:00.000Z",
      "updated_at": "2023-03-10T14:20:00.000Z"
    }
  ],
  "message": "Products retrieved successfully"
}
```

### Catalogs

#### Get Catalog by Slug

-   **Endpoint:** `/:catalog_slug`
-   **Method:** `GET`
-   **Access:** `PUBLIC`
-   **URL Params:**
    -   `catalog_slug` (string, required)

**Success Response (200 OK)**

```json
{
  "success": true,
  "data": {
    "id": "c1d2e3f4-g5h6-i789-j012-k34567lmnop",
    "shop_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "catalog_name": "Summer Collection",
    "catalog_slug": "summer-collection",
    "is_active": true,
    "created_by": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "created_at": "2023-06-01T11:00:00.000Z",
    "updated_at": "2023-06-01T11:00:00.000Z",
    "products": [
      {
        "id": "cp1",
        "product": {
          "id": "p1a2b3c4-d5e6-f789-0123-456789abcdef",
          "product_name": "Black T-Shirt",
          "price": 25.99,
          "thumbnail_url": "https://example.com/tshirt_thumb.jpg"
        }
      },
      {
        "id": "cp2",
        "product": {
          "id": "p2b3c4d5-e6f7-8901-2345-67890abcdef1",
          "product_name": "White Coffee Mug",
          "price": 12.50,
          "thumbnail_url": "https://example.com/mug_thumb.jpg"
        }
      }
    ]
  },
  "message": "Catalog retrieved successfully"
}
```

#### Create Order from Catalog

-   **Endpoint:** `/:catalog_slug/order`
-   **Method:** `POST`
-   **Access:** `PUBLIC`
-   **URL Params:**
    -   `catalog_slug` (string, required)
-   **Request Body:**

    ```json
    {
      "order_items": [
        {
          "product_id": "p1a2b3c4-d5e6-f789-0123-456789abcdef",
          "quantity": 2
        },
        {
          "product_id": "p2b3c4d5-e6f7-8901-2345-67890abcdef1",
          "quantity": 1
        }
      ]
    }
    ```

**Success Response (201 Created)**

```json
{
  "success": true,
  "data": {
    "id": "o1p2q3r4-s5t6-u789-v012-w34567xzy",
    "shop_id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "catalog_id": "c1d2e3f4-g5h6-i789-j012-k34567lmnop",
    "order_items": "[{"product_id":"p1a2b3c4-d5e6-f789-0123-456789abcdef","quantity":2},{"product_id":"p2b3c4d5-e6f7-8901-2345-67890abcdef1","quantity":1}]",
    "total_items": 3,
    "order_source": "CATALOG_LINK",
    "whatsapp_sent": false,
    "created_at": "2023-10-27T14:00:00.000Z"
  },
  "message": "Order created successfully"
}
```
