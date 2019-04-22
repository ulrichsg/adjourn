import produce from 'immer';
import React from 'react';

import { Button, Dropdown, Icon, Menu, PageHeader } from 'antd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Game from '../../model/games/Game';
import { switchGame } from '../../model/games/GameActions';
import State from '../../model/State';
import AddGameModal from './AddGameModal';
// import styled from 'styled-components';

// tslint:disable-next-line no-var-requires
// require('typeface-galdeano');
//
// const HeaderBar = styled(AppBar)`
//   background-color: lightgray;
// `;
//
// const Brand = styled.p`
//   font-family: Galdeano, sans-serif;
//   color: black;
// `;

interface StateProps {
  readonly games: Game[];
  readonly gameId: string;
}

interface DispatchProps {
  readonly switchGame: (id: string) => () => void;
}

interface OwnState {
  readonly showAddGameModal: boolean;
}

function mapStateToProps(state: State): StateProps {
  return {
    games: state.games,
    gameId: state.activeGameId,
  };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    switchGame: (id: string) => () => dispatch(switchGame(id)),
  };
}

type Props = StateProps & DispatchProps;

class Header extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = { showAddGameModal: false };
    this.openAddGameModal = this.openAddGameModal.bind(this);
    this.closeAddGameModal = this.closeAddGameModal.bind(this);
  }

  private openAddGameModal() {
    const nextState = produce(this.state, draft => { draft.showAddGameModal = true; });
    this.setState(nextState);
  }

  private closeAddGameModal() {
    const nextState = produce(this.state, draft => { draft.showAddGameModal = false; });
    this.setState(nextState);
  }

  private renderMenu(): React.ReactNode {
    const games = this.props.games;
    const currentGame = games.find(game => game.id === this.props.gameId);
    if (!currentGame) {
      return <Button>Add game</Button>;
    }

    const menuItems = games.map(game => (
      <Menu.Item key={ game.id } onClick={ this.props.switchGame(game.id) }>
        { game.name }
      </Menu.Item>
    ));
    const menu = (
      <Menu selectedKeys={ [currentGame.id] }>
        { menuItems }
        <Menu.Divider/>
        <Menu.Item key="add_game" onClick={ this.openAddGameModal }>Add Game</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <a className="ant-dropdown-link" href="#">
          {currentGame.name}
          <Icon type="down"/>
        </a>
      </Dropdown>
    );
  }

  public render() {
    const gameMenu = this.renderMenu();
    return (
      <React.Fragment>
        <PageHeader backIcon={false} title="Adjourn" subTitle={gameMenu}/>
        <AddGameModal visible={this.state.showAddGameModal} hide={this.closeAddGameModal}/>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
