import React from "react";
import { useGLTF } from "@react-three/drei";

export const ShirtModel = (props) => {
  const { scene } = useGLTF("/scene.gltf");

  return (
    <primitive
      object={scene}
      {...props}
      scale={1.2}
      position={[0, 0, 0]}
      rotation={[0.3, Math.PI / 10, -0.1]}
    />

  );
};

useGLTF.preload("/scene.gltf");