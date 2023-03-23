const { Schema, model } = require('mongoose');
const moment = require('moment')

//Schema to create reaction to later inbed into thoughtschema. Reaction is children to thought parent 
const reactionSchema = new Schema (
  {
    //  reactionId: {
    //   type: Schema.Types.ObjectId,
    //   default: () => new Types.ObjectId(),
    //  },
     reactionBody: {
      type: String,
      required: true,
      max_length: 280
     },
     username: {
      type: String,
      required: true,
     },
     createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
     },
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false,
  }
)

// Schema to create thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      min_length:1,
      max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: createdAtVal => moment(createdAtVal).format("MMM DD, YYYY [at] hh:mm a"),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
