import mongoose, {Schema , Document , model}from "mongoose";

interface IUser extends Document {

    id : string,
    username : string,
    password: string,
    role : 'Admin' | 'EMP' | 'HR'
};

const userSchema   = new Schema<IUser>({
    id: {
        type : String,
        require: true
    },
    username : {
        type: String,
        require: true
    },
    password : {
        type: String,
        require: true
    },
    role : {
        type : String,
        enum : ['ADMIN', 'EMP', 'HR'],
        default: 'EMP'
    }
});
const User =  model<IUser>('User',userSchema);
export default User;