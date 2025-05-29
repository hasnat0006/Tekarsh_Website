# Tekarsh - Software Solutions Platform

A modern full-stack application for software solutions company with an integrated job portal, admin dashboard, and AI-powered CV analysis.

## 🚀 Project Overview

Tekarsh is a comprehensive platform that combines:

- **Company Website**: Showcasing services, testimonials, and company information
- **Job Portal**: Complete job listing and application system
- **Admin Dashboard**: Job management, applicant tracking, and analytics
- **AI-Powered CV Analysis**: Automated CV screening using Google Gemini AI
- **Contact Management**: Customer inquiry handling system

## 🏗️ Architecture

### Frontend (Client)

- **Framework**: Next.js 15.3.2 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom CSS variables
- **UI Components**: Radix UI components with custom styling
- **Animations**: Framer Motion
- **State Management**: React hooks
- **Authentication**: Supabase Auth

### Backend (Server)

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL (via Supabase)
- **File Storage**: Supabase Storage
- **AI Integration**: Google Gemini AI for CV analysis
- **Validation**: Zod schema validation

## 📁 Project Structure

```
Tekarsh/
├── client/                 # Frontend application
│   ├── app/               # Next.js App Router pages
│   │   ├── admin/         # Admin dashboard pages
│   │   ├── career/        # Job portal pages
│   │   └── contact/       # Contact pages
│   ├── components/        # Reusable React components
│   │   ├── admin/         # Admin-specific components
│   │   ├── resources/     # Business logic components
│   │   └── ui/           # UI components library
│   ├── lib/              # Utility functions
│   ├── types/            # TypeScript interfaces
│   └── public/           # Static assets
└── server/               # Backend application
    ├── connection/       # Database connections
    └── route/           # API endpoints
        ├── admin/       # Admin functionality
        └── user_side/   # Public user endpoints
```

## ✨ Key Features

### 🌐 Public Website

- Modern landing page with animated components
- Services showcase
- Company testimonials
- FAQ section
- Contact form with email integration

### 💼 Job Portal

- Job listings with advanced filtering
- Real-time job search
- Job sharing functionality
- Responsive job application modal
- CV upload and analysis

### 🤖 AI-Powered CV Analysis

- Automated CV processing using Google Gemini AI
- Skill extraction and matching
- Job compatibility scoring
- Structured data extraction (education, experience, projects)
- Match percentage calculation

### 👨‍💼 Admin Dashboard

- **Job Management**: Create, edit, delete, and toggle job status
- **Applicant Tracking**: View all applications with detailed profiles
- **CV Analysis Results**: Access AI-generated CV summaries and match scores
- **Status Management**: Update application statuses
- **Analytics Dashboard**: Overview of applications and job performance
- **Message Management**: Handle customer inquiries

### 📊 Advanced Features

- **Real-time Updates**: Live status changes and notifications
- **File Management**: Secure CV storage and retrieval
- **Search & Filter**: Advanced filtering for jobs and applicants
- **Pagination**: Efficient data loading
- **Toast Notifications**: User feedback system
- **Responsive Design**: Mobile-first approach

## 🛠️ Technology Stack

### Frontend Dependencies

- **Next.js 15.3.2**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Framer Motion**: Smooth animations
- **Lucide React**: Modern icon set
- **React Hook Form**: Form handling
- **React Hot Toast**: Notification system
- **Supabase**: Backend-as-a-Service

### Backend Dependencies

- **Express.js**: Web framework
- **PostgreSQL**: Database (via Supabase)
- **Google Generative AI**: CV analysis
- **Zod**: Schema validation
- **CORS**: Cross-origin resource sharing
- **Nodemon**: Development server

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Google AI API key

### Environment Variables

#### Client (.env.local)

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

#### Server (.env)

```env
DATABASE_URL=your_postgresql_connection_string
GOOGLE_GENERATIVE_API_KEY=your_google_ai_api_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Installation & Setup

1. **Clone the repository**

```powershell
git clone <repository-url>
cd Tekarsh
```

2. **Install Client Dependencies**

```powershell
cd client
npm install
```

3. **Install Server Dependencies**

```powershell
cd ../server
npm install
```

4. **Set up Environment Variables**

- Create `.env.local` in client directory
- Create `.env` in server directory
- Add the required environment variables

5. **Start Development Servers**

**Backend Server:**

```powershell
cd server
npm start
```

**Frontend Application:**

```powershell
cd client
npm run dev
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend: http://localhost:5000

## 📊 Database Schema

The application uses PostgreSQL with the following main tables:

- `job_post`: Job listings and details
- `applicants`: Job applications and CV data
- `users`: Admin user management
- `contact_messages`: Customer inquiries

## 🔗 API Endpoints

### Public Endpoints

- `GET /get-jobs`: Fetch all active job listings
- `POST /apply-job`: Submit job application
- `POST /contact`: Submit contact form
- `POST /analyze-cv`: AI-powered CV analysis

### Admin Endpoints

- `GET /get-applicants`: Fetch applicants by admin
- `POST /admin/job`: Create new job posting
- `PUT /admin/job`: Update job posting
- `DELETE /admin/job`: Delete job posting
- `GET /admin/changeStatus`: Toggle job status

## 🔒 Security Features

- Environment variable protection
- Input validation with Zod
- Secure file upload handling
- CORS configuration
- SQL injection prevention

## 🎨 UI/UX Features

- **Dark/Light Theme**: Theme switching capability
- **Responsive Design**: Mobile-first approach
- **Smooth Animations**: Framer Motion integration
- **Loading States**: User feedback during operations
- **Error Handling**: Comprehensive error management
- **Accessibility**: ARIA compliant components

## 📱 Responsive Design

- Mobile-optimized interface
- Tablet-friendly layouts
- Desktop-enhanced experience
- Touch-friendly interactions

## 🚀 Deployment

### Frontend (Vercel)

```powershell
cd client
npm run build
```

### Backend (Node.js hosting)

```powershell
cd server
npm install --production
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Yusuf Reza Hasnat**

## 🆘 Support

For support and questions, please contact through the application's contact form or create an issue in the repository.

---

**Tekarsh** - Building Quality Software, Delivered Fast 🚀
