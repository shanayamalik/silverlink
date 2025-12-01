// Mock volunteer data for testing volunteer matching and display
// Matches the 3 card designs from HomePage.jsx DesignPreview

export const mockVolunteers = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    icon: '🌿',
    role: 'Retired Nurse',
    verified: true,
    helpsWith: ['Gardening', 'Recipe Swapping'],
    availability: 'Mon, Wed Mornings',
    variant: 'helper'
  },
  {
    id: '2',
    name: 'Robert Chen',
    icon: '📚',
    role: 'Retired History Teacher',
    bio: 'I miss the classroom and love sharing stories about local history with new friends.',
    languages: ['Mandarin', 'English'],
    tags: ['♟️ Chess'],
    variant: 'storyteller'
  },
  {
    id: '3',
    name: 'Emily Davis',
    icon: '💻',
    role: 'Tech Savvy',
    bio: 'Former IT Specialist who is patient and a good listener.',
    skills: ['Setting up Zoom calls', 'Email & Password help', 'iPad basics'],
    variant: 'techie'
  }
];
