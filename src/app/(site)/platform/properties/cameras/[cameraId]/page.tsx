// app/user/properties/cameras/[cameraId]/page.tsx
import { Metadata } from "next";
import CameraDetailsContent from "@/components/Platform/Security/CameraDetails/CameraDetailsContent";

export const metadata: Metadata = {
  title: "Camera Details - VisionTrack",
  description: "Camera configuration and monitoring details",
};

export default function CameraDetailsPage({ params }: { params: { cameraId: string } }) {
  return (
    <>
      <CameraDetailsContent cameraId={params.cameraId} />
    </>
  );
}