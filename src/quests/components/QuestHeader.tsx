import { Button, Icon } from 'antd';
import React, { ReactNode } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import Quest from '../quest';
import { deleteQuest, toggleCollapsed, toggleCompleted } from '../QuestActions';
import ActionButton from './ActionButton';

const CardHeader = styled.div`
  display: flex;
  border: 1px solid #AAA;
  background-color: #CCC;
  padding: 1px;

  &.done {
    background-color: #a5d6a7;
  }
`;

const CardTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardExpander = styled.div`
  margin: 0 5px;
`;

const CardActions = styled(Button.Group)`
  margin-left: auto;
  flex-shrink: 0;
`;

interface OwnProps {
  readonly quest: Quest;
  readonly edit: (quest: Quest) => void;
  readonly dragHandleProps: DraggableProvidedDragHandleProps;
}

type QuestAction = (questId: string) => () => void;

interface DispatchProps {
  readonly toggleCollapsed: QuestAction;
  readonly toggleCompleted: QuestAction;
  readonly deleteQuest: QuestAction;
}

type Props = OwnProps & DispatchProps;

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  toggleCollapsed: (questId: string) => () => dispatch(toggleCollapsed(questId)),
  toggleCompleted: (questId: string) => () => dispatch(toggleCompleted(questId)),
  deleteQuest: (questId: string) => () => dispatch(deleteQuest(questId)),
});

class QuestHeader extends React.Component<Props, {}> {
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
    return (
      <CardHeader className={quest.done ? 'done' : ''} {...dragHandleProps}>
        <CardExpander>
          <Icon type={quest.collapsed ? 'caret-right' : 'caret-down'} onClick={collapse(quest.id)}/>
        </CardExpander>
        <CardTitle>{quest.title}</CardTitle>
        <CardActions>
          <ActionButton icon="edit" onClick={this.openEditModal}/>
          <ActionButton icon="delete" onClick={deleteIt(quest.id)} type="danger"/>
          <ActionButton icon="check" onClick={complete(quest.id)}/>
        </CardActions>
      </CardHeader>
    );
  }
}

export default connect<{}, DispatchProps, OwnProps>(() => ({}), mapDispatchToProps)(QuestHeader);
