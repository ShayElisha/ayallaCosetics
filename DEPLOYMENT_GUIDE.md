# 🚀 מדריך פריסה (Deployment) - Ayalla Cosmetics

## 📦 אפשרויות Deployment

### אפשרות 1: Render (מומלץ - חינם!)

#### שלב 1: הכנת הפרוייקט

הפרוייקט כבר מוכן! יש לך קובץ `render.yaml` שמגדיר הכל.

#### שלב 2: העלאה ל-GitHub

```bash
cd /Users/shay_e/Desktop/Angular/ayallaCosmetics

# אתחול Git (אם עוד לא עשית)
git init
git add .
git commit -m "Initial commit - Ayalla Cosmetics"

# צור repository ב-GitHub ואז:
git remote add origin https://github.com/YOUR_USERNAME/ayallaCosmetics.git
git branch -M main
git push -u origin main
```

#### שלב 3: פריסה ב-Render

**Frontend (React):**

1. היכנסי ל-Render: https://render.com
2. לחצי **New** → **Static Site**
3. חברי את GitHub repository
4. הגדרות:
   - **Name**: `ayalla-cosmetics`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
5. לחצי **Create Static Site**

**Backend (Node.js):**

1. ב-Render, לחצי **New** → **Web Service**
2. חברי את אותו repository
3. הגדרות:
   - **Name**: `ayalla-cosmetics-api`
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. הוסיפי Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   EMAIL_USER=ayalla450@gmail.com
   EMAIL_PASS=your-app-password-here
   ADMIN_EMAIL=ayalla450@gmail.com
   PHONE_NUMBER=0523190438
   ```
5. לחצי **Create Web Service**

#### שלב 4: חיבור Frontend ל-Backend

אחרי שהשרת עולה, תקבלי URL כמו:
```
https://ayalla-cosmetics-api.onrender.com
```

עדכני את ה-Frontend ב-`client/vite.config.js`:
```javascript
proxy: {
  '/api': {
    target: 'https://ayalla-cosmetics-api.onrender.com',
    changeOrigin: true,
  }
}
```

ואז push שוב ל-GitHub - Render יעשה deploy אוטומטי!

---

### אפשרות 2: Vercel (Frontend) + Render (Backend)

**Frontend ב-Vercel:**

1. היכנסי ל-Vercel: https://vercel.com
2. **Import Project** → חברי GitHub
3. הגדרות:
   - **Root Directory**: `client`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**

**Backend ב-Render:**
- עקבי אחרי ההוראות של Backend מלמעלה

---

### אפשרות 3: Netlify (Frontend) + Railway (Backend)

**Frontend ב-Netlify:**

```bash
cd client
npm run build

# התקני Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Backend ב-Railway:**

1. היכנסי ל-Railway: https://railway.app
2. **New Project** → **Deploy from GitHub**
3. בחרי את ה-repository
4. הוסיפי Environment Variables
5. Deploy!

---

## 🔧 פתרון בעיות נפוצות

### ❌ "No open ports detected"

**הבעיה**: השרת לא שומע על כל הממשקים (0.0.0.0)

**הפתרון**: כבר תוקן! ה-vite.config.js מוגדר נכון.

### ❌ "Module not found"

**הבעיה**: חסרות תלויות

**הפתרון**:
```bash
cd client && npm install
cd ../server && npm install
```

### ❌ "Build failed"

**הבעיה**: שגיאות קוד

**הפתרון**: בדקי ב-terminal מקומי:
```bash
cd client
npm run build
```

### ❌ המיילים לא עובדים בפרודקשן

**הבעיה**: לא הגדרת את Environment Variables

**הפתרון**: ב-Render → Dashboard → Environment → הוסיפי:
```
EMAIL_USER=ayalla450@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=ayalla450@gmail.com
```

---

## 🌐 Custom Domain (דומיין משלך)

### ב-Render:

1. Dashboard → Settings → Custom Domain
2. הוסיפי את הדומיין שלך (למשל: `ayallacosmetics.com`)
3. עדכני DNS אצל ספק הדומיין:
   ```
   Type: CNAME
   Name: www
   Value: [הערך שRender נותן]
   ```

### ב-Vercel:

1. Project Settings → Domains
2. Add Domain
3. עקבי אחרי ההוראות

---

## 📊 ניטור ו-Analytics

### Google Analytics

1. צרי חשבון: https://analytics.google.com
2. קבלי את ה-Tracking ID
3. הוסיפי ל-`client/index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

---

## 🔒 SSL/HTTPS

✅ **Render** - מספק SSL חינם אוטומטי!  
✅ **Vercel** - מספק SSL חינם אוטומטי!  
✅ **Netlify** - מספק SSL חינם אוטומטי!

---

## 💰 עלויות

### תכנית חינמית:

| שירות | חינם? | הגבלות |
|-------|-------|---------|
| **Render** | ✅ | השרת "נרדם" אחרי 15 דקות חוסר שימוש |
| **Vercel** | ✅ | 100GB bandwidth |
| **Netlify** | ✅ | 100GB bandwidth |
| **Railway** | ❌ | $5/חודש אחרי trial |

**המלצה**: השתמשי ב-Render - חינם לחלוטין! 🎉

---

## 🚀 CI/CD - Deploy אוטומטי

כל שירות יעשה deploy אוטומטי כשאת עושה push ל-GitHub!

```bash
# עשיתי שינויים? פשוט:
git add .
git commit -m "Update website"
git push

# Render/Vercel/Netlify יעשו deploy אוטומטית!
```

---

## 📱 בדיקה לפני Deployment

לפני deployment, בדקי מקומית:

```bash
# Frontend
cd client
npm run build
npm run preview

# Backend
cd server
npm start
```

פתחי: http://localhost:4173 ובדקי שהכל עובד!

---

## ✅ Checklist לפני Go-Live

- [ ] App Password של Gmail מוגדר
- [ ] כל פרטי הקשר מעודכנים (טלפון, מייל, כתובת)
- [ ] התמונות בגלריה מוחלפות באמיתיות
- [ ] Google Analytics מותקן
- [ ] נבדק במובייל
- [ ] נבדק בדפדפנים שונים
- [ ] טפסים עובדים
- [ ] המיילים נשלחים
- [ ] WhatsApp עובד

---

## 🆘 צריכה עזרה?

1. **Render Docs**: https://render.com/docs
2. **Vercel Docs**: https://vercel.com/docs
3. **הלוגים**: בדקי את ה-logs בדשבורד

---

✨ **האתר שלך עכשיו מוכן לעלות לאוויר! בהצלחה!** 🎉

