# Referral Rewards System

A modern referral rewards system built with React frontend and Express.js backend. Track referrals, earn rewards, and compete on the leaderboard!

## 🚀 Features

### ✅ Minimum Features (All Included)
- **Dummy Login/Signup System** - No real authentication, but fully functional UI
- **User Dashboard** showing:
  - Intern name
  - Dummy referral code (e.g., `yourname2025`)
  - Total donations raised (from backend)
  - Rewards/unlockables section (static display)
- **Backend REST API** with:
  - Dummy data for user info, referral codes, and donation amounts
  - Mock endpoints for login, signup, user data, and leaderboard

### 🎁 Bonus Features
- **Leaderboard Page** - See rankings and compete with others
- **Modern UI/UX** - Beautiful, responsive design with animations
- **Copy Referral Code** - One-click copy functionality
- **Reward System** - Visual badges and achievements
- **Statistics Dashboard** - Comprehensive stats and metrics

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern React with hooks
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons
- **Custom CSS** - Modern, responsive design

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Quick Start

1. **Clone and Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd server && npm install
   
   # Install frontend dependencies
   cd ../client && npm install
   ```

2. **Start the Development Servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This will start both:
   - Backend server on `http://localhost:5000`
   - Frontend React app on `http://localhost:3000`

### Alternative: Run Separately

**Backend Only:**
```bash
cd server
npm run dev
```

**Frontend Only:**
```bash
cd client
npm start
```

## 🔐 Demo Credentials

Use these credentials to test the login system:

| Email | Password |
|-------|----------|
| `john@example.com` | `password123` |
| `jane@example.com` | `password123` |
| `mike@example.com` | `password123` |

## 📱 Usage Guide

### 1. Authentication
- Visit `http://localhost:3000`
- Use the demo credentials above to log in
- Or create a new account using the signup form

### 2. Dashboard
- View your personal stats and referral code
- Copy your referral code with one click
- See your unlocked rewards and achievements
- Access quick actions for sharing and viewing leaderboard

### 3. Leaderboard
- Navigate to the leaderboard page
- See rankings based on total donations
- View statistics and tips for climbing the ranks

### 4. Rewards System
- Bronze Badge: First referral milestone
- Silver Badge: 5 referrals achieved
- Gold Badge: 10 referrals achieved
- Platinum Badge: 25 referrals achieved

## 🏗️ Project Structure

```
referral-rewards-system/
├── package.json                 # Root package.json with scripts
├── server/                      # Backend Express.js server
│   ├── package.json
│   └── index.js                 # Main server file with API endpoints
├── client/                      # React frontend
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── index.js             # React entry point
│       ├── App.js               # Main app component with routing
│       ├── index.css            # Global styles
│       ├── App.css              # App-specific styles
│       └── components/          # React components
│           ├── Login.js         # Login form
│           ├── Signup.js        # Signup form
│           ├── Dashboard.js     # User dashboard
│           ├── Leaderboard.js   # Leaderboard page
│           └── Navbar.js        # Navigation component
└── README.md                    # This file
```

## 🔌 API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/signup` - User registration

### Data
- `GET /api/user/:id` - Get user data and rewards
- `GET /api/leaderboard` - Get leaderboard rankings
- `GET /api/rewards` - Get all available rewards

## 🎨 Customization

### Adding New Users
Edit the `users` array in `server/index.js` to add more demo users.

### Modifying Rewards
Update the rewards structure in the backend to add new badges or change requirements.

### Styling
The app uses CSS custom properties for theming. Modify the `:root` variables in `client/src/index.css` to change colors and styling.

## 🚀 Deployment

### Backend Deployment
The Express server can be deployed to:
- Heroku
- Vercel
- Railway
- Any Node.js hosting platform

### Frontend Deployment
The React app can be deployed to:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

If you encounter any issues:
1. Check the console for error messages
2. Ensure all dependencies are installed
3. Verify both servers are running
4. Check that the backend is accessible at `http://localhost:5000`

---

**Happy Coding! 🎉** 