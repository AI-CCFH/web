"use client"

import { useEffect, useRef, useState } from "react"
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

  useEffect(() => {
    if (typeof window === "undefined") return

    const leafletCSS = document.createElement("link")
    leafletCSS.rel = "stylesheet"
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
    document.head.appendChild(leafletCSS)

    const leafletJS = document.createElement("script")
    leafletJS.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
    leafletJS.onload = () => setMapLoaded(true)
    document.head.appendChild(leafletJS)

    const geocoderJS = document.createElement("script")
    geocoderJS.src = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.js"
    document.head.appendChild(geocoderJS)

    const geocoderCSS = document.createElement("link")
    geocoderCSS.rel = "stylesheet"
    geocoderCSS.href = "https://unpkg.com/leaflet-control-geocoder/dist/Control.Geocoder.css"
    document.head.appendChild(geocoderCSS)

    return () => {
      document.head.removeChild(leafletCSS)
      document.head.removeChild(leafletJS)
      document.head.removeChild(geocoderJS)
      document.head.removeChild(geocoderCSS)
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !(window as any).L) return

    const L = (window as any).L
    const map = L.map(mapRef.current).setView([latitude, longitude], 15)

    // Base layers
    const OSM = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    })

    const google = L.tileLayer("https://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}", {
      maxZoom: 20,
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: "&copy; Google",
    })

    OSM.addTo(map)
    google.addTo(map)

    // Your Location
    const myIcon = L.icon({
      iconUrl: "../static/images/adventurer_pin_new.png",
      iconSize: [50, 50],
    })

    // Warehouse Location
    const Warehouse = L.icon({
      iconUrl: "../static/images/quest.png",
      iconSize: [50, 50],
    })
    

    // Markers
    const myLocation = L.marker([latitude, longitude], { icon: myIcon }).addTo(map)
    myLocation.bindPopup(
      "<b style='color: blue'>Your Location!</b><br><a style='color: black'>This is where you are</a>"
    ).openPopup()

    const Warehouse_marker = L.marker([10.7683, 106.6758], { icon: Warehouse })

    // Layers control
    const baseMaps = {
      "<span style='color: green; font-size: 16px;'>OSM</span>": OSM,
      "<span style='color: blue; font-size: 15px;'>Google</span>": google,
    }

    const overlayMaps = {
      "<span style='color: red; font-size: 16px;'>Location</span>": myLocation,
      "<span style='color: red; font-size: 16px;'>Ware house</span>": Warehouse_marker ,
    }

    L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map)

    // Map click popup
    const popup = L.popup()
    map.on("click", (e: any) => {
      const { lat, lng } = e.latlng
      popup
        .setLatLng(e.latlng)
        .setContent(
          `<h1 style="color: green"; font-size:20px;>Clicked Location</h1>
          Latitude: ${lat}<br>
          Longitude: ${lng}<br>
          <a href="https://www.google.com/maps/search/?api=1&query=${lat},${lng}" target="_blank">Open in Google Maps</a>`
        )
        .openOn(map)
    
      // Optional: notify parent component of new lat/lng
      onLocationChange(lat, lng)
    })
    
    

    // Geocoder
    if (L.Control && L.Control.Geocoder) {
      L.Control.geocoder().addTo(map)
    }

    // Geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude: lat, longitude: lng } = position.coords
          myLocation.setLatLng([lat, lng])
          map.setView([lat, lng], map.getZoom())
          console.log(`Your coordinates are: lat: ${lat}, long: ${lng}`)
        },
        (error) => {
          console.error("Geolocation error: ", error)
          if (error.code === error.PERMISSION_DENIED) {
            alert("Geolocation permission denied. Please allow access to your location.")
          } else if (error.code === error.TIMEOUT) {
            alert("Geolocation request timed out. Please try again.")
          } else {
            alert("An error occurred while retrieving your location.")
          }
        }
      )
    } else {
      console.log("Your browser doesn't support location feature!")
    }

    return () => {
      map.remove()
    }
  }, [mapLoaded])

  return (
    <Card className={cn("w-full h-[500px] overflow-hidden", className)}>
      <div ref={mapRef} className="w-full h-full" />
    </Card>
  )
}
