# Progres Web Portal

Modern, responsive web application for Progres MESRS student management system built with Next.js, TypeScript, and Tailwind CSS.

## 🚀 Features

- ✅ **Complete API Integration** with Progres MESRS
- ✅ **Secure Authentication** with token management
- ✅ **Offline Caching** using LocalStorage
- ✅ **Bilingual Support** (English & Arabic with RTL)
- ✅ **Responsive Design** for all devices
- ✅ **Modern UI/UX** with Material Design principles
- ✅ **Real-time Data** with automatic cache management
- ✅ **Dark Mode** support (optional)

## 📋 Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn or pnpm

## 🛠️ Installation

1. **Navigate to the web-app directory**:
   ```bash
   cd web-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
web-app/
├── src/
│   ├── app/              # Next.js app directory
│   │   ├── login/        # Login page
│   │   ├── dashboard/    # Dashboard page
│   │   ├── profile/      # Profile page
│   │   └── ...           # Other pages
│   ├── components/       # React components
│   │   ├── ui/          # UI components
│   │   └── shared/      # Shared components
│   ├── lib/             # Utilities & configurations
│   │   └── api-client.ts # API client setup
│   ├── services/        # API service layer
│   │   ├── auth.service.ts
│   │   ├── profile.service.ts
│   │   └── ...
│   ├── store/           # Zustand state management
│   │   └── auth.store.ts
│   └── types/           # TypeScript type definitions
├── public/              # Static assets
├── tailwind.config.js   # Tailwind CSS configuration
├── next.config.js       # Next.js configuration
└── package.json         # Dependencies

```

## 🔐 API Configuration

The app uses the Progres MESRS API with CORS proxy for web compatibility:

- **Production API**: `https://progres.mesrs.dz/api`
- **Web Proxy**: `https://buvfbqwsfcjiqdrqczma.supabase.co/functions/v1/proxy-progres`

### API Endpoints Implemented:

1. **Authentication**
   - POST `/authentication/v1/` - Login

2. **Profile**
   - GET `/infos/bac/{uuid}/individu` - Basic info
   - GET `/infos/AnneeAcademiqueEncours` - Current academic year
   - GET `/infos/bac/{uuid}/anneeAcademique/{yearId}/dia` - Detailed info
   - GET `/infos/image/{uuid}` - Profile image
   - GET `/infos/niveau/{niveauId}/periodes` - Academic periods

3. **Academics**
   - GET `/infos/planningSession/dia/{cardId}/noteExamens` - Exam results
   - GET `/infos/controleContinue/dia/{cardId}/notesCC` - Continuous assessments

## 🎨 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: Sonner
- **Icons**: Lucide React
- **Date Handling**: date-fns

## 🌐 Deployment Options

### Option 1: Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Option 2: Deploy to Render.com

1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `cd web-app && npm install && npm run build`
4. Set start command: `cd web-app && npm start`
5. Deploy!

### Option 3: Deploy to Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

### Option 4: Docker Deployment

```bash
# Build Docker image
docker build -t progres-web-portal .

# Run container
docker run -p 3000:3000 progres-web-portal
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=https://progres.mesrs.dz/api
NEXT_PUBLIC_PROXY_URL=https://buvfbqwsfcjiqdrqczma.supabase.co/functions/v1/proxy-progres

# App Configuration
NEXT_PUBLIC_APP_NAME="Progres Student Portal"
NEXT_PUBLIC_APP_VERSION="1.1.0"
```

## 🧪 Testing

```bash
# Run tests (when implemented)
npm test

# Run linter
npm run lint
```

## 📱 Features Implemented

- [x] Authentication (Login/Logout)
- [x] User Profile
- [x] Dashboard
- [x] Academic Records
- [x] Exam Results
- [x] Continuous Assessments
- [x] Offline Caching
- [x] Bilingual Support (EN/AR)
- [x] Responsive Design
- [ ] Timeline/Schedule (Coming soon)
- [ ] Transcript (Coming soon)
- [ ] Enrollment History (Coming soon)
- [ ] Student Groups (Coming soon)

## 🐛 Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure you're using the proxy URL for API calls.

### Authentication Errors
- Check that credentials are correct
- Verify API is accessible
- Clear browser cache and localStorage

### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT License - See LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please read CONTRIBUTING.md for details.

## 📧 Support

For issues and questions:
- Open an issue on GitHub
- Contact: [Your Contact Info]

## 🎉 Acknowledgments

- Original Flutter app by Ali Akrem
- Progres MESRS API
- Next.js & Vercel teams

---

**Made with ❤️ for Students**

