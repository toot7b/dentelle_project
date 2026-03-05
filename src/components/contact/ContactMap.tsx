"use client";

import { useEffect, useRef } from "react";

const LNG = 4.019361; // 4°01'09.7"E
const LAT = 50.287472; // 50°17'14.9"N

export default function ContactMap() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let map: import("maplibre-gl").Map;

        (async () => {
            const maplibregl = (await import("maplibre-gl")).default;

            map = new maplibregl.Map({
                container: containerRef.current!,
                style: "https://tiles.openfreemap.org/styles/liberty",
                center: [LNG, LAT],
                zoom: 15,
                attributionControl: false,
            });

            new maplibregl.Marker({ color: "#C2AE4C" })
                .setLngLat([LNG, LAT])
                .addTo(map);

            map.addControl(new maplibregl.NavigationControl(), "top-right");
            map.addControl(
                new maplibregl.AttributionControl({ compact: true }),
                "bottom-left"
            );
        })();

        return () => {
            map?.remove();
        };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
}
