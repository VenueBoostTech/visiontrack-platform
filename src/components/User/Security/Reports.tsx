"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { FileText, Download, Filter, Search, Calendar } from 'lucide-react';

interface Report {
    id: string;
    type: 'incident' | 'access' | 'visitor' | 'alert';
    title: string;
    generatedAt: Date;
    status: 'completed' | 'processing';
    summary: string;
}

const Reports = () => {
    const [dateRange, setDateRange] = useState('week');
    const [reportType, setReportType] = useState('all');

    const reports: Report[] = [
        {
            id: '1',
            type: 'incident',
            title: 'Weekly Security Incident Report',
            generatedAt: new Date(),
            status: 'completed',
            summary: 'Summary of all security incidents from last week'
        },
        // Add more sample reports
    ];

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0]; // Returns YYYY-MM-DD format
    };

    return (
        <div>
            
            {/* Report Generation */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6 dark:bg-gray-800">
                <h2 className="text-lg font-bold mb-4">Generate New Report</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select 
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        value={reportType}
                        onChange={(e) => setReportType(e.target.value)}
                    >
                        <option value="all">All Reports</option>
                        <option value="incident">Incident Reports</option>
                        <option value="access">Access Reports</option>
                        <option value="visitor">Visitor Reports</option>
                    </select>
                    
                    <select 
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                    >
                        <option value="day">Last 24 Hours</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="custom">Custom Range</option>
                    </select>

                    <button className="px-4 py-2 bg-primary text-white rounded-lg">
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
                <div className="p-6 border-b dark:border-gray-700">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold">Recent Reports</h2>
                        <div className="flex gap-2">
                            <button className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Filter className="w-5 h-5" />
                            </button>
                            <button className="p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                                <Calendar className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-900">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Type</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Title</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Generated</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Status</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                            {reports.map((report) => (
                                <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            {report.type}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium">{report.title}</td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {formatDate(report.generatedAt)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            report.status === 'completed' 
                                                ? 'bg-green-100 text-green-800' 
                                                : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                            {report.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="text-primary hover:text-primary-dark">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reports;