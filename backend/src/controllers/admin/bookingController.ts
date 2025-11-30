import { Request, Response } from 'express';
import Booking from '../../models/bookingSchema';
import Offering from '../../models/inventorySchema';

// Get all bookings 

export const getAllBookings = async (req: Request, res: Response) => {
    try {
        const { status, search } = req.query;

        const filter: any = {};

        if (status && status !== 'all') {
            filter.status = status;
        }

        let bookingsQuery = Booking.find(filter)
            .populate('userId', 'name email')
            .populate('offeringId', 'name category description amenities image price')
            .sort({ createdAt: -1 });

        if (search && typeof search === 'string') {
            const matchingOfferings = await Offering.find({
                name: { $regex: search, $options: 'i' }
            }).select('_id');

            const offeringIds = matchingOfferings.map(offering => offering._id);

            if (offeringIds.length > 0) {
                filter.offeringId = { $in: offeringIds };
            } else {
                filter.offeringId = { $in: [] };
            }

            bookingsQuery = Booking.find(filter)
                .populate('userId', 'name email')
                .populate('offeringId', 'name category description amenities image price')
                .sort({ createdAt: -1 });
        }

        const bookings = await bookingsQuery;

        res.status(200).json({
            success: true,
            data: bookings,
            count: bookings.length
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error!' });
    }
};

// Get booking by ID

export const getBookingById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const booking = await Booking.findById(id)
            .populate({
                path: 'offeringId',
                populate: {
                    path: 'category',
                    select: 'name'
                }
            })
            .populate('userId', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error!' });
    }
};

// Update booking status

export const updateBookingStatus = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status'
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            id,
            { status },
            { new: true, runValidators: true }
        )
            .populate('offeringId', 'name category description amenities image price')
            .populate('userId', 'name email');

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Booking status updated successfully',
            data: booking
        });
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking status!' });
    }
};