import uuid from 'uuid';

export type Action =
  | ToggleCollapsed
  | ToggleCompleted
  | AddQuest
  | DeleteQuest
  | EditQuest;

export enum ActionType {
  TOGGLE_COLLAPSED = 'toggle_collapsed',
  TOGGLE_COMPLETED = 'toggle_completed',
  ADD_QUEST = 'add_quest',
  DELETE_QUEST = 'delete_quest',
  EDIT_QUEST = 'edit_quest',
}

export interface ToggleCollapsed {
  type: ActionType.TOGGLE_COLLAPSED;
  questId: string;
}

export function toggleCollapsed(questId: string): ToggleCollapsed {
  console.log('toggleCollapsed', questId);
  return {
    type: ActionType.TOGGLE_COLLAPSED,
    questId,
  };
}

export interface ToggleCompleted {
  type: ActionType.TOGGLE_COMPLETED;
  questId: string;
}

export function toggleCompleted(questId: string): ToggleCompleted {
  return {
    type: ActionType.TOGGLE_COMPLETED,
    questId,
  };
}

export interface AddQuest {
  type: ActionType.ADD_QUEST;
  questId: string;
  gameId: string;
  title: string;
  notes: string;
}

export function addQuest(gameId: string, title: string, notes: string): AddQuest {
  return {
    type: ActionType.ADD_QUEST,
    questId: uuid.v4(),
    gameId,
    title,
    notes,
  };
}

export interface DeleteQuest {
  type: ActionType.DELETE_QUEST;
  questId: string;
}

export function deleteQuest(questId: string): DeleteQuest {
  return {
    type: ActionType.DELETE_QUEST,
    questId,
  };
}

export interface EditQuest {
  type: ActionType.EDIT_QUEST;
  questId: string;
  title: string;
  notes: string;
}

export function editQuest(questId: string, title: string, notes: string): EditQuest {
  return {
    type: ActionType.EDIT_QUEST,
    questId,
    title,
    notes,
  };
}