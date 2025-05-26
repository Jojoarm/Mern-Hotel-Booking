import { Request, Response } from 'express';

// GET /api/user
export const getUserData = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const role = req.user?.role;
    const recentSearchedCities = req.user?.recentSearchedCities;
    res.json({ success: true, role, recentSearchedCities });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};

// Store User Recent SearchedCities
export const storeRecentSearchedCities = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { recentSearchedCity } = req.body;
    const user = req.user;
    if (user.recentSearchedCities.length < 3) {
      user.recentSearchedCities.push(recentSearchedCity);
    } else {
      user.recentSearchedCities.shift();
      user.recentSearchedCities.push(recentSearchedCity);
    }
    await user.save();
    res.json({ success: true, message: 'City added' });
  } catch (error) {
    res.json({ success: false, message: (error as Error).message });
  }
};
