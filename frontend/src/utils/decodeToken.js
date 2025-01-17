import jwtDecode from "jwt-decode";

/**
 * Decode a JWT token and return the decoded data.
 * @param {string} token - JWT token to decode.
 * @returns {object|null} - Decoded token data or null if invalid.
 */
export const decodeToken = (token) => {
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
