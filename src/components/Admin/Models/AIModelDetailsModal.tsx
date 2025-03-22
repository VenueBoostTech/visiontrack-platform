"use client";

import React from "react";
import {
  Cpu,
  RefreshCw,
  Check,
  X,
  Calendar,
  Clock,
  Code,
  Settings,
  Users,
  Route,
  BarChart2, 
  Thermometer,
  Calculator,
  UserCheck,
  HardHat,
  Eye,
  AlertTriangle,
  Scan,
  Car
} from "lucide-react";
import Modal from "@/components/Common/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

// Define AI model types and their metadata
const modelIcons = {
  FOOTPATH_TRACKING: <Route className="w-5 h-5" />,
  DEMOGRAPHICS: <UserCheck className="w-5 h-5" />,
  FACE_DETECTION: <Eye className="w-5 h-5" />,
  HEATMAP_GENERATION: <Thermometer className="w-5 h-5" />,
  SHOPLIFTING_DETECTION: <AlertTriangle className="w-5 h-5" />,
  PEOPLE_COUNTER: <Users className="w-5 h-5" />,
  CHECKOUT_COUNTER: <Calculator className="w-5 h-5" />,
  GENERAL_OBJECT_DETECTION: <Scan className="w-5 h-5" />,
  VEHICLE_DETECTION: <Car className="w-5 h-5" />,
  PPE_DETECTION: <HardHat className="w-5 h-5" />
};

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
}

interface AIModelDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  model: AIModel;
  isEnabled: boolean;
  onToggleStatus: () => void;
  isLoading: boolean;
}

const AIModelDetailsModal: React.FC<AIModelDetailsModalProps> = ({
  isOpen,
  onClose,
  model,
  isEnabled,
  onToggleStatus,
  isLoading
}) => {
  // Format capabilities for display
  const formatCapabilities = () => {
    if (!model.capabilities?.features) return "No capabilities data available";
    
    return (
      <div className="space-y-2">
        {model.capabilities.features.map((feature: string, index: number) => (
          <div key={index} className="flex items-start">
            <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    );
  };

  // Format metrics for display
  const formatMetrics = () => {
    if (!model.capabilities?.metrics) return "No metrics data available";
    
    return (
      <div className="space-y-2">
        {model.capabilities.metrics.map((metric: string, index: number) => (
          <Badge key={index} variant="outline" className="mr-2 mb-2">
            {metric}
          </Badge>
        ))}
      </div>
    );
  };

  // Format dates
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Modal
      title="AI Model Details"
      description="View detailed information about this AI model and its capabilities"
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="space-y-6">
        {/* Model header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-primary/10 mr-4">
              {modelIcons[model.type as keyof typeof modelIcons] || <Cpu className="w-6 h-6" />}
            </div>
            <div>
              <h3 className="text-xl font-semibold">{model.name}</h3>
              <div className="flex items-center mt-1 space-x-2">
                <Badge variant="outline">v{model.version}</Badge>
                <Badge 
                  variant={model.active ? "default" : "secondary"}
                  className="capitalize"
                >
                  {model.type.toLowerCase().replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 mr-2">
              {isEnabled ? "Enabled" : "Disabled"}
            </span>
            <Switch 
              checked={isEnabled}
              onCheckedChange={onToggleStatus}
              disabled={isLoading}
            />
            {isLoading && <RefreshCw className="h-4 w-4 animate-spin ml-2" />}
          </div>
        </div>

        {/* Model description */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
          <p className="text-sm">{model.description}</p>
        </div>

        {/* Model information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Capabilities</h4>
            {formatCapabilities()}
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Metrics Tracked</h4>
            {formatMetrics()}
          </div>
        </div>

        {/* Configuration options */}
        {model.configOptions && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Configuration Options</h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 overflow-auto">
              <pre className="text-xs">{JSON.stringify(model.configOptions, null, 2)}</pre>
            </div>
          </div>
        )}

        {/* Metadata */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Created</h4>
            <div className="flex items-center text-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              {formatDate(model.createdAt)}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Last Updated</h4>
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              {formatDate(model.updatedAt)}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t">
          {isEnabled && (
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Configure
            </Button>
          )}
          <Button onClick={onToggleStatus} disabled={isLoading}>
            {isLoading ? (
              <RefreshCw className="h-4 w-4 animate-spin mr-2" />
            ) : isEnabled ? (
              <X className="h-4 w-4 mr-2" />
            ) : (
              <Check className="h-4 w-4 mr-2" />
            )}
            {isEnabled ? "Disable" : "Enable"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AIModelDetailsModal;