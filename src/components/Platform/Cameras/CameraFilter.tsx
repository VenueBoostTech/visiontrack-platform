import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

// Type for FilterState
interface FilterState {
    type?: string | '';
    status?: string | '';
    zone?: string | '';
    building?: string | '';
    name?: string | '';
}
interface CameraFilterProps {
    onClose: () => void;
    onFilter: (filters: FilterState) => void | null;
    isFiltering: boolean;
    initialFilter: any;
}

const CameraFilter: React.FC<CameraFilterProps> = ({
    onClose,
    onFilter,
    isFiltering,
    initialFilter
}: CameraFilterProps) => {
    const [filters, setFilters] = useState<FilterState>(initialFilter);
    const [zones, setZones] = useState<any[]>([]);
    const [buildings, setBuildings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const zones = await fetch('/api/user/zones');
                if (!zones.ok) throw new Error('Failed to fetch zones');
                const zonesData = await zones.json();
                setZones(zonesData);

                const buildings = await fetch('/api/user/buildings');
                if (!buildings.ok) throw new Error('Failed to fetch buildings');
                const buildingsData = await buildings.json();
                setBuildings(buildingsData);

            } catch (error) {
                console.error('Error fetching data:', error);
                toast.error('Failed to load form data');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onFilter(filters);
        onClose();
    };

    if (loading) {
        return <div className="flex justify-center items-center h-32">Loading...</div>;
    }

    return (
        <div className="max-h-[90vh] flex flex-col">
            <form onSubmit={handleSubmit} className="flex flex-col h-full px-4 overflow-y-auto">
                {/* Camera Type */}
                <label htmlFor="type" className="block text-sm font-medium mb-1">Camera Type</label>
                <select
                    id="type"
                    value={filters?.type || ''}
                    onChange={(e) => {
                        const newFilter = { ...filters }
                        e.target.value ? newFilter.type = e.target.value : delete newFilter.type
                        setFilters(newFilter)
                    }}
                    className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                >
                    <option value="">Select Camera Type</option>
                    <option value="INDOOR">Indoor</option>
                    <option value="OUTDOOR">Outdoor</option>
                    <option value="THERMAL">Thermal</option>
                </select>

                {/* Status */}
                <label htmlFor="status" className="block text-sm font-medium mb-1 mt-4">Status</label>
                <select
                    id="status"
                    value={filters?.status || ''}
                    onChange={(e) => {
                        const newFilter = { ...filters }
                        e.target.value ? newFilter.status = e.target.value : delete newFilter.status
                        setFilters(newFilter)
                    }}
                    className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                >
                    <option value="">Select Status</option>
                    <option value="INACTIVE">Inactive</option>
                    <option value="ACTIVE">Active</option>
                    <option value="MAINTENANCE">Maintenance</option>
                </select>

                {/* Zone */}
                <label htmlFor="zone" className="block text-sm font-medium mb-1 mt-4">Zone</label>
                <select
                    id="zone"
                    value={filters?.zone || ''}
                    onChange={(e) => {
                        const newFilter = { ...filters }
                        e.target.value ? newFilter.zone = e.target.value : delete newFilter.zone
                        setFilters(newFilter)
                    }}
                    className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                >
                    <option value="">Select Zone</option>
                    {zones.map((zone) => (
                        <option key={zone.vtId} value={zone.vtId}>
                            {zone.name}
                        </option>
                    ))}
                </select>

                {/* Building */}
                <label htmlFor="building" className="block text-sm font-medium mb-1 mt-4">Building</label>
                <select
                    id="building"
                    value={filters?.building || ''}
                    onChange={(e) => {
                        const newFilter = { ...filters }
                        e.target.value ? newFilter.building = e.target.value : delete newFilter.building
                        setFilters(newFilter)
                    }}
                    className="w-full px-3 py-1.5 rounded-md border dark:bg-gray-800 dark:border-gray-700"
                >
                    <option value="">Select Building</option>
                    {buildings.map((building) => (
                        <option key={building.id} value={building.vtId}>
                            {building.name}
                        </option>
                    ))}
                </select>

                {/* Buttons */}
                <div className="flex justify-between gap-3 mt-4 pt-3 border-t dark:border-gray-700">
                    <button
                        onClick={() => {
                            Object.keys(filters).length > 0 && onFilter({});
                            onClose();
                        }}
                        type="button"
                        className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                        Clear Filters
                    </button>
                    <div className="ml-auto flex gap-3">
                        <button
                            onClick={onClose}
                            type="button"
                            className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-3 py-1.5 text-sm bg-primary text-white rounded-md hover:bg-primary/90 disabled:opacity-50"
                            disabled={isFiltering}
                        >
                            {isFiltering ? 'Filtering...' : 'Apply Filters'}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CameraFilter;
