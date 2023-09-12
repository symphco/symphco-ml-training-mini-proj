import { createHash } from 'crypto';

export const generateSignature = (message: string) => {
  return createHash('sha512').update(message).digest('hex');
};
