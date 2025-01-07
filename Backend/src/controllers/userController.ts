import asyncHandler from "../middleware/asyncHandler";
import User from "../model/userModel";
import Iuser from "../interface/Iuser";
import { Request, Response } from "express";

// @desc authenticate the user
// @route POST /api/v1/auth
// @access PUBLic

const authUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        
        const { username, password } = req.body;
        const user = await User.findOne({ username: username }) as Iuser | null;
        console.log(`User: `, user)
        if (user && (user.password == password)) {
            res.json({
                id: user.id,
                username: user.username
            })
        }
    } catch (error) {
        res.status(401);
        throw new Error('Invalid Username or password');
    }
})

export { authUser };