import { useNavigate } from "react-router";
import { HeroImage } from "../../utils/Constants";

interface HeroSectionProps {
    title?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ title }) => {
    const navigate = useNavigate();
    return (
        <section className="relative h-screen flex items-center justify-center">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: `url(${HeroImage})`,
                }}
            >
            </div>

            <div className="relative z-10 text-center text-white px-4">
                <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-fade-in">
                    {!title ? "Natura Resort" : title}
                </h1>
                {!title && (
                    <>
                        <p className="text-xl md:text-2xl mb-8 text-gray-200">
                            Where Luxury Meets Nature
                        </p>
                        <button
                            onClick={() => navigate("/availability")}
                            className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-8 py-4 rounded-full text-lg transition transform hover:scale-105 shadow-lg cursor-pointer"
                        >
                            Book Now
                        </button>
                    </>
                )}
            </div>
        </section >
    )
}

export default HeroSection
