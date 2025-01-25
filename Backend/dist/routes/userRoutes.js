"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.default)();
exports.userRoutes = router;
// @desc authenticate the user
router.route('/auth').post(userController_1.authUser);
router.route('/adduser').post(authMiddleware_1.protect, authMiddleware_1.adminRole, userController_1.addUser);
