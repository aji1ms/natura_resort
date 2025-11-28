import { Facebook, Instagram, Mail, Phone, Twitter } from "lucide-react"

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4">Natura Resort</h3>
                        <p className="text-gray-400">Your perfect escape to nature and luxury.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-3">
                                <Mail size={18} className="text-amber-500" />
                                <span className="text-gray-400">info@naturaresort.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone size={18} className="text-amber-500" />
                                <span className="text-gray-400">+1 (555) 123-4567</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition">
                                <Facebook size={20} />
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-amber-500 transition">
                                <Twitter size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                    <p>&copy; 2024 Natura Resort. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer
