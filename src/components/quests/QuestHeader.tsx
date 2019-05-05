import React, { ReactNode } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Quest from '../../model/quests/Quest';
import { deleteQuest, toggleCollapsed, toggleCompleted } from '../../model/quests/QuestActions';
import ActionButton from '../shared/ActionButton';
import CardHeader from '../shared/CardHeader';

interface OwnProps {
  readonly quest: Quest;
  readonly title: string;
  readonly editing: boolean;
  readonly startEditing: () => void;
  readonly updateTitle: (title: string) => void;
  readonly submit: () => void;
  readonly cancel: () => void;
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
  }

  public render(): ReactNode {
    const {
      quest,
      title,
      editing,
      startEditing,
      updateTitle,
      submit,
      cancel,
      toggleCollapsed: collapse,
      toggleCompleted: complete,
      deleteQuest: deleteIt,
      dragHandleProps,
    } = this.props;
    const actions = [
      <ActionButton icon="edit" key={ 'edit_' + quest.id } onClick={ startEditing }/>,
      <ActionButton icon="delete" key={ 'delete_' + quest.id } onClick={ deleteIt } type="danger"/>,
      <ActionButton icon="check" key={ 'complete_' + quest.id } onClick={ complete }/>,
    ];
    return (
      <CardHeader title={ title }
                  backgroundColor={ quest.done ? '#a5d6a7' : undefined }
                  collapsed={ quest.collapsed }
                  toggleCollapsed={ collapse }
                  actions={ actions }
                  editing={ editing }
                  update={ updateTitle }
                  submit={ submit }
                  cancel={ cancel }
                  dragHandleProps={ dragHandleProps }
      />
    );
  }
}

export default connect<{}, DispatchProps, OwnProps>(() => ({}), mapDispatchToProps)(QuestHeader);
