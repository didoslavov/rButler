const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');
const { isEmail } = require('validator/lib/isEmail.js');

const userSchema = new Schema({
    username: { type: String, minLength: 3 },
    email: { type: String, validate: [isEmail, 'Type valid email address!'] },
    hashedPassword: { type: String, required: true },
});

const User = model('User', userSchema);

module.exports = User;
