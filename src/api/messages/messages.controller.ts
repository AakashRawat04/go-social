import { db } from '@/loaders/database';
import { NextFunction, Request, Response } from 'express';

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sender_id, receiver_id } = req.query;

    const { data, error } = await (await db())
      .from('messages')
      .select(
        'id, content, createdAt:created_at, sender:sender_id (id, name, avatar), receiver:receiver_id (id, name, avatar)',
      )
      .eq('sender_id', sender_id)
      .eq('receiver_id', receiver_id)
      .order('created_at', { ascending: true });

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

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { content, sender_id, receiver_id } = req.body;

    const { error } = await (
      await db()
    )
      .from('messages')
      .insert({
        content,
        sender_id,
        receiver_id,
      })
      .single();

    if (error) {
      throw {
        statusCode: 400,
        message: error.message,
      };
    }

    res.json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
