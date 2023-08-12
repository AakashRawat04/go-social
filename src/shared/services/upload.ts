import config from '@/config';
import { ERRORS } from '../errors';
import { db } from '@/loaders/database';
import crypto from 'crypto';

export const uploadObject = async (file: Express.Multer.File) => {
  if (!file) {
    throw { statusCode: ERRORS.RESOURCE_NOT_FOUND.code, message: ERRORS.RESOURCE_NOT_FOUND.message };
  }

  // Upload the image to the Supabase storage bucket
  const { data, error } = await (await db()).storage
    .from(config.SUPABASE.BUCKET_NAME)
    .upload(`posts/${crypto.randomUUID()}`, file.buffer, {
      cacheControl: '3600',
      contentType: file.mimetype,
    });

  if (error) {
    throw {
      statusCode: 400,
      message: error.message,
    };
  }

  const objectUrl = `${config.SUPABASE.URL}/storage/v1/object/public/${config.SUPABASE.BUCKET_NAME}/${data.path}`;

  return objectUrl;
};
