export enum Display {
    WIDE = "Wide",
    SMALL = "Small",
    MEDIUM = "Medium"
}

export enum PlayerLevel {
    HARD = 'Hard',
    EASY = "Easy",
    MEDIUM = "Medium"
}

export enum Category {
    ADVENTURE = "Adventure",
    SPORTS = "Sports",
    RACING = "Racing"
}

export interface GameConfigIProps {
    display: string;
    playerLevel: string;
    playerNumber: number
}

export interface GameIProps  {
 name: string;
 category: string;
 config: GameConfigIProps
}

