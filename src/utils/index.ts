import jwt_decode from "jwt-decode";

export const isTokenExpired = (token: string) => {
    const currentTime = Math.floor(Date.now() / 1000);
    const access: any = jwt_decode(token);
    if(access.exp < currentTime) return true;
    return false;
};