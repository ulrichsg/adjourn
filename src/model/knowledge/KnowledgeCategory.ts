import uuid from 'uuid';

export default interface KnowledgeCategory {
  id: string;
  gameId: string;
  name: string;
}

export function createKnowledgeCategory(gameId: string, name: string): KnowledgeCategory {
  return {
    id: uuid.v4(),
    gameId,
    name,
  };
}
