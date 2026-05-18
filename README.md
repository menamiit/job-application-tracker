# 📋 Job Application Tracker

A serverless CRUD application to help you organize and track your job applications. Built with AWS services to demonstrate modern cloud infrastructure and DevOps practices.

## 🎯 Features

- ✅ **Create** job applications with company name, position, and job link
- 📖 **Read** all your applications in an organized list
- ✏️ **Update** application status (Applied, Interviewing, Offered, Rejected) and notes
- 🗑️ **Delete** applications you no longer need to track

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3
- Vanilla JavaScript

**Backend:**
- AWS Lambda
- AWS API Gateway
- AWS DynamoDB

**Hosting:**
- AWS S3
- AWS CloudFront

**DevOps:**
- GitHub Actions (CI/CD)
- Git (Version Control)

## 📦 Project Structure

```
job-application-tracker/
├── frontend/                    # Frontend files
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── backend/                     # Backend Lambda functions
│   ├── lambda/
│   │   ├── create.js
│   │   ├── read.js
│   │   ├── update.js
│   │   └── delete.js
│   └── package.json
├── .github/workflows/
│   └── deploy.yml              # CI/CD pipeline
├── .env.example                 # Template for environment variables
├── .gitignore
├── README.md
└── PROJECT_PLAN.md             # Detailed project roadmap
```

## 🚀 Getting Started

### Prerequisites
- Node.js (for local development)
- AWS Account
- GitHub Account
- Git

### Local Setup

1. Clone the repository:
```bash
git clone https://github.com/menamiit/job-application-tracker.git
cd job-application-tracker
```

2. Copy `.env.example` to `.env` and fill in your AWS credentials:
```bash
cp .env.example .env
```

3. Install dependencies:
```bash
cd backend
npm install
cd ../frontend
# Frontend uses vanilla JS, no installation needed
```

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│      CloudFront CDN (Frontend)          │
│   (Cached HTML/CSS/JS globally)         │
└────────────┬────────────────────────────┘
             │
     ┌───────┴────────┐
     ▼                ▼
┌────────────┐  ┌──────────────────┐
│  S3 Bucket │  │  API Gateway     │
│ (index.    │  │ (CRUD endpoints) │
│   html)    │  └────────┬─────────┘
└────────────┘           │
                  ┌──────┴──────┐
                  │   Lambda    │
                  │  Functions  │
                  │ (CRUD logic)│
                  └──────┬──────┘
                         │
                   ┌─────▼─────┐
                   │ DynamoDB  │
                   │ (Database)│
                   └───────────┘
```

## 🔐 Security

- Environment variables stored in `.env` (never committed)
- AWS IAM roles with least privilege access
- CORS configured on API Gateway
- Input validation on Lambda functions
- DynamoDB encryption at rest

## 📝 Development Workflow

See [PROJECT_PLAN.md](./PROJECT_PLAN.md) for detailed phase-by-phase breakdown.

### Git Strategy
- Feature branches: `feature/frontend-ui`, `feature/lambda-crud`, etc.
- Clear commit messages: `feat:`, `fix:`, `ci:`, `security:`, `docs:`
- Pull requests for code review (optional for solo projects)

### CI/CD
- Automatic deployment on push to `main` branch
- GitHub Actions workflow triggers:
  - Runs tests (when applicable)
  - Deploys frontend to S3
  - Deploys Lambda functions
  - Invalidates CloudFront cache

## 📊 Grading Rubric Alignment

| Criterion | How it's addressed |
|-----------|-------------------|
| **Planning (1)** | Kanban board with all tasks |
| **Git (2)** | Feature branches + descriptive commits |
| **CI/CD (2)** | GitHub Actions automatic deployment |
| **AWS (2)** | S3, CloudFront, Lambda, API Gateway, DynamoDB |
| **Deployment (1)** | Live on CloudFront |
| **Security (1)** | .env, IAM roles, input validation |
| **Viva (1)** | Architecture explanation + demo |

## 📚 Resources

- [AWS Lambda Documentation](https://docs.aws.amazon.com/lambda/)
- [AWS DynamoDB Documentation](https://docs.aws.amazon.com/dynamodb/)
- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

## 📞 Support

For questions or issues, refer to the PROJECT_PLAN.md for detailed setup instructions.

---

**Status:** 🚧 Under Development  
**Last Updated:** May 18, 2026