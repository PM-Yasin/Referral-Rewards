const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Dummy data
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    referralCode: "johndoe2025",
    totalDonations: 1250,
    rewards: [
      { id: 1, name: "Bronze Badge", unlocked: true, description: "First referral milestone" },
      { id: 2, name: "Silver Badge", unlocked: true, description: "5 referrals achieved" },
      { id: 3, name: "Gold Badge", unlocked: false, description: "10 referrals achieved" },
      { id: 4, name: "Platinum Badge", unlocked: false, description: "25 referrals achieved" }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    referralCode: "janesmith2025",
    totalDonations: 890,
    rewards: [
      { id: 1, name: "Bronze Badge", unlocked: true, description: "First referral milestone" },
      { id: 2, name: "Silver Badge", unlocked: false, description: "5 referrals achieved" },
      { id: 3, name: "Gold Badge", unlocked: false, description: "10 referrals achieved" },
      { id: 4, name: "Platinum Badge", unlocked: false, description: "25 referrals achieved" }
    ]
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike@example.com",
    referralCode: "mikejohnson2025",
    totalDonations: 2100,
    rewards: [
      { id: 1, name: "Bronze Badge", unlocked: true, description: "First referral milestone" },
      { id: 2, name: "Silver Badge", unlocked: true, description: "5 referrals achieved" },
      { id: 3, name: "Gold Badge", unlocked: true, description: "10 referrals achieved" },
      { id: 4, name: "Platinum Badge", unlocked: false, description: "25 referrals achieved" }
    ]
  }
];

// Routes
app.get('/api/user/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.get('/api/leaderboard', (req, res) => {
  const leaderboard = users
    .map(user => ({
      id: user.id,
      name: user.name,
      totalDonations: user.totalDonations,
      referralCode: user.referralCode
    }))
    .sort((a, b) => b.totalDonations - a.totalDonations);
  
  res.json(leaderboard);
});

app.get('/api/rewards', (req, res) => {
  const allRewards = [
    { id: 1, name: "Bronze Badge", description: "First referral milestone", requirement: "1 referral" },
    { id: 2, name: "Silver Badge", description: "5 referrals achieved", requirement: "5 referrals" },
    { id: 3, name: "Gold Badge", description: "10 referrals achieved", requirement: "10 referrals" },
    { id: 4, name: "Platinum Badge", description: "25 referrals achieved", requirement: "25 referrals" },
    { id: 5, name: "Diamond Badge", description: "50 referrals achieved", requirement: "50 referrals" }
  ];
  
  res.json(allRewards);
});

// Dummy login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  // Simple dummy authentication
  const user = users.find(u => u.email === email);
  
  if (user && password === 'password123') {
    res.json({ 
      success: true, 
      user: { id: user.id, name: user.name, email: user.email },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }
});

// Dummy signup endpoint
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  
  if (existingUser) {
    return res.status(400).json({ 
      success: false, 
      message: 'User already exists' 
    });
  }
  
  // Create new user
  const newUser = {
    id: users.length + 1,
    name,
    email,
    referralCode: `${name.toLowerCase().replace(/\s+/g, '')}2025`,
    totalDonations: 0,
    rewards: [
      { id: 1, name: "Bronze Badge", unlocked: false, description: "First referral milestone" },
      { id: 2, name: "Silver Badge", unlocked: false, description: "5 referrals achieved" },
      { id: 3, name: "Gold Badge", unlocked: false, description: "10 referrals achieved" },
      { id: 4, name: "Platinum Badge", unlocked: false, description: "25 referrals achieved" }
    ]
  };
  
  users.push(newUser);
  
  res.json({ 
    success: true, 
    user: { id: newUser.id, name: newUser.name, email: newUser.email },
    message: 'Signup successful'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 