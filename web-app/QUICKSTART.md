# 🚀 Quick Start Guide

Get your Progres Web Portal up and running in 5 minutes!

## ⚡ Super Quick Start (3 steps)

```bash
# 1. Navigate to web-app directory
cd web-app

# 2. Install dependencies
npm install

# 3. Run the dev server
npm run dev
```

**That's it!** Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Test Login

Use your actual Progres credentials:
- **Student Code**: Your matricule/student number
- **Password**: Your Progres password

---

## 📦 Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 🌐 Deploy Online

### Fastest: Vercel (2 minutes)

```bash
npm i -g vercel
vercel
```

Follow the prompts. Done! 🎉

### Alternative: Render.com

1. Go to [render.com](https://render.com)
2. Connect your GitHub repo
3. Set root directory to `web-app`
4. Click Deploy!

---

## 🛠️ Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **Axios** - HTTP client

---

## 📂 Project Structure

```
web-app/
├── src/
│   ├── app/              # Pages (Next.js App Router)
│   │   ├── login/        # Login page
│   │   ├── dashboard/    # Dashboard
│   │   └── layout.tsx    # Root layout
│   ├── services/         # API services
│   │   ├── auth.service.ts
│   │   └── profile.service.ts
│   ├── store/            # Zustand stores
│   │   └── auth.store.ts
│   └── lib/              # Utilities
│       └── api-client.ts
├── public/               # Static files
└── package.json
```

---

## 🔧 Common Issues

### Port already in use?
```bash
# Use different port
npm run dev -- -p 3001
```

### Dependencies error?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Can't connect to API?
- Check your internet connection
- Verify credentials are correct
- Make sure API proxy is accessible

---

## 📚 More Info

- **Full README**: See [README.md](./README.md)
- **Deployment Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md)
- **API Docs**: Check Flutter app documentation

---

## 🎯 Next Steps

1. ✅ Run locally
2. ✅ Test login
3. ✅ Explore dashboard
4. 📱 Deploy online
5. 🎨 Customize (optional)

---

## 💡 Tips

- Use **Chrome DevTools** to inspect API calls
- **LocalStorage** stores your auth token
- **Offline caching** works automatically
- Supports **bilingual** UI (coming soon)

---

## 🤝 Need Help?

- Check [README.md](./README.md) for detailed info
- Open an issue on GitHub
- Review browser console for errors

---

**Happy coding! 🎉**

