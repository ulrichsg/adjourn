import produce from 'immer';
import State from '..';
import Quest, { createQuest } from './Quest';
import { QuestAction, QuestActionType } from './QuestActions';

export default function questReducer(state: State, action: QuestAction): State {
  return produce(state, (draft: State) => {
    let quest;
    let i;
    switch (action.type) {
      case QuestActionType.TOGGLE_COLLAPSED:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests[i].collapsed = !quest.collapsed;
        }
        break;
      case QuestActionType.TOGGLE_COMPLETED:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests[i].done = !quest.done;
        }
        break;
      case QuestActionType.ADD_QUEST:
        const nextSortIndex = draft.quests.filter(q => q.gameId === action.gameId).length;
        quest = createQuest(action.gameId, nextSortIndex);
        draft.quests.push(quest);
        break;
      case QuestActionType.EDIT_QUEST:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests[i].title = action.title.trim();
          draft.quests[i].notes = action.notes.trim();
        }
        break;
      case QuestActionType.DELETE_QUEST:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (quest) {
          draft.quests.splice(i, 1);
        }
        break;
      case QuestActionType.CHANGE_QUEST_ORDER:
        [i, quest] = findQuestIndex(draft, action.questId);
        if (!quest) {
          return;
        }
        const gameId = quest.gameId;
        const forward = action.newIndex > quest.sortIndex;
        const oldIndex = quest.sortIndex;
        for (const k of draft.quests.keys()) {
          const currentQuest = draft.quests[k];
          if (currentQuest.gameId !== gameId) {
            continue;
          }
          const currentSortIndex = currentQuest.sortIndex;
          if (k === i) {
            draft.quests[k].sortIndex = action.newIndex;
          } else if (forward && currentSortIndex > oldIndex && currentSortIndex <= action.newIndex) {
            --draft.quests[k].sortIndex;
          } else if (!forward && currentSortIndex >= action.newIndex && currentSortIndex < oldIndex) {
            ++draft.quests[k].sortIndex;
          }
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
