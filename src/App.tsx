import { Physics } from '@react-three/cannon';
import { Sky, softShadows } from '@react-three/drei';
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from '@react-three/postprocessing';
import React from 'react';
import { Canvas } from 'react-three-fiber';
import './App.css';
import Cube from './components/Cube';
import Ground from './components/Ground';
import Player from './components/Player';

softShadows();

function App() {
  return (
    <Canvas shadowMap>
      <Sky distance={3000} turbidity={8} rayleigh={6} inclination={0.49} />
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow
        position={[10, 10, 10]}
        intensity={1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      <Physics>
        <Ground />
        <Cube position={[-2, 1, -6]} />
        <Cube position={[0, 1, -5]} />
        <Cube position={[2, 1, -6]} />
        <Player />
      </Physics>
      <EffectComposer>
        <DepthOfField
          focusDistance={0}
          focalLength={0.02}
          bokehScale={2}
          height={480}
        />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
      </EffectComposer>
    </Canvas>
  );
}

export default App;
