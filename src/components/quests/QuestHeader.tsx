import React, { ReactNode } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Quest from '../../model/quests/Quest';
import { deleteQuest, toggleCollapsed, toggleCompleted } from '../../model/quests/QuestActions';
import CardHeader from '../shared/CardHeader';
import ActionButton from '../shared/ActionButton';

interface OwnProps {
  readonly quest: Quest;
  readonly edit: (quest: Quest) => void;
  readonly dragHandleProps: DraggableProvidedDragHandleProps | null;
}

interface DispatchProps {
  readonly toggleCollapsed: () => void;
  readonly toggleCompleted: () => void;
  readonly deleteQuest: () => void;
}

type Props = OwnProps & DispatchProps;

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  const questId = ownProps.quest.id;
  return {
    toggleCollapsed: () => dispatch(toggleCollapsed(questId)),
    toggleCompleted: () => dispatch(toggleCompleted(questId)),
    deleteQuest: () => dispatch(deleteQuest(questId)),
  };
}

class QuestHeader extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.openEditModal = this.openEditModal.bind(this);
  }

  private openEditModal() {
    this.props.edit(this.props.quest);
  }

  public render(): ReactNode {
    const {
      quest,
      toggleCollapsed: collapse,
      toggleCompleted: complete,
      deleteQuest: deleteIt,
      dragHandleProps,
    } = this.props;
    const actions = [
      <ActionButton icon="edit" key={ 'edit_' + quest.id } onClick={ this.openEditModal }/>,
      <ActionButton icon="delete" key={ 'delete_' + quest.id } onClick={ deleteIt } type="danger"/>,
      <ActionButton icon="check" key={ 'complete_' + quest.id } onClick={ complete }/>,
    ];
    return (

      <CardHeader title={ quest.title }
                  backgroundColor={ quest.done ? '#a5d6a7' : undefined }
                  collapsed={ quest.collapsed }
                  toggleCollapsed={ collapse }
                  actions={ actions }
                  editing={ false }
                  dragHandleProps={ dragHandleProps }
      />
    );
  }
}

export default connect<{}, DispatchProps, OwnProps>(() => ({}), mapDispatchToProps)(QuestHeader);
