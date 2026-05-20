# Job Application Tracker - Project Summary

## 🎯 Overview
A full-stack web application that helps users track job applications with CRUD operations, status tracking, and user authentication.

**Final Tech Stack:**
- **Frontend:** HTML + Vanilla JavaScript (Static Site)
- **Backend:** Node.js + Express (EC2)
- **Database:** MongoDB Atlas (Cloud DB with Mongoose ODM)
- **Hosting:** S3 + CloudFront (Frontend), EC2 (API)
- **Authentication:** JWT + bcryptjs
- **Deployment:** GitHub Actions (automated frontend deploy)

---

---

## ✅ What We Built

### Phase 1-2: Frontend UI + CRUD
- [x] Responsive HTML/CSS form for adding applications
- [x] Dynamic table showing all applications with edit/delete buttons
- [x] Status badges (Applied, Interviewing, Offered, Rejected)
- [x] JavaScript CRUD operations (fetch from API)

### Phase 3: Backend API + MongoDB
- [x] Express server with MongoDB connection
- [x] Mongoose schemas for Users and Applications
- [x] REST endpoints: POST/GET/PUT/DELETE `/applications`
- [x] JWT middleware to protect routes (token required)
- [x] bcryptjs password hashing for registration/login

### Phase 4: Cloud Deployment
- [x] S3 bucket for frontend assets (index.html, script.js, styles.css, login.html)
- [x] CloudFront distribution (CDN + caching)
- [x] EC2 instance running Node.js backend
- [x] MongoDB Atlas connection from EC2
- [x] Security: CORS configured, passwords hashed, HTTPS

### Phase 5: CI/CD Pipeline
- [x] GitHub Actions workflow: `push main` → auto-deploy frontend to S3 + CloudFront invalidation
- [x] Secrets: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION

### Phase 6: Security Hardening
- [x] `.env.example` with no secrets committed
- [x] Environment variables (MONGODB_URI, JWT_SECRET, PORT)
- [x] Input validation in Express
- [x] CORS whitelist (frontend domain only)
- [x] EC2 Security Groups (SSH + API port restricted)

### Phase 7: Testing & Documentation
- [x] Manual CRUD tests on live app
- [x] Auth flow tested (register/login/token)
- [x] GitHub Actions workflow running successfully
- [x] README.md + git commit history

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│           User Browser (HTTPS)                      │
└──────────┬──────────────────────────────────────────┘
           │
      ┌────┴─────┬──────────────────┐
      │           │                  │
  ┌───▼──┐   ┌────▼────┐     ┌──────▼────────┐
  │  S3  │───│ CloudFront──────│ EC2 (Node API)
  │      │   │ (Frontend)      │               │
  └──────┘   └─────────┘       └──────┬────────┘
                                     │
                          ┌──────────▼────────┐
                          │  MongoDB Atlas    │
                          │  (Cloud DB)       │
                          └───────────────────┘
```

---

## 📁 Repo Structure

```
job-application-tracker/
├── frontend/
│   ├── index.html         (main CRUD page)
│   ├── login.html         (register/login)
│   ├── styles.css
│   └── script.js          (CRUD + JWT auth logic)
├── backend/
│   ├── server.js          (Express + Mongoose + JWT)
│   ├── package.json       (express, mongoose, jwt, bcryptjs, cors)
│   └── .env               (MONGODB_URI, JWT_SECRET, PORT)
├── .github/workflows/
│   └── deploy.yml         (S3 sync + CloudFront invalidation)
└── .gitignore             (node_modules, .env)
```

---

## 🔑 Key Features

| Feature | Implementation |
|---------|-----------------|
| **User Auth** | Register/login with JWT tokens; 7-day expiry |
| **CRUD** | Create → List → Edit → Delete (all protected by JWT) |
| **Multi-user** | Each user sees only their applications (userId filter) |
| **Database** | MongoDB Atlas collections: Users, Applications |
| **Caching** | CloudFront + S3 (1hr max-age) with invalidations |
| **CI/CD** | Auto-deploy on push to main |

---

## 🚀 Deployment Architecture

1. **Frontend** → S3 bucket (static files) → CloudFront (HTTPS, CDN) → User browser
2. **Backend** → EC2 (Node.js + Express) → MongoDB Atlas
3. **CI/CD** → GitHub Actions → AWS S3 + CloudFront invalidation (automatic)

**Key learning:** HTTPS frontend cannot call HTTP API (Mixed Content block). Solution: API also via HTTPS or CloudFront API distribution.

---

## 🎤 Viva Talking Points

1. **Why this stack?**
   - Express + EC2: Simpler than Lambda for full backend control
   - MongoDB Atlas: Managed DB (no ops overhead)
   - S3 + CloudFront: Cheap, scalable frontend hosting

2. **Problems we solved:**
   - Mixed Content (HTTPS + HTTP): Used HTTPS for API
   - Stale cache (304 responses): CloudFront invalidations after S3 sync
   - Backend process dies on disconnect: pm2 daemon manager

3. **Security:**
   - JWT tokens (stateless); bcryptjs hashing (10 rounds)
   - CORS whitelist; EC2 Security Groups (least privilege)
   - No secrets in repo (`.env` ignored)

4. **CI/CD:**
   - Every push → GitHub Actions → S3 sync → CF invalidation
   - Frontend live in ~2 minutes
   - Zero manual steps

---

## ✨ Status

- ✅ All phases complete
- ✅ Live on CloudFront + MongoDB Atlas
- ✅ GitHub Actions auto-deploying
- ✅ Authentication working (register/login/JWT)
- ✅ Security hardened

**Ready for viva!** 🎉
