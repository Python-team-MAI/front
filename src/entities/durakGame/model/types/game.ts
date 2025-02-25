import { ICard } from "./card"
import { IHand } from "./hand"

export interface IGame {
    currentHand: IHand
    board: ICard[]
}  