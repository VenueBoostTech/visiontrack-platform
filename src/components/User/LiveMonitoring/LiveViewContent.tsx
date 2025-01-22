"use client";

import React, { useCallback, useRef, useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Camera,
  Maximize2,
  Volume2,
  PlaySquare,
  Download,
  Share2,
  Plus,
} from "lucide-react";
import ReactPlayer from "react-player";
import Modal from "@/components/Common/Modal";
import CameraForm from "../Cameras/CameraForm";
import toast from "react-hot-toast";
import vtClient from '../../../lib/vt-external-api/client'
import { VTCameraService } from "@/lib/vt-external-api/services/vt-camera.service";

export default function LiveViewContent({ cameras, user }: any) {
  const [allCameras, setAllCameras] = useState(cameras);
  const [selectedCamera, setSelectedCamera] = useState(cameras[0]);
  const [currentCameras, setCurrentCameras] = useState<any[]>(cameras.slice(0, 1));
  const [layout, setLayout] = useState("1x1");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isClient, setIsClient] = useState(false); // To track client-side rendering
  const playerRef = useRef<(ReactPlayer | null)[]>([]);
  const hasFetched = useRef(false); // Track if the stream URLs have been fetched  

  useEffect(() => {
    // Set after the first render to ensure it only runs on the client
    setIsClient(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    if (!isSubmitting) {
      setShowCreateModal(false);
    }
  }, [isSubmitting]);

  const handleCreateCamera = async (formData: any) => {
    try {
      setIsSubmitting(true);
      const response = await fetch("/api/user/cameras", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to create camera");
      }

      const newCamera = await response.json();
      hasFetched.current = false;
      setCurrentCameras((prev: any) => [newCamera, ...prev]);
      setAllCameras((prev: any) => [newCamera, ...prev]);
      toast.success("Camera added successfully");
      handleCloseModal();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to create camera"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFullscreen = (index: number) => {
    if (playerRef.current[index]) {
      const playerContainer = playerRef.current[index]?.wrapper;
      if (playerContainer) {
        if (playerContainer.requestFullscreen) {
          playerContainer.requestFullscreen();
        } else if (playerContainer.webkitRequestFullscreen) { // Safari
          playerContainer.webkitRequestFullscreen();
        } else if (playerContainer.msRequestFullscreen) { // IE/Edge
          playerContainer.msRequestFullscreen();
        }
      }
    }
  };

  useEffect(() => {
    const getCameraStreamUrl = async (cameras: any) => {
      try {
        if (user.ownedBusiness.vtCredentials && cameras) {
          vtClient.setCredentials({
            platform_id: user.ownedBusiness.vtCredentials.businessId,
            api_key: user.ownedBusiness.vtCredentials.api_key,
            business_id: user.ownedBusiness.vtCredentials.platform_id,
          });

          const newCameras = [...cameras];
          cameras.forEach(async (camera: any, index: number) => {
            // const streamStatus: any = await VTCameraService.getCameraStreamStatus(camera.id);
            // if (streamStatus.is_active) {
            //   await VTCameraService.stopCameraStream(camera.id);
            // }

            const startResponse: any = await VTCameraService.startCameraStream(camera.id);
            newCameras[index] = { ...newCameras[index], stream_url: `https://coreapi.visiontrack.xyz${startResponse.stream_url}` };
          });

          setCurrentCameras(newCameras);
        }
      } catch (error) {
        toast.error("Failed to fetch camera stream");
      }
    };

    if (!hasFetched.current) {
      getCameraStreamUrl(currentCameras);
      hasFetched.current = true;
    }
  }, [selectedCamera, currentCameras]);

  const getGridLayout = () => {
    switch (layout) {
      case '1x1': return 'grid-cols-1';
      case '2x2': return 'grid-cols-2';
      case '3x3': return 'grid-cols-3';
      default: return 'grid-cols-2';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div>
          <h2 className="text-2xl font-bold">Live Camera View</h2>
          <p className="text-sm text-gray-500 mt-1">
            Monitor real-time camera feeds
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <select
            className="px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 w-full sm:w-auto"
            onChange={(e) => {
              hasFetched.current = false;
              setLayout(e.target.value);
              setSelectedCamera(e.target.value === "1x1" ? allCameras[0] : null);
              e.target.value === "2x2" ? setCurrentCameras(allCameras.slice(0, 4)) :
                e.target.value === "3x3" ? setCurrentCameras(allCameras.slice(0, 9)) :
                  setCurrentCameras(allCameras.slice(0, 1));
            }}
            value={layout}
          >
            <option value="1x1">Single View</option>
            <option value="2x2">2x2 Grid</option>
            <option value="3x3">3x3 Grid</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Camera List */}
        <div className="md:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cameras</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {allCameras.map((camera: any) => (
                  <button
                    key={camera.id}
                    onClick={() => {
                      hasFetched.current = false;
                      setSelectedCamera(camera);
                      setCurrentCameras([camera]);
                      setLayout("1x1");
                    }}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedCamera?.id === camera.id
                      ? "bg-gray-200 dark:bg-gray-300"
                      : ""
                      }`}
                  >
                    <Camera className="w-4 h-4" />
                    <div className="flex-1 text-left">
                      <p className="font-medium">{camera.name}</p>
                      <p className="text-sm text-gray-500">
                        {camera.zone.name}
                      </p>
                    </div>
                    <span
                      className={`w-2 h-2 rounded-full ${camera.status === "ACTIVE"
                        ? "bg-green-500"
                        : "bg-red-500"
                        }`}
                    />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Video Feed */}
        <div className="md:col-span-3">
          <Card className={`grid ${getGridLayout()} gap-4 aspect-[16/9]`}>
            {isClient && Array.from({ length: parseInt(layout[0]) * parseInt(layout[2]) }).map((_, index) => (
              <CardContent key={index} className="p-0">
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                  {currentCameras[index] ? (
                    currentCameras[index].stream_url ?
                      <>
                        <ReactPlayer
                          ref={(el) => { playerRef.current[index] = el; }}
                          url={currentCameras[index].stream_url}
                          playing
                          muted
                          width="100%"
                          height="90%"
                          config={{
                            file: {
                              attributes: {
                                controlsList: "nodownload",
                              },
                            },
                          }}
                        />

                        {/* Camera Info Overlay */}
                        <div className="absolute top-4 left-4 bg-black/50 rounded-lg p-2 text-white">
                          <p className="text-sm">{currentCameras[index].name}</p>
                          <p className="text-xs text-gray-300">{currentCameras[index].id}</p>
                        </div>

                        {/* Controls Overlay */}
                        <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                              <PlaySquare className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                              <Volume2 className="w-5 h-5" />
                            </button>
                          </div>
                          <div className="flex gap-2">
                            <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                              <Download className="w-5 h-5" />
                            </button>
                            <button className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors">
                              <Share2 className="w-5 h-5" />
                            </button>
                            <button onClick={() => handleFullscreen(index)} className="p-2 rounded-lg bg-black/50 text-white hover:bg-black/70 transition-colors" >
                              <Maximize2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </> :
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white" />
                      </div>
                  ) : (
                    <button
                      className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-gray-400 hover:bg-gray-800/50"
                      onClick={() => { setShowCreateModal(true) }}
                    >
                      <Plus className="w-8 h-8" />
                      <span>Add Camera</span>
                    </button>
                  )}
                </div>
              </CardContent>
            ))}
          </Card>

          {/* Camera Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Camera Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Resolution
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>1080p</option>
                    <option>720p</option>
                    <option>480p</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Frame Rate
                  </label>
                  <select className="w-full px-3 py-2 border rounded-lg">
                    <option>30 fps</option>
                    <option>24 fps</option>
                    <option>15 fps</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stream Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Bitrate</span>
                    <span>2.5 Mbps</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Latency</span>
                    <span>234ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Codec</span>
                    <span>H.264</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Create Camera Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={handleCloseModal}
        title="Add New Camera"
      >
        <CameraForm
          onSubmit={handleCreateCamera}
          onClose={handleCloseModal}
          isSubmitting={isSubmitting}
        />
      </Modal>
    </div>
  );
}
