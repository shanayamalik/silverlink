import { User, UserProfile } from '../types';

const USERS_KEY = 'voice_chat_users';
const PROFILES_KEY = 'voice_chat_profiles';
const SESSION_KEY = 'voice_chat_session';

class AuthService {
  private getUsers(): User[] {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private saveUsers(users: User[]): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  private getProfiles(): Record<string, UserProfile> {
    const profiles = localStorage.getItem(PROFILES_KEY);
    return profiles ? JSON.parse(profiles) : {};
  }

  private saveProfiles(profiles: Record<string, UserProfile>): void {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  }

  signup(email: string, password_raw: string): User {
    const users = this.getUsers();
    if (users.some(user => user.email === email)) {
      throw new Error('An account with this email already exists.');
    }
    
    // In a real app, hash the password. For this example, we store it directly.
    const newUser: User = { id: Date.now().toString(), email, password: password_raw };
    users.push(newUser);
    this.saveUsers(users);
    
    // Automatically log in
    localStorage.setItem(SESSION_KEY, JSON.stringify({id: newUser.id, email: newUser.email}));

    return { id: newUser.id, email: newUser.email };
  }

  login(email: string, password_raw: string): User {
    const users = this.getUsers();
    const user = users.find(u => u.email === email && u.password === password_raw);
    if (!user) {
      throw new Error('Invalid email or password.');
    }
    
    // Store user session (without password)
    const sessionUser = { id: user.id, email: user.email };
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));

    return sessionUser;
  }

  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  }

  getCurrentUser(): User | null {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  }

  saveProfile(profile: UserProfile): void {
    const profiles = this.getProfiles();
    profiles[profile.userId] = profile;
    this.saveProfiles(profiles);
  }

  getProfile(userId: string): UserProfile | null {
    const profiles = this.getProfiles();
    return profiles[userId] || null;
  }
}

export const authService = new AuthService();
