"use client";

import React, { useState } from "react";
import { Users, Key, Clock, Plus, Search, Filter } from 'lucide-react';
import Modal from "@/components/Common/Modal";

interface AccessCard {
    id: string;
    userId: string;
    userName: string;
    type: 'employee' | 'contractor' | 'visitor';
    status: 'active' | 'inactive' | 'suspended';
    accessLevel: string;
    lastAccess?: Date;
    validUntil?: Date;
}

export default function Access() {
    const [activeTab, setActiveTab] = useState('cards');
    const [searchTerm, setSearchTerm] = useState('');
    const [showAddCardModal, setShowAddCardModal] = useState(false);

    const accessCards: AccessCard[] = [
        {
            id: '1',
            userId: 'EMP001',
            userName: 'John Doe',
            type: 'employee',
            status: 'active',
            accessLevel: 'Full Access',
            lastAccess: new Date(),
            validUntil: new Date('2024-12-31')
        },
        // Add more sample access cards
    ];

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };

    const [accessGroups] = useState([
        { id: '1', name: 'Administrators', members: 12, permissions: ['Full Access', 'Admin Panel'] },
        { id: '2', name: 'Security Staff', members: 8, permissions: ['Security Areas', 'Monitoring'] },
        { id: '3', name: 'Maintenance', members: 15, permissions: ['Service Areas', 'Storage'] },
    ]);
      
    const [accessZones] = useState([
        { id: '1', name: 'Main Entrance', type: 'Public', devices: 4, activeUsers: 25 },
        { id: '2', name: 'Server Room', type: 'Restricted', devices: 2, activeUsers: 3 },
        { id: '3', name: 'Parking Level 1', type: 'General', devices: 6, activeUsers: 45 },
    ]);

    return (
        <div>
            {/* Access Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                            <Key className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Active Cards</p>
                            <h3 className="text-xl font-bold">127</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                            <Users className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Users</p>
                            <h3 className="text-xl font-bold">89</h3>
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg shadow-sm p-4 dark:bg-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900">
                            <Clock className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Access Today</p>
                            <h3 className="text-xl font-bold">432</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
                <div className="p-6 border-b dark:border-gray-700">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTab('cards')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    activeTab === 'cards'
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'
                                }`}
                            >
                                Access Cards
                            </button>
                            <button
                                onClick={() => setActiveTab('groups')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    activeTab === 'groups'
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'
                                }`}
                            >
                                Access Groups
                            </button>
                            <button
                                onClick={() => setActiveTab('zones')}
                                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                    activeTab === 'zones'
                                        ? 'bg-primary text-white'
                                        : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'
                                }`}
                            >
                                Access Zones
                            </button>
                        </div>
                        <button 
                            onClick={() => setShowAddCardModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                        >
                            <Plus className="w-4 h-4" />
                            New Access Card
                        </button>
                    </div>
                </div>

                {/* Search and Filter */}
                <div className="p-4 border-b dark:border-gray-700">
                    <div className="flex gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input 
                                type="text"
                                placeholder="Search by name or ID..."
                                className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg dark:border-gray-600">
                            <Filter className="w-4 h-4" />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Access Cards Table */}
                {activeTab === 'cards' && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">ID</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Access Level</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Last Access</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Valid Until</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {accessCards.map((card) => (
                                    <tr key={card.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 font-medium">{card.userId}</td>
                                        <td className="px-6 py-4">{card.userName}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {card.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{card.accessLevel}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                card.status === 'active' 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {card.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {card.lastAccess ? formatDate(card.lastAccess) : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500">
                                            {card.validUntil ? formatDate(card.validUntil) : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                Edit
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'groups' && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Group Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Members</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Permissions</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {accessGroups.map((group) => (
                                    <tr key={group.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 font-medium">{group.name}</td>
                                        <td className="px-6 py-4">{group.members}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-1 flex-wrap">
                                                {group.permissions.map((perm, idx) => (
                                                    <span key={idx} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                        {perm}
                                                    </span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'zones' && (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-900">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Zone Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Devices</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Active Users</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {accessZones.map((zone) => (
                                    <tr key={zone.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                        <td className="px-6 py-4 font-medium">{zone.name}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${
                                                zone.type === 'Restricted' 
                                                    ? 'bg-red-100 text-red-800' 
                                                    : zone.type === 'Public'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-blue-100 text-blue-800'
                                            }`}>
                                                {zone.type}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">{zone.devices}</td>
                                        <td className="px-6 py-4">{zone.activeUsers}</td>
                                        <td className="px-6 py-4">
                                            <button className="text-blue-600 hover:text-blue-800">Edit</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Add Card Modal */}
            <Modal
            isOpen={showAddCardModal}
            onClose={() => setShowAddCardModal(false)}
            title="Add Access Card"
            >
            <form className="space-y-4">
                <div>
                <label className="block text-sm font-medium mb-1">User Name</label>
                <input 
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter user name"
                />
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">User Type</label>
                <select className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
                    <option value="">Select type</option>
                    <option value="employee">Employee</option>
                    <option value="contractor">Contractor</option>
                    <option value="visitor">Visitor</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Access Level</label>
                <select className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
                    <option value="">Select access level</option>
                    <option value="full">Full Access</option>
                    <option value="restricted">Restricted Access</option>
                    <option value="limited">Limited Access</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Valid Until</label>
                <input 
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                />
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
                <button
                    type="button"
                    onClick={() => setShowAddCardModal(false)}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    Add Card
                </button>
                </div>
            </form>
            </Modal>
        </div>
    );
};