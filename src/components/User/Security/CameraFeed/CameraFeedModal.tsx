// components/Security/CameraFeed/CameraFeedModal.tsx
import Modal from '@/components/Common/Modal';
import { Activity, Camera, Maximize2, Settings, Video } from 'lucide-react';

interface CameraFeedModalProps {
  isOpen: boolean;
  onClose: () => void;
  camera: {
    id: string;
    name: string;
    status: string;
    motionDetected: boolean;
  };
}

export default function CameraFeedModal({ isOpen, onClose, camera }: CameraFeedModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Live Feed - ${camera?.name}`}
    >
      <div className="space-y-4">
        {/* Video Feed Container */}
        <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className={`px-2 py-1 text-xs rounded-full flex items-center gap-1 ${
              camera?.status === 'Online' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              <Video className="w-3 h-3" />
              {camera?.status}
            </span>
            {camera?.motionDetected && (
              <span className="px-2 py-1 text-xs rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Motion Detected
              </span>
            )}
          </div>
          
          {/* Placeholder for video feed */}
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <Camera className="w-12 h-12" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50">
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-sm border rounded-md hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
}