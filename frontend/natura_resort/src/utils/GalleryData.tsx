export type GalleryCategory = "all" | "rooms" | "beach" | "activities" | "dining" | "spa" | "events";

export type GalleryImage = {
    id: number;
    src: string;
    title: string;
    category: Exclude<GalleryCategory, "all">;
    description: string;
};

export const galleryImg: GalleryImage[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        title: "Ocean View Suite",
        category: "rooms",
        description: "Luxurious suite with panoramic ocean views and private balcony"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        title: "Deluxe Pool Villa",
        category: "rooms",
        description: "Private villa with infinity pool overlooking the garden"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        title: "Beachfront Bungalow",
        category: "rooms",
        description: "Cozy bungalow with direct beach access"
    },
]

export const galleryImages: GalleryImage[] = [
    {
        id: 1,
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80",
        title: "Ocean View Suite",
        category: "rooms",
        description: "Luxurious suite with panoramic ocean views and private balcony"
    },
    {
        id: 2,
        src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
        title: "Deluxe Pool Villa",
        category: "rooms",
        description: "Private villa with infinity pool overlooking the garden"
    },
    {
        id: 3,
        src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
        title: "Beachfront Bungalow",
        category: "rooms",
        description: "Cozy bungalow with direct beach access"
    },
    {
        id: 4,
        src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&q=80",
        title: "Presidential Suite",
        category: "rooms",
        description: "Our most luxurious accommodation with butler service"
    },
    {
        id: 5,
        src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
        title: "Paradise Beach",
        category: "beach",
        description: "Our pristine white sand beach with crystal clear waters"
    },
    {
        id: 6,
        src: "https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=800&q=80",
        title: "Sunset View",
        category: "beach",
        description: "Breathtaking sunset views from the beach"
    },
    {
        id: 7,
        src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
        title: "Mountain Backdrop",
        category: "beach",
        description: "Stunning mountain views surrounding the resort"
    },
    {
        id: 8,
        src: "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=800&q=80",
        title: "Tropical Gardens",
        category: "beach",
        description: "Lush tropical gardens throughout the property"
    },
    {
        id: 9,
        src: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80",
        title: "Scuba Diving",
        category: "activities",
        description: "Explore vibrant coral reefs and marine life"
    },
    {
        id: 10,
        src: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80",
        title: "Mountain Hiking",
        category: "activities",
        description: "Guided hiking tours through scenic trails"
    },
    {
        id: 11,
        src: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80",
        title: "Kayaking",
        category: "activities",
        description: "Peaceful kayaking through mangrove forests"
    },
    {
        id: 12,
        src: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
        title: "Surfing Lessons",
        category: "activities",
        description: "Professional surfing lessons for all levels"
    },
    {
        id: 13,
        src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        title: "Beachfront Restaurant",
        category: "dining",
        description: "Fine dining with ocean views"
    },
    {
        id: 14,
        src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
        title: "Main Dining Hall",
        category: "dining",
        description: "International buffet with local specialties"
    },
    {
        id: 15,
        src: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&q=80",
        title: "Sunset Bar",
        category: "dining",
        description: "Cocktails and refreshments by the pool"
    },
    {
        id: 16,
        src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&q=80",
        title: "Private Dining",
        category: "dining",
        description: "Romantic beachside dining experience"
    },
    {
        id: 17,
        src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&q=80",
        title: "Spa Treatment Room",
        category: "spa",
        description: "Tranquil spa rooms for ultimate relaxation"
    },
    {
        id: 18,
        src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80",
        title: "Couples Massage",
        category: "spa",
        description: "Luxury couples spa experience"
    },
    {
        id: 19,
        src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
        title: "Yoga Pavilion",
        category: "spa",
        description: "Beachfront yoga and meditation sessions"
    },
    {
        id: 20,
        src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
        title: "Wellness Center",
        category: "spa",
        description: "State-of-the-art fitness and wellness facilities"
    },
    {
        id: 21,
        src: "https://images.unsplash.com/photo-1519307212971-dd9561667ffb?auto=format&w=1600&q=80",
        title: "Beach Wedding",
        category: "events",
        description: "Picture-perfect beach wedding ceremonies"
    },
    {
        id: 22,
        src: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80",
        title: "Conference Hall",
        category: "events",
        description: "Modern facilities for business meetings"
    },
    {
        id: 23,
        src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80",
        title: "Poolside Events",
        category: "events",
        description: "Elegant poolside gatherings and parties"
    },
    {
        id: 24,
        src: "https://images.unsplash.com/photo-1478145046317-39f10e56b5e9?w=800&q=80",
        title: "Banquet Hall",
        category: "events",
        description: "Grand hall for celebrations and receptions"
    }
];