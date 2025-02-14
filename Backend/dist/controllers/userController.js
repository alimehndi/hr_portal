"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.authUser = void 0;
const asyncHandler_1 = __importDefault(require("../middleware/asyncHandler"));
const userModel_1 = __importDefault(require("../model/userModel"));
const generateToken_1 = __importDefault(require("../utils/generateToken"));
const generateUniqueId_1 = __importDefault(require("../utils/generateUniqueId"));
const hashAndVerifyPassword_1 = require("../utils/hashAndVerifyPassword");
// @desc authenticate the user
// @route POST /api/v1/auth
// @access PUBLic
const authUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ username: username });
        if (user && (user.password == password)) {
            (0, generateToken_1.default)(res, user.id);
            res.json({
                id: user.id,
                username: user.username,
                role: user.role
            });
        }
    }
    catch (error) {
        res.status(401);
        throw new Error('Invalid Username or password');
    }
}));
exports.authUser = authUser;
//@desc add a new employee
//route POST /api/v1/admin/add
//access admin
const addUser = (0, asyncHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password, role } = req.body;
        const id = (0, generateUniqueId_1.default)();
        const hashedPassword = yield (0, hashAndVerifyPassword_1.hashPassword)(password);
        // console.log(hashedPassword);
        const user = yield userModel_1.default.create({ id: id, username: username, password: hashedPassword, role: role });
        // console.log(user);
        res.status(200);
        res.send({ "message": "successfully added user", "id": user.id });
    }
    catch (error) {
        res.status(400);
        console.log(error);
        throw new Error('Error inserting the user');
    }
}));
exports.addUser = addUser;
