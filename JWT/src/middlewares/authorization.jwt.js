import { expressjwt } from 'express-jwt';

const guardAuthorizationJWT = expressjwt({
    secret:process.env.JWT_TOKEN_SECRET,
    issuer:process.env.BASE_URL,
    algorithms: ['HS256']

});

export { guardAuthorizationJWT }