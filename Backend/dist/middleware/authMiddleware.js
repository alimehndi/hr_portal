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
exports.employeeRole = exports.adminRole = exports.hrRole = exports.protect = void 0;
const asyncHandler_1 = __importDefault(require("./asyncHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_js_1 = __importDefault(require("../model/userModel.js"));
const protect = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            req.user = yield userModel_js_1.default.findById(decoded.id).select('-password');
            next();
        }
        catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Not Authorized : Token Failed');
        }
    }
    else {
        res.status(401);
        throw new Error('Not Authorized : No Token');
    }
}));
exports.protect = protect;
const adminRole = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role === 'Admin') {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
}));
exports.adminRole = adminRole;
const hrRole = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role === 'HR') {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an HR');
    }
}));
exports.hrRole = hrRole;
const employeeRole = (0, asyncHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.user && req.user.role === 'EMP') {
        next();
    }
    else {
        res.status(401);
        throw new Error('Not authorized as an EMP');
    }
}));
exports.employeeRole = employeeRole;
