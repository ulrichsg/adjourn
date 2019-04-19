import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuest } from '../QuestActions';
import { State } from '../QuestReducer';
import QuestModal from './QuestModal';

interface OwnProps {
  readonly visible: boolean;
  readonly hide: () => void;
}

interface StateProps {
  readonly gameId: string;
}

interface DispatchProps {
  addQuest: (gameId: string, title: string, notes: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: State): StateProps {
  return { gameId: state.activeGameId };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { addQuest: (gameId: string, title: string, notes: string) => dispatch(addQuest(gameId, title, notes)) };
}

class AddQuestModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  private submit(title: string, notes: string) {
    this.props.addQuest(this.props.gameId, title, notes);
  }

  public render() {
    return (
      <QuestModal visible={this.props.visible} hide={this.props.hide} onSubmit={this.submit}/>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestModal);
