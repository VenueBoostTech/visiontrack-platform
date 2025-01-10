"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

const SyncList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const syncVTProperty = async (type: string) => {
    setIsLoading(true);
    const response = await fetch(`/api/sync/${type}`);
    const data = await response.json();
    if (data.message) {
      setMessage(data.message);
    } else {
      setError(data.error ?? "Something went wrong");
    }
    setTimeout(() => {
      setMessage("");
      setError("");
    }, 5000);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Sync</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={() => syncVTProperty("property")}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Sync VT Property
        </button>
        <button
          onClick={() => syncVTProperty("building")}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Sync VT Building
        </button>
        <button
          onClick={() => syncVTProperty("zones")}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Sync VT Zone
        </button>
        <button
          onClick={() => syncVTProperty("camera")}
          disabled={isLoading}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90"
        >
          <Plus className="w-4 h-4 mr-2" />
          Sync VT Camera
        </button>
      </div>
      <div>
        {message && <p className="text-sm text-green-500">{message}</p>}
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default SyncList;
