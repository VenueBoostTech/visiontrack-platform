"use client";

import { useState, useEffect } from "react";
import { 
  Cpu, 
  RefreshCw, 
  Check, 
  X, 
  MoreHorizontal, 
  Settings, 
  Info, 
  Eye, 
  BarChart2, 
  UserCheck, 
  Thermometer, 
  Route, 
  Users, 
  Calculator 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import Modal from "@/components/Common/Modal";
import AIModelDetailsModal from "./AIModelDetailsModal";

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

interface BusinessAIModel {
  id: string;
  modelId: string;
  aiModel: AIModel;
  enabled: boolean;
  configuration: any;
  cameras: any[];
}

const AIModelsList = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [businessModels, setBusinessModels] = useState<BusinessAIModel[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);
  const [loadingBusinessModels, setLoadingBusinessModels] = useState(true);
  const [activeTab, setActiveTab] = useState("available");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [toggleLoading, setToggleLoading] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Fetch available AI models
    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        const response = await fetch("/api/admin/models/ai");
        if (!response.ok) {
          throw new Error("Failed to fetch AI models");
        }
        const data = await response.json();
        setModels(data.models);
      } catch (error) {
        console.error("Error fetching AI models:", error);
        toast.error("Failed to load AI models");
      } finally {
        setLoadingModels(false);
      }
    };

    // Fetch enabled AI models for the current business
    const fetchBusinessModels = async () => {
      setLoadingBusinessModels(true);
      try {
        const response = await fetch("/api/admin/models/ai/business");
        if (!response.ok) {
          throw new Error("Failed to fetch business AI models");
        }
        const data = await response.json();
        setBusinessModels(data.businessModels);
      } catch (error) {
        console.error("Error fetching business AI models:", error);
        toast.error("Failed to load business AI models");
      } finally {
        setLoadingBusinessModels(false);
      }
    };

    fetchModels();
    fetchBusinessModels();
  }, []);

  const handleToggleModel = async (modelId: string, currentEnabled: boolean) => {
    setToggleLoading({ ...toggleLoading, [modelId]: true });
    
    try {
      const response = await fetch(`/api/admin/models/ai/business/${modelId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled: !currentEnabled,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update AI model status");
      }

      const data = await response.json();
      
      // If this is enabling a model for the first time
      if (!currentEnabled && !businessModels.find(bm => bm.modelId === modelId)) {
        setBusinessModels([...businessModels, data.businessModel]);
        toast.success("AI model enabled successfully");
      } else {
        // Update existing business model
        setBusinessModels(
          businessModels.map(bm => 
            bm.modelId === modelId ? { ...bm, enabled: !currentEnabled } : bm
          )
        );
        toast.success(currentEnabled ? "AI model disabled successfully" : "AI model enabled successfully");
      }
    } catch (error) {
      console.error("Error toggling AI model:", error);
      toast.error("Failed to update AI model status");
    } finally {
      setToggleLoading({ ...toggleLoading, [modelId]: false });
    }
  };

  const handleViewDetails = (model: AIModel) => {
    setSelectedModel(model);
    setShowDetailsModal(true);
  };

  const getModelStatus = (modelId: string) => {
    const businessModel = businessModels.find(bm => bm.modelId === modelId);
    return businessModel ? businessModel.enabled : false;
  };

  const isModelLoading = (modelId: string) => {
    return toggleLoading[modelId] || false;
  };

  // Group models by status (enabled/disabled)
  const enabledModels = models.filter(model => getModelStatus(model.id));
  const disabledModels = models.filter(model => !getModelStatus(model.id));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">AI Models Management</h1>
        <p className="text-muted-foreground">
          Configure and manage AI models for computer vision analysis across your properties
        </p>
      </div>

      {/* AI Models Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total AI Models</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.length}</div>
            <p className="text-xs text-muted-foreground">Available models for configuration</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{enabledModels.length}</div>
            <p className="text-xs text-muted-foreground">Currently processing data</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Models</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{disabledModels.length}</div>
            <p className="text-xs text-muted-foreground">Available but not in use</p>
          </CardContent>
        </Card>
      </div>

      {/* Model List */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="available" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start px-6 pt-2 border-b">
              <TabsTrigger value="available">
                All Available Models
                <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                  {models.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="enabled">
                Enabled
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
                  {enabledModels.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="disabled">
                Disabled
                <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                  {disabledModels.length}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* All Models Content */}
            <TabsContent value="available" className="p-0">
              {loadingModels ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {models.map((model) => (
                        <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-primary/10 mr-3">
                                {modelIcons[model.type as keyof typeof modelIcons] || <Cpu className="w-5 h-5" />}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {model.name}
                                </div>
                                <div className="text-sm text-gray-500 line-clamp-1">
                                  {model.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="capitalize">
                              {model.type.toLowerCase().replace(/_/g, ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            v{model.version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <Switch
                                checked={getModelStatus(model.id)}
                                disabled={isModelLoading(model.id)}
                                onCheckedChange={() => handleToggleModel(model.id, getModelStatus(model.id))}
                                className="mr-2"
                              />
                              {isModelLoading(model.id) ? (
                                <RefreshCw className="h-4 w-4 animate-spin text-primary" />
                              ) : getModelStatus(model.id) ? (
                                <span className="text-sm font-medium text-green-600">Active</span>
                              ) : (
                                <span className="text-sm font-medium text-gray-500">Inactive</span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleViewDetails(model)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  <span>View Details</span>
                                </DropdownMenuItem>
                                {getModelStatus(model.id) && (
                                  <>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                      <Settings className="mr-2 h-4 w-4" />
                                      <span>Configure</span>
                                    </DropdownMenuItem>
                                  </>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </TabsContent>

            {/* Enabled Models Content */}
            <TabsContent value="enabled" className="p-0">
              {loadingModels || loadingBusinessModels ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : enabledModels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cameras</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {enabledModels.map((model) => {
                        const businessModel = businessModels.find(bm => bm.modelId === model.id);
                        return (
                          <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="p-2 rounded-lg bg-primary/10 mr-3">
                                  {modelIcons[model.type as keyof typeof modelIcons] || <Cpu className="w-5 h-5" />}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900 dark:text-white">
                                    {model.name}
                                  </div>
                                  <div className="text-sm text-gray-500 line-clamp-1">
                                    {model.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge variant="outline" className="capitalize">
                                {model.type.toLowerCase().replace(/_/g, ' ')}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              v{model.version}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {businessModel?.cameras?.length || 0} cameras
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={() => handleViewDetails(model)}>
                                    <Eye className="mr-2 h-4 w-4" />
                                    <span>View Details</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Settings className="mr-2 h-4 w-4" />
                                    <span>Configure</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem
                                    className="text-red-600"
                                    onClick={() => handleToggleModel(model.id, true)}
                                  >
                                    <X className="mr-2 h-4 w-4" />
                                    <span>Disable</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <Info className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-lg font-medium">No enabled models</p>
                  <p className="text-sm">Enable AI models to start analyzing your camera feeds</p>
                </div>
              )}
            </TabsContent>

            {/* Disabled Models Content */}
            <TabsContent value="disabled" className="p-0">
              {loadingModels ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : disabledModels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {disabledModels.map((model) => (
                        <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="p-2 rounded-lg bg-gray-100 mr-3">
                                {modelIcons[model.type as keyof typeof modelIcons] || <Cpu className="w-5 h-5" />}
                              </div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {model.name}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge variant="outline" className="capitalize">
                              {model.type.toLowerCase().replace(/_/g, ' ')}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            v{model.version}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <p className="text-sm text-gray-500 line-clamp-1">
                              {model.description}
                            </p>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex space-x-2 justify-end">
                              <Button 
                                size="sm" 
                                onClick={() => handleViewDetails(model)}
                                variant="outline"
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Details
                              </Button>
                              <Button 
                                size="sm" 
                                onClick={() => handleToggleModel(model.id, false)}
                                disabled={isModelLoading(model.id)}
                                className="bg-primary text-white hover:bg-primary/90"
                              >
                                {isModelLoading(model.id) ? (
                                  <RefreshCw className="h-4 w-4 animate-spin mr-1" />
                                ) : (
                                  <Check className="h-4 w-4 mr-1" />
                                )}
                                Enable
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <Check className="h-12 w-12 mx-auto text-green-500 mb-3" />
                  <p className="text-lg font-medium">All models are enabled</p>
                  <p className="text-sm">You're utilizing all available AI models</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Model Details Modal */}
      {selectedModel && (
        <AIModelDetailsModal
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          model={selectedModel}
          isEnabled={getModelStatus(selectedModel.id)}
          onToggleStatus={() => handleToggleModel(selectedModel.id, getModelStatus(selectedModel.id))}
          isLoading={isModelLoading(selectedModel.id)}
        />
      )}
    </div>
  );
};

export default AIModelsList;