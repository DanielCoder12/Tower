import { Schema } from "mongoose";

export const TowerEventSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true, maxLength: 50 },
        description: { type: String, required: true, maxLength: 1000 },
        coverImg: { type: String, required: true, maxLength: 500 },
        location: { type: String, required: true, maxLength: 50 },
        capacity: { type: Number, required: true, max: 1000000 },
        startDate: { type: Date, required: true, },
        isCanceled: { type: Boolean, required: true, default: false },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital', 'expo', 'exhibit'], required: true, default: '' }

    },
    {
        timestamps: true,
        toJSON: { virtuals: true }
    }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    foreignField: '_id',
    justOne: true,
    ref: 'Account'
})

TowerEventSchema.virtual('ticketCount', {
    localField: '_id',
    foreignField: 'eventId',
    ref: 'Ticket',
    count: true
})