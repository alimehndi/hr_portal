import asyncHandler from "../middleware/asyncHandler";
import User from "../model/userModel";
import Iuser from "../interface/Iuser";
import { Request, Response } from "express";
import generateToken from "../utils/generateToken";
import generateUniqueId from "../utils/generateUniqueId";
import { hashPassword } from "../utils/hashAndVerifyPassword";

// @desc authenticate the user
// @route POST /api/v1/auth
// @access PUBLic

const authUser = asyncHandler(async (req: Request, res: Response) => {
    try {
        
        const { username, password } = req.body;
        const user = await User.findOne({ username: username }) as Iuser | null;
        if (user && (user.password == password)) {
            generateToken(res, user.id);
            res.json({
                id: user.id,
                username: user.username,
                role: user.role
            })
        }
    } catch (error) {
        res.status(401);
        throw new Error('Invalid Username or password');
    }
})

//@desc add a new employee
//route POST /api/v1/admin/add
//access admin

const addUser = asyncHandler(async (req: Request , res: Response) => {
    try {
        const {username , password, role } = req.body;
        const id = generateUniqueId();
        const hashedPassword = await hashPassword(password);
        // console.log(hashedPassword);
         const user : Iuser = await User.create({ id: id, username : username, password : hashedPassword , role: role});
        // console.log(user);
         res.status(200);
         res.send({"message":"successfully added user", "id": user.id });
    } catch (error) {
        res.status(400)
        console.log(error);
        throw new Error('Error inserting the user');
    }

})

export { authUser ,addUser};