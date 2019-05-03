import produce from 'immer';
import { createKnowledgeCategory } from '../knowledge/KnowledgeCategory';
import State from '../State';
import { createGame } from './Game';
import { GameAction, GameActionType } from './GameActions';

export default function gameReducer(state: State, action: GameAction): State {
  return produce(state, (draft: State) => {
    switch (action.type) {
      case GameActionType.ADD_GAME:
        const game = createGame(action.name);
        draft.games.push(game);
        draft.activeGameId = game.id;
        const initialCategory = createKnowledgeCategory(game.id, 'Default Category');
        draft.knowledge.categories.push(initialCategory);
        break;
      case GameActionType.SWITCH_GAME:
        if (draft.games.find(g => g.id === action.id)) {
          draft.activeGameId = action.id;
        }
        break;
    }
  });
}
