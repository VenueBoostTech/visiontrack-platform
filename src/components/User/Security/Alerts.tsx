"use client";

import React, { useEffect, useState } from "react";
import { Edit, Mail, Phone, Plus, Bell, Trash2 } from "lucide-react";
import Modal from "@/components/Common/Modal";
import toast from "react-hot-toast";
import "../../GlobalSearch/switch.css";
import DeleteModal from "@/components/Common/Modals/DeleteModal";

interface Condition {
  type: string;
  operator: string;
  value: string | number;
  secondaryValue?: string | number;
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  severity: "low" | "medium" | "high";
  enabled: boolean;
  conditions: Condition[];
  actions: string[];
  userId: string;
  businessId: string;
  user?: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

interface AlertRuleProps {
  initialAlerts: AlertRule[];
}

const formatCondition = (condition: Condition) => {
  switch (condition.type) {
    case 'time':
      return `Time is between ${condition.value} and ${condition.secondaryValue}`;
    case 'access':
      return `Access attempts ${condition.operator.replace('_', ' ')} ${condition.value}`;
    case 'location':
      return `Location is ${condition.operator} ${condition.value}`;
    case 'device':
      return `Device ${condition.operator === 'equals' ? 'is' : 'is not'} ${condition.value}`;
    case 'user':
      return `User role ${condition.operator === 'equals' ? 'is' : 'is not'} ${condition.value}`;
    default:
      return '';
  }
};

const Alerts = ({ initialAlerts }: AlertRuleProps) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [showCreateRuleModal, setShowCreateRuleModal] = useState(false);
  const [alertRules, setAlertRules] = useState<AlertRule[]>(initialAlerts);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const defaultFormData: AlertRule = {
    id: "",
    name: "",
    description: "",
    severity: "low",
    enabled: true,
    conditions: [{
      type: "",
      operator: "",
      value: "",
    }],
    actions: [],
    userId: "",
    businessId: "",
  };

  const [alertFormData, setAlertFormData] = useState<AlertRule>(defaultFormData);

  const handleSeverityChange = (value: string) => {
    if (value === "low" || value === "medium" || value === "high") {
      setAlertFormData({
        ...alertFormData,
        severity: value as "low" | "medium" | "high"
      });
    }
  };


  useEffect(() => {
    if (!showCreateRuleModal) {
      setSelectedRule(null);
      setAlertFormData(defaultFormData);
    }
  }, [showCreateRuleModal]);

  useEffect(() => {
    if (selectedRule) {
      const { 
        id, 
        name, 
        description, 
        severity, 
        enabled, 
        conditions, 
        actions, 
        userId, 
        businessId 
      } = selectedRule;
      
      setAlertFormData({
        id,
        name,
        description,
        severity,
        enabled,
        conditions,
        actions,
        userId,
        businessId
      });
    } else {
      setAlertFormData(defaultFormData);
    }
  }, [selectedRule]);

  const handleCreate = async (data: AlertRule) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/alert-rule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          description: data.description,
          severity: data.severity,
          conditions: data.conditions,
          actions: data.actions,
          enabled: true
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create alert rule");
      }

      const newRule = await response.json();
      setAlertRules((prev) => [newRule, ...prev]);
      setShowCreateRuleModal(false);
      toast.success("Alert rule created successfully!");
    } catch (error) {
      console.error("Create error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create alert rule"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: Partial<AlertRule> & { id?: string }) => {
    const ruleId = data.id || selectedRule?.id;
    
    if (!ruleId) {
      toast.error("No rule selected");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/user/alert-rule/${ruleId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
    
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update alert rule");
      }
    
      const updatedRule = await response.json();
      setAlertRules((prev) =>
        prev.map((r) => (r.id === ruleId ? { ...r, ...data } : r))
      );
      
      // Only close modal if it's a form update, not a toggle
      if (Object.keys(data).length > 1) {
        setShowCreateRuleModal(false);
      }
      
      toast.success("Alert rule updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update alert rule"
      );
    } finally {
      setIsSubmitting(false);
      if (Object.keys(data).length > 1) {
        setSelectedRule(null);
      }
    }
  };

  const handleToggle = (rule: AlertRule, enabled: boolean) => {
    handleUpdate({ enabled, id: rule.id }); // Pass the rule ID directly
  };


  const handleCreateClick = () => {
    setSelectedRule(null); // Reset selected rule
    setAlertFormData(defaultFormData); // Reset form data
    setShowCreateRuleModal(true);
  };

  const handleDelete = async () => {
    if (!selectedRule?.id) {
      toast.error("No rule selected for deletion");
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user/alert-rule/${selectedRule.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete alert rule');
      }
      
      setAlertRules(prev => prev.filter(rule => rule.id !== selectedRule.id));
      toast.success('Alert rule deleted successfully');
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error instanceof Error ? error.message : 'Failed to delete alert rule');
    } finally {
      setIsLoading(false);
      setSelectedRule(null);
    }
  };
  
  return (
    <div>
      {/* Your existing logic remains unchanged */}
      <div className="bg-white rounded-lg shadow-sm dark:bg-gray-800">
        {/* Tabs */}
        <div className="border-b dark:border-gray-700">
          <div className="border-b dark:border-gray-700 flex gap-4 p-4">
            <button
              onClick={() => setActiveTab("notifications")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "notifications"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300"
              }`}
            >
              Notification Channels
            </button>
            <button
              onClick={() => setActiveTab("rules")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "rules"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300"
              }`}
            >
              Alert Rules
            </button>
            <button
              onClick={() => setActiveTab("preferences")}
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "preferences"
                  ? "bg-primary text-white"
                  : "text-gray-600 hover:bg-gray-100 dark:text-gray-300"
              }`}
            >
              Preferences
            </button>
          </div>

          {/* Notification Channels */}
          {activeTab === "notifications" && (
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

        {activeTab === "rules" && (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="text-lg font-semibold">Alert Rules</h3>
                <p className="text-sm text-gray-500">Configure and manage alert rules for your system</p>
              </div>
              {/* Create button */}
              <button
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm flex items-center gap-2"
                onClick={handleCreateClick}
              >
                <Plus className="w-4 h-4" />
                Create New Rule
              </button>
            </div>

            <div className="grid gap-4">
              {alertRules.map((rule) => (
                <div
                  key={rule.id}
                  className="bg-white border rounded-lg shadow-sm hover:shadow-md transition-shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-medium">{rule.name}</h4>
                          <span
                            className={`capitalize inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              rule.severity === "high"
                                ? "bg-red-100 text-red-800"
                                : rule.severity === "medium"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                            }`}
                          >
                            {rule.severity} priority
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                      <label className="switch">
                  <input
                    type="checkbox"
                    checked={rule.enabled}
                    onChange={(e) => handleToggle(rule, e.target.checked)}
                  />
                  <span className="slider round"></span>
                </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                    <h5 className="text-sm font-medium text-gray-700">Trigger Conditions</h5>
                    <ul className="space-y-1">
                      {/* Parse conditions if they're stored as strings */}
                      {rule.conditions.map((condition, index) => {
                        const parsedCondition = typeof condition === 'string' 
                          ? JSON.parse(condition) 
                          : condition;
                        
                        return (
                          <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-primary"></span>
                            {formatCondition(parsedCondition)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                      <div className="space-y-2">
                        <h5 className="text-sm font-medium text-gray-700">Actions</h5>
                        <ul className="space-y-1">
                          {rule.actions.map((action, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                      {/* Edit button */}
                      <button
                        className="p-2 text-gray-500 hover:text-gray-700"
                        onClick={() => {
                          setSelectedRule(rule);
                          setShowCreateRuleModal(true);
                        }}
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      {/* Delete button */}
                      <button
                        className="p-2 text-gray-500 hover:text-red-600"
                        onClick={() => {
                          setSelectedRule(rule);
                          setShowDeleteConfirm(true);
                        }}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {alertRules.length === 0 && (
                <div className="text-center py-12 bg-gray-50 rounded-lg dark:bg-gray-800">
                  <div className="flex justify-center mb-4">
                    <Bell className="w-12 h-12 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">No Alert Rules</h3>
                  <p className="mt-1 text-sm text-gray-500">Get started by creating a new alert rule.</p>
                  <button
                    className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                    onClick={() => setShowCreateRuleModal(true)}
                  >
                    Create First Rule
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

          {/* Preferences */}
          {activeTab === "preferences" && (
            <div className="p-6">
              <div className="space-y-6">
                {/* General Settings */}
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium mb-4">General Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          Enable Desktop Notifications
                        </p>
                        <p className="text-sm text-gray-500">
                          Show alerts as desktop notifications
                        </p>
                      </div>
                      <div className="w-12 h-6 bg-green-200 rounded-full relative">
                        <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sound Alerts</p>
                        <p className="text-sm text-gray-500">
                          Play sound when new alerts arrive
                        </p>
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
                      <label className="block text-sm font-medium mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        defaultValue="09:00"
                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Time
                      </label>
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

        <Modal
          isOpen={showCreateRuleModal}
          onClose={() => {
            setShowCreateRuleModal(false);
            setSelectedRule(null);
          }}
          title={selectedRule ? "Edit Rule" : "Create Rule"}
        >
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedRule) {
                handleUpdate(alertFormData);
              } else {
                handleCreate(alertFormData);
              }
            }}
            className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Rule Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                placeholder="Enter rule name"
                required
                value={alertFormData.name}
                onChange={(e) =>
                  setAlertFormData({ ...alertFormData, name: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                placeholder="Describe the rule"
                rows={3}
                value={alertFormData.description}
                onChange={(e) =>
                  setAlertFormData({
                    ...alertFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            {/* Severity Select */}
            <div>
              <label className="block text-sm font-medium mb-1">Severity</label>
              <select
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                value={alertFormData.severity}
                onChange={(e) => handleSeverityChange(e.target.value)}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          
            <div>
              <label className="block text-sm font-medium mb-1">Conditions</label>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {alertFormData.conditions.map((condition, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
                      {/* Condition Type */}
                      <select
                        className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                        value={condition.type || ""}
                        onChange={(e) => {
                          const newConditions = [...alertFormData.conditions];
                          newConditions[index] = {
                            ...condition,
                            type: e.target.value,
                            value: "",
                            operator: "",
                          };
                          setAlertFormData({ ...alertFormData, conditions: newConditions });
                        }}
                      >
                        <option value="">Select Type</option>
                        <option value="time">Time Range</option>
                        <option value="access">Access Attempts</option>
                        <option value="location">Location</option>
                        <option value="device">Device Type</option>
                        <option value="user">User Role</option>
                      </select>

                      {/* Operator */}
                      <select
                        className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                        value={condition.operator || ""}
                        onChange={(e) => {
                          const newConditions = [...alertFormData.conditions];
                          newConditions[index] = {
                            ...condition,
                            operator: e.target.value,
                            value: "",
                            secondaryValue: undefined,
                          };
                          setAlertFormData({ ...alertFormData, conditions: newConditions });
                        }}
                      >
                        <option value="">Select Operator</option>
                        {condition.type === "time" && (
                          <>
                            <option value="between">Between</option>
                          </>
                        )}
                        {condition.type === "access" && (
                          <>
                            <option value="equals">Equals</option>
                            <option value="greater_than">Greater Than</option>
                            <option value="less_than">Less Than</option>
                          </>
                        )}
                        {condition.type === "location" && (
                          <>
                            <option value="inside">Inside Zone</option>
                            <option value="outside">Outside Zone</option>
                          </>
                        )}
                        {condition.type === "device" && (
                          <>
                            <option value="equals">Is</option>
                            <option value="not_equals">Is Not</option>
                          </>
                        )}
                        {condition.type === "user" && (
                          <>
                            <option value="equals">Is</option>
                            <option value="not_equals">Is Not</option>
                          </>
                        )}
                      </select>

                      {/* Value Inputs */}
                      {condition.type === "time" && condition.operator === "between" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600 mb-1">Start Time</span>
                            <input
                              type="time"
                              className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                              value={condition.value || ""}
                              onChange={(e) => {
                                const newConditions = [...alertFormData.conditions];
                                newConditions[index] = {
                                  ...condition,
                                  value: e.target.value,
                                };
                                setAlertFormData({ ...alertFormData, conditions: newConditions });
                              }}
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-600 mb-1">End Time</span>
                            <input
                              type="time"
                              className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                              value={condition.secondaryValue || ""}
                              onChange={(e) => {
                                const newConditions = [...alertFormData.conditions];
                                newConditions[index] = {
                                  ...condition,
                                  secondaryValue: e.target.value,
                                };
                                setAlertFormData({ ...alertFormData, conditions: newConditions });
                              }}
                            />
                          </div>
                        </div>
                      ) : (
                        // Other condition types remain unchanged
                        <div>
                          {condition.type === "access" && (
                            <input
                              type="number"
                              className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                              placeholder="Number of attempts"
                              value={condition.value || ""}
                              onChange={(e) => {
                                const newConditions = [...alertFormData.conditions];
                                newConditions[index] = {
                                  ...condition,
                                  value: e.target.value,
                                };
                                setAlertFormData({ ...alertFormData, conditions: newConditions });
                              }}
                            />
                          )}

                          {condition.type === "location" && (
                            <select
                              className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                              value={condition.value || ""}
                              onChange={(e) => {
                                const newConditions = [...alertFormData.conditions];
                                newConditions[index] = {
                                  ...condition,
                                  value: e.target.value,
                                };
                                setAlertFormData({ ...alertFormData, conditions: newConditions });
                              }}
                            >
                              <option value="">Select Zone</option>
                              <option value="entrance">Entrance</option>
                              <option value="parking">Parking</option>
                              <option value="restricted">Restricted Area</option>
                            </select>
                          )}

                          {condition.type === "device" && (
                            <select
                              className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                              value={condition.value || ""}
                              onChange={(e) => {
                                const newConditions = [...alertFormData.conditions];
                                newConditions[index] = {
                                  ...condition,
                                  value: e.target.value,
                                };
                                setAlertFormData({ ...alertFormData, conditions: newConditions });
                              }}
                            >
                              <option value="">Select Device Type</option>
                              <option value="mobile">Mobile</option>
                              <option value="desktop">Desktop</option>
                              <option value="tablet">Tablet</option>
                            </select>
                          )}

                          {condition.type === "user" && (
                            <select
                              className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                              value={condition.value || ""}
                              onChange={(e) => {
                                const newConditions = [...alertFormData.conditions];
                                newConditions[index] = {
                                  ...condition,
                                  value: e.target.value,
                                };
                                setAlertFormData({ ...alertFormData, conditions: newConditions });
                              }}
                            >
                              <option value="">Select Role</option>
                              <option value="admin">Admin</option>
                              <option value="staff">Staff</option>
                              <option value="user">Regular User</option>
                            </select>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Add/Remove buttons */}
                    <div className="flex gap-2 mt-2 ml-2">
                      {index === alertFormData.conditions.length - 1 && (
                        <button
                          type="button"
                          className="p-1.5 text-white bg-primary rounded-lg hover:bg-primary/90"
                          onClick={() =>
                            setAlertFormData({
                              ...alertFormData,
                              conditions: [...alertFormData.conditions, { type: "", operator: "", value: "" }],
                            })
                          }
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      )}
                      {alertFormData.conditions.length > 1 && (
                        <button
                          type="button"
                          className="p-1.5 text-white bg-red-500 rounded-lg hover:bg-red-600"
                          onClick={() => {
                            const newConditions = alertFormData.conditions.filter((_, i) => i !== index);
                            setAlertFormData({ ...alertFormData, conditions: newConditions });
                          }}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Actions</label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="email"
                    className="rounded"
                    defaultChecked={
                      alertFormData.actions.includes("email") ||
                      selectedRule?.actions.includes("email")
                    }
                    onChange={(e) =>
                      setAlertFormData({
                        ...alertFormData,
                        actions: e.target.checked
                          ? [...alertFormData.actions, "email"]
                          : alertFormData.actions.filter(
                              (action) => action !== "email"
                            ),
                      })
                    }
                  />
                  <label htmlFor="email">Send Email</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="sms"
                    className="rounded"
                    defaultChecked={
                      alertFormData.actions.includes("sms") ||
                      selectedRule?.actions.includes("sms")
                    }
                    onChange={(e) =>
                      setAlertFormData({
                        ...alertFormData,
                        actions: e.target.checked
                          ? [...alertFormData.actions, "sms"]
                          : alertFormData.actions.filter(
                              (action) => action !== "sms"
                            ),
                      })
                    }
                  />
                  <label htmlFor="sms">Send SMS</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="notification"
                    className="rounded"
                    defaultChecked={
                      alertFormData.actions.includes("notification") ||
                      selectedRule?.actions.includes("notification")
                    }
                    onChange={(e) =>
                      setAlertFormData({
                        ...alertFormData,
                        actions: e.target.checked
                          ? [...alertFormData.actions, "notification"]
                          : alertFormData.actions.filter(
                              (action) => action !== "notification"
                            ),
                      })
                    }
                  />
                  <label htmlFor="notification">Send Push Notification</label>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="log"
                    className="rounded"
                    defaultChecked={
                      alertFormData.actions.includes("log") ||
                      selectedRule?.actions.includes("log")
                    }
                    onChange={(e) =>
                      setAlertFormData({
                        ...alertFormData,
                        actions: e.target.checked
                          ? [...alertFormData.actions, "log"]
                          : alertFormData.actions.filter(
                              (action) => action !== "log"
                            ),
                      })
                    }
                  />
                  <label htmlFor="log">Log Incident</label>
                </div>
              </div>
            </div>

           {/* Form Buttons */}
           <div className="flex justify-end gap-3 pt-4 mt-6 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowCreateRuleModal(false);
                  setSelectedRule(null);
                }}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                disabled={isSubmitting}
              >
                {selectedRule ? "Update Rule" : "Create Rule"}
              </button>
            </div>
          </form>
        </Modal>
       {/* Delete Modal */}
       {selectedRule && (
          <DeleteModal
            showDeleteModal={showDeleteConfirm}
            setShowDeleteModal={setShowDeleteConfirm}
            deleteText={`Delete Alert Rule "${selectedRule.name}"`}
            handleDelete={handleDelete}
            loading={isLoading}
          />
        )}

      </div>
    </div>
  );
};

export default Alerts;
