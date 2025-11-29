import mongoose, { Schema } from "mongoose";
import { ICategory } from "../types/schemaTypes";

const CategorySchema = new Schema<ICategory>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        description: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

const Category = mongoose.model<ICategory>("Category", CategorySchema);
export default Category;


