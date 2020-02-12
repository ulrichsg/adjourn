import { Col, Empty, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { State } from '../model';
import Header from './header/Header';
import KnowledgeBase from './knowledge/KnowledgeBase';
import QuestList from './quests/QuestList';

const Body = styled.div`
  width: 1170px;
  max-width: 90%;
  margin: 0 auto;
  min-height: 90%;
`;

const EmptyBody = styled(Empty)`
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

interface StateProps {
  readonly isGameSelected: boolean;
}

function mapStateToProps(state: State): StateProps {
  return {
    isGameSelected: state.games.some(game => game.id === state.activeGameId),
  };
}

class App extends React.Component<StateProps, {}> {
  private renderEmptyBody(): React.ReactNode {
    return (
      <EmptyBody image={ Empty.PRESENTED_IMAGE_SIMPLE }
             description="Please select a game or create a new one."/>
    );
  }

  private renderBody(): React.ReactNode {
    return (
      <Body>
        <Row type="flex" gutter={40}>
          <Col xs={24} md={12}>
            <KnowledgeBase/>
          </Col>
          <Col xs={24} md={12}>
            <QuestList/>
          </Col>
        </Row>
      </Body>
    );
  }

  public render() {
    const body = this.props.isGameSelected ? this.renderBody() : this.renderEmptyBody();
    return (
      <React.Fragment>
        <Header/>
        { body }
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(App);
