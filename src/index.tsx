import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import uuid from 'uuid';
import App from './components/App';
import { createKnowledgeCategory } from './model/knowledge/KnowledgeCategory';
import { createKnowledgeItem } from './model/knowledge/KnowledgeItem';
import mainReducer from './model/MainReducer';
import { createQuest } from './model/quests/Quest';

// tslint:disable no-var-requires
require('./style.css');
require('typeface-open-sans');

const game = { id: uuid.v4(), name: 'Pool of Radiance' };

const quests = [
  createQuest(game.id, 'Foo', 'Quux', 0),
  createQuest(game.id, 'Bar', 'Fnord', 1),
  createQuest(game.id, 'Qix', 'Truf', 2),
  createQuest(game.id, 'Herp', 'Derp', 3),
];

const categories = [
  createKnowledgeCategory(game.id, 'Places'),
];

const place1 = createKnowledgeItem(categories[0].id, null, 'New Phlan', 'Lorem ipsum dolor sit amet');
const place2 = createKnowledgeItem(categories[0].id, place1.id, 'The Stockades', 'Where the game starts');
const items = [
  place1,
  createKnowledgeItem(categories[0].id, null, 'Sorcerer\'s Isle', 'Home of Yarash'),
  place2,
  createKnowledgeItem(categories[0].id, place2.id, 'City Hall', 'Get quests here'),
  createKnowledgeItem(categories[0].id, place2.id, 'Temple of Tempus', 'Waaagh'),
];

// const mockState = {
//   games: [game],
//   activeGameId: game.id,
//   quests,
//   knowledge: {
//     categories,
//     items,
//   },
// };

const mockState = {
  games: [],
  activeGameId: '',
  quests: [],
  knowledge: {
    categories: [],
    items: [],
  },
};

const store = createStore(mainReducer, mockState);

render((
    <Provider store={store}>
      <App/>
    </Provider>
  ),
    document.getElementById('app'),
);
