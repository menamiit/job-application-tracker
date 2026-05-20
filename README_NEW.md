# 📋 Job Application Tracker

A full-stack CRUD application to help you organize and track your job applications with user authentication. Built with modern cloud infrastructure (AWS & MongoDB) and automated CI/CD.

## 🎯 Features

- ✅ **User Authentication** - Register, login with bcrypt password hashing
- ✅ **Create** job applications with company name, position, and job link
- 📖 **Read** your applications in an organized list (per-user data isolation)
- ✏️ **Update** application status (Applied, Interviewing, Offered, Rejected) and notes
- 🗑️ **Delete** applications you no longer need to track
- 🔐 **JWT Security** - Protected CRUD endpoints with token-based auth
- 🚀 **Auto-Deploy** - GitHub Actions CI/CD pipeline on every push

## 🛠️ Tech Stack

**Frontend:**
- HTML5, CSS3, Vanilla JavaScript
- JWT token storage (localStorage)
- CloudFront CDN for global distribution

**Backend:**
- Express.js on Node.js
- MongoDB Atlas for data persistence
- bcryptjs for password hashing
- jsonwebtoken (JWT) for authentication

**Infrastructure & DevOps:**
- AWS S3 for static hosting
- AWS CloudFront for CDN
- EC2 for backend server
- GitHub Actions for CI/CD
- Git for version control

## 📦 Project Structure

```
job-application-tracker/
├── frontend/
│   ├── index.html                # Main dashboard (protected)
│   ├── login.html                # Auth page (login/register)
│   ├── script.js                 # CRUD operations + JWT handling
│   └── styles.css                # Responsive styling
├── backend/
│   ├── server.js                 # Express server with auth + CRUD
│   └── package.json              # Dependencies (express, mongoose, bcryptjs, jwt)
├── .github/workflows/
│   └── deploy.yml                # Auto-deploy to S3 + CloudFront invalidation
├── .env.example                  # Configuration template
├── .gitignore                    # Secrets protection
├── README.md                     # This file
└── PROJECT_PLAN.md              # Phase-by-phase breakdown
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas cluster
- AWS Account (S3, CloudFront, EC2)
- GitHub Account & Git

### Local Setup

1. **Clone & install:**
   ```bash
   git clone https://github.com/menamiit/job-application-tracker.git
   cd job-application-tracker
   cd backend && npm install && cd ..
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Fill in:
   # MONGODB_URI=mongodb+srv://...
   # PORT=5000
   ```

3. **Run locally:**
   ```bash
   cd backend
   npm start  # Runs on http://localhost:5000
   ```

4. **Test the app:**
   - Open `frontend/login.html` (or serve with a local server)
   - Register a new account
   - Login and add job applications

## 🏗️ Architecture

```
┌──────────────────────────────────┐
│   Frontend (CloudFront HTTPS)    │
│  (login.html, index.html, etc)   │
└────────────┬─────────────────────┘
             │
  ┌──────────┴──────────┐
  ▼                     ▼
┌─────────┐          ┌──────────────┐
│    S3   │          │ CloudFront   │
│ (files) │          │ (API proxy)  │
└─────────┘          └──────┬───────┘
                             │
                             ▼
                      ┌────────────────┐
                      │  EC2 Backend   │
                      │ (Express/Node) │
                      └────────┬───────┘
                               │
                               ▼
                      ┌────────────────┐
                      │  MongoDB Atlas │
                      │   (Database)   │
                      └────────────────┘
```

**Auth Flow:**
1. User registers/logs in on `/login.html`
2. Backend validates credentials, returns JWT token
3. Frontend stores token in localStorage
4. All API requests include `Authorization: Bearer <token>`
5. Backend verifies token before allowing CRUD operations

## 🔐 Security

- ✅ Passwords hashed with bcryptjs (10 rounds)
- ✅ JWT tokens expire in 7 days
- ✅ CORS enabled for frontend domain
- ✅ Credentials in `.env` (never committed)
- ✅ GitHub Actions use secrets (not hardcoded)
- ✅ Per-user data isolation (applications linked to userId)
- ✅ HTTPS enforced via CloudFront
- ✅ Input validation on all endpoints

## 🚀 CI/CD Pipeline

Every push to `main` triggers GitHub Actions:
1. Deploys `frontend/` files to S3
2. Invalidates CloudFront cache (`/*`)
3. Syncs only changed files (efficient)

**Manual deployment also works:**
```bash
git add .
git commit -m "feat: Your feature"
git push origin main
```

## 📊 API Endpoints

### Authentication
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Login (returns JWT token)

### Applications (Protected - require JWT token)
- `GET /applications` - Get all applications for logged-in user
- `POST /applications` - Create new application
- `PUT /applications/:id` - Update application status/notes
- `DELETE /applications/:id` - Delete application

## 🧪 Testing Checklist

- [ ] Register new account
- [ ] Login with credentials
- [ ] Add job application
- [ ] Update application status
- [ ] Delete application
- [ ] Logout
- [ ] Test in multiple browsers (Chrome, Firefox, Safari)
- [ ] Test on mobile devices
- [ ] Test error handling (empty fields, network errors)

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [AWS S3](https://aws.amazon.com/s3/)
- [AWS CloudFront](https://aws.amazon.com/cloudfront/)
- [GitHub Actions](https://github.com/features/actions)

## 📝 Deployment Notes

- Frontend lives at: `https://<cloudfront-domain>/`
- Login page: `https://<cloudfront-domain>/login.html`
- API backend: `https://<api-cloudfront-domain>/`
- All communication is HTTPS-only
- Tokens are stored client-side (localStorage)

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Full-stack JavaScript (frontend + backend)
- ✅ User authentication & security best practices
- ✅ RESTful API design
- ✅ Database design & queries (MongoDB)
- ✅ Cloud infrastructure (AWS)
- ✅ CI/CD automation (GitHub Actions)
- ✅ Git workflow & version control

---

**Status:** ✅ Complete & Live  
**Last Updated:** May 20, 2026
