"use client";

import React, { useEffect, useState } from "react";
import { Edit, Mail, Phone, Plus, Bell, Trash2 } from "lucide-react";
import Modal from "@/components/Common/Modal";
import toast from "react-hot-toast";
import "../../GlobalSearch/switch.css";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import NotificationConfigModal from "@/components/Common/Modals/NotificationConfigModal";
import { NotificationChannel } from "@/types/notificationChannel";

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

interface Preferences {
  desktopNotifications: boolean;
  soundAlerts: boolean;
  minimumPriority: "all" | "low" | "medium" | "high";
  businessHours: {
    start: string;
    end: string;
  };
  retentionDays: number;
}

const formatCondition = (condition: Condition) => {
  switch (condition.type) {
    case "time":
      return `Time is between ${condition.value} and ${condition.secondaryValue}`;
    case "access":
      return `Access attempts ${condition.operator.replace("_", " ")} ${condition.value}`;
    case "location":
      return `Location is ${condition.operator} ${condition.value}`;
    case "device":
      return `Device ${condition.operator === "equals" ? "is" : "is not"} ${condition.value}`;
    case "user":
      return `User role ${condition.operator === "equals" ? "is" : "is not"} ${condition.value}`;
    default:
      return "";
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
  const [notificationChannels, setNotificationChannels] = useState<
    NotificationChannel[]
  >([
    {
      id: "1",
      type: "email",
      name: "Email Notifications",
      description: "Send alerts to specified email addresses",
      enabled: true,
      config: {
        emails: [],
      },
    },
    {
      id: "2",
      type: "sms",
      name: "SMS Alerts",
      description: "Send alerts via SMS to security personnel",
      enabled: false,
      config: {
        phone_numbers: [],
      },
    },
  ]);

  const [preferences, setPreferences] = useState<Preferences>({
    desktopNotifications: true,
    soundAlerts: false,
    minimumPriority: "all",
    businessHours: {
      start: "09:00",
      end: "17:00",
    },
    retentionDays: 30,
  });

  const [showChannelConfig, setShowChannelConfig] = useState<string | null>(
    null
  );

  const defaultFormData: AlertRule = {
    id: "",
    name: "",
    description: "",
    severity: "low",
    enabled: true,
    conditions: [
      {
        type: "",
        operator: "",
        value: "",
      },
    ],
    actions: [],
    userId: "",
    businessId: "",
  };

  const [alertFormData, setAlertFormData] =
    useState<AlertRule>(defaultFormData);

  const handleSeverityChange = (value: string) => {
    if (value === "low" || value === "medium" || value === "high") {
      setAlertFormData({
        ...alertFormData,
        severity: value as "low" | "medium" | "high",
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
        businessId,
      } = selectedRule;
  
      // Parse conditions if they are strings
      const parsedConditions = conditions.map(condition => 
        typeof condition === "string" ? JSON.parse(condition) : condition
      );
  
      setAlertFormData({
        id,
        name,
        description,
        severity,
        enabled,
        conditions: parsedConditions,
        actions,
        userId,
        businessId,
      });
    } else {
      setAlertFormData(defaultFormData);
    }
  }, [selectedRule]);

  const handleCreate = async (data: AlertRule) => {
    setIsSubmitting(true);
    try {
      // Fix: Stringify each condition properly before sending
      const formattedData = {
        name: data.name,
        description: data.description,
        severity: data.severity,
        conditions: data.conditions.map(condition => JSON.stringify(condition)),
        actions: data.actions,
        enabled: true,
      };
  
      const response = await fetch("/api/platform/alert-rule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create alert rule");
      }
  
      const newRule = await response.json();
      
      // Fix: Parse conditions back when adding to state
      const ruleWithParsedConditions = {
        ...newRule,
        conditions: newRule.conditions.map((c: string) => 
          typeof c === "string" ? JSON.parse(c) : c
        )
      };
  
      setAlertRules((prev) => [ruleWithParsedConditions, ...prev]);
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
      // Fix: Properly stringify conditions
      const formattedData = {
        ...data,
        conditions: data.conditions?.map(condition => 
          typeof condition === "string" ? condition : JSON.stringify(condition)
        )
      };
  
      const response = await fetch(`/api/platform/alert-rule/${ruleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formattedData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update alert rule");
      }
  
      const updatedRule = await response.json();
      
      // Fix: Parse conditions properly
      const ruleWithParsedConditions = {
        ...updatedRule,
        conditions: updatedRule.conditions.map((c: string) => 
          typeof c === "string" ? JSON.parse(c) : c
        )
      };
  
      // Update state with parsed conditions
      setAlertRules((prev) =>
        prev.map((r) => (r.id === ruleId ? ruleWithParsedConditions : r))
      );
  
      setShowCreateRuleModal(false);
      toast.success("Alert rule updated successfully!");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to update alert rule"
      );
    } finally {
      setIsSubmitting(false);
      setSelectedRule(null);
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
      const response = await fetch(`/api/platform/alert-rule/${selectedRule.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete alert rule");
      }

      setAlertRules((prev) =>
        prev.filter((rule) => rule.id !== selectedRule.id)
      );
      toast.success("Alert rule deleted successfully");
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete alert rule"
      );
    } finally {
      setIsLoading(false);
      setSelectedRule(null);
    }
  };

  // Fetch preferences
  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch("/api/business/preferences");
        if (!response.ok) {
          throw new Error("Failed to fetch preferences");
        }
        const data = await response.json();
        setPreferences(data);
      } catch (error) {
        console.error("Fetch preferences error:", error);
        toast.error("Failed to load preferences");
      }
    };

    fetchPreferences();
  }, []);

  // Update handlers
  const handleSavePreferences = async () => {
    try {
      const response = await fetch("/api/business/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error("Failed to save preferences");
      }

      toast.success("Preferences saved successfully");
    } catch (error) {
      console.error("Save preferences error:", error);
      toast.error("Failed to save preferences");
    }
  };

  // Fetch notification channels
  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const response = await fetch("/api/business/notification-channels");
        if (!response.ok) {
          throw new Error("Failed to fetch channels");
        }
        const data = await response.json();
        // Check if the data is not empty before setting the state
        if (data && Array.isArray(data) && data.length > 0) {
          setNotificationChannels(data); // Only set if there is valid data
        } else {
          // Optional: handle empty response case if necessary
          console.log("No notification channels found");
          // You can either leave this empty or show a message to the user
        }
      } catch (error) {
        console.error("Fetch channels error:", error);
      }
    };

    fetchChannels();
  }, []);

  const handleConditionChange = (index: number, field: string, value: any) => {
    const newConditions = [...alertFormData.conditions];
    const currentCondition = newConditions[index];
  
    // Create new condition object with updated field
    newConditions[index] = {
      ...currentCondition,
      [field]: value
    };
  
    // Reset dependent fields if type changes
    if (field === 'type') {
      newConditions[index] = {
        ...newConditions[index],
        operator: '',
        value: '',
        secondaryValue: undefined
      };
    }
  
    // Reset value if operator changes
    if (field === 'operator') {
      newConditions[index] = {
        ...newConditions[index],
        value: '',
        secondaryValue: undefined
      };
    }
  
    setAlertFormData({
      ...alertFormData,
      conditions: newConditions
    });
  };

  const handleChannelToggle = async (channelId: string, enabled: boolean) => {
    try {
      const response = await fetch("/api/business/notification-channels", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: channelId, enabled }),
      });

      if (!response.ok) {
        throw new Error("Failed to update channel");
      }

      setNotificationChannels((channels) =>
        channels.map((c) => (c.id === channelId ? { ...c, enabled } : c))
      );
    } catch (error) {
      console.error("Update channel error:", error);
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
                {notificationChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="border rounded-lg p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-2 ${
                            channel.type === "email"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-green-100 text-green-600"
                          } rounded-lg`}
                        >
                          {channel.type === "email" ? (
                            <Mail className="w-5 h-5" />
                          ) : (
                            <Phone className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-medium">{channel.name}</h3>
                          <p className="text-gray-700 mt-1">
                            {channel.description}
                          </p>
                          {channel.enabled && (
                            <div className="mt-2">
                              <span className="text-xs text-gray-500">
                                {channel.type === "email"
                                  ? `${channel.config.emails?.length || 0} email(s) configured`
                                  : `${channel.config.phone_numbers?.length || 0} number(s) configured`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-3 py-1 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                          onClick={() => setShowChannelConfig(channel.id)}
                        >
                          Configure
                        </button>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={channel.enabled}
                            onChange={(e) => {
                              handleChannelToggle(channel.id, e.target.checked);
                            }}
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Channel Configuration Modal */}
              {showChannelConfig && (
                <NotificationConfigModal
                  channel={
                    notificationChannels.find(
                      (c) => c.id === showChannelConfig
                    )!
                  }
                  isOpen={!!showChannelConfig}
                  onClose={() => setShowChannelConfig(null)}
                  onSave={(updatedChannel) => {
                    setNotificationChannels((channels) =>
                      channels.map((c) =>
                        c.id === updatedChannel.id ? updatedChannel : c
                      )
                    );
                  }}
                />
              )}
            </div>
          )}

          {activeTab === "rules" && (
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-lg font-semibold">Alert Rules</h3>
                  <p className="text-sm text-gray-500">
                    Configure and manage alert rules for your system
                  </p>
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
                          <p className="text-sm text-gray-600 mt-1">
                            {rule.description}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <label className="switch">
                            <input
                              type="checkbox"
                              checked={rule.enabled}
                              onChange={(e) =>
                                handleToggle(rule, e.target.checked)
                              }
                            />
                            <span className="slider round"></span>
                          </label>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-700">
                            Trigger Conditions
                          </h5>
                          <ul className="space-y-1">
                            {/* Parse conditions if they're stored as strings */}
                            {rule.conditions.map((condition, index) => {
                              const parsedCondition =
                                typeof condition === "string"
                                  ? JSON.parse(condition)
                                  : condition;

                              return (
                                <li
                                  key={index}
                                  className="text-sm text-gray-600 flex items-center gap-2"
                                >
                                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                                  {formatCondition(parsedCondition)}
                                </li>
                              );
                            })}
                          </ul>
                        </div>

                        <div className="space-y-2">
                          <h5 className="text-sm font-medium text-gray-700">
                            Actions
                          </h5>
                          <ul className="space-y-1">
                            {rule.actions.map((action, index) => (
                              <li
                                key={index}
                                className="text-sm text-gray-600 flex items-center gap-2"
                              >
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
                    <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      No Alert Rules
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Get started by creating a new alert rule.
                    </p>
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
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={preferences.desktopNotifications}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              desktopNotifications: e.target.checked,
                            })
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sound Alerts</p>
                        <p className="text-sm text-gray-500">
                          Play sound when new alerts arrive
                        </p>
                      </div>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={preferences.soundAlerts}
                          onChange={(e) =>
                            setPreferences({
                              ...preferences,
                              soundAlerts: e.target.checked,
                            })
                          }
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Alert Priority */}
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Minimum Alert Priority</h3>
                  <select
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    value={preferences.minimumPriority}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        minimumPriority: e.target
                          .value as Preferences["minimumPriority"],
                      })
                    }
                  >
                    <option value="all">All Alerts</option>
                    <option value="low">Low and above</option>
                    <option value="medium">Medium and above</option>
                    <option value="high">High priority only</option>
                  </select>
                </div>

                {/* Business Hours */}
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Business Hours</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Start Time
                      </label>
                      <input
                        type="time"
                        value={preferences.businessHours.start}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            businessHours: {
                              ...preferences.businessHours,
                              start: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        End Time
                      </label>
                      <input
                        type="time"
                        value={preferences.businessHours.end}
                        onChange={(e) =>
                          setPreferences({
                            ...preferences,
                            businessHours: {
                              ...preferences.businessHours,
                              end: e.target.value,
                            },
                          })
                        }
                        className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                      />
                    </div>
                  </div>
                </div>

                {/* Alert Retention */}
                <div className="border rounded-lg p-4 dark:border-gray-700">
                  <h3 className="font-medium mb-4">Alert Retention</h3>
                  <select
                    className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    value={preferences.retentionDays}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        retentionDays: Number(e.target.value),
                      })
                    }
                  >
                    <option value="7">7 days</option>
                    <option value="30">30 days</option>
                    <option value="90">90 days</option>
                    <option value="180">180 days</option>
                  </select>
                </div>
              </div>

              {/* Save Button */}
              <div className="mt-6 flex justify-end">
                <button
                  className="px-4 py-2 bg-primary text-white rounded-lg"
                  onClick={handleSavePreferences} // Use the handleSavePreferences function here
                >
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
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">
                Rule Name
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
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
              <label className="block text-sm font-medium mb-1">
                Conditions
              </label>
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
              {alertFormData.conditions.map((condition, index) => (
  <div key={index} className="flex gap-3 items-start">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 flex-1">
      {/* Condition Type */}
      <select
        className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
        value={condition.type || ""}
        onChange={(e) => handleConditionChange(index, 'type', e.target.value)}
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
        onChange={(e) => handleConditionChange(index, 'operator', e.target.value)}
      >
        <option value="">Select Operator</option>
        {condition.type === "time" && (
          <option value="between">Between</option>
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
            <option value="inside">Inside</option>
            <option value="outside">Outside</option>
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

      {/* Values */}
      {condition.type === "time" && condition.operator === "between" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 mb-1">Start Time</span>
            <input
              type="time"
              className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              value={condition.value || ""}
              onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-gray-600 mb-1">End Time</span>
            <input
              type="time"
              className="px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
              value={condition.secondaryValue || ""}
              onChange={(e) => handleConditionChange(index, 'secondaryValue', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div>
        {condition.type === "access" && (
          <input
            type="number"
            className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            placeholder="Number of attempts"
            value={condition.value || ""}
            onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
          />
        )}
    
        {condition.type === "location" && (
          <select
            className="w-full px-3 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
            value={condition.value || ""}
            onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
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
            onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
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
            onChange={(e) => handleConditionChange(index, 'value', e.target.value)}
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
              conditions: [
                ...alertFormData.conditions,
                { type: "", operator: "", value: "" },
              ],
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
            const newConditions = alertFormData.conditions.filter(
              (_, i) => i !== index
            );
            setAlertFormData({
              ...alertFormData,
              conditions: newConditions,
            });
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
