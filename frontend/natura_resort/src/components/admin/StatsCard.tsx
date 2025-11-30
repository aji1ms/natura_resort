interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

const StatsCard: React.FC<StatCardProps> = ({ title, value, icon }) => {
    return (
        <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-gray-600 text-sm mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className="bg-blue-100 p-4 rounded-full">
                    {icon}
                </div>
            </div>
        </div>
    )
}

export default StatsCard
