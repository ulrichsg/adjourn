import uuid from 'uuid';

export default interface KnowledgeItem {
  id: string;
  categoryId: string;
  parentId: string | null;
  title: string;
  content: string;
  collapsed: boolean;
}

export function createKnowledgeItem(categoryId: string, parentId: string | null, title: string, content: string) {
  return {
    id: uuid.v4(),
    categoryId,
    parentId,
    title: title.trim(),
    content: content.trim(),
    collapsed: false,
  };
}
