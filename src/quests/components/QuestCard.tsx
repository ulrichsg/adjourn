import React from 'react';
import styled from 'styled-components';
import Quest from '../quest';
import QuestHeader from './QuestHeader';

const QuestContainer = styled.div`
  margin-bottom: 5px;
`;

const QuestNotes = styled.div`
  border: 1px solid #AAA;
  border-top-width: 0;
  padding: 1px 3px;
`;

interface Props {
  quest: Quest;
}

interface State {
  editing: boolean;
  title: string;
  notes: string;
}

export default class QuestCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  public render() {
    const quest = this.props.quest;
    return (
      <QuestContainer>
        <QuestHeader quest={quest}/>
        {quest.collapsed ? '' : <QuestNotes>{quest.notes}</QuestNotes>}
      </QuestContainer>
    );
  }
}
