import jwt from "jsonwebtoken";
import { Response } from "express";
const generateToken = (res : Response, userId : string) => { 
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string,{
        expiresIn: '1d'
    })

    res.cookie('jwt', token ,{
        httpOnly : true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict', // Prevent CSRF attacks
        maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    })   
}
export default generateToken;
