import { Col, Row } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styled from 'styled-components';
import uuid from 'uuid';
import Header from './header/header';
import QuestList from './quests/components/QuestList';
import { createQuest } from './quests/Quest';
import questReducer from './quests/QuestReducer';

// tslint:disable no-var-requires
require('./style.css');
require('typeface-open-sans');

const Body = styled.div`
  width: 1170px;
  margin: 0 auto;
`;

const game = { id: uuid.v4(), name: 'Pool of Radiance' };

const quests = [
  createQuest(game.id, 'Foo', 'Quux', 0),
  createQuest(game.id, 'Bar', 'Fnord', 1),
  createQuest(game.id, 'Qix', 'Truf', 2),
  createQuest(game.id, 'Herp', 'Derp', 3),
];

const state = {
  games: [game],
  activeGameId: game.id,
  quests,
};

const store = createStore(questReducer, state);

render((
    <Provider store={store}>
      <React.Fragment>
        <Header/>
        <Body>
          <h1>{ game.name }</h1>
          <Row type="flex" gutter={40}>
            <Col span={12}>
              Placeholder
            </Col>
            <Col span={12}>
              <QuestList/>
            </Col>
          </Row>
        </Body>
      </React.Fragment>
    </Provider>
  ),
    document.getElementById('app'),
);
