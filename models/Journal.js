import mongoose from 'mongoose';

/* JournalSchema will correspond to a collection in your MongoDB database. */
const JournalSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this journal entry'],
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this journal entry'],
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'angry', 'neutral', 'excited', 'anxious', 'tired', 'calm'],
    default: 'neutral',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPrivate: {
    type: Boolean,
    default: true,
  },
  userId: {
    type: String,
    // This will be linked to Clerk auth later
    default: 'temp-user-id',
  },
}, {
  timestamps: true,
});

export default mongoose.models.Journal || mongoose.model('Journal', JournalSchema);