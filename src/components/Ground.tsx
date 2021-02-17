import { usePlane } from '@react-three/cannon';

function Ground() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
  }));

  return (
    <mesh ref={ref} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshStandardMaterial color={0x000300} attach="material" />
    </mesh>
  );
}

export default Ground;
