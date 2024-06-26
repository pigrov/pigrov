"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Shapes() {
    return (
        <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0">
            <Canvas
                className="z-0"
                shadows
                gl={{ antialias: false }}
                dpr={[1, 1.5]}
                camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
            >
                <Suspense fallback={null}>
                    <Geometries />
                    <ContactShadows
                        position={[0, -3.5, 0]}
                        opacity={0.6}
                        scale={40}
                        blur={1}
                        far={9}
                    />
                    <Environment preset="city" />
                </Suspense>
            </Canvas>
        </div>
    );
}

function Geometries() {
    const geometries = [
        {
            position: [0, 0, -1],
            r: 0.4,
            geometry: new THREE.IcosahedronGeometry(3),
        },
        {
            position: [1, 1, 4],
            r: 0.4,
            geometry: new THREE.CylinderGeometry(1, 0.7, 2, 32),
        },
        {
            position: [-1, -1, 2],
            r: 0.4,
            geometry: new THREE.TorusGeometry(1, 0.6, 10, 32),
        },
        {
            position: [1, -1, 3],
            r: 0.4,
            geometry: new THREE.OctahedronGeometry(1.2),
        },
        {
            position: [-2, 2, -3],
            r: 0.6,
            geometry: new THREE.CapsuleGeometry(1, 2, 4, 16),
        },
    ];

    const materials = [
        new THREE.MeshNormalMaterial(),
        new THREE.MeshStandardMaterial({ color: 0xd33257, roughness: 0 }),
        new THREE.MeshStandardMaterial({ color: 0x71ba51, roughness: 0.1 }),
        new THREE.MeshStandardMaterial({ color: 0x71ba51, roughness: 0.2 }),
        new THREE.MeshStandardMaterial({ color: 0x1dabb8, roughness: 0.3 }),
        new THREE.MeshStandardMaterial({ color: 0x00b5b5, roughness: 0.4 }),
        new THREE.MeshStandardMaterial({ color: 0x422e39, metalness: 1, roughness: 0.5 }),
        new THREE.MeshStandardMaterial({ color: 0x3e4651, metalness: 1, roughness: 0.6 }),
        new THREE.MeshStandardMaterial({ color: 0xe3000e, metalness: 1, roughness: 0.7 }),
    ];

    const soundEffects = [
        new Audio("/sounds/impact1.ogg"),
        new Audio("/sounds/impact2.ogg"),
        new Audio("/sounds/impact3.ogg"),
    ];

    return geometries.map(({ position, r, geometry }) => (
        <Geometry
            key={JSON.stringify(position)}
            position={position.map((n) => n * 2)}
            r={r}
            geometry={geometry}
            materials={materials}
            soundEffects={soundEffects}
        />
    ));
}

function Geometry({ position, r, geometry, materials, soundEffects }) {
    const ref = useRef();
    const [visible, setVisible] = useState(false);

    const baseMaterial = getRandomMaterial();

    function getRandomMaterial() {
        return gsap.utils.random(materials);
    }

    function handleClick(e) {
        const mesh = e.object;

        gsap.utils.random(soundEffects).play();

        gsap.to(mesh.rotation, {
            x: `+=${gsap.utils.random(0, 3)}`,
            y: `+=${gsap.utils.random(0, 3)}`,
            z: `+=${gsap.utils.random(0, 3)}`,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)",
            yoyo: true,
        });
        mesh.material = getRandomMaterial();
    }

    const handlePointerOver = () => {
        document.body.style.cursor = "pointer";
    };
    const handlePointerOut = () => {
        document.body.style.cursor = "default";
    };

    useEffect(() => {
        let ctx = gsap.context(() => {
            setVisible(true);
            gsap.from(ref.current.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 1.5,
                ease: "elastic.out(1, 0.3)",
                yoyo: true,
                delay: 1,
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <group position={position} ref={ref}>
            <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
                <mesh
                    geometry={geometry}
                    material={baseMaterial}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    visible={visible}
                />
            </Float>
        </group>
    );
}
