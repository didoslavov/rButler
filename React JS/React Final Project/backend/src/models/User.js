const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new Schema({
    username: { type: String, minLength: 3 },
    email: { type: String, validate: [isEmail, 'Type valid email address!'] },
    password: { type: String, required: true },
    roles: [{ type: String, default: 'Resident' }],
    households: [
        {
            household: {
                type: ObjectId,
                ref: 'Household',
            },
            role: { type: String, default: 'Resident' },
        },
    ],
});

const User = model('User', userSchema);

module.exports = User;
