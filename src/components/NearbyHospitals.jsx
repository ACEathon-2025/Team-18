import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NearbyHospitals = () => {
  // NMAMIT, Nitte (Karkala)
  const DEFAULT_LAT = 13.1782837;
  const DEFAULT_LNG = 74.9341312;

  const [coords, setCoords] = useState({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
  const [type, setType] = useState("hospitals");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Try user location; fallback to NMAMIT if denied
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
          });
          setLoading(false);
        },
        () => {
          setCoords({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
          setLoading(false);
        }
      );
    } else {
      setCoords({ lat: DEFAULT_LAT, lng: DEFAULT_LNG });
      setLoading(false);
    }
  }, []);

  // 🗺 Force query to always include “Nitte Karkala Karnataka” for accurate results
  const mapSrc = `https://www.google.com/maps?q=${type}+near+Nitte+Karkala+Karnataka&ll=${coords.lat},${coords.lng}&z=15&output=embed`;

  return (
    <section className="min-h-screen flex flex-col justify-center py-16 bg-gray-50 dark:bg-gradient-to-b dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 transition-all duration-500">
      <div className="max-w-5xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-8 bg-gradient-to-r from-blue-500 via-cyan-400 to-green-400 bg-clip-text text-transparent"
        >
          Nearby {type === "hospitals" ? "Hospitals" : "Medicals"}
          <br />
          <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
            (Around NMAMIT — Nitte, Karkala)
          </span>
        </motion.h2>

        {/* Toggle Buttons */}
        <div className="flex justify-center gap-6 mb-10 flex-wrap">
          {[
            { key: "hospitals", label: "🏥 Hospitals" },
            { key: "medicals", label: "💊 Medicals" },
          ].map((item) => (
            <motion.button
              key={item.key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setType(item.key)}
              className={`px-8 py-3 rounded-full text-lg font-semibold border-2 transition-all duration-300 ${
                type === item.key
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white border-blue-500 shadow-[0_0_15px_rgba(37,99,235,0.6)]"
                  : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-800 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-gray-700"
              }`}
            >
              {item.label}
            </motion.button>
          ))}
        </div>

        {/* Map Container — Full Width with Rounded Corners */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden shadow-2xl border border-gray-300 dark:border-gray-700 w-screen rounded-2xl"
        >
          {loading ? (
            <div className="flex items-center justify-center h-[450px] bg-gray-200 dark:bg-gray-800 rounded-2xl">
              <p className="text-lg animate-pulse text-gray-600 dark:text-gray-300">
                Detecting your location... Showing nearby {type}.
              </p>
            </div>
          ) : (
            <iframe
              key={type + mapSrc}
              src={mapSrc}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full rounded-2xl"
              title="Nearby Map"
            ></iframe>
          )}
        </motion.div>

        {/* Info Text */}
        <p className="mt-6 text-sm text-gray-600 dark:text-gray-400 italic px-4 sm:px-0">
          📍 Showing results near NMAMIT, Nitte (Karkala), Karnataka.
          <br />
          If location access is denied, default location (Nitte) is used.
        </p>
      </div>
    </section>
  );
};

export default NearbyHospitals;
