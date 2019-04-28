export type KnowledgeAction =
  | ToggleKnowledgeItemCollapsed
  | AddKnowledgeCategory
  | AddKnowledgeItem
  | DeleteKnowledgeItem
  | EditKnowledgeItem;

export enum KnowledgeActionType {
  TOGGLE_KNOWLEDGE_ITEM_COLLAPSED = 'toggle_knowledge_item_collapsed',
  ADD_KNOWLEDGE_CATEGORY = 'add_knowledge_category',
  ADD_KNOWLEDGE_ITEM = 'add_knowledge_item',
  DELETE_KNOWLEDGE_ITEM = 'delete_knowledge_item',
  EDIT_KNOWLEDGE_ITEM = 'edit_knowledge_item',
}

export const knowledgeActionTypes: string[] = [
  KnowledgeActionType.TOGGLE_KNOWLEDGE_ITEM_COLLAPSED,
  KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY,
  KnowledgeActionType.ADD_KNOWLEDGE_ITEM,
  KnowledgeActionType.DELETE_KNOWLEDGE_ITEM,
  KnowledgeActionType.EDIT_KNOWLEDGE_ITEM,
];

export interface ToggleKnowledgeItemCollapsed {
  type: KnowledgeActionType.TOGGLE_KNOWLEDGE_ITEM_COLLAPSED;
  itemId: string;
}

export function toggleKnowledgeItemCollapsed(itemId: string): ToggleKnowledgeItemCollapsed {
  return {
    type: KnowledgeActionType.TOGGLE_KNOWLEDGE_ITEM_COLLAPSED,
    itemId,
  };
}

export interface AddKnowledgeCategory {
  type: KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY;
  gameId: string;
  name: string;
}

export function addKnowledgeCategory(gameId: string, name: string): AddKnowledgeCategory {
  return {
    type: KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY,
    gameId,
    name,
  };
}

export interface AddKnowledgeItem {
  type: KnowledgeActionType.ADD_KNOWLEDGE_ITEM;
  categoryId: string;
  parentId: string | null;
  title: string;
  content: string;
}

export function addKnowledgeItem(
  categoryId: string,
  parentId: string | null,
  title: string,
  content: string,
): AddKnowledgeItem {
  return {
    type: KnowledgeActionType.ADD_KNOWLEDGE_ITEM,
    categoryId,
    parentId,
    title,
    content,
  };
}

export interface DeleteKnowledgeItem {
  type: KnowledgeActionType.DELETE_KNOWLEDGE_ITEM;
  itemId: string;
}

export function deleteKnowledgeItem(itemId: string): DeleteKnowledgeItem {
  return {
    type: KnowledgeActionType.DELETE_KNOWLEDGE_ITEM,
    itemId,
  };
}

export interface EditKnowledgeItem {
  type: KnowledgeActionType.EDIT_KNOWLEDGE_ITEM;
  itemId: string;
  title: string;
  content: string;
}

export function editKnowledgeItem(itemId: string, title: string, content: string): EditKnowledgeItem {
  return {
    type: KnowledgeActionType.EDIT_KNOWLEDGE_ITEM,
    itemId,
    title,
    content,
  };
}