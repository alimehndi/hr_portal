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
exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const saltRounds = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND, 10) : 10;
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const salt = yield bcrypt_1.default.genSalt(saltRounds);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        return hashedPassword;
    }
    catch (err) {
        console.error(err);
        throw new Error('Error: Error while hashing the Password');
    }
});
exports.hashPassword = hashPassword;
