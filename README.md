# 💄 Ayalla Cosmetics - אתר קוסמטיקה מתקדם

אתר מקצועי ומודרני לעסק קוסמטיקה, כולל מערכת קביעת תורים, גלריה, ותצוגת שירותים.

## 🌟 תכונות

### צד לקוח (React)
- ✨ עיצוב מודרני ורספונסיבי
- 🎨 אנימציות מרשימות עם Framer Motion
- 📱 תמיכה מלאה במובייל
- 🎯 מערכת ניווט חלקה
- 🖼️ גלריה עם מסננים ו-Lightbox
- 📝 טופס יצירת קשר
- 📅 מערכת קביעת תורים מתקדמת
- ⭐ חלק המלצות לקוחות
- 🌈 צבעים מותאמים אישית עם Tailwind CSS

### צד שרת (Node.js + Express)
- 🔒 אבטחה עם Helmet
- 📧 שליחת אימיילים עם Nodemailer
- ✅ ולידציה של נתונים
- 🗄️ תמיכה ב-MongoDB (אופציונלי)
- 🔗 API endpoints מסודרים
- 🌐 CORS מוגדר

## 🚀 התקנה והרצה

### דרישות מקדימות
- Node.js (גרסה 16 ומעלה)
- npm או yarn
- MongoDB (אופציונלי - לשמירת נתונים)

### התקנת הפרויקט

1. **Clone הפרויקט**
```bash
cd ayallaCosmetics
```

2. **התקנת צד לקוח (Client)**
```bash
cd client
npm install
```

3. **התקנת צד שרת (Server)**
```bash
cd ../server
npm install
```

4. **הגדרת משתני סביבה**

צור קובץ `.env` בתיקיית `server`:
```bash
cp .env.example .env
```

ערוך את הקובץ והוסף את הפרטים שלך:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ayallacosmetics
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
ADMIN_EMAIL=admin@ayalla.co.il
```

### הרצת הפרויקט

#### בסביבת פיתוח (Development)

**טרמינל 1 - הרצת השרת:**
```bash
cd server
npm run dev
```
השרת ירוץ על: `http://localhost:5000`

**טרמינל 2 - הרצת הלקוח:**
```bash
cd client
npm run dev
```
האתר ירוץ על: `http://localhost:3000`

#### בניה לפרודקשן (Production)

**בניית הלקוח:**
```bash
cd client
npm run build
```

**הרצת השרת בפרודקשן:**
```bash
cd server
npm start
```

## 📁 מבנה הפרויקט

```
ayallaCosmetics/
├── client/                  # React Frontend
│   ├── public/             # קבצים סטטיים
│   ├── src/
│   │   ├── components/     # קומפוננטות React
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/          # עמודים
│   │   │   └── BookingPage.jsx
│   │   ├── App.jsx         # קומפוננטת Root
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # עיצוב גלובלי
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── server/                  # Node.js Backend
│   ├── server.js           # Server Entry Point
│   ├── package.json
│   ├── .env.example
│   └── .env                # משתני סביבה (לא במאגר)
│
├── .gitignore
└── README.md
```

## 🎨 טכנולוגיות

### Frontend
- **React 18** - ספריית UI
- **Vite** - Build tool מהיר
- **Tailwind CSS** - CSS Framework
- **Framer Motion** - אנימציות
- **React Router** - ניתוב
- **Axios** - HTTP requests
- **React Icons** - אייקונים

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database (אופציונלי)
- **Mongoose** - ODM למונגו
- **Nodemailer** - שליחת אימיילים
- **Express Validator** - ולידציה
- **Helmet** - אבטחה
- **CORS** - Cross-Origin Resource Sharing

## 📡 API Endpoints

### Public Endpoints

#### Health Check
```
GET /api/health
```

#### שליחת טופס יצירת קשר
```
POST /api/contact
Body: {
  name: string (required)
  phone: string (required)
  email: string (optional)
  service: string (required)
  message: string (optional)
}
```

#### קביעת תור
```
POST /api/bookings
Body: {
  service: string (required)
  date: string (required)
  time: string (required)
  name: string (required)
  phone: string (required)
  email: string (optional)
  notes: string (optional)
}
```

#### קבלת רשימת שירותים
```
GET /api/services
```

### Admin Endpoints (דורש אימות)
```
GET /api/bookings      # כל התורים
GET /api/contacts      # כל הפניות
```

## 🎨 התאמה אישית

### שינוי צבעים
ערוך את הקובץ `client/tailwind.config.js`:
```javascript
colors: {
  primary: {
    // הצבעים שלך כאן
  }
}
```

### שינוי תוכן
- **טקסטים**: ערוך את הקומפוננטות ב-`client/src/components/`
- **שירותים**: ערוך את המערך `services` ב-`Services.jsx` ו-`server.js`
- **תמונות**: החלף את ה-URLs ב-`Gallery.jsx` ובקומפוננטות אחרות

### הוספת תמונות משלך
1. שים תמונות בתיקייה `client/public/images/`
2. החלף את ה-URLs בקומפוננטות

## 📧 הגדרת שליחת מיילים

### Gmail
1. הפעל 2-Step Verification בחשבון Google
2. צור App Password: https://myaccount.google.com/apppasswords
3. הוסף את הפרטים ל-`.env`:
```env
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### שירותי מייל אחרים
ערוך את הקונפיגורציה ב-`server/server.js`:
```javascript
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})
```

## 🗄️ הגדרת MongoDB (אופציונלי)

1. התקן MongoDB: https://www.mongodb.com/try/download/community
2. הרץ MongoDB:
```bash
mongod
```
3. בקובץ `server/server.js`, הסר את ההערה מחיבור MongoDB:
```javascript
mongoose.connect(process.env.MONGODB_URI)
```

## 🚀 פריסה (Deployment)

### Vercel (Frontend)
```bash
cd client
vercel
```

### Render/Railway (Backend)
1. צור פרויקט חדש
2. חבר את מאגר ה-Git
3. הגדר את משתני הסביבה
4. Deploy!

### Netlify (Frontend Alternative)
```bash
cd client
npm run build
netlify deploy --prod
```

## 🔐 אבטחה

- ✅ Helmet.js לאבטחת Headers
- ✅ CORS מוגדר
- ✅ Input validation
- ✅ Environment variables
- ⚠️ הוסף JWT authentication לפני פרודקשן
- ⚠️ הגן על Admin routes

## 📱 תמיכה בדפדפנים

- ✅ Chrome (גרסה אחרונה)
- ✅ Firefox (גרסה אחרונה)
- ✅ Safari (גרסה אחרונה)
- ✅ Edge (גרסה אחרונה)
- ✅ מובייל (iOS & Android)

## 🤝 תרומה

רוצה לתרום לפרויקט? מעולה!
1. Fork את הפרויקט
2. צור branch חדש
3. בצע את השינויים
4. שלח Pull Request

## 📝 רישיון

הפרויקט הזה נוצר עבור Ayalla Cosmetics. כל הזכויות שמורות.

## 💡 טיפים

- השתמש ב-React DevTools לדיבאג
- בדוק את ה-Network tab בכלי הפיתוח לבדיקת API calls
- הרץ `npm run build` לפני פרודקשן לבדיקת שגיאות
- השתמש ב-MongoDB Compass לניהול הדאטאבייס

## 🐛 פתרון בעיות

### השרת לא עולה
- בדוק שהפורט 5000 פנוי
- וודא ש-MongoDB רץ (אם משתמש)
- בדוק את קובץ ה-.env

### הלקוח לא מתחבר לשרת
- וודא שהשרת רץ על פורט 5000
- בדוק את הגדרות ה-proxy ב-vite.config.js
- בדוק את הגדרות CORS בשרת

### אימיילים לא נשלחים
- בדוק את הגדרות EMAIL_USER ו-EMAIL_PASS
- וודא שהסרת את ההערה מפונקציות sendEmail
- בדוק את לוגים של השרת

## 📞 יצירת קשר

יש שאלות? צור קשר:
- 📧 Email: info@ayalla.co.il
- 📱 Phone: 050-123-4567
- 🌐 Website: www.ayalla.co.il

---

**Made with ❤️ for Ayalla Cosmetics**

