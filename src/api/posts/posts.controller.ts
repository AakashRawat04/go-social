import { db } from '@/loaders/database';
import { ERRORS } from '@/shared/errors';
import { NextFunction, Request, Response } from 'express';
import multer from 'multer';

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

const postImage = async (file: Express.Multer.File) => {
  if (!file) {
    throw { errorCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }

  // Upload the image to the Supabase storage bucket
  const { data, error } = await (await db()).storage
    .from('bucket_name')
    .upload('posts/' + file.filename, Date.now().toString());

  if (error) {
    console.error('Error uploading image:', error.message);
  }

  return data?.path;
};

export const createPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const imageUrl = postImage(req.body.file);

    // Create a new post in the "posts" table
    const { data: postData, error: postError } = await (await db()).from('posts').insert({
      created_by: 'your_username', // Replace this with the actual creator's username
      image_url: imageUrl,
      likes: 0, // Default likes value
      dislikes: 0, // Default dislikes value
      bookmarks: 0, // Default bookmarks value
    });

    if (postError) {
      console.error('Error creating post:', postError.message);
      return res.status(500).json({ error: 'Failed to create post' });
    }

    return res.json({ message: 'Post created successfully', post: postData });
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: 'Unexpected error occurred' });
  }
};
