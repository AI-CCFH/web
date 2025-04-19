"use client"

import { useEffect, useState, useRef } from "react"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface MapPickerProps {
  latitude: number
  longitude: number
  onLocationChange: (lat: number, lng: number) => void
  className?: string
}

export function MapPicker({ latitude, longitude, onLocationChange, className }: MapPickerProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<any>(null)
  const [marker, setMarker] = useState<any>(null)

  // Load Leaflet dynamically on client side
  useEffect(() => {
    // Only run this in the browser
    if (typeof window === "undefined") return

    // Load Leaflet CSS
    const linkEl = document.createElement("link")
    linkEl.rel = "stylesheet"
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    linkEl.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
    linkEl.crossOrigin = ""
    document.head.appendChild(linkEl)

    // Load Leaflet JS
    const scriptEl = document.createElement("script")
    scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    scriptEl.integrity = "sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
    scriptEl.crossOrigin = ""
    scriptEl.onload = () => setMapLoaded(true)
    document.head.appendChild(scriptEl)

    return () => {
      document.head.removeChild(linkEl)
      document.head.removeChild(scriptEl)
    }
  }, [])

  // Initialize map once Leaflet is loaded
  useEffect(() => {
    if (!mapLoaded || !mapRef.current) return

    const L = (window as any).L
    if (!L) return

    // Initialize map with error handling
    try {
      const newMap = L.map(mapRef.current).setView([latitude, longitude], 13)

      // Add tile layer (OpenStreetMap)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(newMap)

      // Add marker with error handling
      const newMarker = L.marker([latitude, longitude], {
        draggable: true,
      }).addTo(newMap)

      // Handle marker drag with error handling
      newMarker.on("dragend", (e: any) => {
        try {
          if (e && e.target) {
            const position = e.target.getLatLng()
            if (position && typeof position.lat === "number" && typeof position.lng === "number") {
              onLocationChange(position.lat, position.lng)
            }
          }
        } catch (error) {
          console.error("Error handling marker drag:", error)
        }
      })

      // Handle map click with error handling
      newMap.on("click", (e: any) => {
        try {
          if (e && e.latlng) {
            const { lat, lng } = e.latlng
            if (typeof lat === "number" && typeof lng === "number") {
              newMarker.setLatLng([lat, lng])
              onLocationChange(lat, lng)
            }
          }
        } catch (error) {
          console.error("Error handling map click:", error)
        }
      })

      // Add zoom end event to handle rapid zooming
      newMap.on("zoomend", () => {
        try {
          // This empty handler helps stabilize the map during rapid zoom
        } catch (error) {
          console.error("Error during zoom:", error)
        }
      })

      setMap(newMap)
      setMarker(newMarker)

      return () => {
        try {
          if (newMap) {
            newMap.remove()
          }
        } catch (error) {
          console.error("Error removing map:", error)
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error)
      return () => {}
    }
  }, [mapLoaded, mapRef, latitude, longitude, onLocationChange])

  // Update marker position when lat/lng props change
  useEffect(() => {
    if (!map || !marker) return

    try {
      // Update marker position
      marker.setLatLng([latitude, longitude])

      // Center map on marker with a slight delay to prevent race conditions
      const timer = setTimeout(() => {
        if (map && !map._animatingZoom) {
          // Only update if not currently animating
          map.setView([latitude, longitude], map.getZoom())
        }
      }, 10)

      return () => clearTimeout(timer)
    } catch (error) {
      console.error("Error updating marker position:", error)
    }
  }, [latitude, longitude, map, marker])

  return (
    <Card className={cn("w-full h-[400px] overflow-hidden", className)}>
      <div ref={mapRef} className="w-full h-full" />
    </Card>
  )
}
