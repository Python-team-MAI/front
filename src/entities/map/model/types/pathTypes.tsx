export interface Office {
    length: number
    width: number
    height: number
    coords: [number, number, number]
    color: string
    name: string
    type?: NodeType
    desc: string
}

export type NodeType = 'room' | 'corridor' | 'elevator' | 'stairs' | 'entrance'

export interface INode {
    id: string
    type: NodeType
    x: number
    y: number
    z: number
    floor: number
    name?: string
    landmarks?: string[]
    connections?: string[]
}

export interface IVerticalConnection {
    type: 'elevator' | 'stairs'
    name: string
    nodes: string[]
    weight: number
}

export interface IFloor {
    floor: number
    nodes: INode[]
}

export interface IBuildingGraph {
    floors: IFloor[]
    verticalConnections: IVerticalConnection[]
}
