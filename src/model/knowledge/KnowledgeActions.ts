export type KnowledgeAction =
  | AddKnowledgeCategory
  | AddKnowledgeItem;

export enum KnowledgeActionType {
  ADD_KNOWLEDGE_CATEGORY = 'add_knowledge_category',
  ADD_KNOWLEDGE_ITEM = 'add_knowledge_item',
}

export const knowledgeActionTypes: string[] = [
  KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY,
  KnowledgeActionType.ADD_KNOWLEDGE_ITEM,
];

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
