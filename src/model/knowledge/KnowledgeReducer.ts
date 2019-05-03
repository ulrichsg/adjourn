import produce from 'immer';
import State from '../State';
import { KnowledgeAction, KnowledgeActionType } from './KnowledgeActions';
import KnowledgeCategory, { createKnowledgeCategory } from './KnowledgeCategory';
import KnowledgeItem, { createKnowledgeItem } from './KnowledgeItem';

export default function knowledgeReducer(state: State, action: KnowledgeAction): State {
  return produce(state, (draft: State) => {
    // tslint:disable-next-line one-variable-per-declaration
    let i, item, category;
    switch (action.type) {
      case KnowledgeActionType.TOGGLE_KNOWLEDGE_ITEM_COLLAPSED:
        [i, item] = findKnowledgeItemIndex(draft, action.itemId);
        if (item) {
          draft.knowledge.items[i].collapsed = !item.collapsed;
        }
        break;
      case KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY:
        const newCategory = createKnowledgeCategory(action.gameId, action.name);
        draft.knowledge.categories.push(newCategory);
        break;
      case KnowledgeActionType.RENAME_KNOWLEDGE_CATEGORY:
        [i, category] = findKnowledgeCategoryIndex(draft, action.categoryId);
        if (category) {
          draft.knowledge.categories[i].name = action.name;
        }
        break;
      case KnowledgeActionType.ADD_KNOWLEDGE_ITEM:
        const newItem = createKnowledgeItem(action.categoryId, action.parentId, action.title, action.content);
        draft.knowledge.items.push(newItem);
        break;
      case KnowledgeActionType.DELETE_KNOWLEDGE_ITEM:
        [i, item] = findKnowledgeItemIndex(draft, action.itemId);
        if (item) {
          const hasChildren = draft.knowledge.items.some(anItem => anItem.parentId === item.id);
          if (!hasChildren) {
            draft.knowledge.items.splice(i, 1);
          }
        }
        break;
      case KnowledgeActionType.EDIT_KNOWLEDGE_ITEM:
        [i, item] = findKnowledgeItemIndex(draft, action.itemId);
        if (item) {
          draft.knowledge.items[i].title = action.title;
          draft.knowledge.items[i].content = action.content;
        }
        break;
    }
  });
}

function findKnowledgeItemIndex(state: State, itemId: string): [number, KnowledgeItem | null] {
  const index = state.knowledge.items.findIndex(item => item.id === itemId);
  if (index < 0) {
    return [index, null];
  }
  return [index, state.knowledge.items[index]];
}

function findKnowledgeCategoryIndex(state: State, categoryId: string): [number, KnowledgeCategory | null] {
  const index = state.knowledge.categories.findIndex(category => category.id === categoryId);
  if (index < 0) {
    return [index, null];
  }
  return [index, state.knowledge.categories[index]];
}
