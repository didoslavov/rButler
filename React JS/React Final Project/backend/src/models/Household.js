const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const householdSchema = new Schema({
    master: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    name: { type: String, minLength: 3 },
    presentation: { type: String, required: true },
    users: [
        {
            user: {
                type: ObjectId,
                ref: 'User',
            },
            role: { type: String, default: 'Resident' },
        },
    ],
});

const Household = model('Household', householdSchema);

module.exports = Household;
