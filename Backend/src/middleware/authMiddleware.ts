import asyncHandler from "./asyncHandler";
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../model/userModel.js'
import {Request, Response, NextFunction } from "express";
import { error } from "console";

// User must be authenticated
interface authenticatedReuest extends Request{
    user?: any;
}
const protect = asyncHandler(async (req : authenticatedReuest, res : Response , next: NextFunction) => {

    let token ;
    token = req.cookies.jwt;

    if(token)
    {
        try {
             const decoded  =  jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
             req.user = await User.findById(decoded.id).select('-password');
            next();
            } catch (error) {
        console.error(error);
        res.status(401);
        throw new Error('Not Authorized : Token Failed')
        }
    }else {
        res.status(401);
        throw new Error('Not Authorized : No Token')
    }
});  

const adminRole =  asyncHandler(async (req : authenticatedReuest , res : Response , next : NextFunction) => {
    if(req.user  && req.user.role === 'Admin')
    {
        next();
    }
    else
    {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }

})
const hrRole =  asyncHandler(async (req : authenticatedReuest , res : Response , next : NextFunction) => {
    if(req.user  && req.user.role === 'HR')
    {
        next();
    }
    else
    {
        res.status(401);
        throw new Error('Not authorized as an HR');
    }

})
const employeeRole =  asyncHandler(async (req : authenticatedReuest , res : Response , next : NextFunction) => {
    if(req.user  && req.user.role === 'EMP')
    {
        next();
    }
    else
    {
        res.status(401);
        throw new Error('Not authorized as an EMP');
    }

})
export  {protect, hrRole,adminRole,employeeRole};