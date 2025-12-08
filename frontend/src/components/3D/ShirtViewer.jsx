import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { ShirtModel } from "./ShirtModel";

export const ShirtViewer = () => {
  return (
    <div className="hidden md:block" style={{ height: "500px", width: "100%" }}>
      <Canvas camera={{ position: [20,1.5, 60], fov: 450 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.9} />
          <directionalLight position={[100, 19, 10]} intensity={1.2} />

          <Environment preset="studio" />

          <ShirtModel />

          <OrbitControls enablePan={false} enableZoom={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};
