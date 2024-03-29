"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

let AutoRefresh = ({ children } : {children: React.ReactNode}) => {
  return children;
}

if (process.env.NODE_ENV === "development") {
  AutoRefresh = function AutoRefresh({ children } : {children: React.ReactNode}) {
    const router = useRouter();
    useEffect(() => {
      const ws = new WebSocket("ws://localhost:3001");
      ws.onmessage = (event) => {
        if (event.data === "refresh") {
          router.refresh();
        }
      };
      return () => {
        ws.close();
      };
    }, [router]);
    return children;
  };
}

export default AutoRefresh;