import React, { useState } from 'react';
import { UserProfile } from '../types';
import Button from './Button';

interface ProfileProps {
  profile: UserProfile;
  onSave: (profile: UserProfile) => void;
  onBack: () => void;
}

const Profile: React.FC<ProfileProps> = ({ profile, onSave, onBack }) => {
  const [name, setName] = useState(profile.name);
  const [interests, setInterests] = useState(profile.interests);
  const [isEditing, setIsEditing] = useState(!profile.name); // Start in edit mode if profile is new

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...profile, name, interests });
    setIsEditing(false);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full max-w-2xl p-8 space-y-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-3xl font-extrabold text-center text-blue-800">Your Profile</h2>
        <p className="text-center text-gray-600 text-lg">
          {isEditing
            ? 'Tell us a bit about yourself to find the best matches.'
            : 'Here is your profile information.'}
        </p>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Your Name</label>
            <input
              id="name"
              type="text"
              required
              className="w-full px-3 py-2 mt-1 text-lg border border-gray-300 rounded-lg shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div>
            <label htmlFor="interests" className="text-lg font-medium text-gray-700">Hobbies & Interests</label>
            <textarea
              id="interests"
              rows={4}
              className="w-full px-3 py-2 mt-1 text-lg border border-gray-300 rounded-lg shadow-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Gardening, listening to jazz, playing chess..."
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            {isEditing ? (
              <Button type="submit" size="lg" fullWidth>
                Save Profile
              </Button>
            ) : (
              <Button type="button" onClick={() => setIsEditing(true)} variant="secondary" size="lg" fullWidth>
                Edit Profile
              </Button>
            )}
            <Button type="button" onClick={onBack} variant="secondary" size="lg" fullWidth>
              Back to Chat
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
