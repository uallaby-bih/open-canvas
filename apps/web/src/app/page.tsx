"use client";
import { useEffect, useState } from "react";

import { Canvas } from "@/components/canvas";
import { AssistantProvider } from "@/contexts/AssistantContext";
import { GraphProvider } from "@/contexts/GraphContext";
import { ThreadProvider } from "@/contexts/ThreadProvider";
import { UserProvider } from "@/contexts/UserContext";
import { Suspense } from "react";

export default function Home() {
  const [userReady, setUserReady] = useState(false);
  // Debug: capture all postMessage events and process METRONIC_AUTH
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      console.log("🔔 Canvas iframe got message:", event.origin, event.data);
      if (event.data?.type === "METRONIC_AUTH") {
        const userId = event.data.payload?.userId;
        console.log("✅ Canvas got userId:", userId);
        localStorage.setItem("OPEN_CANVAS_USER_ID", userId);
        setUserReady(true);
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  if (!userReady) {
    return <div>Waiting for Canvas authentication…</div>;
  }
  return (
    <Suspense fallback={<div>Loading Canvas…</div>}>
      <UserProvider>
        <ThreadProvider>
          <AssistantProvider>
            <GraphProvider>
              <Canvas />
            </GraphProvider>
          </AssistantProvider>
        </ThreadProvider>
      </UserProvider>
    </Suspense>
  );
}
