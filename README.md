# HNG Stage 0 — Profile Endpoint (Node.js/Express)

## Requirements
- GET `/me` returns JSON (`application/json`)
- Integrates with Cat Facts API (`https://catfact.ninja/fact`)
- Returns the exact structure:

```json
{
  "status": "success",
  "user": {
    "email": "<your email>",
    "name": "<your full name>",
    "stack": "<your backend stack>"
  },
  "timestamp": "<current UTC time in ISO 8601 format>",
  "fact": "<random cat fact from Cat Facts API>"
}
```

## Tech Stack
- Node.js
- Express
- Axios
- CORS, Morgan

## Local Setup
1. Clone the repo and move into the directory.
2. Create `.env` from `.env.example` and fill in your details:

```
EMAIL=you@example.com
NAME=Your Full Name
STACK=Node.js/Express
# Optional
CATFACT_TIMEOUT_MS=5000
PORT=3000
```

3. Install dependencies:

```
npm install
```

4. Run the server:

```
npm run dev
# or
npm start
```

Server starts on `http://localhost:3000` by default.

## Endpoint
- GET `/me`

Response example:

```json
{
  "status": "success",
  "user": {
    "email": "you@example.com",
    "name": "Your Full Name",
    "stack": "Node.js/Express"
  },
  "timestamp": "2025-10-15T12:34:56.789Z",
  "fact": "Cats have five toes on their front paws and four on the back."
}
```

## Notes
- A fresh cat fact is fetched on each request; a timeout is enforced.
- If the Cat Facts API fails or times out, a graceful fallback message is returned in `fact`.
- CORS enabled, logging via Morgan.
