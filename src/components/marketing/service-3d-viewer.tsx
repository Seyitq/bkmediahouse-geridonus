'use client'

import { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Environment, useGLTF, useTexture } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger, useGSAP)
}

interface Service3DViewerProps {
    modelUrl: string
}

function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
}

// Reference Keyframes
const KEYFRAMES = [
    {
        scroll: 0.00,
        angle: Math.PI * 0.75,
        radius: 4.5,
        height: 1.8,
        fov: 50,
        target: new THREE.Vector3(0, 0.4, 0)
    },
    {
        scroll: 0.20,
        angle: Math.PI * 1.1,
        radius: 4.0,
        height: 1.2,
        fov: 45,
        target: new THREE.Vector3(0, 0.3, 0)
    },
    {
        scroll: 0.40,
        angle: Math.PI * 1.5,
        radius: 3.0,
        height: 0.8,
        fov: 40,
        target: new THREE.Vector3(0.3, 0.2, 0.3)
    },
    {
        scroll: 0.60,
        angle: Math.PI * 1.85,
        radius: 2.2,
        height: 0.5,
        fov: 35,
        target: new THREE.Vector3(0.1, 0.3, 0.4)
    },
    {
        scroll: 0.80,
        angle: Math.PI * 2.0,
        radius: 1.5,
        height: 0.8,
        fov: 32,
        target: new THREE.Vector3(0, 0.8, 0)
    },
    {
        scroll: 0.90,
        angle: Math.PI * 2.0,
        radius: 1.2,
        height: 0.9,
        fov: 28,
        target: new THREE.Vector3(0, 0.85, 0)
    },
    {
        scroll: 1.00,
        angle: Math.PI * 2.0,
        radius: 2.5,
        height: 0.95,
        fov: 25,
        target: new THREE.Vector3(0, 2.5, 0)
    }
]

function CameraController() {
    const { camera } = useThree()
    const progressRef = useRef(0)

    useGSAP(() => {
        const trigger = ScrollTrigger.create({
            trigger: document.body,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.2,
            onUpdate: (self) => {
                progressRef.current = self.progress
            }
        })
        return () => trigger.kill()
    }, [])

    useFrame(() => {
        const progress = Math.max(0, Math.min(1, progressRef.current))

        let kf1 = KEYFRAMES[0]
        let kf2 = KEYFRAMES[1]

        for (let i = 0; i < KEYFRAMES.length - 1; i++) {
            if (progress >= KEYFRAMES[i].scroll && progress <= KEYFRAMES[i + 1].scroll) {
                kf1 = KEYFRAMES[i]
                kf2 = KEYFRAMES[i + 1]
                break
            }
        }

        if (progress >= KEYFRAMES[KEYFRAMES.length - 1].scroll) {
            kf1 = KEYFRAMES[KEYFRAMES.length - 2]
            kf2 = KEYFRAMES[KEYFRAMES.length - 1]
        }

        const range = kf2.scroll - kf1.scroll
        const localProgress = range > 0 ? (progress - kf1.scroll) / range : 1
        const t = easeInOutCubic(localProgress)

        const angle = THREE.MathUtils.lerp(kf1.angle, kf2.angle, t)
        const radius = THREE.MathUtils.lerp(kf1.radius, kf2.radius, t)
        const height = THREE.MathUtils.lerp(kf1.height, kf2.height, t)
        const fov = THREE.MathUtils.lerp(kf1.fov, kf2.fov, t)

        const targetX = THREE.MathUtils.lerp(kf1.target.x, kf2.target.x, t)
        const targetY = THREE.MathUtils.lerp(kf1.target.y, kf2.target.y, t)
        const targetZ = THREE.MathUtils.lerp(kf1.target.z, kf2.target.z, t)

        camera.position.x = Math.sin(angle) * radius
        camera.position.z = Math.cos(angle) * radius
        camera.position.y = height

        if (camera instanceof THREE.PerspectiveCamera) {
            if (camera.fov !== fov) {
                camera.fov = fov
                camera.updateProjectionMatrix()
            }
        }

        camera.lookAt(targetX, targetY, targetZ)
    })

    return null
}

// GLB/GLTF Model Component
function GLBModel({ url }: { url: string }) {
    const { scene } = useGLTF(url)

    const clonedScene = useMemo(() => {
        const clone = scene.clone()

        // Apply shadows and enhance materials
        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                mesh.castShadow = true
                mesh.receiveShadow = true

                // Enhance existing materials
                if (mesh.material instanceof THREE.MeshStandardMaterial) {
                    mesh.material.envMapIntensity = 1.2
                }
            }
        })

        // Center and scale
        const box = new THREE.Box3().setFromObject(clone)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.5 / maxDim

        clone.scale.setScalar(scale)
        clone.position.sub(center.multiplyScalar(scale))
        clone.position.y += 0.2

        return clone
    }, [scene])

    return <primitive object={clonedScene} />
}

// OBJ Model Component (for camera)
function OBJModel({ url }: { url: string }) {
    const obj = useLoader(OBJLoader, url)

    const textures = useTexture({
        bodyBase: '/models/canoncam/cameraBody_Mat_baseColor.png',
        bodyNormal: '/models/canoncam/cameraBody_Mat_normal.png',
        bodyRoughness: '/models/canoncam/cameraBody_Mat_roughness.png',
        bodyMetallic: '/models/canoncam/cameraBody_Mat_metallic.png',
        lensBase: '/models/canoncam/cameraLens_Mat_baseColor.png',
        lensRoughness: '/models/canoncam/cameraLens_Mat_roughness.png',
        lensMetallic: '/models/canoncam/cameraLens_Mat_metallic.png',
    })

    const materials = useMemo(() => {
        Object.values(textures).forEach(t => {
            t.flipY = true
            t.colorSpace = THREE.SRGBColorSpace
        })

        textures.bodyNormal.colorSpace = THREE.LinearSRGBColorSpace
        textures.bodyRoughness.colorSpace = THREE.LinearSRGBColorSpace
        textures.bodyMetallic.colorSpace = THREE.LinearSRGBColorSpace
        textures.lensRoughness.colorSpace = THREE.LinearSRGBColorSpace
        textures.lensMetallic.colorSpace = THREE.LinearSRGBColorSpace

        const bodyMat = new THREE.MeshStandardMaterial({
            map: textures.bodyBase,
            normalMap: textures.bodyNormal,
            roughnessMap: textures.bodyRoughness,
            metalnessMap: textures.bodyMetallic,
            roughness: 0.7,
            metalness: 0.85,
            envMapIntensity: 1.0
        })

        const lensMat = new THREE.MeshPhysicalMaterial({
            map: textures.lensBase,
            roughnessMap: textures.lensRoughness,
            metalnessMap: textures.lensMetallic,
            roughness: 0.1,
            metalness: 0.9,
            transmission: 0.2,
            thickness: 0.5,
            clearcoat: 1.0,
            clearcoatRoughness: 0.05,
            ior: 1.5,
            envMapIntensity: 1.5,
            reflectivity: 0.9,
            sheen: 0.5,
            sheenRoughness: 0.3,
            sheenColor: new THREE.Color(0x4488ff)
        })

        return { bodyMat, lensMat }
    }, [textures])

    const scene = useMemo(() => {
        const clone = obj.clone()

        clone.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                const name = (mesh.name + (mesh.material as THREE.Material)?.name || '').toLowerCase()

                mesh.castShadow = true
                mesh.receiveShadow = true

                if (name.includes('lens') || name.includes('glass')) {
                    mesh.material = materials.lensMat
                } else {
                    mesh.material = materials.bodyMat
                }

                if (mesh.geometry) mesh.geometry.computeVertexNormals()
            }
        })

        const box = new THREE.Box3().setFromObject(clone)
        const size = box.getSize(new THREE.Vector3())
        const center = box.getCenter(new THREE.Vector3())
        const maxDim = Math.max(size.x, size.y, size.z)
        const scale = 2.5 / maxDim

        clone.scale.setScalar(scale)
        clone.position.sub(center.multiplyScalar(scale))
        clone.position.y += 0.2

        return clone
    }, [obj, materials])

    return <primitive object={scene} />
}

// Dynamic Model Loader - chooses OBJ or GLB based on extension
function DynamicModel({ url }: { url: string }) {
    const isGLB = url.toLowerCase().endsWith('.glb') || url.toLowerCase().endsWith('.gltf')

    if (isGLB) {
        return <GLBModel url={url} />
    }
    return <OBJModel url={url} />
}

export function Service3DViewer({ modelUrl }: Service3DViewerProps) {
    return (
        <div className="fixed inset-0 w-full h-full bg-transparent z-0 pointer-events-none">
            <div className="w-full h-full absolute inset-0">
                <Canvas
                    shadows
                    camera={{ near: 0.1, far: 100, fov: 50 }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.2,
                        logarithmicDepthBuffer: true,
                        precision: 'highp',
                        powerPreference: 'high-performance',
                    }}
                >
                    <CameraController />

                    <ambientLight intensity={1} />
                    <directionalLight position={[0, 0, 5]} intensity={8} color="#ffffff" castShadow />
                    <spotLight position={[10, 10, 10]} angle={0.5} penumbra={1} intensity={5} castShadow />
                    <spotLight position={[-10, 5, 20]} angle={0.5} penumbra={1} intensity={5} color="#ffffff" />
                    <spotLight position={[0, -10, 10]} angle={0.5} penumbra={1} intensity={3} color="#f59e0b" />

                    <Environment preset="city" />

                    <mesh rotation-x={-Math.PI / 2} position-y={-0.5} receiveShadow>
                        <planeGeometry args={[20, 20]} />
                        <shadowMaterial opacity={0.3} />
                    </mesh>

                    <Suspense fallback={null}>
                        <DynamicModel url={modelUrl} />
                    </Suspense>
                </Canvas>
            </div>
        </div>
    )
}

