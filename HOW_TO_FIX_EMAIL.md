# 📧 איך לתקן שליחת מיילים - 3 שלבים פשוטים!

## ⚠️ למה המיילים לא נשלחים?

Gmail דורש **App Password** מיוחד לשליחת מיילים מאפליקציות.
לא אפשר להשתמש בסיסמה הרגילה שלך!

---

## ✅ שלב 1: יצירת App Password (5 דקות)

### 1. היכנסי לחשבון Google
🔗 **לחצי כאן:** https://myaccount.google.com/security

### 2. הפעילי "אימות דו-שלבי" (2-Step Verification)
- גללי למטה עד **"Signing in to Google"**
- לחצי על **"2-Step Verification"**
- אם זה כבוי, לחצי **"Get Started"** ועברי את התהליך (SMS)
- ✅ אחרי שזה מופעל, המשיכי!

### 3. צרי App Password
- חזרי לדף Security: https://myaccount.google.com/security
- גללי למטה ל-**"Signing in to Google"**
- עכשיו תראי **"App passwords"** - לחצי עליו
- אם זה מבקש סיסמה, הזיני את הסיסמה של Gmail

### 4. הגדרי App Password חדש
- בחרי: **Select app** → **Mail**
- בחרי: **Select device** → **Other (Custom name)**
- כתבי: **Ayalla Cosmetics Website**
- לחצי: **Generate**

### 5. העתיקי את הסיסמה! 📋
תקבלי סיסמה כזו:
```
abcd efgh ijkl mnop
```
**העתיקי את כל 16 התווים!**

---

## ✅ שלב 2: עדכני את קובץ .env

### דרך 1: עם עורך טקסט (קל!)

1. פתחי את התיקייה:
   ```
   Desktop → Angular → ayallaCosmetics → server
   ```

2. מצאי את הקובץ **`.env`**
   - אם את לא רואה אותו, זה כי הוא קובץ מוסתר
   - במק: לחצי `Cmd + Shift + .` כדי לראות קבצים מוסתרים

3. פתחי אותו עם **TextEdit** או **VSCode**

4. מצאי את השורה:
   ```
   EMAIL_PASS=הדביקי-כאן-את-הסיסמה-שקיבלת-ללא-רווחים
   ```

5. **החליפי** את הטקסט עם הסיסמה שקיבלת:
   ```
   EMAIL_PASS=abcdefghijklmnop
   ```
   ⚠️ **חשוב:** הסר את הרווחים! אם הסיסמה היא `abcd efgh ijkl mnop`
   כתבי: `abcdefghijklmnop` (בלי רווחים!)

6. **שמרי את הקובץ** (Cmd+S)

### דרך 2: עם הטרמינל (למתקדמים)

הרצי בטרמינל:
```bash
cd /Users/shay_e/Desktop/Angular/ayallaCosmetics/server
nano .env
```

ערכי את השורה של EMAIL_PASS ואז:
- לחצי `Ctrl + X`
- לחצי `Y`
- לחצי `Enter`

---

## ✅ שלב 3: הפעילי את השרת מחדש

אם השרת כבר רץ:
1. עצרי אותו (לחצי `Ctrl + C` בטרמינל)
2. הפעילי מחדש:
   ```bash
   cd server
   npm run dev
   ```

אם השרת לא רץ:
```bash
cd server
npm run dev
```

---

## 🧪 בדיקה שזה עובד

1. פתחי את האתר: http://localhost:3000
2. גללי ל"צור קשר"
3. מלאי את הטופס עם האימייל שלך
4. שלחי
5. בדקי את תיבת הדואר של **ayalla450@gmail.com** - אמור להגיע מייל!

---

## ❌ זה עדיין לא עובד?

### שגיאות נפוצות:

**"Invalid login"** או **"Username and Password not accepted"**
- ✅ וודאי ש-2-Step Verification מופעל
- ✅ צרי App Password חדש
- ✅ הסרי רווחים מהסיסמה ב-.env

**"Connection timeout"**
- ✅ בדקי חיבור לאינטרנט
- ✅ בדקי אם יש Firewall שחוסם

**"Cannot find module 'dotenv'"**
- ✅ הרצי: `cd server && npm install`

### בדיקה בקונסול של השרת:

אחרי ששלחת טופס, תראי בקונסול של השרת:
- ✅ אם הצליח: `✅ Email sent successfully`
- ❌ אם נכשל: יופיע שגיאה אדומה

---

## 💡 טיפים

1. **שמרי את ה-App Password** במקום בטוח (לא תצטרכי אותו שוב)
2. אפשר ליצור **כמה App Passwords** שרוצים
3. אם שכחת את הסיסמה, פשוט **צרי חדשה**
4. ה-App Password **לא מראה לך שוב** אחרי שיוצרים אותו

---

## 📞 זקוקה לעזרה?

אם זה לא עובד אחרי כל הצעדים, ספרי לי:
1. איזו שגיאה מופיעה בקונסול של השרת?
2. האם 2-Step Verification מופעל?
3. האם השרת רץ?

---

✨ **אחרי שזה יעבוד, כל הטפסים שישלחו באתר יגיעו ישירות ל-ayalla450@gmail.com!**

