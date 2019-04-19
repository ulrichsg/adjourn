import { Col, Row } from 'antd';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import styled from 'styled-components';
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

const quests = [
  createQuest('Foo', 'Quux'),
  createQuest('Bar', 'Fnord'),
];

const store = createStore(questReducer, { quests });

render((
    <Provider store={store}>
      <React.Fragment>
        <Header/>
        <Body>
          <h1>Insert Game Name Here</h1>
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
