import  Express  from "express";
import { authUser } from "../controllers/userController";
const router = Express();
// @desc authenticate the user
 

router.post('/auth',authUser);
export {router as userRoutes};