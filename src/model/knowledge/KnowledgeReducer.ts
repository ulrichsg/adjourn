import produce from 'immer';
import State from '../State';
import { KnowledgeAction, KnowledgeActionType } from './KnowledgeActions';
import { createKnowledgeCategory } from './KnowledgeCategory';
import { createKnowledgeItem } from './KnowledgeItem';

export default function knowledgeReducer(state: State, action: KnowledgeAction): State {
  return produce(state, (draft: State) => {
    switch (action.type) {
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
