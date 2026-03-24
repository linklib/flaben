"use client";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function OnChangePathnameScroll() {
  const pathname = useSearchParams();
  const [loaded, setLoaded] = useState(false);
  const containerRef: React.MutableRefObject<HTMLDivElement | undefined> =
    useRef();

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
    } else if (containerRef) {
      containerRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname]);

  return (
    <div
      style={{ position: "absolute" }}
      ref={containerRef as React.MutableRefObject<HTMLDivElement>}
    />
  );
}
