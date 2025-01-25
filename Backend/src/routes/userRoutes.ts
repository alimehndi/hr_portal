import  Express  from "express";
import { addUser, authUser } from "../controllers/userController";
import { adminRole, protect } from "../middleware/authMiddleware";
const router = Express();
// @desc authenticate the user
 

router.route('/auth').post(authUser);
router.route('/adduser').post(protect,adminRole,addUser);
export {router as userRoutes};