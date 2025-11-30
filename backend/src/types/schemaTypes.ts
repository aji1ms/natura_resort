import { Document, Types } from "mongoose";

// User Type

export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

// Category Type

export interface ICategory extends Document {
    name: string;
    description?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

// Offering Type

export interface IOffering extends Document {
    name: string;
    category: Types.ObjectId;
    description: string;
    amenities: string[];
    image: string;
    price: number;
    createdAt?: Date;
    updatedAt?: Date;
}

// Booking Type

export interface IBooking extends Document {
    userId?: Types.ObjectId;
    offeringId: Types.ObjectId;
    name: string;
    phone: string;
    email: string;
    guests: number;
    checkIn: Date;
    checkOut: Date;
    specialRequest?: string;
    status: 'pending' | 'confirmed' | 'cancelled';
    createdAt?: Date;
    updatedAt?: Date;
}
