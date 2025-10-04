# Deployment Guide for Progres Web Portal

This guide covers various deployment options for the Progres Web Portal.

## 📋 Pre-Deployment Checklist

- [ ] Ensure all dependencies are installed
- [ ] Test the application locally
- [ ] Review and update environment variables
- [ ] Build the application successfully
- [ ] Configure API endpoints correctly

## 🚀 Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the platform created by the Next.js team and offers the best integration.

#### Via Vercel Dashboard:

1. **Push your code to GitHub** (already done!)

2. **Visit [vercel.com](https://vercel.com)**
   - Sign up or log in with GitHub

3. **Import Project**
   - Click "Add New Project"
   - Select your repository: `scriptkid-py/progres-student-porta`
   - Root Directory: `web-app`
   - Framework: Next.js (auto-detected)

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

5. **Environment Variables** (Optional)
   - Add any custom environment variables if needed
   - The app works without custom env vars due to hardcoded API URLs

6. **Deploy!**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your app will be live at `your-app-name.vercel.app`

#### Via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to web-app directory
cd web-app

# Deploy
vercel

# Or deploy to production directly
vercel --prod
```

---

### Option 2: Render.com

#### Step-by-Step:

1. **Create New Web Service**
   - Go to [render.com](https://render.com)
   - Click "New +" → "Web Service"
   - Connect your GitHub account
   - Select repository: `scriptkid-py/progres-student-porta`

2. **Configure Service**
   - Name: `progres-web-portal`
   - Root Directory: `web-app`
   - Environment: `Node`
   - Region: Select closest to you
   - Branch: `main`

3. **Build & Start Commands**
   ```
   Build Command: npm install && npm run build
   Start Command: npm start
   ```

4. **Environment Variables** (if needed)
   - Add custom environment variables in Render dashboard

5. **Deploy**
   - Click "Create Web Service"
   - Deployment takes 5-10 minutes
   - Access at `https://progres-web-portal.onrender.com`

#### Using render.yaml (Automated):

Create `render.yaml` in the root:

```yaml
services:
  - type: web
    name: progres-web-portal
    env: node
    region: oregon
    buildCommand: cd web-app && npm install && npm run build
    startCommand: cd web-app && npm start
    plan: free
```

Then just click "New" → "Blueprint" in Render dashboard.

---

### Option 3: Netlify

#### Via Netlify Dashboard:

1. **Push code to GitHub** ✓

2. **Import to Netlify**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub and select your repository

3. **Configure Build**
   - Base directory: `web-app`
   - Build command: `npm run build`
   - Publish directory: `web-app/.next`

4. **Deploy**
   - Click "Deploy site"
   - Live at `random-name.netlify.app`

#### Via Netlify CLI:

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Navigate to web-app
cd web-app

# Build
npm run build

# Deploy
netlify deploy

# Or deploy to production
netlify deploy --prod
```

---

### Option 4: Docker Deployment

#### Build and Run Locally:

```bash
# Navigate to web-app directory
cd web-app

# Build Docker image
docker build -t progres-web-portal .

# Run container
docker run -p 3000:3000 progres-web-portal

# Access at http://localhost:3000
```

#### Deploy to Cloud:

**Docker Hub:**
```bash
# Tag image
docker tag progres-web-portal your-username/progres-web-portal

# Push to Docker Hub
docker push your-username/progres-web-portal

# Pull and run on server
docker pull your-username/progres-web-portal
docker run -d -p 3000:3000 your-username/progres-web-portal
```

**Fly.io:**
```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
flyctl auth login

# Launch app
flyctl launch

# Deploy
flyctl deploy
```

---

### Option 5: AWS / Azure / Google Cloud

#### AWS Elastic Beanstalk:

```bash
# Install EB CLI
pip install awsebcli

# Initialize EB
eb init -p node.js progres-web-portal

# Create environment and deploy
eb create progres-web-env
```

#### Azure Web App:

```bash
# Install Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Login
az login

# Create resource group
az group create --name progres-rg --location eastus

# Create App Service plan
az appservice plan create --name progres-plan --resource-group progres-rg

# Create web app
az webapp create --resource-group progres-rg --plan progres-plan --name progres-web-portal --runtime "NODE|20-lts"

# Deploy
az webapp deployment source config --name progres-web-portal --resource-group progres-rg --repo-url https://github.com/scriptkid-py/progres-student-porta --branch main
```

---

### Option 6: Local Hosting (for testing)

#### Using Node.js:

```bash
cd web-app
npm install
npm run build
npm start

# Access at http://localhost:3000
```

#### Using Docker:

```bash
cd web-app
docker build -t progres-web-portal .
docker run -p 3000:3000 progres-web-portal

# Access at http://localhost:3000
```

---

## 🔧 Post-Deployment

### 1. Test the Application

- [ ] Login functionality works
- [ ] Dashboard loads correctly
- [ ] API calls are successful
- [ ] No CORS errors
- [ ] Responsive design works on mobile

### 2. Custom Domain (Optional)

**Vercel:**
- Go to Project Settings → Domains
- Add your custom domain
- Configure DNS records

**Render:**
- Go to Settings → Custom Domains
- Add domain and configure DNS

**Netlify:**
- Go to Domain Settings
- Add custom domain
- Configure DNS

### 3. SSL Certificate

All platforms (Vercel, Render, Netlify) provide **free automatic SSL certificates**.

### 4. Performance Optimization

- Enable gzip compression (automatic on most platforms)
- Configure caching headers
- Monitor with Lighthouse or WebPageTest
- Set up CDN if needed

### 5. Monitoring

**Vercel:**
- Built-in analytics available
- Real-time logs in dashboard

**Render:**
- Check logs in Render dashboard
- Set up health checks

**Custom:**
- Set up Sentry for error tracking
- Use Google Analytics for user tracking

---

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
npm run build
```

### CORS Errors

- Ensure using the proxy URL for API calls
- Check API configuration in `src/lib/api-client.ts`

### Authentication Issues

- Verify API endpoints are correct
- Check token storage in browser DevTools → Application → Local Storage
- Clear browser cache and localStorage

### Deployment Timeout

- Increase build timeout in platform settings
- Optimize build by removing unnecessary dependencies

---

## 📊 Recommended Platform Comparison

| Platform | Ease | Speed | Free Tier | Best For |
|----------|------|-------|-----------|----------|
| **Vercel** | ⭐⭐⭐⭐⭐ | ⚡ Fast | 100GB bandwidth | Production |
| **Render** | ⭐⭐⭐⭐ | 🚀 Medium | 100GB bandwidth | Production |
| **Netlify** | ⭐⭐⭐⭐⭐ | ⚡ Fast | 100GB bandwidth | Static sites |
| **Docker** | ⭐⭐⭐ | 🐢 Varies | N/A | Self-hosting |
| **AWS/Azure** | ⭐⭐ | ⚡ Fast | Limited free | Enterprise |

---

## 🎉 Success!

Your Progres Web Portal should now be live! 

Share the URL with students and enjoy the modern web experience.

For support, open an issue on GitHub or contact the maintainer.

