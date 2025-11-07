export interface Complaint {
  title: string;
  description: string;
  location: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt?: Date;
  userId?: string; // Assuming you have a User model
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // Store hashed password
}

export interface AuthResponse {
  user: User;
  token: string; // JWT or similar token for authentication
}