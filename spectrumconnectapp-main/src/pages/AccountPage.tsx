import { useState, useEffect } from 'react';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState({
    fullName: '',
    email: '',
    bio: '',
    role: 'Therapist'
  });
  const [isLoading, setIsLoading] = useState(true);
  
  // Password fields state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Simulate fetching user data
  useEffect(() => {
    // In a real app, you would fetch this from your API
    setTimeout(() => {
      setUser({
        fullName: 'Dr. Uriah Thompson',
        email: 'uriah.thompson@spectrumconnect.com',
        bio: 'Licensed therapist specializing in cognitive behavioral therapy with 10+ years of experience.',
        role: 'Therapist'
      });
      setIsLoading(false);
    }, 500);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };
  
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
  };

  const updateProfile = () => {
    // Here you would update the user profile via API
    console.log('Updated user profile:', user);
    // Show success message or handle response
  };
  
  const updatePassword = () => {
    // Password validation would go here
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    
    console.log('Password update requested');
    // API call to update password would go here
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-3xl font-semibold text-purple-700">My Account</h1>
          <p className="text-gray-600">Manage your profile and account settings</p>
        </div>
        <button className="text-blue-600 hover:text-blue-800 font-medium">
          Log Out
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Left column - User avatar/info */}
        <div className="w-full md:w-1/3 bg-white rounded-lg p-6 shadow-sm">
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-4xl text-gray-500 mb-4">
              {user.fullName ? user.fullName.charAt(0) : 'U'}
            </div>
            <div className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
              {user.role}
            </div>
          </div>
        </div>

        {/* Right column - Account settings */}
        <div className="w-full md:w-2/3 bg-white rounded-lg p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-medium text-gray-800">Account Settings</h2>
            <p className="text-gray-600">Update your account preferences and information</p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border-b">
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'profile' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
            </button>
            <button
              className={`px-4 py-2 font-medium ${
                activeTab === 'password' 
                  ? 'text-blue-600 border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-blue-600'
              }`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
          </div>

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={user.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  name="bio"
                  value={user.bio}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  rows={5}
                  placeholder="Tell us a bit about yourself"
                />
              </div>

              <button
                onClick={updateProfile}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Update Profile
              </button>
            </div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your current password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Enter your new password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  placeholder="Confirm your new password"
                />
              </div>

              <button
                onClick={updatePassword}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Update Password
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;