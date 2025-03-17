"use client";

import React, { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import Modal from "@/components/Common/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import InputSelect from "@/components/Common/InputSelect";

interface AIModel {
  id: string;
  name: string;
  description: string;
  type: string;
  version: string;
  active: boolean;
  capabilities: any;
  configOptions: any;
  createdAt: string;
  updatedAt: string;
}

interface AIModelFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData: AIModel | null;
  isEditing: boolean;
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

const modelTypes = [
  { value: "CUSTOMER_TRAFFIC", label: "Customer Traffic" },
  { value: "FOOTPATH_ANALYSIS", label: "Footpath Analysis" },
  { value: "DEMOGRAPHICS", label: "Demographics" },
  { value: "BEHAVIOR_ANALYSIS", label: "Behavior Analysis" },
  { value: "HEATMAP", label: "Heatmap" },
  { value: "CONVERSION_TRACKING", label: "Conversion Tracking" },
  { value: "CUSTOMER_COUNTER", label: "Customer Counter" },
];

const AIModelFormModal: React.FC<AIModelFormModalProps> = ({
  isOpen,
  onClose,
  initialData,
  isEditing,
  onSubmit,
  isLoading,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "CUSTOMER_TRAFFIC",
    version: "1.0.0",
    active: true,
    capabilities: {
      features: [],
      metrics: []
    },
    configOptions: {}
  });

  const [capabilitiesText, setCapabilitiesText] = useState("");
  const [metricsText, setMetricsText] = useState("");
  const [configOptionsText, setConfigOptionsText] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialData && isEditing) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        type: initialData.type,
        version: initialData.version,
        active: initialData.active,
        capabilities: initialData.capabilities || { features: [], metrics: [] },
        configOptions: initialData.configOptions || {}
      });

      // Convert arrays to text for editing
      if (initialData.capabilities?.features) {
        setCapabilitiesText(initialData.capabilities.features.join('\n'));
      }
      
      if (initialData.capabilities?.metrics) {
        setMetricsText(initialData.capabilities.metrics.join('\n'));
      }
      
      if (initialData.configOptions) {
        setConfigOptionsText(JSON.stringify(initialData.configOptions, null, 2));
      }
    } else {
      // Reset form for new model
      setFormData({
        name: "",
        description: "",
        type: "CUSTOMER_TRAFFIC",
        version: "1.0.0",
        active: true,
        capabilities: {
          features: [],
          metrics: []
        },
        configOptions: {}
      });
      setCapabilitiesText("");
      setMetricsText("");
      setConfigOptionsText("{\n  \n}");
    }
  }, [initialData, isEditing, isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      type: e.target.value
    });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({
      ...formData,
      active: checked
    });
  };

  const handleCapabilitiesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCapabilitiesText(e.target.value);
  };

  const handleMetricsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMetricsText(e.target.value);
  };

  const handleConfigOptionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setConfigOptionsText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      // Process capabilities and metrics
      const features = capabilitiesText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');
        
      const metrics = metricsText
        .split('\n')
        .map(line => line.trim())
        .filter(line => line !== '');

      // Parse configOptions
      let configOptions = {};
      try {
        configOptions = JSON.parse(configOptionsText);
      } catch (err) {
        setError("Config options must be valid JSON");
        return;
      }

      // Prepare data with parsed values
      const submitData = {
        ...formData,
        capabilities: {
          ...formData.capabilities,
          features,
          metrics
        },
        configOptions
      };

      onSubmit(submitData);
    } catch (err) {
      setError("Error processing form data");
      console.error(err);
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit AI Model" : "Add New AI Model"}
      description={isEditing ? "Update the details of this AI model" : "Create a new AI model for the platform"}
      isOpen={isOpen}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="p-3 text-sm bg-red-50 border border-red-200 text-red-600 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Basic Information */}
          <div>
            <Label htmlFor="name">Model Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="e.g. Customer Traffic Analysis"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Describe what this AI model does..."
              required
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              {/* Replace Select with InputSelect */}
              <InputSelect
                name="type"
                label="Model Type"
                options={modelTypes}
                value={formData.type}
                onChange={handleSelectChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                name="version"
                value={formData.version}
                onChange={handleInputChange}
                placeholder="e.g. 1.0.0"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <Label htmlFor="active">Active Status</Label>
              <span className="text-xs text-gray-500">
                Active models are available to businesses
              </span>
            </div>
            <Switch
              id="active"
              checked={formData.active}
              onCheckedChange={handleSwitchChange}
            />
          </div>

          {/* Capabilities and Metrics */}
          <div>
            <Label htmlFor="capabilities">Capabilities (one per line)</Label>
            <Textarea
              id="capabilities"
              value={capabilitiesText}
              onChange={handleCapabilitiesChange}
              placeholder="e.g. Traffic flow visualization&#10;Customer journey mapping&#10;Congestion detection"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="metrics">Metrics Tracked (one per line)</Label>
            <Textarea
              id="metrics"
              value={metricsText}
              onChange={handleMetricsChange}
              placeholder="e.g. Traffic volume&#10;Path efficiency&#10;Zone transitions"
              rows={3}
            />
          </div>

          {/* Config Options JSON */}
          <div>
            <Label htmlFor="configOptions">Configuration Options (JSON)</Label>
            <Textarea
              id="configOptions"
              value={configOptionsText}
              onChange={handleConfigOptionsChange}
              placeholder='{"minimumFrameRate": 15, "detectionThreshold": 0.65}'
              rows={5}
              className="font-mono text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter valid JSON that defines the configuration options for this model
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading} className="text-white">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isEditing ? "Saving..." : "Creating..."}
              </>
            ) : (
              <>{isEditing ? "Save Changes" : "Create Model"}</>
            )}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AIModelFormModal;