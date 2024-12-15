"use client";

import React, { useState } from "react";
import Breadcrumb from "@/components/Common/Dashboard/Breadcrumb";
import { Bell, Settings, Mail, Phone, Slack, Shield } from 'lucide-react';
import Modal from "@/components/Common/Modal";

interface NotificationChannel {
    id: string;
    type: 'email' | 'sms' | 'slack' | 'system';
    name: string;
    enabled: boolean;
    config: any;
}

interface AlertRule {
    id: string;
    name: string;
    description: string;
    severity: 'low' | 'medium' | 'high';
    enabled: boolean;
    conditions: string[];
    actions: string[];
}

const SecurityAlertsPage = () => {
    const [activeTab, setActiveTab] = useState('notifications');
    const [showCreateRuleModal, setShowCreateRuleModal] = useState(false);



    // Sample data
    const notificationChannels: NotificationChannel[] = [
        {
            id: '1',
            type: 'email',
            name: 'Email Notifications',
            enabled: true,
            config: { emails: ['security@company.com'] }
        },
        // Add more channels
    ];

    const alertRules: AlertRule[] = [
        {
            id: '1',
            name: 'After Hours Access',
            description: 'Detect access attempts outside business hours',
            severity: 'high',
            enabled: true,
            conditions: ['Time is outside 9AM-5PM', 'Access attempt detected'],
            actions: ['Send email', 'Send SMS', 'Log incident']
        },
        // Add more rules
    ];

    return (
        <div className="px-5">
            <Breadcrumb pageTitle="Security Settings" />

            <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
                {/* Tabs */}
                <div className="border-b dark:border-gray-700">
                    <div className="flex gap-4 p-4">
                        <button
                            onClick={() => setActiveTab('notifications')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${
                                activeTab === 'notifications' 
                                    ? 'bg-primary text-white' 
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'
                            }`}
                        >
                            Notification Channels
                        </button>
                        <button
                            onClick={() => setActiveTab('rules')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${
                                activeTab === 'rules' 
                                    ? 'bg-primary text-white' 
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'
                            }`}
                        >
                            Alert Rules
                        </button>
                        <button
                            onClick={() => setActiveTab('preferences')}
                            className={`px-4 py-2 text-sm font-medium rounded-lg ${
                                activeTab === 'preferences' 
                                    ? 'bg-primary text-white' 
                                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300'
                            }`}
                        >
                            Preferences
                        </button>
                    </div>
                </div>

                {/* Notification Channels */}
                {activeTab === 'notifications' && (
                    <div className="p-6">
                        <div className="space-y-6">
                            {/* Email */}
                            <div className="border rounded-lg p-4 dark:border-gray-700">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-lg dark:bg-blue-900">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">Email Notifications</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Send alerts to specified email addresses
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
                                            Configure
                                        </button>
                                        <div className="w-12 h-6 bg-green-200 rounded-full relative">
                                            <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* SMS */}
                            <div className="border rounded-lg p-4 dark:border-gray-700">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900">
                                            <Phone className="w-5 h-5 text-green-600" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium">SMS Alerts</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                Send alerts via SMS to security personnel
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
                                            Configure
                                        </button>
                                        <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                                            <div className="absolute left-0 w-6 h-6 bg-gray-400 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* More channels */}
                        </div>
                    </div>
                )}

                {/* Alert Rules */}
                {activeTab === 'rules' && (
                    <div className="p-6">
                       <button 
                        className="mb-6 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                        onClick={() => setShowCreateRuleModal(true)}
                        >
                            Create New Rule
                        </button>

                        <div className="space-y-6">
                            {alertRules.map((rule) => (
                                <div key={rule.id} className="border rounded-lg p-4 dark:border-gray-700">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="font-medium">{rule.name}</h3>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {rule.description}
                                            </p>
                                        </div>
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                            rule.severity === 'high' 
                                                ? 'bg-red-100 text-red-800' 
                                                : rule.severity === 'medium'
                                                ? 'bg-yellow-100 text-yellow-800'
                                                : 'bg-green-100 text-green-800'
                                        }`}>
                                            {rule.severity} priority
                                        </span>
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <div className="text-sm text-gray-600">
                                            <p className="font-medium">Conditions:</p>
                                            <ul className="ml-4 list-disc">
                                                {rule.conditions.map((condition, index) => (
                                                    <li key={index}>{condition}</li>
                                                ))}
                                            </ul>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            <p className="font-medium">Actions:</p>
                                            <ul className="ml-4 list-disc">
                                                {rule.actions.map((action, index) => (
                                                    <li key={index}>{action}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <div className="mt-4 flex justify-end gap-2">
                                        <button className="px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-700">
                                            Edit
                                        </button>
                                        <div className="w-12 h-6 bg-green-200 rounded-full relative">
                                            <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Preferences */}
                {activeTab === 'preferences' && (
                    <div className="p-6">
                    <div className="space-y-6">
                      {/* General Settings */}
                      <div className="border rounded-lg p-4 dark:border-gray-700">
                        <h3 className="font-medium mb-4">General Settings</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Enable Desktop Notifications</p>
                              <p className="text-sm text-gray-500">Show alerts as desktop notifications</p>
                            </div>
                            <div className="w-12 h-6 bg-green-200 rounded-full relative">
                              <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full" />
                            </div>
                          </div>
                
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Sound Alerts</p>
                              <p className="text-sm text-gray-500">Play sound when new alerts arrive</p>
                            </div>
                            <div className="w-12 h-6 bg-gray-200 rounded-full relative">
                              <div className="absolute left-0 w-6 h-6 bg-gray-400 rounded-full" />
                            </div>
                          </div>
                        </div>
                      </div>
                
                      {/* Alert Priority */}
                      <div className="border rounded-lg p-4 dark:border-gray-700">
                        <h3 className="font-medium mb-4">Minimum Alert Priority</h3>
                        <select className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
                          <option value="all">All Alerts</option>
                          <option value="low">Low and above</option>
                          <option value="medium">Medium and above</option>
                          <option value="high">High priority only</option>
                        </select>
                      </div>
                
                      {/* Work Hours */}
                      <div className="border rounded-lg p-4 dark:border-gray-700">
                        <h3 className="font-medium mb-4">Business Hours</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium mb-1">Start Time</label>
                            <input 
                              type="time" 
                              defaultValue="09:00"
                              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-1">End Time</label>
                            <input 
                              type="time" 
                              defaultValue="17:00"
                              className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                            />
                          </div>
                        </div>
                      </div>
                
                      {/* Alert Retention */}
                      <div className="border rounded-lg p-4 dark:border-gray-700">
                        <h3 className="font-medium mb-4">Alert Retention</h3>
                        <select className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
                          <option value="7">7 days</option>
                          <option value="30">30 days</option>
                          <option value="90">90 days</option>
                          <option value="180">180 days</option>
                        </select>
                      </div>
                    </div>
                
                    {/* Save Button */}
                    <div className="mt-6 flex justify-end">
                      <button className="px-4 py-2 bg-primary text-white rounded-lg">
                        Save Preferences
                      </button>
                    </div>
                  </div>
                )}
            </div>
            {/* Create Rule Modal */}
            <Modal
            isOpen={showCreateRuleModal}
            onClose={() => setShowCreateRuleModal(false)}
            title="Create Alert Rule"
            >
            <form className="space-y-4">
                <div>
                <label className="block text-sm font-medium mb-1">Rule Name</label>
                <input 
                    type="text"
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Enter rule name"
                />
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    placeholder="Describe the rule"
                    rows={3}
                />
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Severity</label>
                <select className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
                    <option value="">Select severity</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Conditions</label>
                <div className="space-y-2">
                    <div className="flex gap-2">
                    <select className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700">
                        <option value="">Select condition</option>
                        <option value="time">Time</option>
                        <option value="access">Access Attempt</option>
                        <option value="location">Location</option>
                        <option value="device">Device</option>
                        <option value="user">User Type</option>
                    </select>
                    <button 
                        type="button" 
                        className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                    >
                        Add
                    </button>
                    </div>
                </div>
                </div>

                <div>
                <label className="block text-sm font-medium mb-1">Actions</label>
                <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                    <input type="checkbox" id="email" className="rounded" />
                    <label htmlFor="email">Send Email</label>
                    </div>
                    <div className="flex items-center gap-2">
                    <input type="checkbox" id="sms" className="rounded" />
                    <label htmlFor="sms">Send SMS</label>
                    </div>
                    <div className="flex items-center gap-2">
                    <input type="checkbox" id="notification" className="rounded" />
                    <label htmlFor="notification">Send Push Notification</label>
                    </div>
                    <div className="flex items-center gap-2">
                    <input type="checkbox" id="log" className="rounded" />
                    <label htmlFor="log">Log Incident</label>
                    </div>
                </div>
                </div>

                <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
                <button
                    type="button"
                    onClick={() => setShowCreateRuleModal(false)}
                    className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    Create Rule
                </button>
                </div>
            </form>
            </Modal>
        </div>
    );
};

export default SecurityAlertsPage;