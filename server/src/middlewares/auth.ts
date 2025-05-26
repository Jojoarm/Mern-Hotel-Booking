import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { UserType } from '../../../shared/types';
import { HydratedDocument } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      auth: {
        userId: string;
      };
      user: HydratedDocument<UserType>;
    }
  }
}

// Middleware to check if user is authenticated
export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userId = req.auth?.userId;

  if (!userId) {
    res.status(401).json({ success: false, message: 'Not Authorized!' });
    return; // Prevent further execution
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ success: false, message: 'User not found' });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
