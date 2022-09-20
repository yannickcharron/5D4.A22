import argon from 'argon2';
import Chance from 'chance';
import jwt from 'jsonwebtoken';
import HttpErrors from 'http-errors';

import Account from '../models/account.model.js';

const chance = new Chance();

class AccountRepository {
    async login(email, password) {
        const account = await Account.findOne({ email: email });
        if(!account) {
            return {err: HttpErrors.Unauthorized()};
        } else {
            const passwordValid = await argon.verify(account.passwordHash, password);
            if(passwordValid) {
                return { account }
            } else {
                return {err: HttpErrors.Unauthorized()};
            }
        }
    }

    validatePassword(password, account) {}

    async create(account) {
        try {
            account.fourDigits = chance.string({ length: 4, numeric: true });
            account.passwordHash = await argon.hash(account.password);
            delete account.password;
            return Account.create(account);
        } catch (err) {
            throw err;
        }
    }

    generateJWT(email) {
        const accessToken = jwt.sign({email}, process.env.JWT_TOKEN_SECRET, {expiresIn: process.env.JWT_TOKEN_LIFE, issuer: process.env.BASE_URL});

        return { accessToken };
    }

    async validateRefreshToken(email, refreshToken) {}

    logout(email) {}

    logoutRefresh(refreshToken) {}

    transform(account) {
        delete account.passwordHash;
        delete account._id;
        delete account.__v;
        return account;
    }
}

export default new AccountRepository();
