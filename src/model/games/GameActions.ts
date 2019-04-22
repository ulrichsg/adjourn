export type GameAction =
  | AddGame
  | SwitchGame;

export enum GameActionType {
  ADD_GAME = 'add_game',
  SWITCH_GAME = 'switch_game',
}

export const gameActionTypes: string[] = [
  GameActionType.ADD_GAME,
  GameActionType.SWITCH_GAME,
];

export interface AddGame {
  type: GameActionType.ADD_GAME;
  name: string;
}

export function addGame(name: string): AddGame {
  return {
    type: GameActionType.ADD_GAME,
    name,
  };
}

export interface SwitchGame {
  type: GameActionType.SWITCH_GAME;
  id: string;
}

export function switchGame(id: string): SwitchGame {
  return {
    type: GameActionType.SWITCH_GAME,
    id,
  };
}
