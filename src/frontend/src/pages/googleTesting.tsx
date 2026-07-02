import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { get, post } from "../api/client";
import { ENDPOINT } from "../api/endpoints";

interface GoogleLocation {
  title: string;
  locationId: string;
  placeId?: string;
  name: string;
}

interface ConnectResponse {
  url: string;
}

interface SaveLocationResponse {
  message: string;
  locationId: string;
  location: GoogleLocation;
}

export default function GoogleBusinessConnect() {
  const [loading, setLoading] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [saving, setSaving] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const [locations, setLocations] = useState<GoogleLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState("");

  const connectGoogle = async () => {
    try {
      setConnecting(true);

      const data = await get<ConnectResponse>(ENDPOINT.GOOGLE_CONNECT, {
        auth: true,
      });

      window.location.href = data.url;
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Unable to connect Google.");
    } finally {
      setConnecting(false);
    }
  };

  const fetchLocations = async () => {
    try {
      setLoading(true);

      const data = await get<GoogleLocation[]>(ENDPOINT.GOOGLE_LOCATIONS, {
        auth: true,
      });

      setLocations(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  };

  const saveLocation = async () => {
    if (!selectedLocation) {
      alert("Please select a location.");
      return;
    }

    try {
      setSaving(true);

      const data = await post<SaveLocationResponse>(
        ENDPOINT.GOOGLE_LOCATION,
        {
          locationId: selectedLocation,
        },
        {
          auth: true,
        },
      );

      alert(data.message);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Failed to save location.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (params.get("connected") === "true") {
      setIsConnected(true);
      fetchLocations();

      window.history.replaceState({}, "", "/google-business");
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-6"
    >
      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Google Business Profile</h2>

            <p className="text-sm text-muted-foreground mt-1">
              Connect your Google Business Profile and select your business
              location.
            </p>
          </div>

          <button
            onClick={connectGoogle}
            disabled={connecting}
            className={`px-5 py-2 rounded-lg text-white ${
              isConnected ? "bg-green-600" : "bg-blue-600"
            }`}
          >
            {isConnected
              ? "Google Connected"
              : connecting
                ? "Connecting..."
                : "Connect Google"}
          </button>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-card">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-semibold">Google Locations</h3>

          <button
            onClick={fetchLocations}
            disabled={loading}
            className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
        </div>

        {loading ? (
          <div className="py-10 text-center">Fetching locations...</div>
        ) : locations.length === 0 ? (
          <div className="py-10 text-center text-gray-500">
            No Google locations found.
          </div>
        ) : (
          <>
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full border rounded-lg p-3"
            >
              <option value="">Select Google Location</option>

              {locations.map((location) => (
                <option key={location.locationId} value={location.locationId}>
                  {location.title}
                </option>
              ))}
            </select>

            {selectedLocation && (
              <div className="mt-6">
                {locations
                  .filter((item) => item.locationId === selectedLocation)
                  .map((location) => (
                    <div
                      key={location.locationId}
                      className="rounded-lg border p-5 space-y-3"
                    >
                      <div>
                        <span className="font-semibold">Business Name :</span>{" "}
                        {location.title}
                      </div>

                      <div>
                        <span className="font-semibold">Location ID :</span>{" "}
                        {location.locationId}
                      </div>

                      <div>
                        <span className="font-semibold">Place ID :</span>{" "}
                        {location.placeId || "-"}
                      </div>

                      <div>
                        <span className="font-semibold">Resource Name :</span>{" "}
                        {location.name}
                      </div>
                    </div>
                  ))}

                <button
                  onClick={saveLocation}
                  disabled={saving}
                  className="mt-5 px-5 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Location"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
