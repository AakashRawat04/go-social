import { db } from '@/loaders/database';
import { uploadObject } from '@/shared/services/upload';
import { NextFunction, Request, Response } from 'express';

export const getPosts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { data, error } = await (await db()).from('posts').select();

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

export const createPost = async (
  req: Request & {
    file: Express.Multer.File;
  },
  res: Response,
  next: NextFunction,
) => {
  try {
    const imageUrl = await uploadObject(req.file);

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw {
        statusCode: 400,
        message: 'No token provided',
      };
    }

    // Get the user from the token
    const {
      data: { user },
      error: userError,
    } = await (await db()).auth.getUser(token);

    if (userError) {
      throw {
        statusCode: 400,
        message: userError?.message,
      };
    }

    // Create a new post in the "posts" table
    const { error: postError } = await (await db()).from('posts').insert({
      created_by: user?.id,
      image_url: imageUrl,
      description: req.body.description,
      likes: 0,
      dislikes: 0,
      bookmarks: 0,
    });

    if (postError) {
      throw {
        statusCode: 400,
        message: postError?.message,
      };
    }

    return res.json({ success: true, message: 'Post created successfully' });
  } catch (err) {
    next(err);
  }
};
