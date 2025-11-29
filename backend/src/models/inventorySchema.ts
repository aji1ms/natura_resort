import mongoose, { Schema } from "mongoose";
import { IOffering } from "../types/schemaTypes";

const OfferingSchema = new Schema<IOffering>(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        description: {
            type: String,
            default: "",
            required: true
        },
        amenities: {
            type: [String],
            default: []
        },
        image: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            min: 0,
            required: true
        },
    },
    { timestamps: true }
);

const Offering = mongoose.model<IOffering>("Offering", OfferingSchema);
export default Offering;
