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
- [x] S3 bucket for frontend assets (index.html, script.js, styles.css)
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

## 🔑 Key Features

| Feature | Implementation |
|---------|-----------------|
| **User Auth** | Register/login with JWT tokens; 7-day expiry |
| **CRUD** | Create application → List all → Edit status/notes → Delete |
| **Multi-user** | Each user sees only their applications (userId in query) |
| **Database** | MongoDB collections: Users, Applications |
| **Caching** | CloudFront + S3 (HTTP cache 1hr) |
| **CI/CD** | Automated frontend deploy on push to main |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│           User Browser (HTTPS)                      │
└──────────┬──────────────────────────────────────────┘
           │
      ┌────┴────┬──────────────────┐
      │         │                  │
  ┌───▼──┐   ┌────▼────┐     ┌──────▼────────┐
  │  S3  │───│CloudFront─────│ EC2 (Node API)|
  │      │   │(Frontend)     │               │
  └──────┘   └─────────┘     └──────┬────────┘
                                    │
                          ┌──────────▼────────┐
                          │  MongoDB Atlas    │
                          │  (Cloud DB)       │
                          └───────────────────┘
```

---

## 🚀 Deployment Steps

1. **Local Setup:**
   - `npm install` in backend/
   - `.env` with MONGODB_URI + JWT_SECRET

2. **Deploy Backend:**
   - SSH to EC2
   - `git clone` or `git pull`
   - `npm install && npm start` (or use pm2)

3. **Deploy Frontend (Auto via CI/CD):**
   - Push to main branch
   - GitHub Actions auto-syncs frontend/ to S3
   - CloudFront invalidation runs automatically
   - Live in ~2 minutes

4. **Production Access:**
   - Frontend: `https://[cloudfront-domain]`
   - API: `https://[ec2-domain]:5000` or via CloudFront API distribution

---

## 📊 Key Metrics / Evidence

- **Git Commits:** 40+ meaningful commits with feature/fix/ci/security prefixes
- **Branches:** main + feature branches (frontend, backend, auth, deployment)
- **Tests:** Manual CRUD + Auth flows validated on live CloudFront URL
- **Security:** No secrets in repo; .env in .gitignore; JWT tokens enforce auth
- **Uptime:** Backend auto-starts via pm2/systemd; survives EC2 reboots

---


## 📁 Repo Structure

```
job-application-tracker/
├── frontend/
│   ├── index.html         (main page after login)
│   ├── login.html         (register/login form)
│   ├── styles.css
│   └── script.js          (CRUD + auth logic)
├── backend/
│   ├── server.js          (Express + auth + CRUD endpoints)
│   ├── package.json       (dependencies: express, mongoose, jwt, bcryptjs, cors)
│   └── .env               (MONGODB_URI, JWT_SECRET, PORT)
├── .github/
│   └── workflows/
│       └── deploy.yml     (GitHub Actions: S3 sync + CloudFront invalidation)
├── .gitignore             (node_modules, .env, .DS_Store)
├── README.md
└── PROJECT_PLAN.md        (this file)
```

---

