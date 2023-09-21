const {
    Schema,
    model,
    Types: { ObjectId },
} = require('mongoose');

const householdSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },
    name: { type: String, minLength: 3 },
    presentation: { type: String, required: true },
});
