import Game from './games/Game';
import KnowledgeCategory from './knowledge/KnowledgeCategory';
import KnowledgeItem from './knowledge/KnowledgeItem';
import Quest from './quests/Quest';

export default interface State {
  games: Game[];
  activeGameId: string;
  quests: Quest[];
  knowledge: {
    categories: KnowledgeCategory[];
    items: KnowledgeItem[];
  };
}
