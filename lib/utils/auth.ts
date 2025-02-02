import bcrypt from 'bcryptjs';

/**
 * Hash the password using bcrypt
 * @param {string} password - The plain text password to be hashed
 * @returns {string} - The hashed password
 */
export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * Compare the given password with the stored hashed password
 * @param {string} password - The plain text password to compare
 * @param {string} hashedPassword - The stored hashed password
 * @returns {boolean} - Returns true if passwords match, false otherwise
 */
export const comparePassword = async (password: string, hashedPassword: string) => {
  return bcrypt.compare(password, hashedPassword);
};
