import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [8, 'Password must be greater than 7 characters'],
        maxlength: [12, 'Password must be less than 12 characters'],
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required'],
        lowercase: true,
        validate: {
            validator: validator.isEmail,
            message: 'Please enter a valid email',
        },
    }
});


userSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) return next();

        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);

        console.log("Password is hashed successfully");
        next();
    } catch (error) {
        console.log("Error while password hashing");
        next(error);
    }
});

// Compare password
userSchema.methods.isPasswordMatch = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
