import { Schema } from "mongoose";

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true },
        eventId: { type: Schema.Types.ObjectId, required: true },
        body: { type: String, required: true, maxLength: 500 },
        isAttending: { type: Boolean, default: false }
    },
    {
        timestamps: true, toJSON: { virtuals: true }
    }
)

CommentSchema.virtual('creator',
    {
        localField: 'creatorId',
        foreignField: '_id',
        justOne: true,
        ref: 'Account'
    })