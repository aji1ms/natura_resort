import {
    Hotel,
    Waves,
    Sparkles,
    Bed,
    Wifi,
    Coffee,
    UtensilsCrossed,
    Mountain,
    Fish,
    Bike,
    Wind,
    Dumbbell,
    Flower2,
    Heart,
    Droplets,
} from "lucide-react";
import { AccommodationImage, AdventureActivitieImage, Wellness_Spa_Image } from "./Constants";

export const services = [
    {
        id: 1,
        category: "accommodation",
        title: "Accommodation",
        bg: "bg-blue-100",
        icon_color: "bg-blue-500",
        icon: Hotel,
        mainColor: "blue",
        tagline: "Luxury Living Spaces",
        description: "Experience world-class comfort in our premium accommodations designed for your perfect stay.",
        fullDescription: "Our accommodation services offer a range of options from cozy rooms to luxurious suites, all designed with your comfort in mind. Each space features modern amenities, stunning views, and personalized service to make your stay unforgettable.",
        image: `${AccommodationImage}`,
        features: [
            {
                icon: Bed,
                title: "Premium Rooms",
                description: "Comfortable beds with luxury linens and pillows for the best sleep experience."
            },
            {
                icon: Wifi,
                title: "High-Speed WiFi",
                description: "Stay connected with complimentary high-speed internet throughout your stay."
            },
            {
                icon: Coffee,
                title: "Room Service",
                description: "24/7 room service with gourmet dining options delivered to your door."
            },
            {
                icon: UtensilsCrossed,
                title: "Complimentary Breakfast",
                description: "Start your day with a delicious breakfast buffet featuring local and international cuisine."
            }
        ],
        benefits: [
            "Spacious rooms with ocean or garden views",
            "Private balconies and terraces",
            "Modern bathroom amenities",
            "Smart TV with streaming services",
            "Mini bar and coffee maker",
            "Daily housekeeping service"
        ]
    },
    {
        id: 2,
        category: "adventure",
        title: "Adventure Activities",
        bg: "bg-green-100",
        icon_color: "bg-green-500",
        icon: Waves,
        mainColor: "green",
        tagline: "Thrill & Excitement",
        description: "Get your adrenaline pumping with our exciting range of adventure activities for all skill levels.",
        fullDescription: "From water sports to mountain adventures, we offer a comprehensive selection of activities designed to create unforgettable memories. Our certified instructors ensure your safety while maximizing the fun and excitement.",
        image: `${AdventureActivitieImage}`,
        features: [
            {
                icon: Mountain,
                title: "Mountain Trekking",
                description: "Explore scenic trails with experienced guides and witness breathtaking panoramic views."
            },
            {
                icon: Fish,
                title: "Scuba Diving",
                description: "Discover vibrant coral reefs and marine life in crystal-clear waters."
            },
            {
                icon: Bike,
                title: "Mountain Biking",
                description: "Ride through challenging terrains and forest trails on premium bikes."
            },
            {
                icon: Wind,
                title: "Water Sports",
                description: "Jet skiing, parasailing, kayaking, and more aquatic adventures await you."
            }
        ],
        benefits: [
            "Professional equipment provided",
            "Certified instructors and guides",
            "Safety briefings and gear included",
            "Photo and video packages available",
            "Small group sizes for personalized attention",
            "Suitable for beginners to experts"
        ]
    },
    {
        id: 3,
        category: "wellness",
        title: "Wellness & Spa",
        bg: "bg-purple-100",
        icon_color: "bg-purple-500",
        icon: Sparkles,
        mainColor: "purple",
        tagline: "Rejuvenate Your Soul",
        description: "Indulge in our holistic wellness programs and spa treatments for complete mind-body relaxation.",
        fullDescription: "Our award-winning spa offers a sanctuary of peace where you can escape the stresses of everyday life. Expert therapists use premium products and ancient techniques to restore your balance and vitality.",
        image: `${Wellness_Spa_Image}`,
        features: [
            {
                icon: Dumbbell,
                title: "Fitness Center",
                description: "State-of-the-art gym with modern equipment and personal training available."
            },
            {
                icon: Flower2,
                title: "Spa Treatments",
                description: "Luxury massages, facials, and body treatments using organic products."
            },
            {
                icon: Heart,
                title: "Yoga & Meditation",
                description: "Daily yoga sessions and guided meditation in serene beachfront settings."
            },
            {
                icon: Droplets,
                title: "Hydrotherapy",
                description: "Therapeutic pools, steam rooms, and sauna facilities for ultimate relaxation."
            }
        ],
        benefits: [
            "Experienced wellness therapists",
            "Organic and natural product selection",
            "Customized wellness programs",
            "Private treatment rooms available",
            "Couples spa packages",
            "Nutritional consultation included"
        ]
    }
];