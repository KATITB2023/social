import { compare, hash } from "bcrypt";
import crypto from "crypto";

const SALT_ROUNDS = 10;

export const generateHash = async (password: string): Promise<string> => {
  return await hash(password, SALT_ROUNDS);
};

export const compareHash = async (
  plain: string,
  hashed: string
): Promise<boolean> => {
  return await compare(plain, hashed);
};

export const generateResetToken = async () => {
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await generateHash(resetToken);

  return { resetToken, hashedToken };
};
