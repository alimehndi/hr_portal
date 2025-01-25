"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateUniqueId() {
    const date = new Date();
    const components = [
        date.getFullYear(),
        (date.getMonth() + 1).toString().padStart(2, '0'),
        date.getDate().toString().padStart(2, '0'),
        date.getHours().toString().padStart(2, '0'),
        date.getMinutes().toString().padStart(2, '0'),
        date.getSeconds().toString().padStart(2, '0'),
        date.getMilliseconds().toString().padStart(3, '0'),
    ];
    // Combine date components and append a random number for extra uniqueness
    const uniqueId = components.join('') + '-' + Math.random().toString(36).substr(2, 8);
    return uniqueId;
}
exports.default = generateUniqueId;
