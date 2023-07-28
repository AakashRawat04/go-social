import config from '@/config';
import * as JWT from 'jsonwebtoken';
import { JWT_CONFIG } from '../constants';

export default function generateToken(email: string): string {
  return JWT.sign({ email }, config.JWT_SECRET, JWT_CONFIG);
}

export function verifyToken(token: string) {
  const data = JWT.verify(token, config.JWT_SECRET) as string;

  return data as unknown as { email: string };
}
