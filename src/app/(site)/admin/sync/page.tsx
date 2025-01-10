import React from "react";
import { Metadata } from "next";
import SyncList from "@/components/Admin/Sync";

export const metadata: Metadata = {
  title: "Sync",
  description: "Sync your database with VisionTrack API",
};

const SyncPage = () => {
  return <SyncList />;
};

export default SyncPage;
