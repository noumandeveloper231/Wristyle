export default function StatCard({ title, value, icon: Icon, description, trend }) {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-gray-600 text-sm font-medium">{title}</h3>
                {Icon && <Icon className="w-5 h-5 text-amber-600" />}
            </div>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            {description && (
                <p className="text-xs text-gray-500">{description}</p>
            )}
            {trend && (
                <p className={`text-xs mt-1 ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                    {trend.isPositive ? '↑' : '↓'} {trend.value}
                </p>
            )}
        </div>
    );
}
