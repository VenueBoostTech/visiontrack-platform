"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { User, Calendar, Clock, QrCode, Search, Filter, Plus, UserCheck, History } from 'lucide-react';

interface Visitor {
    id: string;
    name: string;
    type: 'guest' | 'contractor' | 'delivery';
    status: 'scheduled' | 'checked-in' | 'checked-out';
    host: string;
    visitPurpose: string;
    checkIn?: Date;
    checkOut?: Date;
    scheduledTime: Date;
}

const SecurityVisitorsPage = () => {
    const [activeView, setActiveView] = useState<'current' | 'scheduled' | 'history'>('current');
    
    const visitors: Visitor[] = [
        {
            id: 'V001',
            name: 'John Smith',
            type: 'guest',
            status: 'checked-in',
            host: 'Mary Johnson',
            visitPurpose: 'Meeting',
            checkIn: new Date(),
            scheduledTime: new Date()
        },
        {
            id: 'V002',
            name: 'Mike Wilson',
            type: 'contractor',
            status: 'scheduled',
            host: 'David Brown',
            visitPurpose: 'Maintenance',
            scheduledTime: new Date(Date.now() + 3600000)
        },
        {
            id: 'V003',
            name: 'Sarah Davis',
            type: 'delivery',
            status: 'checked-out',
            host: 'James Wilson',
            visitPurpose: 'Package Delivery',
            checkIn: new Date(Date.now() - 7200000),
            checkOut: new Date(Date.now() - 3600000),
            scheduledTime: new Date(Date.now() - 7200000)
        }
    ];

    const getStatusBadgeColor = (status: string) => {
        switch (status) {
            case 'checked-in':
                return 'bg-green-100 text-green-800';
            case 'scheduled':
                return 'bg-blue-100 text-blue-800';
            case 'checked-out':
                return 'bg-gray-100 text-gray-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'guest':
                return 'bg-purple-100 text-purple-800';
            case 'contractor':
                return 'bg-orange-100 text-orange-800';
            case 'delivery':
                return 'bg-blue-100 text-blue-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="px-5">
            <Breadcrumb pageTitle="Visitor Management" />

            {/* Visitor Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                            <UserCheck className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Current Visitors</p>
                            <h3 className="text-xl font-bold">12</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                            <Calendar className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Scheduled Today</p>
                            <h3 className="text-xl font-bold">8</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Expected Soon</p>
                            <h3 className="text-xl font-bold">5</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 rounded-lg dark:bg-orange-900">
                            <History className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Total This Week</p>
                            <h3 className="text-xl font-bold">47</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            {/* ... your existing main content code ... */}

            {/* Complete the table */}
            <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Visitor</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Host</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Purpose</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Check In</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Check Out</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {visitors.map((visitor) => (
                        <tr key={visitor.id} className="hover:bg-gray-50 dark:hover:bg-gray-900 bg-white dark:bg-gray-800">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="font-medium text-gray-900 dark:text-white">{visitor.name}</div>
                                <div className="text-sm text-gray-500">{visitor.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(visitor.type)}`}>
                                    {visitor.type}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{visitor.host}</td>
                            <td className="px-6 py-4">{visitor.visitPurpose}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadgeColor(visitor.status)}`}>
                                    {visitor.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {visitor.checkIn ? new Date(visitor.checkIn).toLocaleTimeString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {visitor.checkOut ? new Date(visitor.checkOut).toLocaleTimeString() : '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                <button className="text-primary hover:text-primary-dark">
                                    {visitor.status === 'scheduled' ? 'Check In' : 
                                     visitor.status === 'checked-in' ? 'Check Out' : 'View'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SecurityVisitorsPage;