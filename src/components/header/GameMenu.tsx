import { Button, Dropdown, Icon, Menu } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import Game from '../../model/games/Game';
import { switchGame } from '../../model/games/GameActions';
import State from '../../model/State';

const GameSwitch = styled.a`
  color: black;
  max-width: 50%;
  display: flex;
  align-items: center;
  i {
    margin-left: 5px;
  }
`;

const GameName = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SwitchIcon = styled(Icon)`
  flex-shrink: 0;
`;

interface OwnProps {
  readonly openAddGameModal: () => void;
}

interface StateProps {
  readonly games: Game[];
  readonly gameId: string;
}

interface DispatchProps {
  readonly switchGame: (id: string) => () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

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

class GameMenu extends React.Component<Props> {
  public render() {
    const games = this.props.games;
    const currentGame = games.find(game => game.id === this.props.gameId);
    if (!currentGame) {
      return <Button type="primary" onClick={ this.props.openAddGameModal }>Add game</Button>;
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
        <Menu.Item key="add_game" onClick={ this.props.openAddGameModal }>Add Game</Menu.Item>
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']}>
        <GameSwitch className="ant-dropdown-link" href="#">
          <GameName>{currentGame.name}</GameName>
          <SwitchIcon type="down"/>
        </GameSwitch>
      </Dropdown>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
