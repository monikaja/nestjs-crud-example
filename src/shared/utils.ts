const base64 = require('base64url');

export const NOT_ALLOWED_USER_MESSAGE= 'Action not allowed for this user';
export const JWT_HEADER_PARAM= 'x-jwt-assertion';

const base64StringToJson = (encodedInfo) => {
    try{
        return JSON.parse(base64.decode(encodedInfo));
    }catch (e) {
        return null;
    }
};

/*
    // Example JWT
    HEADER
    {
      "typ": "JWT",
      "alg": "RS256",
      "x5t": "NTAxZmMxNDMyZDg3MTU1ZGM0MzEzODJhZWI4NDNlZDU1OGFkNjFiMQ"
    }
    PAYLOAD
    {
      "uid": "test.test",
      "roles": []
    }
*/

const getTokenInfo = (encodedJWT) => {
    try{
        const splittedUncodedJWT = encodedJWT.split('.');

        return {
            'header' : base64StringToJson(splittedUncodedJWT[0]),
            'payload' : base64StringToJson(splittedUncodedJWT[1])
        }
    }catch (e) {
        return null;
    }
};

export const verifyJWT = (encodedJWT) => {
    try{
        const jwt = getTokenInfo(encodedJWT);
        return !!(jwt.header['typ'] === 'JWT' && jwt.payload['uid']);

    }catch (e) {
        return false;
    }
};

export const getJWTUser = (encodedJWT) => {
    try{
        return getTokenInfo(encodedJWT).payload['uid'];

    }catch (e) {
        return null;
    }
};

export const userCanDoAction = (token, username) => {
    try{
        return (getJWTUser(token).toLowerCase() === username.toLowerCase());

    }catch (e) {
        return false;
    }
};
