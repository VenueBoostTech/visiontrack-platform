"use client";

import React, { useEffect, useState } from "react";
import { Mail, Phone } from "lucide-react";
import Modal from "@/components/Common/Modal";
import toast from "react-hot-toast";
import "../../GlobalSearch/switch.css";

interface NotificationChannel {
  id: string;
  type: "email" | "sms" | "slack" | "system";
  name: string;
  enabled: boolean;
  config: any;
}

interface AlertRule {
  id: string;
  name: string;
  description: string;
  severity: "low" | "medium" | "high";
  enabled: boolean;
  conditions: string[];
  actions: string[];
}

interface AlertRuleProps {
  initialAlerts: AlertRule[];
}

const Alerts = ({ initialAlerts }: AlertRuleProps) => {
  const [activeTab, setActiveTab] = useState("notifications");
  const [showCreateRuleModal, setShowCreateRuleModal] = useState(false);
  const [alertRules, setAlertRules] = useState<AlertRule[]>(initialAlerts);
  const [selectedRule, setSelectedRule] = useState<AlertRule | null>(null);
  const [alertFormData, setAlertFormData] = useState<AlertRule>({
    id: "",
    name: "",
    description: "",
    severity: "low",
    enabled: true,
    conditions: [""],
    actions: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (selectedRule) {
      setAlertFormData({
        id: selectedRule.id,
        name: selectedRule.name,
        description: selectedRule.description,
        severity: selectedRule.severity,
        enabled: selectedRule.enabled,
        conditions: selectedRule.conditions,
        actions: selectedRule.actions,
      });
    }
  }, [selectedRule]);

  // Sample data
  const notificationChannels: NotificationChannel[] = [
    {
      id: "1",
      type: "email",
      name: "Email Notifications",
      enabled: true,
      config: { emails: ["security@company.com"] },
    },
  ];

  const handleCreate = async (data: any) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/user/alert-rule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create alert rule");
      }

      const newZone = await response.json();
      setAlertRules((prev) => [newZone, ...prev]);
      setShowCreateRuleModal(false);
      toast.success("Alert rule created successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create alert rule"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async (data: any, id: string | null) => {
    if (!selectedRule && !id) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/user/alert-rule/${selectedRule?.id ?? id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update alert rule");
      }

      const updatedZone = await response.json();
      setAlertRules((prev) =>
        prev.map((z) => (z.id === (selectedRule?.id ?? id) ? updatedZone : z))
      );
      setShowCreateRuleModal(false);
      toast.success("Alert rule updated successfully!");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update alert rule"
      );
    } finally {
      setIsSubmitting(false);
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

          {/* Alert Rules */}
          {activeTab === "rules" && (
            <div className="p-6">
              <button
                className="mb-6 px-4 py-2 bg-primary text-white rounded-lg text-sm"
                onClick={() => setShowCreateRuleModal(true)}
              >
                Create New Rule
              </button>

              <div className="space-y-6">
                {alertRules.map((rule) => (
                  <div
                    key={rule.id}
                    className="border rounded-lg p-4 dark:border-gray-700"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{rule.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {rule.description}
                        </p>
                      </div>
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

                    <div className="mt-4 space-y-2">
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Conditions:</p>
                        <ul className="ml-4 list-disc">
                          {rule?.conditions?.map((condition, index) => (
                            <li key={index} className="capitalize">
                              {condition}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="font-medium">Actions:</p>
                        <ul className="ml-4 list-disc">
                          {rule.actions.map((action, index) => (
                            <li key={index} className="capitalize">
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end items-center gap-2">
                      <button
                        className="px-3 py-1 text-sm bg-gray-100 rounded-lg dark:bg-gray-700"
                        onClick={() => {
                          setShowCreateRuleModal(true);
                          handleUpdate(rule, null);
                          setSelectedRule(rule);
                        }}
                      >
                        Edit
                      </button>
                      {/* <div className="w-12 h-6 bg-green-200 rounded-full relative">
                          <div className="absolute right-0 w-6 h-6 bg-green-600 rounded-full" />
                        </div> */}
                      {/* <Switch
                        defaultChecked={rule.enabled}
                        setIsEnabled={setIsEnabled}
                      /> */}
                      <label className="switch">
                        <input
                          type="checkbox"
                          defaultChecked={rule.enabled}
                          onChange={(e) => {
                            handleUpdate(
                              { enabled: e.target.checked },
                              rule.id
                            ).then(() => {});
                          }}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </div>
                ))}
                {alertRules.length === 0 && (
                  <div className="border rounded-lg p-4 dark:border-gray-700">
                    <p className="text-sm text-gray-500">
                      No active alert rules found
                    </p>
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

        {/* Create Rule Modal */}
        <Modal
          isOpen={showCreateRuleModal}
          onClose={() => setShowCreateRuleModal(false)}
          title={selectedRule ? "Edit Rule" : "Create Rule"}
        >
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Rule Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                placeholder="Enter rule name"
                required
                defaultValue={alertFormData.name || selectedRule?.name}
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
                defaultValue={
                  alertFormData.description || selectedRule?.description
                }
                onChange={(e) =>
                  setAlertFormData({
                    ...alertFormData,
                    description: e.target.value,
                  })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Severity</label>
              <select
                className="w-full px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                defaultValue={alertFormData.severity || selectedRule?.severity}
                onChange={(e) =>
                  setAlertFormData({
                    ...alertFormData,
                    severity: e.target.value,
                  })
                }
              >
                <option value="">Select severity</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Conditions
              </label>
              <div className="space-y-2">
                {/* <div className="flex gap-2">
                  <select
                    className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                    defaultValue={
                      alertFormData.conditions[0] || selectedRule?.conditions[0]
                    }
                    onChange={(e) =>
                      setAlertFormData({
                        ...alertFormData,
                        conditions: [
                          e.target.value,
                          ...alertFormData.conditions.slice(1),
                        ],
                      })
                    }
                  >
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
                    onClick={() =>
                      setAlertFormData({
                        ...alertFormData,
                        conditions: [...alertFormData.conditions, ""],
                      })
                    }
                  >
                    Add
                  </button>
                </div> */}
                {alertFormData.conditions.map((condition, index) => (
                  <div key={index} className="flex gap-2">
                    <select
                      className="flex-1 px-4 py-2 rounded-lg border dark:bg-gray-800 dark:border-gray-700"
                      defaultValue={condition}
                      onChange={(e) =>
                        setAlertFormData({
                          ...alertFormData,
                          conditions: [
                            ...alertFormData.conditions.slice(0, index),
                            e.target.value,
                            ...alertFormData.conditions.slice(index + 1),
                          ],
                        })
                      }
                    >
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
                      onClick={() =>
                        setAlertFormData({
                          ...alertFormData,
                          conditions: [...alertFormData.conditions, ""],
                        })
                      }
                    >
                      Add
                    </button>
                    {alertFormData.conditions.length > 1 && (
                      <button
                        type="button"
                        className="px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary/90"
                        onClick={() =>
                          setAlertFormData({
                            ...alertFormData,
                            conditions: [
                              ...alertFormData.conditions.slice(0, index),
                              ...alertFormData.conditions.slice(index + 1),
                            ],
                          })
                        }
                      >
                        Remove
                      </button>
                    )}
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
                disabled={isSubmitting}
                onClick={() => {
                  if (selectedRule) {
                    handleUpdate(alertFormData);
                  } else {
                    handleCreate(alertFormData);
                  }
                }}
              >
                {selectedRule ? "Update Rule" : "Create Rule"}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default Alerts;
