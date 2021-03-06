import Game from './games/Game';
import { GameAction, gameActionTypes } from './games/GameActions';
import gameReducer from './games/GameReducer';
import { KnowledgeAction, knowledgeActionTypes } from './knowledge/KnowledgeActions';
import KnowledgeCategory from './knowledge/KnowledgeCategory';
import KnowledgeItem from './knowledge/KnowledgeItem';
import knowledgeReducer from './knowledge/KnowledgeReducer';
import Quest from './quests/Quest';
import { QuestAction, questActionTypes } from './quests/QuestActions';
import questReducer from './quests/QuestReducer';

export interface State {
  games: Game[];
  activeGameId: string;
  quests: Quest[];
  knowledge: {
    categories: KnowledgeCategory[];
    items: KnowledgeItem[];
  };
}

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

export function reducer(state: State = initialState, action: Action): State {
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
