export default function StatusBadge({ status }) {
    const statusStyles = {
        pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
        processing: 'bg-blue-100 text-blue-800 border-blue-200',
        completed: 'bg-green-100 text-green-800 border-green-200',
        cancelled: 'bg-red-100 text-red-800 border-red-200',
        active: 'bg-green-100 text-green-800 border-green-200',
        inactive: 'bg-gray-100 text-gray-800 border-gray-200',
    };

    return (
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusStyles[status] || statusStyles.inactive}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    );
}
