export type KnowledgeAction =
  | ToggleKnowledgeItemCollapsed
  | AddKnowledgeCategory
  | AddKnowledgeItem;

export enum KnowledgeActionType {
  TOGGLE_KNOWLEDGE_ITEM_COLLAPSED = 'toggle_knowledge_item_collapsed',
  ADD_KNOWLEDGE_CATEGORY = 'add_knowledge_category',
  ADD_KNOWLEDGE_ITEM = 'add_knowledge_item',
}

export const knowledgeActionTypes: string[] = [
  KnowledgeActionType.TOGGLE_KNOWLEDGE_ITEM_COLLAPSED,
  KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY,
  KnowledgeActionType.ADD_KNOWLEDGE_ITEM,
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
  type: KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY,
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
  content: string
): AddKnowledgeItem {
  return {
    type: KnowledgeActionType.ADD_KNOWLEDGE_ITEM,
    categoryId,
    parentId,
    title,
    content,
  };
}
