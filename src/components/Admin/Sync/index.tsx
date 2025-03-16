"use client";

import { useState, useEffect } from "react";
import { 
  Plus, 
  RefreshCw, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ChevronDown, 
  Building2, 
  Map, 
  Camera, 
  Home 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import DeleteModal from "@/components/Common/Modals/DeleteModal";

// Define sync types and their metadata
const syncTypes = [
  { 
    id: "property", 
    name: "Properties", 
    icon: <Home className="w-5 h-5" />,
    description: "Sync all properties from VisionTrack AI Engine" 
  },
  { 
    id: "building", 
    name: "Buildings", 
    icon: <Building2 className="w-5 h-5" />,
    description: "Sync all buildings from VisionTrack AI Engine" 
  },
  { 
    id: "zones", 
    name: "Zones", 
    icon: <Map className="w-5 h-5" />,
    description: "Sync all zones from VisionTrack AI Engine" 
  },
  { 
    id: "camera", 
    name: "Cameras", 
    icon: <Camera className="w-5 h-5" />,
    description: "Sync all cameras from VisionTrack AI Engine" 
  }
];

// Mock data for sync history - in production this would come from an API
interface SyncHistoryItem {
  id: string;
  type: string;
  status: "success" | "failed";
  timestamp: string;
  duration: string;
  itemsProcessed: number;
  error?: string;
}

const SyncList = () => {
  const [activeTab, setActiveTab] = useState("property");
  const [isLoading, setIsLoading] = useState<Record<string, boolean>>({
    property: false,
    building: false,
    zones: false,
    camera: false
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [syncToConfirm, setSyncToConfirm] = useState("");
  const [syncHistory, setSyncHistory] = useState<Record<string, SyncHistoryItem[]>>({
    property: [],
    building: [],
    zones: [],
    camera: []
  });
  const [lastSync, setLastSync] = useState<Record<string, string | null>>({
    property: null,
    building: null,
    zones: null,
    camera: null
  });

  // Fetch sync history and last sync times on component mount
  useEffect(() => {
    // In a real app, this would be an API call to get history and last sync times
    const fetchSyncHistory = async () => {
      try {
        // Mock data - replace with actual API calls
        const mockHistory: Record<string, SyncHistoryItem[]> = {
          property: [
            {
              id: "1",
              type: "property",
              status: "success",
              timestamp: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
              duration: "45s",
              itemsProcessed: 124
            },
            {
              id: "2",
              type: "property",
              status: "failed",
              timestamp: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
              duration: "32s",
              itemsProcessed: 0,
              error: "API Connection timeout"
            }
          ],
          building: [
            {
              id: "3",
              type: "building",
              status: "success",
              timestamp: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
              duration: "1m 12s",
              itemsProcessed: 87
            }
          ],
          zones: [
            {
              id: "4",
              type: "zones",
              status: "success",
              timestamp: new Date(Date.now() - 432000000).toISOString(), // 5 days ago
              duration: "2m 38s",
              itemsProcessed: 245
            }
          ],
          camera: [
            {
              id: "5",
              type: "camera",
              status: "success",
              timestamp: new Date(Date.now() - 518400000).toISOString(), // 6 days ago
              duration: "3m 45s",
              itemsProcessed: 412
            }
          ]
        };

        setSyncHistory(mockHistory);

        // Set last sync times based on most recent successful sync
        const lastSyncTimes: Record<string, string | null> = {};
        Object.keys(mockHistory).forEach(type => {
          const successfulSyncs = mockHistory[type].filter(item => item.status === "success");
          if (successfulSyncs.length > 0) {
            // Sort by timestamp, newest first
            successfulSyncs.sort((a, b) => 
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            );
            lastSyncTimes[type] = successfulSyncs[0].timestamp;
          } else {
            lastSyncTimes[type] = null;
          }
        });

        setLastSync(lastSyncTimes);
      } catch (err) {
        console.error("Error fetching sync history:", err);
      }
    };

    fetchSyncHistory();
  }, []);

  const handleSyncClick = (type: string) => {
    setSyncToConfirm(type);
    setShowConfirmModal(true);
  };

  const performSync = async () => {
    const type = syncToConfirm;
    setShowConfirmModal(false);
    if (!type) return;

    setIsLoading({...isLoading, [type]: true});
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/sync/${type}`);
      const data = await response.json();
      
      if (data.message) {
        setMessage(data.message);
        
        // Create a new history entry
        const newHistoryItem: SyncHistoryItem = {
          id: Date.now().toString(),
          type,
          status: "success",
          timestamp: new Date().toISOString(),
          duration: "Just now",
          itemsProcessed: Math.floor(Math.random() * 100) + 20 // Mock data
        };
        
        setSyncHistory(prev => ({
          ...prev,
          [type]: [newHistoryItem, ...prev[type]]
        }));
        
        setLastSync(prev => ({
          ...prev,
          [type]: new Date().toISOString()
        }));
      } else {
        setError(data.error ?? "Something went wrong");
        
        // Create a failed history entry
        const newHistoryItem: SyncHistoryItem = {
          id: Date.now().toString(),
          type,
          status: "failed",
          timestamp: new Date().toISOString(),
          duration: "Just now",
          itemsProcessed: 0,
          error: data.error ?? "Unknown error"
        };
        
        setSyncHistory(prev => ({
          ...prev,
          [type]: [newHistoryItem, ...prev[type]]
        }));
      }
    } catch (err) {
      setError("Failed to sync. Please try again.");
      
      // Create a failed history entry
      const newHistoryItem: SyncHistoryItem = {
        id: Date.now().toString(),
        type,
        status: "failed",
        timestamp: new Date().toISOString(),
        duration: "Just now",
        itemsProcessed: 0,
        error: "Network error"
      };
      
      setSyncHistory(prev => ({
        ...prev,
        [type]: [newHistoryItem, ...prev[type]]
      }));
    } finally {
      setIsLoading({...isLoading, [type]: false});
      
      // Clear messages after 5 seconds
      setTimeout(() => {
        setMessage("");
        setError("");
      }, 5000);
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-700 font-bold">Sync Management</h2>
        <p className="text-gray-700 mt-1">
          Synchronize data between systems and view sync history
        </p>
      </div>

      {/* Status Messages */}
      {(message || error) && (
        <div className={`p-4 rounded-lg ${message ? 'bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-200' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-200'}`}>
          {message || error}
        </div>
      )}

      {/* Sync Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {syncTypes.map((syncType) => (
          <Card key={syncType.id}>
            <CardContent className="p-2">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${
                    isLoading[syncType.id] ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' :
                    lastSync[syncType.id] ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' :
                    'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400'
                  }`}>
                    {isLoading[syncType.id] ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      syncType.icon
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{syncType.name}</h3>
                    <p className="text-xs text-gray-500">{syncType.description}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 border-t pt-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>
                      {lastSync[syncType.id] 
                        ? formatTimeAgo(lastSync[syncType.id]!) 
                        : 'Never synced'}
                    </span>
                  </div>
                  <button
                    onClick={() => handleSyncClick(syncType.id)}
                    disabled={isLoading[syncType.id]}
                    className={`inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md 
                      ${isLoading[syncType.id]
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                        : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                  >
                    {isLoading[syncType.id] ? (
                      <>Syncing...</>
                    ) : (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 mr-1" />
                        Sync Now
                      </>
                    )}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Sync History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Sync History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start px-6 pt-2 border-b">
              {syncTypes.map((type) => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="relative"
                >
                  {type.name}
                  {syncHistory[type.id].length > 0 && (
                    <span className="ml-2 bg-gray-200 text-gray-800 text-xs px-1.5 py-0.5 rounded-full">
                      {syncHistory[type.id].length}
                    </span>
                  )}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {syncTypes.map((type) => (
              <TabsContent key={type.id} value={type.id} className="p-0">
                {syncHistory[type.id].length === 0 ? (
                  <div className="py-12 text-center text-gray-500">
                    <RefreshCw className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                    <p className="text-lg font-medium">No sync history</p>
                    <p className="text-sm">Run your first sync to see the history here</p>
                    <button
                      onClick={() => handleSyncClick(type.id)}
                      className="mt-4 inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Sync {type.name}
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items Processed</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {syncHistory[type.id].map((historyItem) => (
                          <tr key={historyItem.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                {historyItem.status === "success" ? (
                                  <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                ) : (
                                  <XCircle className="w-5 h-5 text-red-500 mr-2" />
                                )}
                                <span className={`text-sm font-medium ${
                                  historyItem.status === "success" ? "text-green-600" : "text-red-600"
                                }`}>
                                  {historyItem.status === "success" ? "Success" : "Failed"}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {format(new Date(historyItem.timestamp), "MMM d, yyyy h:mm a")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {historyItem.duration}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {historyItem.itemsProcessed}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                              {historyItem.error && (
                                <div className="text-red-600">{historyItem.error}</div>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      {/* Confirmation Modal */}
      <DeleteModal
        showDeleteModal={showConfirmModal}
        setShowDeleteModal={setShowConfirmModal}
        deleteText={`Sync ${syncTypes.find(t => t.id === syncToConfirm)?.name || ''}`}
        message={`Are you sure you want to sync ${syncTypes.find(t => t.id === syncToConfirm)?.name || ''}? This operation might take some time.`}
        handleDelete={performSync}
        loading={isLoading[syncToConfirm]}
      />
    </div>
  );
};

export default SyncList;