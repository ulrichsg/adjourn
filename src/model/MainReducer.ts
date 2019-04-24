import { GameAction, gameActionTypes } from './games/GameActions';
import gameReducer from './games/GameReducer';
import { KnowledgeAction, knowledgeActionTypes } from './knowledge/KnowledgeActions';
import knowledgeReducer from './knowledge/KnowledgeReducer';
import { QuestAction, questActionTypes } from './quests/QuestActions';
import questReducer from './quests/QuestReducer';
import State from './State';

const initialState: State = {
  games: [],
  activeGameId: '',
  quests: [],
  knowledge: {
    categories: [],
    items: [],
  },
};

type Action = GameAction | QuestAction | KnowledgeAction;

export default function mainReducer(state: State = initialState, action: Action): State {
  if (gameActionTypes.includes(action.type)) {
    return gameReducer(state, action as GameAction);
  }
  if (questActionTypes.includes(action.type)) {
    return questReducer(state, action as QuestAction);
  }
  if (knowledgeActionTypes.includes(action.type)) {
    return knowledgeReducer(state, action as KnowledgeAction);
  }
  return state;
}
