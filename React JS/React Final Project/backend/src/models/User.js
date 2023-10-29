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
    avatar: {
        type: String,
        default: 'https://www.pngitem.com/pimgs/m/287-2876223_no-profile-picture-available-hd-png-download.png',
    },
    roles: [{ type: String, default: 'Resident' }],
    households: [
        {
            household: {
                type: ObjectId,
                ref: 'Household',
                required: true,
            },
            role: { type: String, default: 'Resident' },
        },
    ],
    createdLists: [
        {
            type: ObjectId,
            ref: 'List',
        },
    ],
});

const User = model('User', userSchema);

module.exports = User;
