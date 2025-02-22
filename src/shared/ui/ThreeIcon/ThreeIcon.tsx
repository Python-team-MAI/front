import { Svg } from '@react-three/drei'
import { Euler } from 'three'

interface Icon3DProps {
    icon: string
    scale?: number
    color?: string
    position?: [number, number, number]
    rotation?: Euler
    anchorY?: string
    anchorX?: string
}

export const ThreeIcon = ({
    icon,
    scale = 0.01,
    color = 'white',
    position,
    rotation,
    anchorX,
    anchorY,
}: Icon3DProps) => {
    return (
        <Svg
            src={icon}
            scale={scale}
            fillMaterial={{ color }}
            position={position}
            rotation={rotation}
            anchorY={anchorY}
            anchorX={anchorX}
        />
    )
}
