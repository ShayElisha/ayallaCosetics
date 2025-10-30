import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import bodyParser from 'body-parser'
import { body, validationResult } from 'express-validator'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(helmet())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// MongoDB Connection (Optional - uncomment when ready to use MongoDB)
/*
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ayallacosmetics', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB'))
.catch((err) => console.error('❌ MongoDB connection error:', err))
*/

// Mongoose Schemas
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  service: { type: String, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now },
})

const bookingSchema = new mongoose.Schema({
  service: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: String,
  notes: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now },
})

const Contact = mongoose.model('Contact', contactSchema)
const Booking = mongoose.model('Booking', bookingSchema)

// Email transporter configuration (using nodemailer)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'your-email@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-password',
  },
})

// Helper function to send email
const sendEmail = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to,
      subject,
      html,
    }
    await transporter.sendMail(mailOptions)
    console.log('✅ Email sent successfully')
  } catch (error) {
    console.error('❌ Error sending email:', error)
  }
}

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Ayalla Cosmetics API is running' })
})

// Contact form submission
app.post(
  '/api/contact',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('service').trim().notEmpty().withMessage('Service is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { name, phone, email, service, message } = req.body

      // Save to database (uncomment when MongoDB is connected)
      /*
      const contact = new Contact({
        name,
        phone,
        email,
        service,
        message,
      })
      await contact.save()
      */

      // Send email notification to admin
      const adminEmailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #de5d6c;">פנייה חדשה מטופס יצירת קשר</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <p><strong>שם:</strong> ${name}</p>
            <p><strong>טלפון:</strong> ${phone}</p>
            <p><strong>אימייל:</strong> ${email || 'לא צוין'}</p>
            <p><strong>שירות:</strong> ${service}</p>
            <p><strong>הודעה:</strong> ${message || 'לא צוינה'}</p>
          </div>
        </div>
      `

      await sendEmail(
        process.env.ADMIN_EMAIL || 'ayalla450@gmail.com',
        'פנייה חדשה מהאתר - Ayalla Cosmetics',
        adminEmailHTML
      )

      // Send confirmation email to customer
      if (email) {
        const customerEmailHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #de5d6c;">תודה שפנית אלינו!</h2>
            <p>היי ${name},</p>
            <p>קיבלנו את פנייתך ונחזור אליך בהקדם האפשרי.</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>פרטי הפנייה:</strong></p>
              <p>שירות: ${service}</p>
            </div>
            <p>אם יש לך שאלות דחופות, אנא צרי קשר בטלפון: 052-319-0438</p>
            <p style="margin-top: 30px;">בברכה,<br/>צוות Ayalla Cosmetics</p>
          </div>
        `
        await sendEmail(email, 'קיבלנו את פנייתך - Ayalla Cosmetics', customerEmailHTML)
      }

      res.status(200).json({
        success: true,
        message: 'הפנייה נשלחה בהצלחה',
      })
    } catch (error) {
      console.error('Error processing contact form:', error)
      res.status(500).json({
        success: false,
        message: 'אירעה שגיאה בשליחת הפנייה',
      })
    }
  }
)

// Booking submission
app.post(
  '/api/bookings',
  [
    body('service').trim().notEmpty().withMessage('Service is required'),
    body('date').trim().notEmpty().withMessage('Date is required'),
    body('time').trim().notEmpty().withMessage('Time is required'),
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    try {
      const { service, date, time, name, phone, email, notes } = req.body

      // Save to database (uncomment when MongoDB is connected)
      /*
      const booking = new Booking({
        service,
        date,
        time,
        name,
        phone,
        email,
        notes,
      })
      await booking.save()
      */

      // Send email notification to admin
      const adminEmailHTML = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #de5d6c;">תור חדש נקבע!</h2>
          <div style="background: #f9f9f9; padding: 20px; border-radius: 10px;">
            <p><strong>שם:</strong> ${name}</p>
            <p><strong>טלפון:</strong> ${phone}</p>
            <p><strong>אימייל:</strong> ${email || 'לא צוין'}</p>
            <p><strong>שירות:</strong> ${service}</p>
            <p><strong>תאריך:</strong> ${date}</p>
            <p><strong>שעה:</strong> ${time}</p>
            <p><strong>הערות:</strong> ${notes || 'אין'}</p>
          </div>
        </div>
      `

      await sendEmail(
        process.env.ADMIN_EMAIL || 'ayalla450@gmail.com',
        'תור חדש נקבע - Ayalla Cosmetics',
        adminEmailHTML
      )

      // Send confirmation email to customer
      if (email) {
        const customerEmailHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #de5d6c;">התור שלך נקבע בהצלחה!</h2>
            <p>היי ${name},</p>
            <p>התור שלך אושר ומחכה לך!</p>
            <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p><strong>פרטי התור:</strong></p>
              <p>שירות: ${service}</p>
              <p>תאריך: ${date}</p>
              <p>שעה: ${time}</p>
            </div>
            <p><strong>כתובת:</strong> קיבוץ גולויות 12, אשדוד</p>
            <p><strong>חשוב:</strong> אנא הגיעי 10 דקות לפני השעה שנקבעה.</p>
            <p>נשמח לראותך!</p>
            <p style="margin-top: 30px;">בברכה,<br/>צוות Ayalla Cosmetics</p>
          </div>
        `
        await sendEmail(email, 'אישור תור - Ayalla Cosmetics', customerEmailHTML)
      }

      res.status(200).json({
        success: true,
        message: 'התור נקבע בהצלחה',
      })
    } catch (error) {
      console.error('Error processing booking:', error)
      res.status(500).json({
        success: false,
        message: 'אירעה שגיאה בקביעת התור',
      })
    }
  }
)

// Get all bookings (Admin only - add authentication in production)
app.get('/api/bookings', async (req, res) => {
  try {
    // const bookings = await Booking.find().sort({ createdAt: -1 })
    // res.json(bookings)
    res.json({ message: 'Connect MongoDB to see bookings' })
  } catch (error) {
    console.error('Error fetching bookings:', error)
    res.status(500).json({ error: 'Failed to fetch bookings' })
  }
})

// Get all contacts (Admin only - add authentication in production)
app.get('/api/contacts', async (req, res) => {
  try {
    // const contacts = await Contact.find().sort({ createdAt: -1 })
    // res.json(contacts)
    res.json({ message: 'Connect MongoDB to see contacts' })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    res.status(500).json({ error: 'Failed to fetch contacts' })
  }
})

// Get services info
app.get('/api/services', (req, res) => {
  const services = [
    {
      id: 'eyebrows',
      name: 'עיצוב גבות',
      description: 'עיצוב גבות מושלם המותאם במיוחד לקווי הפנים שלך',
      duration: '45 דקות',
      price: '150 ₪',
    },
    {
      id: 'hair-removal',
      name: 'הסרת שיער',
      description: 'הסרת שיער מתקדמת עם טכנולוגיה חדשנית',
      duration: '60 דקות',
      price: '200 ₪',
    },
    {
      id: 'hyaluronic',
      name: 'חומצה היאלורונית',
      description: 'טיפולי מילוי והזרקות חומצה היאלורונית',
      duration: '90 דקות',
      price: '800 ₪',
    },
    {
      id: 'lips',
      name: 'עיצוב שפתיים',
      description: 'טיפולי שפתיים מתקדמים למראה מושלם',
      duration: '60 דקות',
      price: '600 ₪',
    },
    {
      id: 'facial',
      name: 'טיפולי פנים',
      description: 'טיפולי פנים מתקדמים לעור זוהר ובריא',
      duration: '75 דקות',
      price: '300 ₪',
    },
  ]
  res.json(services)
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📍 API endpoints available at http://localhost:${PORT}/api`)
})

