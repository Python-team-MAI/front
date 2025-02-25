export type CardType = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'jack' | 'queen' | 'king' | 'ace'
export type CardLabels = 'hearts' | 'spades' | 'slashes' | 'crosses'

export interface ICard {
    type: CardType
    label: CardLabels
    player_id: string
}
