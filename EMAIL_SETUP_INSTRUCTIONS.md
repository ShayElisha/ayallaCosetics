# 📧 הוראות להגדרת שליחת מיילים

## הגדרת Gmail App Password

כדי ששליחת המיילים תעבוד, צריך ליצור **App Password** בחשבון Gmail שלך.

### שלב 1: הפעלת 2-Step Verification

1. היכנסי לחשבון Google שלך: https://myaccount.google.com/
2. לחצי על **Security** (אבטחה) בתפריט הצד
3. גללי למטה למקטע **Signing in to Google**
4. לחצי על **2-Step Verification** והפעילי אותו
5. עברי את כל השלבים (SMS, טלפון וכו')

### שלב 2: יצירת App Password

1. אחרי שהפעלת 2-Step Verification, חזרי לדף **Security**
2. תחת **Signing in to Google**, תראי את **App passwords**
3. לחצי על **App passwords**
4. ייתכן שתתבקשי להתחבר שוב
5. בחרי **Select app** → **Mail**
6. בחרי **Select device** → **Other (Custom name)**
7. כתבי: **Ayalla Cosmetics Website**
8. לחצי על **Generate**
9. **העתיקי את הסיסמה שנוצרה** (16 תווים עם רווחים)

### שלב 3: עדכון קובץ .env

1. פתחי את הקובץ: `server/.env`
2. מצאי את השורה: `EMAIL_PASS=your-gmail-app-password-here`
3. החליפי את `your-gmail-app-password-here` בסיסמה שקיבלת
   - **הסר את הרווחים!** אם הסיסמה היא `abcd efgh ijkl mnop`, כתבי: `abcdefghijklmnop`

**דוגמה:**
```env
EMAIL_USER=ayalla450@gmail.com
EMAIL_PASS=abcdefghijklmnop
ADMIN_EMAIL=ayalla450@gmail.com
```

### שלב 4: הפעלת השרת מחדש

אם השרת כבר רץ, עצרי אותו (Ctrl+C) והפעילי מחדש:

```bash
cd server
npm run dev
```

## בדיקה שהכל עובד

1. היכנסי לאתר
2. מלאי את טופס יצירת הקשר
3. שלחי
4. בדקי את תיבת הדואר של `ayalla450@gmail.com` - אמור להגיע מייל עם הפנייה

## אם זה לא עובד

### בדיקות:

1. **בדקי שהשרת רץ** - אמור להיות: `🚀 Server is running on http://localhost:5000`
2. **בדקי בקונסול של השרת** - אם יש שגיאה, היא תופיע שם
3. **שגיאות נפוצות:**
   - `Invalid login` - הסיסמה לא נכונה, צרי App Password חדש
   - `Username and Password not accepted` - לא הפעלת 2-Step Verification
   - `Connection timeout` - בעיית אינטרנט או חומת אש

### פתרונות:

1. **וודאי ש-2-Step Verification מופעל**
2. **צרי App Password חדש** (ניתן ליצור כמה שרוצים)
3. **הסירי רווחים מהסיסמה** ב-.env
4. **הפעילי את השרת מחדש** אחרי כל שינוי ב-.env

## שליחה דרך WhatsApp

כפתורי WhatsApp באתר כבר מוגדרים לטלפון: **052-319-0843**

כשמישהו לוחץ על כפתור WhatsApp, זה פותח את האפליקציה עם הודעה מוכנה!

## מיקום הכתובת במפה

המפה באתר מוגדרת לכתובת: **קיבוץ גולויות 12, אשדוד**

---

✅ **עכשיו הכל מוגדר ומוכן לעבודה!**

אם יש בעיות, בדקי את קובץ ה-console של השרת - כל השגיאות מופיעות שם.

