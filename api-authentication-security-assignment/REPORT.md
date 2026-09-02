# API Authentication & Security

## Title
API Authentication – Token-Based Authentication, OAuth, Security Practices and Hands-on Testing

## 1. Introduction

API authentication verifies the identity of a client or user before allowing access to protected resources. Authentication is different from authorization: authentication answers **who are you?**, while authorization answers **what are you allowed to do?**

Authentication is crucial because APIs often expose personal data, business information, account operations and privileged actions.

## 2. Token-Based Authentication

In token-based authentication, a client first proves its identity, usually by submitting credentials to a login endpoint. The server then issues an access token. The client sends that token with later requests.

Typical flow:

```text
Client → POST /login + credentials
Server → access token
Client → GET /protected + Authorization: Bearer <token>
Server → verifies token → protected response
```

This project demonstrates JSON Web Token (JWT) access tokens. The token contains claims such as user ID, username and role, and it has a limited lifetime.

### Example request

```http
POST /login
Content-Type: application/json

{
  "username": "student",
  "password": "Password123!"
}
```

### Example protected request

```http
GET /api/profile
Authorization: Bearer <access-token>
```

## 3. OAuth 2.0

OAuth 2.0 is primarily an **authorization framework**. It allows an application to obtain limited access to a resource on behalf of a resource owner without requiring the application to receive the user's password.

A common real-world scenario is signing into a third-party application using an identity/provider account. The user is redirected to the provider, grants requested permissions, and the application receives an authorization result and tokens according to the selected OAuth flow.

OAuth commonly uses scopes to limit access, for example:

```text
read:profile
read:orders
write:orders
```

Modern applications should select an appropriate OAuth flow for the client type. For browser-based and mobile/public clients, Authorization Code with PKCE is a common secure choice.

## 4. Token Authentication vs OAuth

| Aspect | Token/JWT Authentication | OAuth 2.0 |
|---|---|---|
| Main purpose | Authenticate/access protected API | Delegated authorization |
| Typical setup | Application controls login and token issuing | Authorization server controls authorization |
| Example | Internal API with application users | App accessing a user's data at another service |
| Access scopes | Can be implemented as claims/roles | Built into OAuth through scopes |
| Complexity | Relatively simple | More components and flows |
| Common concern | Token theft/storage/expiration | Redirects, client security, scopes and token handling |

A JWT is a token format; OAuth is a protocol/framework for authorization. They are not interchangeable concepts.

## 5. Hands-on Secure API

The included Node.js + Express application is called **Secure Notes API**.

### Public endpoint
`GET /`

### Authentication endpoint
`POST /login`

Demo credentials:
- Username: `student`
- Password: `Password123!`

### Protected endpoints
- `GET /api/profile`
- `GET /api/notes`

Protected endpoints require:

```http
Authorization: Bearer <token>
```

The server verifies the token before calling the protected route handler.

## 6. Password Security

The sample does not store the demo password in plain text. It uses `bcryptjs` to create and compare a password hash.

Production applications should use a strong password hashing algorithm and an appropriate work factor, never log passwords, and enforce password policies suitable for the application.

## 7. Postman Testing

The project includes a ready-to-import Postman collection.

Test sequence:

1. Start the server.
2. Run **Login and receive token**.
3. The Postman test stores the token in a variable.
4. Run the protected profile request with the Bearer token.
5. Test the protected endpoint without a token; it should return **401**.
6. Test with an invalid token; it should return **401**.
7. Run the protected notes request.

This demonstrates both successful authentication and failure cases.

## 8. API Security Best Practices

1. **Use HTTPS/TLS** so credentials and tokens are encrypted in transit.
2. **Hash passwords** using a suitable password-hashing algorithm.
3. **Use short-lived access tokens** and an appropriate refresh-token strategy when needed.
4. **Validate and sanitize input** on the server.
5. **Apply least privilege** through roles and scopes.
6. **Do not put secrets in source control.** Use environment variables or a secret manager.
7. **Avoid logging credentials and access tokens.**
8. **Rate-limit authentication endpoints** to reduce brute-force attacks.
9. **Rotate/revoke credentials when appropriate.**
10. **Return safe error messages** that do not expose internal details.
11. **Keep dependencies updated** and audit them.
12. **Configure CORS carefully** rather than allowing arbitrary origins in production.
13. **Use secure cookie settings** if tokens are stored in cookies.
14. **Validate token issuer, audience, signature and expiration** where applicable.
15. **Monitor and audit authentication events.**

## 9. Common Implementation Pitfalls

### Hard-coded production secrets
A secret in source code can leak through Git history or shared files. Use environment variables or a secret-management service.

### Long-lived tokens
Long token lifetimes increase the window of opportunity if a token is stolen.

### Missing authorization checks
Authentication alone does not prove that a user can access every resource. The server must also enforce authorization.

### Weak password storage
Plain-text or fast hashes are unsuitable for password storage.

### Trusting client-side checks
A frontend can hide a button, but that is not authorization. The server must enforce access control.

### Excessive error details
Stack traces and database errors should not be returned to clients in production.

## 10. Example Security Test Matrix

| Test | Expected result |
|---|---|
| Login with valid credentials | 200 + access token |
| Login with invalid password | 401 |
| Protected endpoint without token | 401 |
| Protected endpoint with invalid token | 401 |
| Protected endpoint with valid token | 200 |
| Expired token | 401 |

## 11. Industry Applications

### Banking
APIs use strong authentication and authorization to protect account and payment operations. OAuth-style delegated access can support controlled third-party integrations.

### E-commerce
Customer accounts, order history, payment operations and administrative APIs require authentication and fine-grained authorization.

### Healthcare
APIs may protect highly sensitive records and therefore require strict identity, authorization, auditing and transport security.

### Enterprise applications
Single sign-on and OAuth/OpenID Connect ecosystems allow employees to use centralized identity services while applications receive only the permissions they need.

## 12. Conclusion

API authentication is a core security layer for modern applications. Token-based authentication can provide a straightforward way for an application to protect its own APIs, while OAuth 2.0 is designed for delegated authorization and controlled access to resources.

The included Secure Notes API demonstrates the practical authentication cycle: credential verification, token issuance, Bearer-token validation, protected routes and Postman security testing. Applying HTTPS, secure password hashing, short-lived tokens, least privilege, input validation, rate limiting, secret management and careful error handling makes an API substantially safer.

## How to run

```bash
npm install
JWT_SECRET="replace-this-in-production" npm start
```

Windows PowerShell:

```powershell
$env:JWT_SECRET="replace-this-in-production"
npm start
```

Server:
`http://localhost:3000`

Import:
`postman/Secure-Notes-API.postman_collection.json`

## Suggested GitHub repository

`api-authentication-security-assignment`
