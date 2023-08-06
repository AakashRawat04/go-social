import { db } from '@/loaders/database';
import { NextFunction, Request, Response } from 'express';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await (await db()).from('profiles').select('id, name, avatar');

    if (error) {
      throw {
        statusCode: 400,
        message: error.message,
      };
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const followUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw {
        statusCode: 400,
        message: 'No token provided',
      };
    }

    const { id: toBeFollowedId } = req.params;

    // Get the user from the token
    const {
      data: { user: currentUser },
      error: userError,
    } = await (await db()).auth.getUser(token);

    if (userError) {
      throw {
        statusCode: 400,
        message: userError?.message,
      };
    }

    const { data: currentUserData, error: fetchUserError } = await (await db())
      .from('profiles')
      .select('following')
      .filter('id', 'eq', currentUser?.id)
      .single();

    if (fetchUserError) {
      throw {
        statusCode: 400,
        message: fetchUserError?.message,
      };
    }

    if (currentUserData.following.includes(toBeFollowedId)) {
      throw {
        statusCode: 400,
        message: 'Already following this user',
      };
    }

    console.log('Hee');

    const { error: followError } = await (
      await db()
    )
      .from('profiles')
      .update({
        following: [...currentUserData.following, toBeFollowedId],
      })
      .filter('id', 'eq', currentUser?.id)
      .single();

    if (followError) {
      throw {
        statusCode: 400,
        message: followError?.message,
      };
    }

    const { data: otherUserData, error: fetchFollowedUserError } = await (await db())
      .from('profiles')
      .select('followers')
      .filter('id', 'eq', toBeFollowedId)
      .single();

    if (fetchFollowedUserError) {
      throw {
        statusCode: 400,
        message: fetchFollowedUserError?.message,
      };
    }

    const { error: followerUpdateError } = await (
      await db()
    )
      .from('profiles')
      .update({
        followers: [...otherUserData.followers, currentUser?.id],
      })
      .filter('id', 'eq', toBeFollowedId)
      .single();

    if (followerUpdateError) {
      throw {
        statusCode: 400,
        message: followerUpdateError?.message,
      };
    }

    res.json({
      success: true,
      message: `Followed user ${toBeFollowedId}`,
    });
  } catch (error) {
    next(error);
  }
};

export const unfollowUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw {
        statusCode: 400,
        message: 'No token provided',
      };
    }

    const { id: toBeUnfollowedId } = req.params;

    // Get the user from the token
    const {
      data: { user: currentUser },
      error: userError,
    } = await (await db()).auth.getUser(token);

    if (userError) {
      throw {
        statusCode: 400,
        message: userError?.message,
      };
    }

    const { data: currentUserData, error: fetchUserError } = await (await db())
      .from('profiles')
      .select('following')
      .filter('id', 'eq', currentUser?.id)
      .single();

    if (fetchUserError) {
      throw {
        statusCode: 400,
        message: fetchUserError?.message,
      };
    }

    const { error: followError } = await (
      await db()
    )
      .from('profiles')
      .update({
        following: currentUserData.following.filter((id: string) => id !== toBeUnfollowedId),
      })
      .filter('id', 'eq', currentUser?.id)
      .single();

    if (followError) {
      throw {
        statusCode: 400,
        message: followError?.message,
      };
    }

    const { data: otherUserData, error: fetchFollowedUserError } = await (await db())
      .from('profiles')
      .select('followers')
      .filter('id', 'eq', toBeUnfollowedId)
      .single();

    if (fetchFollowedUserError) {
      throw {
        statusCode: 400,
        message: fetchFollowedUserError?.message,
      };
    }

    const { error: followerUpdateError } = await (
      await db()
    )
      .from('profiles')
      .update({
        followers: otherUserData.followers.filter((id: string) => id !== currentUser?.id),
      })
      .filter('id', 'eq', toBeUnfollowedId)
      .single();

    if (followerUpdateError) {
      throw {
        statusCode: 400,
        message: followerUpdateError?.message,
      };
    }

    res.json({
      success: true,
      message: `Unfollowed user ${toBeUnfollowedId}`,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const { data, error } = await (await db()).from('profiles').select('*').filter('id', 'eq', id).single();

    if (error) {
      throw {
        statusCode: 400,
        message: error.message,
      };
    }

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};
