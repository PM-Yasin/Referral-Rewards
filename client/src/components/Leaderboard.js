import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Crown, Award, TrendingUp } from 'lucide-react';
import axios from 'axios';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get('/api/leaderboard');
      setLeaderboard(response.data);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (rank) => {
    switch (rank) {
      case 1:
        return <Crown className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="text-lg font-bold text-gray-500">#{rank}</span>;
    }
  };

  const getRankBadge = (rank) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white';
      case 2:
        return 'bg-gradient-to-r from-gray-300 to-gray-500 text-white';
      case 3:
        return 'bg-gradient-to-r from-amber-500 to-amber-700 text-white';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-xl font-semibold text-primary">Loading leaderboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-secondary mr-3" />
          <h1 className="text-3xl font-bold text-gray-900">Leaderboard</h1>
        </div>
        <p className="text-gray-600">Top performers in our referral rewards program</p>
      </div>

      {/* Leaderboard */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Top Referrers</h2>
          <TrendingUp className="w-6 h-6 text-success" />
        </div>

        <div className="space-y-4">
          {leaderboard.map((user, index) => {
            const rank = index + 1;
            return (
              <div
                key={user.id}
                className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  rank <= 3 
                    ? 'border-2 border-secondary bg-gradient-to-r from-orange-50 to-yellow-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                {/* Rank and User Info */}
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${getRankBadge(rank)}`}>
                    {getRankIcon(rank)}
                  </div>
                  <div>
                    <h3 className={`font-semibold ${
                      rank <= 3 ? 'text-lg' : 'text-base'
                    }`}>
                      {user.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Referral Code: <span className="font-mono text-primary">{user.referralCode}</span>
                    </p>
                  </div>
                </div>

                {/* Donation Amount */}
                <div className="text-right">
                  <p className="text-2xl font-bold text-success">
                    ${user.totalDonations.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">Total Donations</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Summary */}
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Leaderboard Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{leaderboard.length}</p>
              <p className="text-sm text-gray-600">Total Participants</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">
                ${leaderboard.reduce((sum, user) => sum + user.totalDonations, 0).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">Total Donations</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-secondary">
                ${leaderboard.length > 0 ? Math.round(leaderboard.reduce((sum, user) => sum + user.totalDonations, 0) / leaderboard.length).toLocaleString() : 0}
              </p>
              <p className="text-sm text-gray-600">Average per Person</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Climb */}
      <div className="mt-8 card">
        <div className="card-header">
          <h2 className="card-title">How to Climb the Leaderboard</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Share Your Referral Code</h3>
                <p className="text-sm text-gray-600">
                  Share your unique referral code with friends, family, and on social media
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Encourage Donations</h3>
                <p className="text-sm text-gray-600">
                  Motivate your referrals to make donations to increase your total
                </p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Track Your Progress</h3>
                <p className="text-sm text-gray-600">
                  Monitor your dashboard to see your ranking and donation progress
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold">
                4
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Earn Rewards</h3>
                <p className="text-sm text-gray-600">
                  Unlock badges and rewards as you reach donation milestones
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard; 