import bcrypt from 'bcrypt';
const saltRounds = process.env.SALT_ROUND ? parseInt(process.env.SALT_ROUND, 10) : 10;

const hashPassword = async (password :string) => {
    try {
         const salt = await bcrypt.genSalt(saltRounds );
         const hashedPassword =  await bcrypt.hash(password,salt);
         return hashedPassword;
    } catch (err) {
        console.error(err);
        throw new Error('Error: Error while hashing the Password' )
    }
}

// async function verifyPassword(inputPassword, storedHash) {
//     try {
//         const isMatch = await bcrypt.compare(inputPassword, storedHash);
//         return isMatch;
//     } catch (err) {
//         console.error('Error verifying password:', err);
//         throw err;
//     }
// }

export {hashPassword};