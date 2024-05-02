"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignInUserEntity = void 0;
function userEntity(name, email, password) {
    return {
        name: () => name,
        getEmail: () => email,
        getPassword: () => password,
    };
}
exports.default = userEntity;
function googleSignInUserEntity(name, email, picture, email_verified) {
    return {
        name: () => name,
        email: () => email,
        picture: () => picture,
        email_verified: () => email_verified,
    };
}
exports.googleSignInUserEntity = googleSignInUserEntity;
