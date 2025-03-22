import React from "react";
import { Metadata } from "next";
import AIModelsList from "@/components/Admin/Models/AIModelsList";

export const metadata: Metadata = {
  title: "AI Models Management",
  description: "Manage AI models for computer vision analysis in VisionTrack",
};

const AIReadyGoModelsPage = () => {
  return <AIModelsList />;
};

export default AIReadyGoModelsPage;