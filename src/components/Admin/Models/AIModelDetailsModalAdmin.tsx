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
  Building2,
  Scan,
  Car,
  HardHat,
  AlertTriangle,
  Eye
} from "lucide-react";
import Modal from "@/components/Common/Modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
  visionTrackId?: string;
  omniStackId?: string;
  model_id?: string;
  author?: string;
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

  // Business Type mapping for display
  const businessTypeNames = {
    RETAIL: "Retail",
    COMMERCIAL_REAL_ESTATE: "Commercial Real Estate",
    MULTI_FAMILY_RESIDENTIAL: "Multi-Family Residential",
    MANUFACTURING_WAREHOUSING: "Manufacturing/Warehousing"
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

        <div className="mt-6">
  <h3 className="text-lg font-medium">Vertical-Specific Capabilities</h3>
  
  {model.verticalCapabilities ? (
    <div className="mt-4 grid gap-4">
      {Object.entries(model.verticalCapabilities).map(([vertical, data]: [string, any]) => (
        <Card key={vertical}>
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-md">
                {businessTypeNames[vertical as keyof typeof businessTypeNames] || vertical}
              </CardTitle>
              <Badge>{data.name}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="text-sm font-medium mb-2">Features</h4>
            <ul className="pl-5 list-disc space-y-1">
              {data.features.map((feature: string, index: number) => (
                <li key={index} className="text-sm text-gray-600">{feature}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  ) : (
    <p className="text-gray-500 mt-2">
      No vertical-specific capabilities defined for this model.
    </p>
  )}
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
            
            <Button className="text-white" onClick={onToggleActive}>
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