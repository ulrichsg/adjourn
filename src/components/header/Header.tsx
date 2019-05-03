import React from 'react';
import styled from 'styled-components';
import ImmerStateComponent from '../shared/ImmerStateComponent';
import AddGameModal from './AddGameModal';
import GameMenu from './GameMenu';

const MyTitleBar = styled.div`
  line-height: 1.5em;
  vertical-align: middle;
  background-color: #b3e5fc;
  margin-bottom: 10px;

  .content {
    display: flex;
    justify-content: space-between;
    width: 1170px;
    max-width: 90%;
    margin: 0 auto;
    padding: 10px 0;

    .title {
      font-weight: bold;
      font-size: 120%;
    }

    a {
      color: black;
    }

    a:hover {
      color: #546e7a;
    }
  }
`;

interface OwnState {
  readonly showAddGameModal: boolean;
}

export default class Header extends ImmerStateComponent<{}, OwnState> {
  constructor() {
    super({});
    this.state = { showAddGameModal: false };
    this.openAddGameModal = this.openAddGameModal.bind(this);
    this.closeAddGameModal = this.closeAddGameModal.bind(this);
  }

  private openAddGameModal() {
    this.updateState(draft => { draft.showAddGameModal = true; });
  }

  private closeAddGameModal() {
    this.updateState(draft => { draft.showAddGameModal = false; });
  }

  public render() {
    return (
      <React.Fragment>
        <MyTitleBar>
          <div className="content">
            <div className="title">AdJourn</div>
            <GameMenu openAddGameModal={ this.openAddGameModal }/>
            <a href="https://github.com/ulrichsg/adjourn">GitHub</a>
          </div>
        </MyTitleBar>
        <AddGameModal visible={this.state.showAddGameModal} hide={this.closeAddGameModal}/>
      </React.Fragment>
    );
  }
}
