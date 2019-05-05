import uuid from 'uuid';

export type QuestAction =
  | ToggleCollapsed
  | ToggleCompleted
  | AddQuest
  | DeleteQuest
  | EditQuest
  | ChangeQuestOrder;

export enum QuestActionType {
  TOGGLE_COLLAPSED = 'toggle_collapsed',
  TOGGLE_COMPLETED = 'toggle_completed',
  ADD_QUEST = 'add_quest',
  DELETE_QUEST = 'delete_quest',
  EDIT_QUEST = 'edit_quest',
  CHANGE_QUEST_ORDER = 'change_quest_order',
}

export const questActionTypes: string[] = [
  QuestActionType.TOGGLE_COLLAPSED,
  QuestActionType.TOGGLE_COMPLETED,
  QuestActionType.ADD_QUEST,
  QuestActionType.DELETE_QUEST,
  QuestActionType.EDIT_QUEST,
  QuestActionType.CHANGE_QUEST_ORDER,
];

export interface ToggleCollapsed {
  type: QuestActionType.TOGGLE_COLLAPSED;
  questId: string;
}

export function toggleCollapsed(questId: string): ToggleCollapsed {
  return {
    type: QuestActionType.TOGGLE_COLLAPSED,
    questId,
  };
}

export interface ToggleCompleted {
  type: QuestActionType.TOGGLE_COMPLETED;
  questId: string;
}

export function toggleCompleted(questId: string): ToggleCompleted {
  return {
    type: QuestActionType.TOGGLE_COMPLETED,
    questId,
  };
}

export interface AddQuest {
  type: QuestActionType.ADD_QUEST;
  questId: string;
  gameId: string;
}

export function addQuest(gameId: string): AddQuest {
  return {
    type: QuestActionType.ADD_QUEST,
    questId: uuid.v4(),
    gameId,
  };
}

export interface DeleteQuest {
  type: QuestActionType.DELETE_QUEST;
  questId: string;
}

export function deleteQuest(questId: string): DeleteQuest {
  return {
    type: QuestActionType.DELETE_QUEST,
    questId,
  };
}

export interface EditQuest {
  type: QuestActionType.EDIT_QUEST;
  questId: string;
  title: string;
  notes: string;
}

export function editQuest(questId: string, title: string, notes: string): EditQuest {
  return {
    type: QuestActionType.EDIT_QUEST,
    questId,
    title,
    notes,
  };
}

export interface ChangeQuestOrder {
  type: QuestActionType.CHANGE_QUEST_ORDER;
  questId: string;
  newIndex: number;
}

export function changeQuestOrder(questId: string, newIndex: number): ChangeQuestOrder {
  return {
    type: QuestActionType.CHANGE_QUEST_ORDER,
    questId,
    newIndex,
  };
}
