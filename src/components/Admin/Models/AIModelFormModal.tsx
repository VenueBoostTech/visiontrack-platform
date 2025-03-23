"use client";

import React, { useState, useEffect } from "react";
import { Check, Loader2 } from "lucide-react";
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
  compatibleWith?: string[];
  verticalCapabilities?: any;
  configOptions: any;
  createdAt: string;
  updatedAt: string;
  source?: string;
  visionTrackId?: string;
  omniStackId?: string;
  model_id?: string;
  author?: string;
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
  { value: "FOOTPATH_TRACKING", label: "Footpath Tracking" },
  { value: "DEMOGRAPHICS", label: "Demographics" },
  { value: "FACE_DETECTION", label: "Face Detection" },
  { value: "HEATMAP_GENERATION", label: "Heatmap Generation" },
  { value: "SHOPLIFTING_DETECTION", label: "Shoplifting Detection" },
  { value: "PEOPLE_COUNTER", label: "People Counter" },
  { value: "CHECKOUT_COUNTER", label: "Checkout Counter" },
  { value: "GENERAL_OBJECT_DETECTION", label: "General Object Detection" },
  { value: "VEHICLE_DETECTION", label: "Vehicle Detection" },
  { value: "PPE_DETECTION", label: "PPE Detection" }
];

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Checkbox = ({ label, checked, onChange }: CheckboxProps) => (
  <label className="flex items-center space-x-3 cursor-pointer group">
    <div className="relative">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className={`
        w-5 h-5 border-2 rounded
        flex items-center justify-center
        transition-colors duration-200
        ${checked ? 'bg-blue-600 border-blue-600' : 'border-gray-300 bg-white'}
        group-hover:${checked ? 'bg-blue-700 border-blue-700' : 'border-blue-500'}
        dark:border-gray-600 dark:bg-gray-800
      `}>
        {checked && <Check size={14} className="text-white" />}
      </div>
    </div>
    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
      {label}
    </span>
  </label>
);

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
    compatibleWith: [],
    verticalCapabilities: null,
    capabilities: {
      features: [],
      metrics: []
    },
    configOptions: {},
    source: 'CUSTOM',
    model_id: "",
    author: ""
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
        configOptions: initialData.configOptions || {},
        compatibleWith: initialData.compatibleWith || [],
        verticalCapabilities: initialData.verticalCapabilities || null,
        source: initialData.verticalCapabilities || 'CUSTOM',
        model_id: initialData.model_id || "",
        author: initialData.author || "" 
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
        configOptions: {},
        compatibleWith: [],
        verticalCapabilities: null,
        source: 'CUSTOM',
        model_id: "",
        author: ""
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
      <div className="max-h-[70vh] overflow-y-auto pr-2 -mr-2">
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
            
<InputSelect
  name="source"
  label="Model Source"
  value={formData.source || ""}
  onChange={(e) => setFormData({ ...formData, source: e.target.value })}
  required
  options={[
    { value: "", label: "Select Source" },
    { value: "CUSTOM", label: "VisionTrack Team" },
    { value: "ROBOFLOW", label: "RoboFlow (Adjusted)" },
    { value: "THIRD_PARTY", label: "Third Party" }
  ]}
/>
            
            <div>
              
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

          <div className="space-y-4 mt-4">
  <h3 className="text-md font-medium">Business Compatibility</h3>
  <div className="grid grid-cols-2 gap-3">
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="retail"
      checked={formData.compatibleWith?.includes('RETAIL')}
      onChange={(e) => {
        const newCompatible = e.target.checked 
          ? [...(formData.compatibleWith || []), 'RETAIL']
          : (formData.compatibleWith || []).filter(v => v !== 'RETAIL');
        setFormData({...formData, compatibleWith: newCompatible});
      }}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
    />
    <label htmlFor="retail" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      Retail
    </label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="cre"
      checked={formData.compatibleWith?.includes('COMMERCIAL_REAL_ESTATE')}
      onChange={(e) => {
        const newCompatible = e.target.checked 
          ? [...(formData.compatibleWith || []), 'COMMERCIAL_REAL_ESTATE']
          : (formData.compatibleWith || []).filter(v => v !== 'COMMERCIAL_REAL_ESTATE');
        setFormData({...formData, compatibleWith: newCompatible});
      }}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
    />
    <label htmlFor="cre" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      Commercial Real Estate
    </label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="residential"
      checked={formData.compatibleWith?.includes('MULTI_FAMILY_RESIDENTIAL')}
      onChange={(e) => {
        const newCompatible = e.target.checked 
          ? [...(formData.compatibleWith || []), 'MULTI_FAMILY_RESIDENTIAL']
          : (formData.compatibleWith || []).filter(v => v !== 'MULTI_FAMILY_RESIDENTIAL');
        setFormData({...formData, compatibleWith: newCompatible});
      }}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
    />
    <label htmlFor="residential" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      Multi-Family Residential
    </label>
  </div>
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      id="manufacturing"
      checked={formData.compatibleWith?.includes('MANUFACTURING_WAREHOUSING')}
      onChange={(e) => {
        const newCompatible = e.target.checked 
          ? [...(formData.compatibleWith || []), 'MANUFACTURING_WAREHOUSING']
          : (formData.compatibleWith || []).filter(v => v !== 'MANUFACTURING_WAREHOUSING');
        setFormData({...formData, compatibleWith: newCompatible});
      }}
      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
    />
    <label htmlFor="manufacturing" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      Manufacturing & Warehousing
    </label>
  </div>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>
    <Label htmlFor="model_id">External Model ID</Label>
    <Input
      id="model_id"
      name="model_id"
      value={formData.model_id}
      onChange={handleInputChange}
      placeholder="e.g. external-model-123"
    />
  </div>
  <div>
    <Label htmlFor="author">Author</Label>
    <Input
      id="author"
      name="author"
      value={formData.author}
      onChange={handleInputChange}
      placeholder="e.g. John Doe"
    />
  </div>
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
      </div>
    </Modal>
  );
};

export default AIModelFormModal;