import produce from 'immer';
import Quest, { createQuest } from './Quest';
import { Action, ActionType } from './QuestActions';

export interface State {
  activeGameId: string;
  quests: Quest[];
}

const initialState: State = {
  activeGameId: '',
  quests: [],
};

export default function questReducer(state: State = initialState, action: Action): State {
  return produce(state, (draft: State) => {
    let quest;
    let i;
    switch (action.type) {
      case ActionType.TOGGLE_COLLAPSED:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests[i].collapsed = !quest.collapsed;
        }
        break;
      case ActionType.TOGGLE_COMPLETED:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests[i].done = !quest.done;
        }
        break;
      case ActionType.ADD_QUEST:
        quest = createQuest(action.title, action.notes);
        draft.quests.push(quest);
        break;
      case ActionType.EDIT_QUEST:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests[i].title = action.title;
          draft.quests[i].notes = action.notes;
        }
        break;
      case ActionType.DELETE_QUEST:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests.splice(i, 1);
        }
        break;
    }
  });
}

function findQuestIndex(state: State, questId: string): [number, Quest | null] {
  const index = state.quests.findIndex(quest => quest.id === questId);
  if (index < 0) {
    return [index, null];
  }
  return [index, state.quests[index]];
}
