import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Quest from '../../model/quests/Quest';
import { editQuest } from '../../model/quests/QuestActions';
import QuestModal from './QuestModal';

interface OwnProps {
  readonly quest: Quest | null;
  readonly hide: () => void;
}

interface DispatchProps {
  readonly editQuest: (questId: string, title: string, notes: string) => void;
}

type Props = OwnProps & DispatchProps;

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { editQuest: (gameId: string, title: string, notes: string) => dispatch(editQuest(gameId, title, notes)) };
}

class EditQuestModal extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    this.submit = this.submit.bind(this);
  }

  private submit(title: string, notes: string) {
    if (this.props.quest) {
      this.props.editQuest(this.props.quest.id, title, notes);
    }
  }

  public render() {
    const title = this.props.quest ? this.props.quest.title : null;
    const notes = this.props.quest ? this.props.quest.notes : null;
    return (
      <QuestModal visible={this.props.quest !== null}
                  hide={this.props.hide}
                  onSubmit={this.submit}
                  title={title}
                  notes={notes}
      />
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(EditQuestModal);
