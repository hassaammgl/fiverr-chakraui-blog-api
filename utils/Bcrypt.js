import bcrypt from 'bcrypt';

const saltRounds = 10;

export const bcryptPass = {
    hash: async (password) => {
        return await bcrypt.hash(password, saltRounds);
    },
    compareHash: async (password, dbPassword) => {
        return await bcrypt.compare(password, dbPassword);
    }
}