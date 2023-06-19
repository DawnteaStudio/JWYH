import { Schema, model } from 'mongoose';

const LetterSchema = new Schema({
  index: {
    type: Number,
    required: true,
  },
  opened: {
    type: Boolean,
    default: false,
  },
  unlockYear: {
    type: Number,
    required: true,
  },
  unlockMonth: {
    type: Number,
    required: true,
  },
  unlockDate: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  style: {
    type: String,
    required: true,
  },
  sender: {
    type: String,
    required: true,
  },
  userInfo: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export default model('Letter', LetterSchema);
