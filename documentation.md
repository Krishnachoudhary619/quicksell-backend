
# API Documentation

This document provides detailed information about the API endpoints for this project.

## Table of Contents

- [Authentication](#authentication)
  - [POST /auth/send-otp](#post-authsend-otp)
  - [POST /auth/verify-otp](#post-authverify-otp)
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

### POST /auth/send-otp
Sends a one-time password (OTP) to the user's phone number.

**Request Body:**
```json
{
  "phone": "9876543210"
}
```

**Responses:**

*   **200: OTP sent successfully**
    ```json
    {
      "success": true,
      "data": {},
      "message": "OTP sent successfully"
    }
    ```
*   **400: Invalid input**
    ```json
    {
      "success": false,
      "data": null,
      "message": "Phone number must be a valid 10-digit number"
    }
    ```

### POST /auth/verify-otp
Verifies the OTP and returns an access token, a refresh token, and user details.

**Request Body:**
```json
{
  "phone": "9876543210",
  "otp": "123456"
}
```

**Responses:**

*   **200: Login successful**
    ```json
    {
        "success": true,
        "message": "Login successful",
        "data": {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
            "refresh_token": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
            "user": {
                "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
                "role": "ADMIN",
                "shop_id": "b1c2d3e4-f5g6-7890-1234-567890abcdef"
            }
        }
    }
    ```
*   **400: Invalid input**
    ```json
    {
      "success": false,
      "data": null,
      "message": "otp must be a 4 or 6 digit string"
    }
    ```
*   **401: Authentication failed**
    ```json
    {
      "success": false,
      "data": null,
      "message": "Invalid or expired OTP"
    }
    ```

### POST /auth/refresh-token
Obtain a new access token using a refresh token.

**Request Body:**
```json
{
  "refresh_token": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```

**Responses:**

*   **200: Access token refreshed**
    ```json
    {
        "success": true,
        "message": "Access token refreshed",
        "data": {
            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
        }
    }
    ```
*   **400: Missing refresh token**
    ```json
    {
        "success": false,
        "data": null,
        "message": "refresh_token is a required field"
    }
    ```
*   **401: Invalid or expired refresh token**
    ```json
    {
        "success": false,
        "data": null,
        "message": "Invalid or expired refresh token"
    }
    ```

### POST /auth/logout
Logs out the user by revoking their refresh token. This endpoint requires an `Authorization` header with a bearer token.

**Request Body:**
```json
{
  "refresh_token": "a1b2c3d4-e5f6-7890-1234-567890abcdef"
}
```

**Responses:**

*   **200: Logged out successfully**
    ```json
    {
      "success": true,
      "data": {},
      "message": "Logged out successfully"
    }
    ```
*   **401: User is not authenticated**
    ```json
    {
      "success": false,
      "data": null,
      "message": "Unauthorized"
    }
    ```
