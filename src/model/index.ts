import Quest from '../quests/Quest';

interface Game {
  id: string;
  name: string;
}

export interface State {
  games: Game[];
  activeGameId: string;
  quests: Quest[];
}

export const initialState: State = {
  games: [],
  activeGameId: '',
  quests: [],
};
