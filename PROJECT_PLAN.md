# Job Application Tracker - Project Plan

## 🎯 Project Overview
A serverless CRUD application that helps users track job applications with status updates, notes, and analytics. Built with AWS services to demonstrate cloud infrastructure and DevOps lifecycle.

**Tech Stack:**
- Frontend: HTML + Vanilla JavaScript (simple & beginner-friendly)
- Backend: AWS Lambda
- Database: AWS DynamoDB
- Hosting: AWS S3 + CloudFront
- API: AWS API Gateway
- Deployment: GitHub Actions

---

## 📋 Phase 1: Planning & Setup (Week 1)

### Tasks:
- [ ] **Create GitHub Project Board** (Kanban view)
  - Evidence: Screenshot for grading
  - Columns: Todo, In Progress, Done
  - Add all tasks from this plan to the board

- [ ] **Set up GitHub Repository**
  - Create repo: `job-application-tracker`
  - Add `.gitignore` (node_modules, .env, .DS_Store)
  - Create README.md with project description

- [ ] **Initialize Local Project Structure**
  ```
  job-application-tracker/
  ├── frontend/
  │   ├── index.html
  │   ├── styles.css
  │   └── script.js
  ├── backend/
  │   ├── lambda/
  │   │   ├── create.js
  │   │   ├── read.js
  │   │   ├── update.js
  │   │   └── delete.js
  │   └── package.json
  ├── .github/
  │   └── workflows/
  │       └── deploy.yml (CI/CD)
  ├── .env.example
  ├── .gitignore
  └── README.md
  ```

- [ ] **Create .env.example** (for security - never commit actual .env)
  ```
  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=your_key_here
  AWS_SECRET_ACCESS_KEY=your_secret_here
  DYNAMODB_TABLE_NAME=JobApplications
  API_GATEWAY_URL=your_api_url
  ```

**Deliverable:** Kanban board screenshot + repo ready with structure

---

## 🛠️ Phase 2: Frontend Development (Week 1-2)

### Tasks:
- [ ] **Create HTML Structure** (index.html)
  - Form to add new applications
  - Table/List to display applications
  - Edit & Delete buttons for each entry

- [ ] **Style with CSS** (styles.css)
  - Responsive design
  - Status badges (Applied, Interviewing, Offered, Rejected)
  - Color-coded: yellow, blue, green, red

- [ ] **Write JavaScript** (script.js)
  - Fetch applications from API
  - POST new application
  - PUT to update status/notes
  - DELETE application
  - Handle loading states & errors

**Git Commits:**
```
feat: Add HTML structure for job tracker form
feat: Style application with Tailwind CSS
feat: Implement CRUD operations in JavaScript
fix: Add error handling for API calls
```

**Deliverable:** Working frontend (test locally with mock data first)

---

## ☁️ Phase 3: Backend & AWS Setup (Week 2-3)

### 3.1 AWS DynamoDB Setup
- [ ] **Create DynamoDB Table**
  - Table name: `JobApplications`
  - Primary key: `applicationId` (UUID)
  - Attributes:
    - `applicationId` (String) - Primary Key
    - `company` (String)
    - `position` (String)
    - `status` (String) - Applied, Interviewing, Offered, Rejected
    - `applicationDate` (String) - ISO format
    - `notes` (String)
    - `jobLink` (String)
    - `createdAt` (Number) - Unix timestamp

### 3.2 AWS Lambda Functions
- [ ] **Create Lambda Function: CREATE**
  - Accept: `{ company, position, jobLink, notes }`
  - Insert into DynamoDB
  - Return: `{ applicationId, createdAt }`

- [ ] **Create Lambda Function: READ**
  - Scan all applications from DynamoDB
  - Return: `{ applications: [...] }`

- [ ] **Create Lambda Function: UPDATE**
  - Accept: `{ applicationId, status, notes }`
  - Update DynamoDB item
  - Return: `{ success: true }`

- [ ] **Create Lambda Function: DELETE**
  - Accept: `{ applicationId }`
  - Delete from DynamoDB
  - Return: `{ success: true }`

### 3.3 AWS API Gateway
- [ ] **Create REST API**
  - POST `/applications` → CREATE Lambda
  - GET `/applications` → READ Lambda
  - PUT `/applications/{id}` → UPDATE Lambda
  - DELETE `/applications/{id}` → DELETE Lambda
  - Enable CORS for frontend requests

### 3.4 IAM & Security
- [ ] **Create IAM Role for Lambda**
  - Permission: DynamoDB read/write on `JobApplications` table
  - Least privilege principle

- [ ] **Store Credentials Securely**
  - Use `.env` file locally (never commit)
  - Use AWS Lambda environment variables (for prod)
  - Add `.env` to `.gitignore`

**Git Commits:**
```
feat: Create DynamoDB table schema
feat: Implement Lambda CRUD functions
feat: Set up API Gateway endpoints
feat: Configure CORS and IAM roles
```

**Deliverable:** API tested with Postman/curl, all endpoints working

---

## 🚀 Phase 4: Deployment Infrastructure (Week 3)

### 4.1 Frontend Hosting (S3 + CloudFront)
- [ ] **Create S3 Bucket**
  - Bucket name: `job-tracker-frontend-{unique-id}`
  - Enable Static Website Hosting
  - Upload `index.html`, `styles.css`, `script.js`

- [ ] **Create CloudFront Distribution**
  - Origin: S3 bucket
  - Cache behavior: 24 hours for HTML, longer for JS/CSS
  - Enable HTTP → HTTPS redirect

- [ ] **Update JavaScript**
  - Replace API endpoint URL: `https://your-cloudfront-url`

### 4.2 Backend Deployment Checklist
- [ ] Lambda functions deployed and tested
- [ ] DynamoDB table accessible
- [ ] API Gateway endpoints live
- [ ] Environment variables set in AWS Lambda console

**Git Commits:**
```
feat: Deploy frontend to S3
feat: Configure CloudFront distribution
chore: Update API endpoints for production
```

**Deliverable:** Live application accessible at CloudFront URL

---

## 🔄 Phase 5: CI/CD Pipeline Setup (Week 3-4)

### GitHub Actions Workflow
- [ ] **Create `.github/workflows/deploy.yml`**
  ```yaml
  name: Deploy to AWS
  on:
    push:
      branches: [main]
  
  jobs:
    deploy:
      runs-on: ubuntu-latest
      steps:
        - uses: actions/checkout@v3
        - name: Configure AWS credentials
          uses: aws-actions/configure-aws-credentials@v2
          with:
            aws-access-key-id: ${{ secrets.AWS_ACCESS_KEY_ID }}
            aws-secret-access-key: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
            aws-region: us-east-1
        
        - name: Deploy frontend to S3
          run: aws s3 sync frontend/ s3://job-tracker-frontend-{id}
        
        - name: Invalidate CloudFront
          run: aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
        
        - name: Deploy Lambda functions
          run: |
            cd backend
            npm install
            npm test
            # Zip and deploy Lambda
  ```

- [ ] **Add GitHub Secrets**
  - `AWS_ACCESS_KEY_ID`
  - `AWS_SECRET_ACCESS_KEY`
  - Never commit these!

**Git Commit:**
```
ci: Add GitHub Actions CI/CD pipeline
```

**Deliverable:** Automated deployment on every push to main

---

## 🔐 Phase 6: Security Hardening (Week 4)

### Tasks:
- [ ] **Environment Variables**
  - ✓ `.env` in `.gitignore`
  - ✓ Use AWS Lambda environment variables
  - ✓ No hardcoded credentials in code

- [ ] **AWS Security Groups & IAM**
  - ✓ Lambda IAM role: DynamoDB read/write only
  - ✓ S3 bucket: Block public access except via CloudFront
  - ✓ API Gateway: Enable WAF (optional for advanced)

- [ ] **API Security**
  - ✓ CORS configured (only allow your domain)
  - ✓ Input validation in Lambda
  - ✓ Rate limiting (optional)

- [ ] **Data Protection**
  - ✓ DynamoDB encryption at rest (default enabled)
  - ✓ HTTPS only (CloudFront enforces this)
  - ✓ No sensitive data in logs

**Git Commit:**
```
security: Add input validation and CORS configuration
```

**Deliverable:** Security checklist completed

---

## 📊 Phase 7: Testing & Documentation (Week 4)

### Tests:
- [ ] **Manual Testing**
  - ✓ Create application → appears in list
  - ✓ Update status → reflects immediately
  - ✓ Delete application → removed from list
  - ✓ Error handling (empty fields, network errors)

- [ ] **Test Different Browsers**
  - Chrome, Firefox, Safari (if available)

### Documentation:
- [ ] **Update README.md**
  - Project description
  - Tech stack
  - How to set up locally
  - How to deploy
  - Screenshots

- [ ] **Create DEPLOYMENT.md**
  - Step-by-step AWS setup
  - Environment variables needed
  - CI/CD pipeline explanation

**Deliverable:** Complete documentation + test evidence

---

## 🎤 Phase 8: Viva Preparation (Week 4)

### Evidence Collection:
- [ ] **Screenshots for Grading:**
  - Kanban board (Planning)
  - Git commit history (Git strategy)
  - GitHub Actions workflow runs (CI/CD)
  - AWS console showing DynamoDB, Lambda, API Gateway (AWS)
  - Live application working (Deployment)
  - `.env.example` and `.gitignore` (Security)

- [ ] **Demo Script**
  - Show adding an application
  - Show updating status
  - Show deleting
  - Explain the AWS architecture
  - Discuss CI/CD flow

- [ ] **Be Ready to Explain:**
  - Why serverless? (cost, scalability)
  - How DynamoDB works
  - How Lambda functions are triggered
  - Security decisions made
  - Git workflow & branching strategy

**Deliverable:** Demo video or live demo ready

---

## 📈 Git Strategy

### Branching:
```
main (production)
├── feature/frontend-ui
├── feature/lambda-crud
├── feature/dynamodb-setup
├── feature/api-gateway
├── feature/s3-deployment
├── feature/github-actions
└── feature/security-hardening
```

### Commit Format:
```
feat: Add new feature
fix: Fix a bug
chore: Update dependencies
ci: Update CI/CD pipeline
docs: Update documentation
security: Security-related changes
```

### Example Flow:
1. `git checkout -b feature/frontend-ui`
2. Make changes
3. `git commit -m "feat: Add job application form"`
4. `git push origin feature/frontend-ui`
5. Create Pull Request (can merge to main immediately or after review)
6. `git checkout main && git pull`

---

## ✅ Grading Rubric Checklist

| Criterion | Evidence | Status |
|-----------|----------|--------|
| **Planning (1)** | Kanban board screenshot | ⬜ |
| **Git (2)** | Multiple feature branches, clear commits | ⬜ |
| **CI/CD (2)** | GitHub Actions workflow auto-deploys | ⬜ |
| **AWS (2)** | S3, CloudFront, Lambda, API Gateway, DynamoDB used | ⬜ |
| **Deployment (1)** | App lives on CloudFront, accessible | ⬜ |
| **Security (1)** | .env, IAM roles, CORS configured | ⬜ |
| **Viva (1)** | Can explain architecture & decisions | ⬜ |

---

## 📅 Timeline Summary

| Phase | Week | Tasks |
|-------|------|-------|
| Planning & Setup | 1 | Repo, structure, .env |
| Frontend Dev | 1-2 | HTML, CSS, JavaScript |
| AWS Backend | 2-3 | Lambda, DynamoDB, API Gateway |
| Deployment | 3 | S3, CloudFront |
| CI/CD | 3-4 | GitHub Actions |
| Security | 4 | Hardening & validation |
| Testing & Docs | 4 | Manual tests, README |
| Viva Prep | 4 | Screenshots, demo |

---

## 🚦 Getting Started Checklist

**Before you start coding:**
- [ ] Create GitHub repo
- [ ] Clone locally
- [ ] Create project board
- [ ] Add basic `.gitignore` and `README.md`
- [ ] Commit: `initial: Project setup`

**Then pick a phase and start!**

Ready to begin? 🚀
