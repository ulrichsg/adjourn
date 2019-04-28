import produce from 'immer';
import State from '../State';
import { KnowledgeAction, KnowledgeActionType } from './KnowledgeActions';
import { createKnowledgeCategory } from './KnowledgeCategory';
import KnowledgeItem, { createKnowledgeItem } from './KnowledgeItem';

export default function knowledgeReducer(state: State, action: KnowledgeAction): State {
  return produce(state, (draft: State) => {
    switch (action.type) {
      case KnowledgeActionType.TOGGLE_KNOWLEDGE_ITEM_COLLAPSED:
        const [i, item] = findKnowledgeItemIndex(draft, action.itemId);
        if (item) {
          draft.knowledge.items[i].collapsed = !item.collapsed;
        }
        break;
      case KnowledgeActionType.ADD_KNOWLEDGE_CATEGORY:
        const newCategory = createKnowledgeCategory(action.gameId, action.name);
        draft.knowledge.categories.push(newCategory);
        break;
      case KnowledgeActionType.ADD_KNOWLEDGE_ITEM:
        const newItem = createKnowledgeItem(action.categoryId, action.parentId, action.title, action.content);
        draft.knowledge.items.push(newItem);
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
