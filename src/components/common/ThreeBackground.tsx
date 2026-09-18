import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useEmergency } from '../../context/EmergencyContext';

interface ThreeBackgroundProps {
  intensity?: 'minimal' | 'command' | 'landing';
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ intensity = 'command' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { reducedMotion } = useEmergency();

  useEffect(() => {
    if (reducedMotion || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene setup
    const scene = new THREE.Scene();
    // Fog for deep atmospheric falloff
    scene.fog = new THREE.FogExp2(0x080c14, 0.0018);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(55, width / height, 1, 1000);
    camera.position.set(0, 45, 120);
    camera.lookAt(0, 0, 0);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x080c14, 1);
    container.appendChild(renderer.domElement);

    // 1. Topographic Plane / Terrain Grid
    const planeGeo = new THREE.PlaneGeometry(260, 260, 36, 36);
    // Add subtle elevation wave to vertices
    const pos = planeGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const vx = pos.getX(i);
      const vy = pos.getY(i);
      const z = Math.sin(vx * 0.05) * Math.cos(vy * 0.05) * 6 + Math.sin((vx + vy) * 0.02) * 4;
      pos.setZ(i, z);
    }
    planeGeo.computeVertexNormals();

    const gridMaterial = new THREE.MeshBasicMaterial({
      color: intensity === 'minimal' ? 0x152238 : 0x1a2e4a,
      wireframe: true,
      transparent: true,
      opacity: intensity === 'minimal' ? 0.22 : 0.42
    });

    const terrainMesh = new THREE.Mesh(planeGeo, gridMaterial);
    terrainMesh.rotation.x = -Math.PI / 2.2;
    terrainMesh.position.y = -20;
    scene.add(terrainMesh);

    // 2. Floating Atmospheric Signal Nodes / Particles
    const particleCount = intensity === 'minimal' ? 40 : 110;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x00f0ff);
    const emergencyRed = new THREE.Color(0xef4444);
    const mutedBlue = new THREE.Color(0x3b82f6);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      particlePositions[idx] = (Math.random() - 0.5) * 220;
      particlePositions[idx + 1] = Math.random() * 50 - 5;
      particlePositions[idx + 2] = (Math.random() - 0.5) * 200;

      const col = i % 7 === 0 ? emergencyRed : i % 3 === 0 ? cyanColor : mutedBlue;
      particleColors[idx] = col.r;
      particleColors[idx + 1] = col.g;
      particleColors[idx + 2] = col.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 2.2,
      vertexColors: true,
      transparent: true,
      opacity: intensity === 'minimal' ? 0.35 : 0.7,
      blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeo, particleMaterial);
    scene.add(particleSystem);

    // 3. Subtle Connective Line Segment Web
    const lineCount = intensity === 'minimal' ? 8 : 22;
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: intensity === 'minimal' ? 0.08 : 0.18
    });
    const lineGeo = new THREE.BufferGeometry();
    const linePoints: number[] = [];

    for (let i = 0; i < lineCount; i++) {
      const x1 = (Math.random() - 0.5) * 160;
      const y1 = Math.random() * 30;
      const z1 = (Math.random() - 0.5) * 140;
      const x2 = x1 + (Math.random() - 0.5) * 45;
      const y2 = y1 + (Math.random() - 0.5) * 15;
      const z2 = z1 + (Math.random() - 0.5) * 45;
      linePoints.push(x1, y1, z1, x2, y2, z2);
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoints, 3));
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Slow terrain wave breathing
      terrainMesh.position.y = -20 + Math.sin(elapsedTime * 0.3) * 1.5;
      terrainMesh.rotation.z = Math.sin(elapsedTime * 0.1) * 0.02;

      // Slow particle drift
      const positions = particleGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const yIdx = i * 3 + 1;
        positions[yIdx] += Math.sin(elapsedTime + i) * 0.02;
      }
      particleGeo.attributes.position.needsUpdate = true;

      // Subtle slow camera pan
      camera.position.x = Math.sin(elapsedTime * 0.08) * 10;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || window.innerHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      planeGeo.dispose();
      gridMaterial.dispose();
      particleGeo.dispose();
      particleMaterial.dispose();
      lineGeo.dispose();
      lineMat.dispose();
    };
  }, [reducedMotion, intensity]);

  if (reducedMotion) {
    return (
      <div 
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-[#080c14] via-[#0d1424] to-[#080c14] z-0" 
      />
    );
  }

  return (
    <div 
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-90 transition-opacity duration-700"
    />
  );
};
