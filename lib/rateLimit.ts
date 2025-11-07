import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};
const WINDOW_SIZE = 60 * 1000; // 1 minute
const MAX_REQUESTS = 10; // 10 requests per minute

export function rateLimit(req: NextRequest) {
  const ip = req.ip || 'anonymous';
  const now = Date.now();
  
  // Clean up expired entries
  for (const key in store) {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  }
  
  // Check/Create rate limit entry
  if (!store[ip] || store[ip].resetTime < now) {
    store[ip] = {
      count: 1,
      resetTime: now + WINDOW_SIZE,
    };
    return null;
  }
  
  // Increment counter
  store[ip].count++;
  
  // Check if over limit
  if (store[ip].count > MAX_REQUESTS) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }
  
  return null;
}