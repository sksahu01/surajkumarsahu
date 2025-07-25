"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Box, Sphere } from "@react-three/drei";
import * as THREE from "three";

interface CubeProps {
    mousePosition: { x: number; y: number };
}

function AnimatedCube({ mousePosition }: CubeProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const sphereRefs = useRef<THREE.Mesh[]>([]);

    // Create floating spheres around the cube
    const spheres = useMemo(() => {
        return Array.from({ length: 8 }, (_, i) => ({
            position: [
                Math.cos((i / 8) * Math.PI * 2) * 3,
                Math.sin((i / 8) * Math.PI * 2) * 3,
                Math.sin((i / 8) * Math.PI * 4) * 2,
            ] as [number, number, number],
            speed: 0.5 + Math.random() * 0.5,
            offset: i * 0.5,
        }));
    }, []);

    useFrame((state) => {
        if (meshRef.current) {
            // Rotate the main cube
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.4;

            // Add mouse interaction
            meshRef.current.rotation.x += mousePosition.y * 0.2;
            meshRef.current.rotation.y += mousePosition.x * 0.2;
        }

        // Animate floating spheres
        sphereRefs.current.forEach((sphere, i) => {
            if (sphere && spheres[i]) {
                const sphere_data = spheres[i];
                sphere.position.x = Math.cos(state.clock.elapsedTime * sphere_data.speed + sphere_data.offset) * 3;
                sphere.position.y = Math.sin(state.clock.elapsedTime * sphere_data.speed + sphere_data.offset) * 3;
                sphere.position.z = Math.sin(state.clock.elapsedTime * sphere_data.speed * 2 + sphere_data.offset) * 2;
            }
        });
    });

    return (
        <group>
            {/* Main Cube */}
            <Box
                ref={meshRef}
                args={[2, 2, 2]}
                position={[0, 0, 0]}
            >
                <meshStandardMaterial
                    color="#8e44ad"
                    transparent
                    opacity={0.8}
                    wireframe={false}
                    emissive="#4a148c"
                    emissiveIntensity={0.2}
                />
            </Box>

            {/* Wireframe Cube */}
            <Box
                args={[2.1, 2.1, 2.1]}
                position={[0, 0, 0]}
                rotation={[Math.PI / 4, Math.PI / 4, 0]}
            >
                <meshBasicMaterial
                    color="#bb86fc"
                    wireframe
                    transparent
                    opacity={0.4}
                />
            </Box>

            {/* Floating Spheres */}
            {spheres.map((sphere, i) => (
                <Sphere
                    key={i}
                    ref={(el) => {
                        if (el) sphereRefs.current[i] = el;
                    }}
                    args={[0.1, 16, 16]}
                    position={sphere.position}
                >
                    <meshStandardMaterial
                        color="#bb86fc"
                        emissive="#8e44ad"
                        emissiveIntensity={0.5}
                    />
                </Sphere>
            ))}

            {/* Ambient Light */}
            <ambientLight intensity={0.5} />

            {/* Point Light */}
            <pointLight position={[10, 10, 10]} intensity={1} color="#bb86fc" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8e44ad" />
        </group>
    );
}

export default function FloatingCube({ mousePosition }: CubeProps) {
    return (
        <div className="w-full h-full">
            <Suspense fallback={
                <div className="w-full h-full flex items-center justify-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-purple-600/20 to-purple-800/20 rounded-lg animate-pulse flex items-center justify-center">
                        <div className="w-16 h-16 bg-purple-500/30 rounded-lg animate-spin"></div>
                    </div>
                </div>
            }>
                <Canvas
                    camera={{
                        position: [0, 0, 8],
                        fov: 50,
                    }}
                    style={{
                        background: "transparent",
                    }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <AnimatedCube mousePosition={mousePosition} />
                    <OrbitControls
                        enableZoom={false}
                        enablePan={false}
                        autoRotate
                        autoRotateSpeed={0.5}
                        enableDamping
                        dampingFactor={0.05}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}
