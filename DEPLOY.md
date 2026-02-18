# 🚀 AI.F.C Deployment Guide

## Quick Deploy to Vercel

### 1. Prerequisites
- GitHub account connected to Vercel
- Neon PostgreSQL database (free tier available)

### 2. Database Setup

**Create Neon database:**
```bash
# Go to https://neon.tech
# Create new project: "aifc"
# Copy connection string
```

**Run migrations:**
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Vercel Deployment

**Option A: Auto-deploy (Recommended)**
1. Go to https://vercel.com/new
2. Import repo: `JarvisProto/AIFC`
3. Add environment variables:
   ```
   DATABASE_URL=your_neon_connection_string
   NEXTAUTH_URL=your_vercel_url
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   ```
4. Deploy!

**Option B: Vercel CLI**
```bash
npm i -g vercel
vercel login
vercel
# Follow prompts
vercel env add DATABASE_URL
vercel env add NEXTAUTH_URL
vercel env add NEXTAUTH_SECRET
vercel --prod
```

### 4. Post-Deployment

**Se... [tronque: 1495 chars]