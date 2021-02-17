import { useBox } from '@react-three/cannon';

type Props = {
  position: number[];
};

function Cube({ position }: Props) {
  const [ref] = useBox(() => ({
    position,
  }));

  return (
    <mesh ref={ref} castShadow>
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial color={0xff01fb} attach="material" />
    </mesh>
  );
}

export default Cube;
