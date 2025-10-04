"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  GoogleMap,
  DrawingManager,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api";
import {
  FaSquare,
  FaDrawPolygon,
  FaHandPaper,
  FaEdit,
} from "react-icons/fa";
import { FileText, Copy, Check, MapPin, Layers, Save, Trash2 } from "lucide-react";
import Sidebar from "../../components/sidebar/Sidebar";
import ProtectedPage from "../../components/contact/ProtectedPage/AuthorizedPage";

const libraries = ["drawing", "geometry"];
const containerStyle = { width: "100%", height: "100%", minHeight: "400px" };
const initialCenter = { lat: 30.157, lng: 71.5249 };

function km2ToHectares(km2) {
  return km2 * 100;
}
function km2ToAcres(km2) {
  return km2 * 247.105;
}
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}
function generateFarmId(coords) {
  if (!Array.isArray(coords) || coords.length === 0) return `F-${Date.now()}`;
  const lat = coords[0].lat.toFixed(2);
  const lng = coords[0].lng.toFixed(2);
  const ts = Date.now().toString().slice(-4);
  return `F-${lat.replace(".", "")}${lng.replace(".", "")}${ts}`;
}

function decodeJwt(token) {
  if (!token || typeof window === "undefined") return null;
  try {
    const parts = token.split(".");
    if (parts.length < 2) return null;
    const payload = parts[1];
    const b64 = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(b64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(json);
  } catch (e) {
    console.warn("Failed to decode JWT", e);
    return null;
  }
}

const Page = forwardRef(({ onAreaData, searchLocation }, ref) => {
  const [loading, setLoading] = useState(false);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const [areaInfo, setAreaInfo] = useState(null);
  const [selectedTool, setSelectedTool] = useState("hand");
  const [areaUnit, setAreaUnit] = useState("ha");
  const [drawingManager, setDrawingManager] = useState(null);
  const [mapCenter, setMapCenter] = useState(initialCenter);
  const [searchMarker, setSearchMarker] = useState(null);
  const mapRef = useRef(null);
  const [lineLengthKm, setLineLengthKm] = useState(null);
  const [shapeDate, setShapeDate] = useState(null);
  const [kmlCoordinates, setKmlCoordinates] = useState(null);
  const [selectedShape, setSelectedShape] = useState(null);
  const [deviceMarkers, setDeviceMarkers] = useState([]);
  const [forms, setForms] = useState([]);
  const kmlInputRef = useRef();

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = localStorage.getItem("mapAreaInfo");
      if (saved) setAreaInfo(JSON.parse(saved));
    } catch (e) {
      console.warn("Invalid mapAreaInfo in localStorage", e);
    }
    const savedUnit = localStorage.getItem("areaUnit");
    if (savedUnit) setAreaUnit(savedUnit);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (areaInfo) localStorage.setItem("mapAreaInfo", JSON.stringify(areaInfo));
    else localStorage.removeItem("mapAreaInfo");
  }, [areaInfo]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (areaUnit) localStorage.setItem("areaUnit", areaUnit);
  }, [areaUnit]);

  const metersToLat = (meters) => meters / 111320;
  const metersToLng = (meters, latitude) =>
    meters / (111320 * Math.cos((latitude * Math.PI) / 180));

  const clearDeviceMarkers = () => {
    setDeviceMarkers([]);
  };

  const placeDevicesInArea = (coords, spacingMeters = 1000) => {
    if (!Array.isArray(coords) || coords.length === 0) return [];
    if (typeof window === "undefined" || !isLoaded || !window.google || !window.google.maps.geometry) {
      const centroid = coords.reduce(
        (acc, c) => {
          acc.lat += c.lat;
          acc.lng += c.lng;
          return acc;
        },
        { lat: 0, lng: 0 }
      );
      centroid.lat /= coords.length;
      centroid.lng /= coords.length;
      const fallback = [{ lat: centroid.lat, lng: centroid.lng }];
      setDeviceMarkers(fallback);
      return fallback;
    }

    const polygonPath = coords.map((c) => new window.google.maps.LatLng(c.lat, c.lng));
    const polygon = new window.google.maps.Polygon({ paths: polygonPath });

    let minLat = 90,
      maxLat = -90,
      minLng = 180,
      maxLng = -180;
    coords.forEach((p) => {
      minLat = Math.min(minLat, p.lat);
      maxLat = Math.max(maxLat, p.lat);
      minLng = Math.min(minLng, p.lng);
      maxLng = Math.max(maxLng, p.lng);
    });

    const latStep = metersToLat(spacingMeters);
    const markers = [];
    for (let lat = minLat; lat <= maxLat; lat += latStep) {
      const lngStep = metersToLng(spacingMeters, lat);
      for (let lng = minLng; lng <= maxLng; lng += lngStep) {
        const pointLatLng = new window.google.maps.LatLng(lat, lng);
        if (window.google.maps.geometry.poly.containsLocation(pointLatLng, polygon)) {
          markers.push({ lat, lng });
        }
      }
    }

    if (markers.length === 0) {
      const centroid = coords.reduce(
        (acc, c) => {
          acc.lat += c.lat;
          acc.lng += c.lng;
          return acc;
        },
        { lat: 0, lng: 0 }
      );
      centroid.lat /= coords.length;
      centroid.lng /= coords.length;
      markers.push({ lat: centroid.lat, lng: centroid.lng });
    }

    setDeviceMarkers(markers);
    return markers;
  };

  useEffect(() => {
    if (searchLocation && mapRef.current) {
      const { lat, lng } = searchLocation;
      const newCenter = { lat, lng };
      setMapCenter(newCenter);
      setSearchMarker({ position: newCenter, title: searchLocation.address || "Searched location" });
      mapRef.current.panTo(newCenter);
      mapRef.current.setZoom(15);
    }
  }, [searchLocation]);

  const onLoad = (map) => {
    mapRef.current = map;
    if (areaInfo && Array.isArray(areaInfo.coordinates) && areaInfo.coordinates.length && isLoaded && typeof window !== "undefined") {
      try {
        const bounds = new window.google.maps.LatLngBounds();
        areaInfo.coordinates.forEach((c) => bounds.extend(c));
        map.fitBounds(bounds);
      } catch (e) {}
    }
  };

  const onDrawingManagerLoad = (manager) => {
    setDrawingManager(manager);
  };

  const handleToolChange = (tool) => {
    setSelectedTool(tool);
    if (!drawingManager || !isLoaded || typeof window === "undefined") return;
    drawingManager.setDrawingMode(null);
    if (tool === "rectangle") drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.RECTANGLE);
    else if (tool === "polygon") drawingManager.setDrawingMode(window.google.maps.drawing.OverlayType.POLYGON);
    else drawingManager.setDrawingMode(null);
  };

  const updatePolygonDetails = (polygon) => {
    if (!isLoaded || typeof window === "undefined") return;
    const path = polygon.getPath();
    const coords = [];
    for (let i = 0; i < path.getLength(); i++) {
      const pt = path.getAt(i);
      coords.push({ lat: pt.lat(), lng: pt.lng() });
    }
    const areaM2 = window.google.maps.geometry.spherical.computeArea(path);
    const areaKm2 = areaM2 / 1_000_000;
    let minLat = 90, maxLat = -90, minLng = 180, maxLng = -180;
    coords.forEach((p) => {
      minLat = Math.min(minLat, p.lat);
      maxLat = Math.max(maxLat, p.lat);
      minLng = Math.min(minLng, p.lng);
      maxLng = Math.max(maxLng, p.lng);
    });
    const approxWidth = getDistance(minLat, minLng, minLat, maxLng);
    const approxHeight = getDistance(minLat, minLng, maxLat, minLng);
    const farmId = generateFarmId(coords);

    const data = {
      type: "polygon",
      coordinates: coords,
      areaKm2,
      areaHectares: km2ToHectares(areaKm2).toFixed(2),
      areaAcres: km2ToAcres(areaKm2).toFixed(2),
      width: approxWidth.toFixed(2),
      height: approxHeight.toFixed(2),
      farmId,
    };
    setAreaInfo(data);
    if (onAreaData) onAreaData(data);
    localStorage.setItem("mapAreaInfo", JSON.stringify(data));
    placeDevicesInArea(coords, 1000);
  };

  const updateRectangleDetails = (rectangle) => {
    if (!isLoaded || typeof window === "undefined") return;
    const bounds = rectangle.getBounds();
    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();
    const width = getDistance(sw.lat(), sw.lng(), sw.lat(), ne.lng());
    const height = getDistance(sw.lat(), sw.lng(), ne.lat(), sw.lng());
    const areaKm2 = width * height;
    const coords = [{ lat: sw.lat(), lng: sw.lng() }, { lat: ne.lat(), lng: ne.lng() }];
    const farmId = generateFarmId(coords);
    const data = {
      type: "rectangle",
      width: width.toFixed(2),
      height: height.toFixed(2),
      areaKm2,
      areaHectares: km2ToHectares(areaKm2).toFixed(2),
      areaAcres: km2ToAcres(areaKm2).toFixed(2),
      coordinates: coords,
      farmId,
    };
    setAreaInfo(data);
    if (onAreaData) onAreaData(data);
    localStorage.setItem("mapAreaInfo", JSON.stringify(data));
    placeDevicesInArea([
      { lat: sw.lat(), lng: sw.lng() },
      { lat: sw.lat(), lng: ne.lng() },
      { lat: ne.lat(), lng: ne.lng() },
      { lat: ne.lat(), lng: sw.lng() },
    ], 1000);
  };

  const handleRectangleComplete = (rectangle) => {
    if (!isLoaded || typeof window === "undefined") return;
    updateRectangleDetails(rectangle);
    setSelectedShape(rectangle);
    rectangle.addListener("click", () => {
      if (selectedShape && selectedShape.setEditable) selectedShape.setEditable(false);
      setSelectedShape(rectangle);
    });
    rectangle.addListener("bounds_changed", () => updateRectangleDetails(rectangle));
    rectangle.setEditable(false);
  };

  const handlePolygonComplete = (polygon) => {
    if (!isLoaded || typeof window === "undefined") return;
    updatePolygonDetails(polygon);
    setSelectedShape(polygon);
    polygon.addListener("click", () => {
      if (selectedShape && selectedShape.setEditable) selectedShape.setEditable(false);
      setSelectedShape(polygon);
    });
    polygon.getPath().addListener("set_at", () => updatePolygonDetails(polygon));
    polygon.getPath().addListener("insert_at", () => updatePolygonDetails(polygon));
    polygon.getPath().addListener("remove_at", () => updatePolygonDetails(polygon));
    polygon.setEditable(false);
  };

  const handleKmlFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.name.endsWith(".kml")) {
      alert("Please upload a .kml file");
      return;
    }
    if (!isLoaded || typeof window === "undefined") {
      alert("Map not ready");
      return;
    }
    const text = await file.text();
    const doc = new window.DOMParser().parseFromString(text, "text/xml");
    const bounds = new window.google.maps.LatLngBounds();
    let drawn = false;
    let kmlAreaData = null;
    let foundLine = false;
    let foundPolygon = false;
    let tempLineLengthKm = null;
    let tempShapeDate = null;

    doc.querySelectorAll("Polygon coordinates").forEach((tag) => {
      foundPolygon = true;
      const coords = tag.textContent.trim().split(/\s+/).map((line) => {
        const [lng, lat] = line.split(",").map(Number);
        bounds.extend({ lat, lng });
        return { lat, lng };
      });
      new window.google.maps.Polygon({
        paths: coords,
        strokeColor: "#FF0000",
        fillColor: "#FF0000",
        fillOpacity: 0.35,
        map: mapRef.current,
      });
      drawn = true;
      if (window.google && window.google.maps.geometry) {
        const path = coords.map((c) => new window.google.maps.LatLng(c.lat, c.lng));
        const areaM2 = window.google.maps.geometry.spherical.computeArea(path);
        const areaKm2 = areaM2 / 1_000_000;
        const farmId = generateFarmId(coords);
        kmlAreaData = {
          type: "polygon",
          coordinates: coords,
          areaKm2,
          areaHectares: km2ToHectares(areaKm2).toFixed(2),
          areaAcres: km2ToAcres(areaKm2).toFixed(2),
          farmId,
        };
        setKmlCoordinates(coords);
        placeDevicesInArea(coords, 1000);
      }
    });

    doc.querySelectorAll("LineString coordinates").forEach((tag) => {
      foundLine = true;
      const coords = tag.textContent.trim().split(/\s+/).map((line) => {
        const [lng, lat] = line.split(",").map(Number);
        bounds.extend({ lat, lng });
        return { lat, lng };
      });
      new window.google.maps.Polyline({ path: coords, strokeColor: "#0000FF", map: mapRef.current });
      drawn = true;
      if (window.google && window.google.maps.geometry) {
        const path = coords.map((c) => new window.google.maps.LatLng(c.lat, c.lng));
        tempLineLengthKm = window.google.maps.geometry.spherical.computeLength(path) / 1000;
        setKmlCoordinates(coords);
      }
    });

    doc.querySelectorAll("Point coordinates").forEach((tag) => {
      const [lng, lat] = tag.textContent.trim().split(",").map(Number);
      bounds.extend({ lat, lng });
      new window.google.maps.Marker({ position: { lat, lng }, map: mapRef.current });
      drawn = true;
    });

    doc.querySelectorAll("Placemark").forEach((placemark) => {
      const timeTag = placemark.querySelector("TimeStamp when");
      if (timeTag) tempShapeDate = timeTag.textContent.trim();
    });

    if (drawn) mapRef.current.fitBounds(bounds);
    else alert("No supported shapes found in KML");

    if (kmlAreaData) {
      setAreaInfo(kmlAreaData);
      localStorage.setItem("mapAreaInfo", JSON.stringify(kmlAreaData));
    }
    if (foundLine && !foundPolygon && tempLineLengthKm !== null) setLineLengthKm(tempLineLengthKm);
    else setLineLengthKm(null);

    setShapeDate(tempShapeDate || null);

    if (kmlInputRef.current) kmlInputRef.current.value = "";
  };

  useImperativeHandle(ref, () => ({
    getMap: () => mapRef.current,
    fitBounds: (bounds) => {
      if (mapRef.current) mapRef.current.fitBounds(bounds);
    },
    clearShapes: () => {
      setAreaInfo(null);
      clearDeviceMarkers();
      setKmlCoordinates(null);
      setLineLengthKm(null);
      if (mapRef.current && typeof window !== "undefined" && window.google) {
      }
    },
    clearDrawingShapes: () => {
      if (drawingManager) drawingManager.setDrawingMode(null);
    },
  }));

  const getAreaValue = () => {
    if (!areaInfo) return "";
    if (areaUnit === "ha") return `${(areaInfo.areaKm2 * 100).toFixed(2)} ha`;
    if (areaUnit === "ac") return `${(areaInfo.areaKm2 * 247.105).toFixed(2)} ac`;
    return `${areaInfo.areaKm2} km²`;
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const res = await fetch("https://earthscansystems.com/farmerdatauser/userfarm/");
        if (!res.ok) return;
        const json = await res.json();
        setForms(Array.isArray(json) ? json : [json]);
      } catch (e) {
        console.warn("Failed fetching farms list", e);
      }
    };
    fetchList();
  }, []);

  const postFields = async (payload) => {
    try {
      setLoading(true);
      const res = await fetch("https://earthscansystems.com/farmerdatauser/userfarm/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const e = await res.json().catch(() => null);
        console.error("Backend response:", e || "bad status");
        throw new Error("Failed to post fields");
      }
      const data = await res.json();
      setForms((prev) => (Array.isArray(prev) ? [data, ...prev] : [data]));
      return data;
    } catch (err) {
      console.error("Error posting fields:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  if (!isLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700 font-semibold">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedPage>
    <div className="flex w-full h-screen overflow-hidden bg-gray-50">
      <Sidebar/>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-4 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                <Layers className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Field Mapping</h1>
                <p className="text-emerald-50 text-sm">Draw and manage your agricultural fields</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Tools Bar */}
          <div className="bg-white shadow-xl rounded-2xl p-4 mb-6 border border-gray-200">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => handleToolChange("hand")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedTool === "hand"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaHandPaper className="w-4 h-4" />
                  <span>Pan</span>
                </button>
                <button
                  onClick={() => handleToolChange("rectangle")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedTool === "rectangle"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaSquare className="w-4 h-4" />
                  <span>Rectangle</span>
                </button>
                <button
                  onClick={() => handleToolChange("polygon")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedTool === "polygon"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaDrawPolygon className="w-4 h-4" />
                  <span>Polygon</span>
                </button>
                <button
                  onClick={() => handleToolChange("edit")}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    selectedTool === "edit"
                      ? "bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <FaEdit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label
                  htmlFor="kmlUpload"
                  className="cursor-pointer flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold  bg-[var(--color)]  text-white "
                >
                  <FileText className="w-4 h-4" />
                  <span>Upload KML</span>
                </label>
                <input
                  id="kmlUpload"
                  ref={kmlInputRef}
                  type="file"
                  accept=".kml"
                  onChange={handleKmlFileUpload}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {/* Map Container */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 mb-6">
            <div className="relative h-[600px]">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={mapCenter}
                zoom={13}
                onLoad={onLoad}
                options={{
                  styles: [
                    {
                      featureType: "water",
                      elementType: "geometry",
                      stylers: [{ color: "#c1dff0" }],
                    },
                    {
                      featureType: "landscape",
                      elementType: "geometry",
                      stylers: [{ color: "#f5f5f5" }],
                    },
                  ],
                }}
              >
                {searchMarker && <Marker position={searchMarker.position} title={searchMarker.title} />}

                {Array.isArray(deviceMarkers) &&
                  deviceMarkers.map((m, i) => (
                    <Marker
                      key={`device-${i}`}
                      position={{ lat: m.lat, lng: m.lng }}
                      icon={{
                        path: "M0 0c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5S2.5 0 0 0z",
                        scale: 1.8,
                        fillOpacity: 1,
                        strokeWeight: 0,
                        fillColor: "#0b9f3b",
                      }}
                    />
                  ))}

                <DrawingManager
                  onLoad={onDrawingManagerLoad}
                  options={{
                    drawingControl: false,
                    rectangleOptions: {
                      fillColor: "#10b981",
                      strokeColor: "#059669",
                      strokeWeight: 3,
                      fillOpacity: 0.35,
                      editable: true,
                    },
                    polygonOptions: {
                      fillColor: "#3b82f6",
                      strokeColor: "#2563eb",
                      strokeWeight: 3,
                      fillOpacity: 0.35,
                      editable: true,
                    },
                  }}
                  onRectangleComplete={handleRectangleComplete}
                  onPolygonComplete={handlePolygonComplete}
                />
              </GoogleMap>
            </div>
          </div>

          {/* Area Details Component */}
          <MapDetail
            mapAreaInfo={areaInfo || {}}
            selectedUnit={areaUnit}
            setSelectedUnit={(u) => setAreaUnit(u)}
            areaBase={areaInfo?.areaKm2 ?? 0}
            farmId={areaInfo?.farmId ?? localStorage.getItem("farmId") ?? `F-${Date.now()}`}
            getAreaInSelectedUnit={() => {
              if (!areaInfo) return 0;
              if (areaUnit === "ha") return (areaInfo.areaKm2 * 100).toFixed(2);
              if (areaUnit === "ac") return (areaInfo.areaKm2 * 247.105).toFixed(2);
              return areaInfo.areaKm2;
            }}
            forms={forms}
            zoomToFarm={() => {}}
            postFields={postFields}
          />
        </div>
      </div>
    </div>
    </ProtectedPage>
  );
});

export default Page;




function MapDetail({
  mapAreaInfo = {},
  setSelectedUnit = () => {},
  selectedUnit = "ha",
  areaBase = 0,
  farmId = null,
  getAreaInSelectedUnit = () => 0,
  forms = [],
  zoomToFarm = () => {},
  postFields = async () => {},
}) {
  const [totalitems, setTotalItems] = useState(0);
  const [formData, setFormData] = useState({
    farm_name: "",
    area: getAreaInSelectedUnit(),
    unit: selectedUnit,
    farm_id: farmId,
    user: 1,
  });
  const [submitting, setSubmitting] = useState(false);
  const [parsedCoordinates, setParsedCoordinates] = useState([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("access");
    const decoded = decodeJwt(token);
    const user_id = decoded?.user_id ?? null;

    setFormData((prev) => ({
      ...prev,
      area: typeof getAreaInSelectedUnit === "function" ? getAreaInSelectedUnit() : prev.area,
      unit: selectedUnit,
      farm_id: farmId,
      user: user_id ?? 1,
    }));

    try {
      const coordsRaw = localStorage.getItem("mapCoordinates");
      if (coordsRaw) {
        const parsed = JSON.parse(coordsRaw);
        setParsedCoordinates(Array.isArray(parsed) ? parsed : []);
      } else if (mapAreaInfo?.coordinates) {
        setParsedCoordinates(mapAreaInfo.coordinates);
      }
    } catch (e) {
      console.warn("Failed to parse coordinates", e);
    }
  }, [areaBase, selectedUnit, farmId, mapAreaInfo]);

  useEffect(() => {
    setTotalItems(Array.isArray(forms) ? forms.length : 0);
  }, [forms]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.farm_name) return alert("Please enter farm name");

    const width = localStorage.getItem("shapeWidth") || null;
    const height = localStorage.getItem("shapeHeight") || null;
    const shapeType = localStorage.getItem("shapeType") || mapAreaInfo.type || "rectangle";

    const payload = {
      ...formData,
      shape_type: shapeType,
      coordinates: parsedCoordinates,
      width,
      height,
    };

    try {
      setSubmitting(true);
      await postFields(payload);
      alert("Saved successfully");
      localStorage.clear();
      setFormData((p) => ({ ...p, farm_name: "" }));
    } catch (err) {
      console.error("Submit failed", err);
      alert("Submit failed (see console)");
    } finally {
      setSubmitting(false);
    }
  };

  const discard = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      {/* Main Info Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 mt-6 transition hover:shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-4">
          <h2 className="font-bold text-xl text-gray-800 flex items-center gap-2">
            📍 Field Information
          </h2>
          <div className="flex gap-2">
            {["ha", "ac", "km2"].map((unit) => (
              <button
                key={unit}
                onClick={() => setSelectedUnit(unit)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                  selectedUnit === unit
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>

        {/* Area Details */}
        {mapAreaInfo && Object.keys(mapAreaInfo).length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Left */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Width</span>
                <span className="font-semibold text-gray-800">
                  {mapAreaInfo.width ?? "-"} km
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Height</span>
                <span className="font-semibold text-gray-800">
                  {mapAreaInfo.height ?? "-"} km
                </span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-gray-600">Area</span>
                <span className="font-semibold text-gray-800">
                  {mapAreaInfo.areaKm2
                    ? selectedUnit === "ha"
                      ? (mapAreaInfo.areaKm2 * 100).toFixed(2) + " ha"
                      : selectedUnit === "ac"
                      ? (mapAreaInfo.areaKm2 * 247.105).toFixed(2) + " ac"
                      : mapAreaInfo.areaKm2 + " km²"
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type</span>
                <span className="font-semibold text-gray-800 capitalize">
                  {mapAreaInfo.type ?? "-"}
                </span>
              </div>
            </div>

            {/* Right */}
            <div>
              <p className="text-sm text-gray-600 mb-2 font-medium">Coordinates</p>
              <div className="max-h-40 overflow-y-auto bg-gray-50 p-3 rounded-lg border text-xs font-mono">
                {parsedCoordinates?.length > 0 ? (
                  parsedCoordinates.map((c, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-1 border-b last:border-0 text-gray-700"
                    >
                      <span className="text-gray-500">Pt {i + 1}</span>
                      <span>
                        {typeof c.lat === "number" ? c.lat.toFixed(6) : c.lat},{" "}
                        {typeof c.lng === "number" ? c.lng.toFixed(6) : c.lng}
                      </span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400">No coordinates saved</span>
                )}
              </div>

              <button
                onClick={() => {
                  if (!parsedCoordinates?.length)
                    return alert("No coordinates to copy");
                  const coordText = parsedCoordinates
                    .map(
                      (coord, i) =>
                        `Point ${i + 1}: Lat ${coord.lat}, Lng ${coord.lng}`
                    )
                    .join("\n");
                  navigator.clipboard.writeText(coordText);
                  alert("Coordinates copied!");
                }}
                className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
              >
                📋 Copy Coordinates
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 italic">Draw a shape or upload a KML to see details</p>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <div className="col-span-1 sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Farm Name
            </label>
            <input
              name="farm_name"
              value={formData.farm_name}
              onChange={handleChange}
              className="block w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-green-500 p-2 text-sm"
              placeholder="Enter farm name"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition"
          >
            {submitting ? "Saving..." : "💾 Save Field"}
          </button>

          <button
            type="button"
            onClick={discard}
            className="w-full px-4 py-2 bg-gray-100 border rounded-lg text-sm font-medium hover:bg-gray-200 transition"
          >
            ❌ Discard
          </button>
        </form>
      </div>

      {/* Farms List
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">🌾 Saved Farms</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.isArray(forms) && forms.length > 0 ? (
            forms.map((f) => (
              <div
                key={f.id ?? JSON.stringify(f)}
                className="p-4 bg-white rounded-xl border shadow-sm hover:shadow-md transition"
              >
                <h4 className="text-base font-semibold text-gray-900">
                  {f.farm_name ?? "Unnamed"}
                </h4>
                <p className="text-xs text-gray-600">{f.farm_id ?? "-"}</p>
                <p className="text-sm mt-1 font-medium text-gray-700">
                  {f.area ?? "-"} {f.unit ?? ""}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400">No saved fields yet</p>
          )}
        </div>
      </div> */}
    </>
  );
}
