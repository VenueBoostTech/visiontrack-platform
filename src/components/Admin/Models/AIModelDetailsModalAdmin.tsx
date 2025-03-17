"use client";

import React from "react";
import {
  Cpu,
  Edit,
  Trash,
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
  Building2
} from "lucide-react";
import Modal from "@/components/Common/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Define AI model types and their metadata
const modelIcons = {
  CUSTOMER_TRAFFIC: <Users className="w-5 h-5" />,
  FOOTPATH_ANALYSIS: <Route className="w-5 h-5" />,
  DEMOGRAPHICS: <UserCheck className="w-5 h-5" />,
  BEHAVIOR_ANALYSIS: <BarChart2 className="w-5 h-5" />,
  HEATMAP: <Thermometer className="w-5 h-5" />,
  CONVERSION_TRACKING: <Calculator className="w-5 h-5" />,
  CUSTOMER_COUNTER: <Users className="w-5 h-5" />
};

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

interface AIModelDetailsModalAdminProps {
  isOpen: boolean;
  onClose: () => void;
  model: AIModel;
  businessCount: number;
  onEdit: () => void;
  onToggleActive: () => void;
  onDelete: () => void;
  canDelete: boolean;
}

const AIModelDetailsModalAdmin: React.FC<AIModelDetailsModalAdminProps> = ({
  isOpen,
  onClose,
  model,
  businessCount,
  onEdit,
  onToggleActive,
  onDelete,
  canDelete
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
      description="Detailed information about this AI model and its capabilities"
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
                {model.active ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                    Inactive
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Model description */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Description</h4>
          <p className="text-sm">{model.description}</p>
        </div>

        {/* Business usage */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Business Usage</h4>
          <div className="flex items-center">
            <Building2 className="h-5 w-5 text-primary mr-2" />
            <span className="text-lg font-medium">
              {businessCount} {businessCount === 1 ? 'business' : 'businesses'} using this model
            </span>
          </div>
        </div>

        <Separator />

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
            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 overflow-auto max-h-48">
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
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="destructive" 
            onClick={onDelete} 
            disabled={!canDelete}
            title={!canDelete ? "Cannot delete model in use by businesses" : "Delete this model"}
          >
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </Button>
          
          <div className="space-x-2">
            <Button variant="outline" onClick={onEdit}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            
            <Button onClick={onToggleActive}>
              {model.active ? (
                <>
                  <X className="h-4 w-4 mr-2" />
                  Deactivate
                </>
              ) : (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Activate
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AIModelDetailsModalAdmin;