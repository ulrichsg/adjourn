import { GameAction, gameActionTypes } from './games/GameActions';
import gameReducer from './games/GameReducer';
import { QuestAction, questActionTypes } from './quests/QuestActions';
import questReducer from './quests/QuestReducer';
import State from './State';

const initialState: State = {
  games: [],
  activeGameId: '',
  quests: [],
};

type Action = GameAction | QuestAction;

export default function mainReducer(state: State = initialState, action: Action): State {
  if (gameActionTypes.includes(action.type)) {
    return gameReducer(state, action as GameAction);
  }
  if (questActionTypes.includes(action.type)) {
    return questReducer(state, action as QuestAction);
  }
  // tslint:disable-next-line no-console
  console.error(`Unknown action type: ${action.type}, did you forget to register it?`);
  return state;
}
