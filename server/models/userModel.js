const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: String,
});

/**
 * Executed before saving the user to the database.
 */
userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) {
        return next()
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    next();
});

/**
 * Compare the password of the user with the given password.
 */
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;