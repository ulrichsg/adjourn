import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Quest from '../quest';
import QuestHeader from './QuestHeader';

const QuestContainer = styled.li`
  margin-bottom: 5px;
`;

const QuestNotes = styled.div`
  border: 1px solid #AAA;
  border-top-width: 0;
  padding: 1px 3px;
`;

interface Props {
  readonly quest: Quest;
  readonly edit: (quest: Quest) => void;
}

interface State {
  readonly editing: boolean;
  readonly title: string;
  readonly notes: string;
}

export default class QuestCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const quest = this.props.quest;
    return (
      <Draggable draggableId={quest.id} index={0}>
        {provided => (
          <QuestContainer ref={provided.innerRef} {...provided.draggableProps}>
            <QuestHeader quest={quest} edit={this.props.edit} dragHandleProps={provided.dragHandleProps}/>
            {quest.collapsed ? '' : <QuestNotes>{quest.notes}</QuestNotes>}
          </QuestContainer>
        )}
      </Draggable>
    );
  }
}
