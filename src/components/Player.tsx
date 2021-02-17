import { useSphere } from '@react-three/cannon';
import { PointerLockControls } from '@react-three/drei';
import { useEffect, useRef } from 'react';
import { useFrame, useThree } from 'react-three-fiber';
import { Vector3 } from 'three';
import useKeyboard from '../hooks/useKeyboard';

const WALK_SPEED = 5;

function Player() {
  const [ref, api] = useSphere(() => ({
    mass: 1,
    position: [0, 2, 0],
  }));

  const movement = useKeyboard();

  const { camera } = useThree();

  const currentVelocity = useRef([0, 0, 0]);

  useEffect(
    () =>
      api.velocity.subscribe(
        (newVelocity) => (currentVelocity.current = newVelocity)
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame(() => {
    camera.position.copy(ref.current!.position);

    const frontVector = new Vector3(
      0,
      0,
      (movement.backwards ? 1 : 0) - (movement.forward ? 1 : 0)
    );
    const sideVector = new Vector3(
      (movement.left ? 1 : 0) - (movement.right ? 1 : 0),
      0,
      0
    );

    const newVelocity = new Vector3()
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(WALK_SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(newVelocity.x, currentVelocity.current[1], newVelocity.z);
  });

  return (
    <>
      <mesh ref={ref} />
      <PointerLockControls />
    </>
  );
}

export default Player;
