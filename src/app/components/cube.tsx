"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Color, Mesh, MeshStandardMaterial, Group } from "three";
import { OrbitControls, Environment } from "@react-three/drei";

const DELTA = 0.05;

type CalcPosition = {
  color: string;
  position: Coordinates;
};

type CubePosition = {
  colors: ColorFace;
  position: Coordinates;
  group: string[];
  colorFaces?: string[];
  name: string;
};

type Coordinates = [x: number, y: number, z: number];

type ColorFace = [right: string, left: string, top: string, down: string, front: string, back: string];

const colors = ["red", "green", "blue", "yellow", "white", "orange"];
const positions: number[][][] = Array(3).fill(Array(3).fill(Array(3).fill(0)));
const backgrounds = ["hdr/adams_place_bridge_4k.hdr", "hdr/wasteland_clouds_puresky_4k.hdr", "hdr/lilienstein_4k.hdr"];

const getPositions = (delta: number): CalcPosition[][][] => {
  return positions.map((row, i) => {
    const z = i === 0 ? -(1 + delta) : i === 1 ? 0 : 1 + delta;
    return row.map((col, j) => {
      const y = j === 0 ? -(1 + delta) : j === 1 ? 0 : 1 + delta;
      return col.map((_, k) => {
        const x = k === 0 ? -(1 + delta) : k === 1 ? 0 : 1 + delta;
        return { color: colors[i * 3 + j * 3 + k], position: [x, y, z] };
      });
    });
  });
};

const RotatingGroup = () => {
  const [cubePositions, setCubePositions] = useState<CubePosition[]>([]);
  const groupRef = useRef<Group>(null!);

  useEffect(() => {
    const positions = getPositions(DELTA).flat(2);
    setCubePositions(positions.map((cube) => ({ colors: getColors(cube.position), position: cube.position, group: getGroups(cube.position), name: `x${cube.position[0]}y${cube.position[1]}z${cube.position[2]}` })));
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const rotationSpeed = 0.01;
      groupRef.current.rotation.y += rotationSpeed;
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {cubePositions.map((e) => (
          <ColorCube key={e.position.toString()} cubeInfo={e} />
        ))}
      </group>
    </>
  );
};

export default function Cube() {
  return (
    <div id="canvas-container" className="h-screen w-full">
      <Canvas scene={{ background: new Color("black") }} shadows dpr={[1, 2]} gl={{ antialias: true }}>
        <OrbitControls />
        <Environment files={backgrounds[2]} background={true} />
        <ambientLight intensity={1} />
        <RotatingGroup />
      </Canvas>
    </div>
  );
}

function ColorCube({ cubeInfo }: { cubeInfo: CubePosition }) {
  const cubeRef = useRef<Mesh>(null!);

  useFrame(() => {});
  const materials = cubeInfo.colors.map((color) => new MeshStandardMaterial({ color, metalness: 0.9, roughness: 0.5 }));

  return (
    <mesh name={cubeInfo.name} ref={cubeRef} position={cubeInfo.position} material={materials}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  );
}

const getColors = (position: [x: number, y: number, z: number]): ColorFace => {
  if (position[0] < 0) return ["black", "orange", position[1] > 0 ? "red" : "black", position[1] < 0 ? "blue" : "black", position[2] > 0 ? "yellow" : "black", position[2] < 0 ? "white" : "black"];
  if (position[0] > 0) return ["green", "black", position[1] > 0 ? "red" : "black", position[1] < 0 ? "blue" : "black", position[2] > 0 ? "yellow" : "black", position[2] < 0 ? "white" : "black"];
  return ["black", "black", position[1] > 0 ? "red" : "black", position[1] < 0 ? "blue" : "black", position[2] > 0 ? "yellow" : "black", position[2] < 0 ? "white" : "black"];
};

const getGroups = (position: [x: number, y: number, z: number]): string[] => {
  const topGroupCubes = position[1] > 0 ? "top" : null;
  const middleHGroupCubes = position[1] === 0 ? "middleH" : null;
  const bottomGroupCubes = position[1] < 0 ? "bottom" : null;

  const leftGroupCubes = position[0] < 0 ? "left" : null;
  const rightGroupCubes = position[0] > 0 ? "right" : null;
  const middleVGroupCubes = position[0] === 0 ? "middleV" : null;

  const frontGroupCubes = position[2] > 0 ? "front" : null;
  const backGroupCubes = position[2] < 0 ? "back" : null;
  const middleFGroupCubes = position[2] === 0 ? "middleF" : null;

  return [topGroupCubes, middleHGroupCubes, bottomGroupCubes, leftGroupCubes, rightGroupCubes, middleVGroupCubes, frontGroupCubes, backGroupCubes, middleFGroupCubes].filter((group) => group !== null);
};
