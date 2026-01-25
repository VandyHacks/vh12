'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'
import { useScroll, useSpring } from 'motion/react'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { randFloat } from '@/lib/utils'

const Stars = ({ initialPos }: { initialPos: [number, number, number] }) => {

    const { scrollYProgress } = useScroll();
    const sparkleRef = useRef<any | null>(null);

    const { camera } = useThree();

    useFrame((state, delta) => {
        if (sparkleRef.current) {
            camera.position.y = -scrollYProgress.get() * 5;
        }
    })

    const count = 300;
    const sizes = useMemo(() => {
        const arr = new Float32Array(count);
        for (let i = 0; i < count; i++) arr[i] = randFloat(2.3, 3.3);
        return arr;
    }, [])

    return (
        <Sparkles position={initialPos} ref={sparkleRef} count={count} scale={[10, 25, 7]} speed={0.4} noise={100} size={2} color={"#9245C9"}/>
    );

}

export default function StarBackground() {

    const isMobile = typeof window === "undefined" ? true : window.innerWidth < 768;

    return (
        <div className='fixed inset-0'>
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="absolute inset-0 z-2">
                <ambientLight intensity={0.5} />
                <Stars initialPos={[0, 0, 0]}/>
                {/* <Stars initialPos={[-1, -5, 0]} /> */}
                {/* {
                    !isMobile && <EffectComposer resolutionScale={0.1}>
                        <Bloom luminanceThreshold={0.6} intensity={1.5} />
                    </EffectComposer>
                } */}
            </Canvas>
            <div className="inset-0 z-1 absolute" style={{ background: "radial-gradient(145% 50% at 50% 90%, #9245C955 10%, #000000"}}/>
        </div>
    );

}