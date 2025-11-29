import mongoose, { Schema } from "mongoose";
import { IBooking } from "../types/schemaTypes";

const BookingSchema = new Schema<IBooking>(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false,
        },
        offeringId: {
            type: Schema.Types.ObjectId,
            ref: "Offering",
            required: true, 
        },
        name: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        guests: {
            type: Number,
            required: true,
            min: 1
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        specialRequest: {
            type: String,
            default: ""
        },
        status: {
            type: String,
            enum: ['pending', 'confirmed', 'cancelled'],
            default: 'pending'
        },
    },
    { timestamps: true }
);

const Booking = mongoose.model<IBooking>("Booking", BookingSchema);
export default Booking;
