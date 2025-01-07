"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
;
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        enum: ['ADMIN', 'EMP', 'HR'],
        default: 'EMP'
    }
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
