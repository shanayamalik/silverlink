// Mock volunteer data for testing volunteer matching and display
// Diverse profiles with varying levels of optional information

export const mockVolunteers = [
  // Profile 1: Complete profile (all fields filled)
  {
    id: '1',
    name: 'Maria Santos',
    icon: '👩‍🏫',
    role: 'Retired Librarian',
    verified: true,
    bio: 'Books brought me to this country, and now I want to share that love of reading with others.',
    helpsWith: ['Companionship', 'Reading Together', 'Library Help'],
    languages: ['Portuguese', 'English', 'Spanish'],
    availability: 'Tue, Thu Mornings',
    skills: ['Book recommendations', 'Reading aloud', 'Organizing', 'Storytelling'],
    yearsVolunteering: 4,
    about: 'After 25 years as a librarian in São Paulo and later Boston, I retired but couldn\'t stay away from books. I host a small book club and enjoy reading aloud to those who find it difficult. I\'m patient, warm, and always have a good story recommendation.'
  },
  // Profile 2: Minimal optional info (no skills, languages, or years)
  {
    id: '2',
    name: 'Raj Patel',
    icon: '💻',
    role: 'Tech Helper',
    verified: true,
    bio: 'Technology should make life easier, not harder. I\'m here to help bridge that gap.',
    helpsWith: ['Technology Help', 'Video Calls', 'Devices'],
    availability: 'Weekends',
    about: 'I spent 30 years in IT and now volunteer to help seniors navigate smartphones, tablets, and video calls. No question is too small—I\'ve heard them all!'
  },
  // Profile 3: Partial info (no about section)
  {
    id: '3',
    name: 'Fatima Hassan',
    icon: '🎨',
    role: 'Crafts & Conversation',
    verified: true,
    bio: 'I believe everyone has a story worth hearing.',
    helpsWith: ['Companionship', 'Crafts', 'Light Cooking'],
    languages: ['Urdu', 'English'],
    availability: 'Mon, Wed, Fri Afternoons',
    skills: ['Knitting', 'Painting', 'Baking'],
    yearsVolunteering: 2
  }
];