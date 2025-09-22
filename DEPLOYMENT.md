# 🚀 Analytics Dashboard - Deployment Guide

This guide explains how to deploy your Next.js Analytics Dashboard to various platforms.

## 📁 Build Files Overview

After running `npm run build`, Next.js generates the following key files:

- **`.next/`** - Complete build output directory
- **`.next/static/`** - Static assets (CSS, JS, images)
- **`.next/server/`** - Server-side code and pages
- **`public/`** - Static files served directly

## 🌐 Deployment Options

### 1. **Vercel (Recommended) - Zero Config**

Vercel is made by the creators of Next.js and offers the best integration.

#### Quick Deploy:
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### GitHub Integration:
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically on every push

**Live URL**: Your app will be available at `https://your-app-name.vercel.app`

---

### 2. **Netlify**

#### Option A: Drag & Drop
```bash
# Build for static export
npm run build
npm run export  # If you add this script
```

#### Option B: Git Integration
1. Push to GitHub
2. Connect repository on [netlify.com](https://netlify.com)
3. Build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`

---

### 3. **Static Export (GitHub Pages, etc.)**

Add to your `package.json`:
```json
{
  "scripts": {
    "export": "next export"
  }
}
```

Update `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

export default nextConfig
```

Build and export:
```bash
npm run build
npm run export
```

Deploy the `out/` folder to any static hosting service.

---

### 4. **Docker Deployment**

Create `Dockerfile`:
```dockerfile
FROM node:18-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 3000
ENV PORT 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t analytics-dashboard .
docker run -p 3000:3000 analytics-dashboard
```

---

### 5. **Traditional VPS/Server**

```bash
# On your server
git clone your-repo
cd analytics-dashboard
npm install
npm run build
npm start

# Use PM2 for production
npm install -g pm2
pm2 start npm --name "analytics-dashboard" -- start
```

---

## 🔧 Build Scripts Reference

Add these to your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "export": "next export",
    "deploy:vercel": "vercel --prod",
    "deploy:netlify": "npm run build && netlify deploy --prod --dir=.next"
  }
}
```

## 📊 Build Analysis

Your current build output:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    105 kB          245 kB
├ ○ /_not-found                          873 B          88.1 kB
└ ○ /default                             498 B           141 kB
+ First Load JS shared by all            87.2 kB
```

**Optimized for**:
- ✅ Static generation
- ✅ Fast loading (245KB total for main page)
- ✅ Code splitting
- ✅ Tree shaking

## 🌍 Environment Variables

For production deployment, create `.env.production`:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
```

## 🔗 Quick Deploy Commands

### Vercel (Fastest):
```bash
npx vercel
```

### Netlify:
```bash
npm run build
npx netlify deploy --prod --dir=.next
```

### GitHub Pages:
```bash
npm run build
npm run export
# Upload 'out' folder to gh-pages branch
```

## 📱 Mobile & Performance

Your dashboard is optimized for:
- ✅ Mobile responsiveness
- ✅ Dark/Light theme
- ✅ Smooth animations
- ✅ Fast loading
- ✅ SEO friendly

## 🎯 Recommended: Vercel

For the best experience with your Next.js dashboard:

1. **Push to GitHub**
2. **Connect to Vercel**
3. **Auto-deploy on every commit**
4. **Get instant HTTPS URL**

Your dashboard will be live at: `https://analytics-dashboard-[random].vercel.app`

---

*Happy Deploying! 🚀*
