import React, { useState, useEffect } from 'react';
import { Copy, Check, Trophy, DollarSign, Users, Award } from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ user }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchUserData();
  }, [user.id]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`/api/user/${user.id}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyReferralCode = async () => {
    if (userData?.referralCode) {
      try {
        await navigator.clipboard.writeText(userData.referralCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-xl font-semibold text-primary">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <div className="text-xl font-semibold text-red-600">Failed to load user data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {userData.name}! 👋
        </h1>
        <p className="text-gray-600">Track your referrals and rewards progress</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Donations */}
        <div className="card hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Donations</p>
              <p className="text-3xl font-bold text-success">${userData.totalDonations.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-success" />
            </div>
          </div>
        </div>

        {/* Referral Code */}
        <div className="card hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Your Referral Code</p>
              <p className="text-xl font-bold text-primary">{userData.referralCode}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
          </div>
          <button
            onClick={copyReferralCode}
            className="mt-3 btn btn-outline btn-sm w-full"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy Code
              </>
            )}
          </button>
        </div>

        {/* Rewards Earned */}
        <div className="card hover-scale">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rewards Earned</p>
              <p className="text-3xl font-bold text-secondary">
                {userData.rewards.filter(r => r.unlocked).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Section */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Your Rewards & Achievements</h2>
          <Trophy className="w-6 h-6 text-secondary" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {userData.rewards.map((reward) => (
            <div
              key={reward.id}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                reward.unlocked
                  ? 'border-success bg-green-50 hover:bg-green-100'
                  : 'border-gray-200 bg-gray-50 opacity-60'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className={`font-semibold ${
                  reward.unlocked ? 'text-success' : 'text-gray-500'
                }`}>
                  {reward.name}
                </h3>
                {reward.unlocked && (
                  <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <p className={`text-sm ${
                reward.unlocked ? 'text-gray-700' : 'text-gray-500'
              }`}>
                {reward.description}
              </p>
              {!reward.unlocked && (
                <div className="mt-2">
                  <span className="badge badge-warning">Locked</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">Share Your Referral Code</h3>
            <p className="text-sm text-blue-700 mb-3">
              Share your unique referral code with friends and family to earn rewards
            </p>
            <button
              onClick={copyReferralCode}
              className="btn btn-primary btn-sm"
            >
              Copy & Share
            </button>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">View Leaderboard</h3>
            <p className="text-sm text-green-700 mb-3">
              See how you rank among other participants in the referral program
            </p>
            <a href="/leaderboard" className="btn btn-outline btn-sm">
              View Rankings
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 