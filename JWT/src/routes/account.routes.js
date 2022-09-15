import express from 'express';
import httpErrors from 'http-errors';

import accountRepository from '../repositories/account.repository.js';
import accountsValidator from '../validators/accounts.validator.js';

const router = express.Router();

class AccountRoutes {
    constructor() {
        router.post('/', this.post);
        router.post('/login', this.login);
        router.post('/refresh', this.refreshToken);
        router.get('/secure', this.secure);
        router.delete('/logout', this.logout);
    }

    async post(req, res, next) {
       try {
        let account = await accountRepository.create(req.body);
        account = account.toObject({getter:false, virtuals:false});
        account = accountRepository.transform(account);
        res.status(201).json(account);
       } catch(err) {
        return next(err);
       }
    }

    async secure(req, res, next) {
       
    }

    async login(req, res, next) {
       const { email, password } = req.body;

       const result = await account.login(email, password);
       if(result.account) {
        let account = result.account.toObject({getters: false, virtuals:false});
        account = accountRepository.transform(account);
        //TODO: Token
        let tokens = {};
        res.status(201).json({account, tokens});
       } else {

       }
    }

    async refreshToken(req, res, next) {
        
    }

    async logout(req, res, next) {
     
    }
}

new AccountRoutes();
export default router;