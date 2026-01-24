# English Quiz Platform 🎓📚

A professional, modern English language learning platform built with Next.js and MongoDB. Features interactive quizzes for students and a comprehensive admin dashboard for tracking performance.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square)](https://react.dev)
[![MongoDB](https://img.shields.io/badge/MongoDB-7-green?style=flat-square)](https://www.mongodb.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square)](https://tailwindcss.com)

## ✨ Features

### Student Quiz
- **No Login Required** - Anonymous access to quiz
- **5-Minute Timed Quiz** - Countdown timer with auto-submit
- **10 Interactive Questions** - Multiple choice with 4 options each
- **Instant Feedback** - See correct answers immediately
- **Detailed Explanations** - Learn from each question
- **Real-time Scoring** - Automatic score calculation
- **Performance Metrics** - Grade, percentage, time spent
- **Responsive Design** - Works on all devices

### Admin Dashboard
- **Secure Authentication** - JWT-based login system
- **Student Tracking** - Monitor all quiz submissions
- **Performance Analytics** - Statistics and insights
- **Search Functionality** - Find students by name
- **Detailed Results** - View scores, grades, timestamps
- **Professional UI** - Dark theme with tan accents

### Technical Features
- **MongoDB Database** - Secure data persistence
- **RESTful APIs** - Well-structured endpoints
- **Bcryptjs** - Secure password hashing
- **JWT Authentication** - Token-based security
- **Tailwind CSS** - Modern responsive design
- **TypeScript** - Type-safe development

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB (local or Atlas)
- npm or yarn

### Installation (5 minutes)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Setup environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` with your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/quiz_platform
   MONGODB_DB=quiz_platform
   JWT_SECRET=your-super-secret-key-here
   ```

3. **Initialize database**
   ```bash
   npm run seed
   ```
   
   Creates:
   - 10 English quiz questions
   - Admin account: `admin@example.com` / `admin123`

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open in browser**
   - Home: http://localhost:3000
   - Quiz: http://localhost:3000/quiz
   - Admin: http://localhost:3000/admin/login

## 📖 Usage Guide

### For Students
1. Visit home page and click "Mulai Sekarang"
2. Enter your full name
3. Answer 10 English questions in 5 minutes
4. View your score and grade
5. See detailed results with explanations

### For Admin
1. Go to `/admin/login`
2. Login with `admin@example.com` / `admin123`
3. View all student submissions
4. See performance statistics
5. Search for specific students

## 📁 Project Structure

```
project/
├── app/
│   ├── quiz/
│   │   └── page.tsx          # Student quiz interface
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Tailwind + design tokens
├── pages/
│   ├── api/
│   │   ├── questions.ts      # GET questions
│   │   ├── submissions.ts    # POST/GET submissions
│   │   └── admin/
│   │       ├── login.ts      # Admin login
│   │       ├── logout.ts     # Admin logout
│   │       └── submissions.ts # Protected endpoint
│   └── admin/
│       ├── login.tsx         # Login page
│       └── dashboard.tsx     # Dashboard page
├── lib/
│   └── mongodb.ts            # DB connection
├── scripts/
│   └── seed-db.js            # Database seeding
├── SETUP_GUIDE.md            # Detailed setup
├── README.md                 # This file
└── .env.local.example        # Env template
```

## 🔌 API Endpoints

### Public APIs
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/questions` | Get all questions |
| POST | `/api/submissions` | Save quiz submission |
| GET | `/api/submissions` | Get all submissions |

### Admin APIs (Protected)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin login |
| POST | `/api/admin/logout` | Admin logout |
| GET | `/api/admin/submissions` | Get submissions with auth |

## 🎨 Customization

### Add Questions
Edit `/scripts/seed-db.js`:
```javascript
{
  pertanyaan: 'Your question?',
  pilihan: ['Option A', 'Option B', 'Option C', 'Option D'],
  jawaban: 'Option A',
  penjelasan: 'Explanation text...'
}
```

### Change Colors
Edit `/app/globals.css`:
```css
:root {
  --primary: #c8956c;      /* Tan/orange accent */
  --background: #0a0a0a;   /* Dark background */
  --foreground: #f5f5f5;   /* Light text */
}
```

### Adjust Quiz Time
Edit `/app/quiz/page.tsx`:
```typescript
const [timeLeft, setTimeLeft] = useState(300); // seconds
```

## 🗄️ Database Schemas

### Questions
```json
{
  "pertanyaan": "string",
  "pilihan": ["string", "string", "string", "string"],
  "jawaban": "string",
  "penjelasan": "string"
}
```

### Submissions
```json
{
  "studentName": "string",
  "score": "number",
  "totalQuestions": "number",
  "percentage": "number",
  "timeSpent": "number (seconds)",
  "submittedAt": "Date"
}
```

### Admins
```json
{
  "email": "string",
  "password": "string (hashed)",
  "name": "string",
  "createdAt": "Date"
}
```

## 🔒 Security

- ✅ Passwords hashed with bcryptjs
- ✅ JWT authentication for admin
- ✅ HTTP-only cookies for tokens
- ✅ Input validation & sanitization
- ✅ Environment variables for secrets
- ✅ Secure MongoDB connection

## 📦 Deployment

### Deploy to Vercel
1. Push code to GitHub
2. Import project on Vercel
3. Add environment variables:
   - `MONGODB_URI`
   - `MONGODB_DB`
   - `JWT_SECRET`
4. Deploy

### Deploy Elsewhere
Ensure these env vars are set:
- `MONGODB_URI` - MongoDB connection string
- `MONGODB_DB` - Database name
- `JWT_SECRET` - Strong random string

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection error | Check `MONGODB_URI` in `.env.local` |
| Questions not loading | Run `npm run seed` |
| Admin login fails | Ensure admin user seeded |
| Styling broken | Clear `.next` folder and restart |

See `SETUP_GUIDE.md` for detailed troubleshooting.

## 📝 Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run seed` | Initialize database |
| `npm run lint` | Run ESLint |

**Built with Raditya for English learners everywhere** 🌍
