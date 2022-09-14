import mongoose from 'mongoose';

const schema = mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        displayName: { type: String, required: true },
        fourDigits: { type: String, require: true }
    },
    {
        collection: 'accounts',
        strict: 'throw'
    }
);

export default mongoose.model('Account', schema);
