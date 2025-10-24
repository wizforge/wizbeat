/**
 * WizBeat - Real-time API Monitoring Library
 * Copyright (c) 2025 Parth Tyagi
 * Licensed under MIT License
 * 
 * Express middleware module - Auto-tracks API requests and responses
 */

// Express middleware types (compatible without requiring express as dependency)
interface Request {
  route?: { path: string };
  path: string;
  method: string;
}

interface Response {
  statusCode: number;
  end: Function;
}

interface NextFunction {
  (): void;
}

import { trackRequest } from './pulseTracker';

export function middleware() {
  return (req: Request, res: Response, next: NextFunction) => {
    const startTime = Date.now();
    const route = `${req.method} ${req.route?.path || req.path || 'unknown'}`;

    // Override res.end to capture response time and status
    const originalEnd = res.end;
    res.end = function(chunk?: any, encoding?: any) {
      const duration = Date.now() - startTime;
      const status = res.statusCode;
      
      // Track the request
      trackRequest(route, status, duration);
      
      // Call original end method
      originalEnd.call(this, chunk, encoding);
    };

    next();
  };
}
