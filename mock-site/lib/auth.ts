import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'default_secret';

export function signToken(payload: object) {
    return jwt.sign(payload, SECRET, { expiresIn: '1h' });
}

export function verifyToken(token: string) {
    try {
        return jwt.verify(token, SECRET);
    } catch (error) {
        return null; // Invalid token
    }
}
