# Vote Dude Backend

MERN backend structured like MailboxNinja (`req.body`, `catchAsyncError`, cookie JWT).

## Setup

```bash
cp .env.example .env
# set MONGO_URI, JWT_SECRET, FRONTEND_URL, GOOGLE_CLIENT_ID

npm install
npm run seed
npm run dev
```

Admin after seed:
- email: `admin@votedude.com`
- password: `admin123`

## API base

```
http://localhost:5000/api/v1
```

### Auth
| Method | Path | Body |
|--------|------|------|
| POST | `/register` | `{ name, email, password, city }` |
| POST | `/login` | `{ email, password }` |
| POST | `/google` | `{ token }` (Google ID token) |
| GET | `/logout` | — (cookie) |
| GET | `/me` | — (cookie) |
| POST | `/leaderboard` | `{ city? }` |
| GET | `/user/:id/profile` | — |

### Resources
| Resource | List | Search (body filters) | Create |
|----------|------|----------------------|--------|
| News | GET `/news` | POST `/news/search` | POST `/news` (admin) |
| Events | GET `/events` | POST `/events/search` | POST `/events` |
| Candidates | GET `/candidates` | POST `/candidates/search` | POST `/candidates` (admin) |
| Issues | GET `/issues` | POST `/issues/search` | POST `/issues` (admin) |
| Laws | GET `/laws` | POST `/laws/search` | POST `/laws` (admin) |
| Discuss | GET `/discuss` | POST `/discuss/search` | POST `/discuss` |
| Petitions | GET `/petitions` | POST `/petitions/search` | POST `/petitions` |
| Polls | GET `/polls` | — | POST `/polls` (admin) |
| Sports | GET `/sports` | — | — |

### Actions
- PUT `/events/:id/rsvp`
- PUT `/petitions/:id/sign`
- PUT `/polls/:id/vote` body: `{ optionIndex }`
- PUT `/news/:id/like`
- POST `/news/:id/comment` body: `{ text }`
- POST `/discuss/:id/reply` body: `{ content }`

All responses: `{ success: true/false, ... }`
