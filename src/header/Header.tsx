import React from 'react';

import { Button, Dropdown, Icon, Menu, PageHeader } from 'antd';
import { connect } from 'react-redux';
import { Game, State } from '../model';
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
  games: Game[];
  gameId: string;
}

function mapStateToProps(state: State): StateProps {
  return {
    games: state.games,
    gameId: state.activeGameId,
  };
}

class Header extends React.Component<StateProps, {}> {
  public render() {
    const games = this.props.games;
    const currentGame = games.find(game => game.id === this.props.gameId);
    let gameMenu;
    if (currentGame) {
      const menuItems = games.map(game => {
        return <Menu.Item key={ game.id }>{ game.name }</Menu.Item>;
      });
      const menu = (
        <Menu selectedKeys={ [currentGame.id] }>
          { menuItems }
          <Menu.Divider/>
          <Menu.Item key="add_game" disabled={true}>Add Game</Menu.Item>
        </Menu>
      );
      gameMenu = (
        <Dropdown overlay={menu} trigger={['click']}>
          <a className="ant-dropdown-link" href="#">
            {currentGame.name}
            <Icon type="down"/>
          </a>
        </Dropdown>
      );
    } else {
      gameMenu = <Button>Add game</Button>;
    }
    return (
      <PageHeader backIcon={false} title="Adjourn" subTitle={gameMenu}/>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(Header);
