import Game from './games/Game';
import Quest from './quests/Quest';

export default interface State {
  games: Game[];
  activeGameId: string;
  quests: Quest[];
}