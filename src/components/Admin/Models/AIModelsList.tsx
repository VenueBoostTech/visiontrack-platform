"use client";

import { useState, useEffect } from "react";
import { 
  Cpu, 
  RefreshCw, 
  Edit,
  Plus,
  Trash,
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
  Calculator,
  Building2
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "react-hot-toast";
import Modal from "@/components/Common/Modal";
import AIModelDetailsModalAdmin from "./AIModelDetailsModalAdmin";
import AIModelFormModal from "./AIModelFormModal";
import DeleteModal from "@/components/Common/Modals/DeleteModal";
import InputSelect from "@/components/Common/InputSelect";

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

interface BusinessCount {
  modelId: string;
  count: number;
}

const AIModelsList = () => {
  const [models, setModels] = useState<AIModel[]>([]);
  const [businessCounts, setBusinessCounts] = useState<BusinessCount[]>([]);
  const [loadingModels, setLoadingModels] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  
  // This will store the selected action values for each model
  const [modelActions, setModelActions] = useState<{[key: string]: string}>({});

  // Filter models
  const activeModels = models.filter(model => model.active);
  const inactiveModels = models.filter(model => !model.active);

  useEffect(() => {
    fetchModels();
    fetchBusinessCounts();
  }, []);

  // Initialize default actions for all models
  useEffect(() => {
    if (models.length > 0) {
      const initialActions = models.reduce((acc, model) => {
        acc[model.id] = "Select Action";
        return acc;
      }, {} as {[key: string]: string});
      
      setModelActions(initialActions);
    }
  }, [models]);

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

  const fetchBusinessCounts = async () => {
    try {
      const response = await fetch("/api/admin/models/ai/business-counts");
      if (!response.ok) {
        throw new Error("Failed to fetch business counts");
      }
      const data = await response.json();
      setBusinessCounts(data.businessCounts);
    } catch (error) {
      console.error("Error fetching business counts:", error);
    }
  };

  const handleViewDetails = (model: AIModel) => {
    setSelectedModel(model);
    setShowDetailsModal(true);
  };

  const handleEditModel = (model: AIModel) => {
    setSelectedModel(model);
    setIsEditing(true);
    setShowFormModal(true);
  };

  const handleAddNewModel = () => {
    setSelectedModel(null);
    setIsEditing(false);
    setShowFormModal(true);
  };

  const handleDeleteModel = (model: AIModel) => {
    setSelectedModel(model);
    setShowDeleteModal(true);
  };

  const confirmDeleteModel = async () => {
    if (!selectedModel) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/models/ai/${selectedModel.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete model");
      }
      
      toast.success("AI model deleted successfully");
      setModels(models.filter(m => m.id !== selectedModel.id));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Error deleting model:", error);
      toast.error("Failed to delete AI model");
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleActive = async (model: AIModel) => {
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/models/ai/${model.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          active: !model.active,
        }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update model status");
      }
      
      const data = await response.json();
      setModels(models.map(m => m.id === model.id ? data.model : m));
      toast.success(`AI model ${model.active ? 'deactivated' : 'activated'} successfully`);
    } catch (error) {
      console.error("Error toggling model status:", error);
      toast.error("Failed to update AI model status");
    } finally {
      setActionLoading(false);
    }
  };

  const handleSaveModel = async (formData: any) => {
    setActionLoading(true);
    try {
      if (isEditing && selectedModel) {
        // Update existing model
        const response = await fetch(`/api/admin/models/ai/${selectedModel.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error("Failed to update model");
        }
        
        const data = await response.json();
        setModels(models.map(m => m.id === selectedModel.id ? data.model : m));
        toast.success("AI model updated successfully");
      } else {
        // Create new model
        const response = await fetch('/api/admin/models/ai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (!response.ok) {
          throw new Error("Failed to create model");
        }
        
        const data = await response.json();
        setModels([...models, data.model]);
        toast.success("AI model created successfully");
      }
      
      setShowFormModal(false);
    } catch (error) {
      console.error("Error saving model:", error);
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} AI model`);
    } finally {
      setActionLoading(false);
    }
  };

  const getBusinessCount = (modelId: string) => {
    const count = businessCounts.find(bc => bc.modelId === modelId);
    return count ? count.count : 0;
  };

  // Handle action selection through InputSelect
  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>, model: AIModel) => {
    const action = e.target.value;
    
    // Reset the select to default after processing
    setModelActions({
      ...modelActions,
      [model.id]: "Select Action"
    });
    
    // Process the selected action
    switch(action) {
      case "view":
        handleViewDetails(model);
        break;
      case "edit":
        handleEditModel(model);
        break;
      case "activate":
        handleToggleActive(model);
        break;
      case "deactivate":
        handleToggleActive(model);
        break;
      case "delete":
        handleDeleteModel(model);
        break;
      default:
        break;
    }
  };

  // Generate action options for a model
  const getActionOptions = (model: AIModel) => {
    const canDelete = getBusinessCount(model.id) === 0;
    
    const baseOptions = [
      { value: "Select Action", label: "Select Action" },
      { value: "view", label: "View Details" },
      { value: "edit", label: "Edit Model" },
    ];
    
    // Add toggle active option based on current state
    if (model.active) {
      baseOptions.push({ value: "deactivate", label: "Deactivate" });
    } else {
      baseOptions.push({ value: "activate", label: "Activate" });
    }
    
    // Add delete option if allowed
    if (canDelete) {
      baseOptions.push({ value: "delete", label: "Delete" });
    }
    
    return baseOptions;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl text-gray-700 font-bold">AI Models Administration</h1>
          <p className="text-gray-700 mt-1">
            Manage global AI models available to all businesses in the platform
          </p>
        </div>
        <Button onClick={handleAddNewModel} className="bg-primary text-white">
          <Plus className="h-4 w-4 mr-2" />
          Add New Model
        </Button>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Models</CardTitle>
            <Cpu className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{models.length}</div>
            <p className="text-xs text-muted-foreground">Available in the platform</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Models</CardTitle>
            <Check className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeModels.length}</div>
            <p className="text-xs text-muted-foreground">Available to businesses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inactive Models</CardTitle>
            <X className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inactiveModels.length}</div>
            <p className="text-xs text-muted-foreground">Hidden from businesses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Model Usage</CardTitle>
            <Building2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {businessCounts.reduce((sum, item) => sum + item.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Business-model associations</p>
          </CardContent>
        </Card>
      </div>

      {/* Model List */}
      <Card>
        <CardHeader>
          <CardTitle>AI Models</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start px-6 pt-2 border-b">
              <TabsTrigger value="all">
                All Models
                <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                  {models.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="active">
                Active
                <span className="ml-2 bg-green-100 text-green-800 text-xs px-1.5 py-0.5 rounded-full">
                  {activeModels.length}
                </span>
              </TabsTrigger>
              <TabsTrigger value="inactive">
                Inactive
                <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                  {inactiveModels.length}
                </span>
              </TabsTrigger>
            </TabsList>

            {/* All Models Tab */}
            <TabsContent value="all" className="p-0">
              {loadingModels ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : models.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Businesses</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {models.map((model) => (
                        <tr key={model.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`p-2 rounded-lg ${model.active ? 'bg-primary/10' : 'bg-gray-100'} mr-3`}>
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
                            {model.active ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                <Check className="w-3.5 h-3.5 mr-1" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                <X className="w-3.5 h-3.5 mr-1" />
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <Badge variant={getBusinessCount(model.id) > 0 ? "default" : "secondary"}>
                              {getBusinessCount(model.id)} {getBusinessCount(model.id) === 1 ? 'business' : 'businesses'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="w-40 ml-auto">
                              <InputSelect
                                name={`action-${model.id}`}
                                label=""
                                options={getActionOptions(model)}
                                value={modelActions[model.id] || "Select Action"}
                                onChange={(e) => handleActionChange(e, model)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <Cpu className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-lg font-medium">No AI models found</p>
                  <p className="text-sm">Create your first AI model to get started</p>
                  <Button 
                    onClick={handleAddNewModel} 
                    className="mt-4 bg-primary text-white"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Model
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Active Models Tab */}
            <TabsContent value="active" className="p-0">
              {loadingModels ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : activeModels.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Model</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Businesses</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {activeModels.map((model) => (
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
                            <Badge variant={getBusinessCount(model.id) > 0 ? "default" : "secondary"}>
                              {getBusinessCount(model.id)} {getBusinessCount(model.id) === 1 ? 'business' : 'businesses'}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="w-40 ml-auto">
                              <InputSelect
                                name={`action-${model.id}`}
                                label=""
                                options={getActionOptions(model)}
                                value={modelActions[model.id] || "Select Action"}
                                onChange={(e) => handleActionChange(e, model)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  <Info className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                  <p className="text-lg font-medium">No active models</p>
                  <p className="text-sm">Activate models to make them available to businesses</p>
                </div>
              )}
            </TabsContent>

            {/* Inactive Models Tab */}
            <TabsContent value="inactive" className="p-0">
              {loadingModels ? (
                <div className="flex justify-center items-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : inactiveModels.length > 0 ? (
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
                      {inactiveModels.map((model) => (
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
                            <div className="w-40 ml-auto">
                              <InputSelect
                                name={`action-${model.id}`}
                                label=""
                                options={getActionOptions(model)}
                                value={modelActions[model.id] || "Select Action"}
                                onChange={(e) => handleActionChange(e, model)}
                              />
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
                  <p className="text-lg font-medium">All models are active</p>
                  <p className="text-sm">No inactive models found</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Model Details Modal */}
      {selectedModel && (
        <AIModelDetailsModalAdmin
          isOpen={showDetailsModal}
          onClose={() => setShowDetailsModal(false)}
          model={selectedModel}
          businessCount={getBusinessCount(selectedModel.id)}
          onEdit={() => {
            setShowDetailsModal(false);
            handleEditModel(selectedModel);
          }}
          onToggleActive={() => {
            setShowDetailsModal(false);
            handleToggleActive(selectedModel);
          }}
          onDelete={() => {
            setShowDetailsModal(false);
            handleDeleteModel(selectedModel);
          }}
          canDelete={getBusinessCount(selectedModel.id) === 0}
        />
      )}

      {/* Add/Edit Model Form Modal */}
      <AIModelFormModal
        isOpen={showFormModal}
        onClose={() => setShowFormModal(false)}
        initialData={selectedModel}
        isEditing={isEditing}
        onSubmit={handleSaveModel}
        isLoading={actionLoading}
      />

      {/* Delete Confirmation Modal */}
      <DeleteModal
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        deleteText={`Delete ${selectedModel?.name}`}
        message={`Are you sure you want to delete the "${selectedModel?.name}" AI model? This action cannot be undone.`}
        handleDelete={confirmDeleteModel}
        loading={actionLoading}
      />
    </div>
  );
};

export default AIModelsList