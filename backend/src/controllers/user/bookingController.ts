import { Request, Response } from "express";
import Booking from "../../models/bookingSchema";
import Offering from "../../models/inventorySchema";

// Create Booking

export const createBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            offeringId,
            name,
            phone,
            email,
            guests,
            checkIn,
            checkOut,
            specialRequest = "",
        } = req.body;

        const userId = req.user?._id;

        if (!offeringId || !name || !phone || !email || !guests || !checkIn || !checkOut) {
            res.status(400).json({
                message: "Offering, name, phone, email, guests, check-in, and check-out are required!"
            });
            return;
        }

        const checkInDate = new Date(checkIn);
        const checkOutDate = new Date(checkOut);
        const today = new Date();

        if (checkInDate < today) {
            res.status(400).json({ message: "Check-in date cannot be in the past!" });
            return;
        }

        if (checkOutDate <= checkInDate) {
            res.status(400).json({ message: "Check-out date must be after check-in date!" });
            return;
        }

        const offering = await Offering.findById(offeringId);
        if (!offering) {
            res.status(404).json({ message: "Offering not found!" });
            return;
        }

        const existingBooking = await Booking.findOne({
            offeringId,
            checkIn: { $lt: checkOutDate },
            checkOut: { $gt: checkInDate },
            status: { $in: ['pending', 'confirmed'] }
        });

        if (existingBooking) {
            res.status(409).json({
                message: "This offering is already booked for the selected dates!"
            });
            return;
        }

        const newBooking = await Booking.create({
            userId,
            offeringId,
            name,
            phone,
            email,
            guests,
            checkIn: checkInDate,
            checkOut: checkOutDate,
            specialRequest,
            status: 'pending'
        });

        await newBooking.populate([
            { path: 'offeringId', select: 'name category description price image amenities' },
            { path: 'userId', select: 'name email phone' }
        ]);

        res.status(201).json({
            message: "Booking created successfully!",
            data: newBooking
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Get All bookings

export const getUserBookings = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized user!" });
            return;
        }

        const { status } = req.query;

        const filter: any = { userId };

        if (status && ['pending', 'confirmed', 'cancelled'].includes(status as string)) {
            filter.status = status;
        }

        const bookings = await Booking.find(filter)
            .sort({ createdAt: -1 })
            .populate({
                path: "offeringId",
                select: 'name category description price image amenities'
            })
            .populate({
                path: "userId",
                select: "name email phone"
            })
            .lean();

        res.status(200).json({
            message: "Bookings retrieved successfully",
            count: bookings.length,
            data: bookings
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


// View booking details

export const getBookingDetails = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { bookingId } = req.params;

        if (!userId) {
            res.status(401).json({ message: "User not authenticated!" });
            return;
        }

        const booking = await Booking.findOne({
            _id: bookingId,
            userId
        }).populate([
            {
                path: 'offeringId',
                select: 'name category description price image amenities',
                populate: {
                    path: 'category',
                    select: 'name description'
                }
            }
        ]);

        if (!booking) {
            res.status(404).json({
                message: "Booking not found!"
            });
            return;
        }

        res.status(200).json({
            message: "Booking details retrieved successfully!",
            data: booking
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}

// Cancel Booking

export const cancelBooking = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.user?._id;
        const { bookingId } = req.params;

        if (!userId) {
            res.status(401).json({ message: "User not authenticated!" });
            return;
        }

        const booking = await Booking.findOne({
            _id: bookingId,
            userId
        });

        if (!booking) {
            res.status(404).json({ message: "Booking not found!" });
            return;
        }

        if (booking.status === 'cancelled') {
            res.status(400).json({ message: "Booking is already cancelled!" });
            return;
        }

        const checkInDate = new Date(booking.checkIn);
        const now = new Date();
        const hoursDifference = (checkInDate.getTime() - now.getTime()) / (1000 * 3600);

        if (hoursDifference < 24) {
            res.status(400).json({
                message: "Bookings can only be cancelled at least 24 hours before check-in!"
            });
            return;
        }

        booking.status = 'cancelled';
        await booking.save();

        await booking.populate([
            {
                path: 'offeringId',
                select: 'name category description price image amenities',
                populate: {
                    path: 'category',
                    select: 'name description'
                }
            }
        ]);

        res.status(200).json({
            message: "Booking cancelled successfully!",
            data: booking
        });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
}