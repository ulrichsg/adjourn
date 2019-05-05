import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import Quest from '../../model/quests/Quest';
import { editQuest } from '../../model/quests/QuestActions';
import EditableText from '../shared/EditableText';
import ImmerStateComponent from '../shared/ImmerStateComponent';
import QuestHeader from './QuestHeader';

const QuestContainer = styled.li`
  margin-bottom: 5px;
`;

const QuestNotes = styled.div`
  border: 1px solid #AAA;
  border-top-width: 0;
  padding: 5px 2px 5px 10px;
`;

interface OwnProps {
  readonly quest: Quest;
  readonly edit: (quest: Quest) => void;
}

interface DispatchProps {
  readonly editQuest: (title: string, notes: string) => void;
}

type Props = OwnProps & DispatchProps;

interface OwnState {
  readonly editing: boolean;
  readonly title: string;
  readonly notes: string;
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  return {
    editQuest: (title: string, notes: string) => dispatch(editQuest(ownProps.quest.id, title, notes)),
  };
}

class QuestCard extends ImmerStateComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editing: props.quest.title.length === 0,
      title: props.quest.title,
      notes: props.quest.notes,
    };

    this.startEditing = this.startEditing.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
  }

  private startEditing() {
    this.updateState(draft => { draft.editing = true; });
  }

  private submitChanges() {
    if (this.state.title.length > 0) {
      this.props.editQuest(this.state.title, this.state.notes);
      this.updateState(draft => { draft.editing = false; });
    }
  }

  private cancelEditing() {
    this.updateState(draft => {
      draft.editing = false;
      draft.title = this.props.quest.title;
      draft.notes = this.props.quest.notes;
    });
  }

  private updateTitle(title: string) {
    this.updateState(draft => { draft.title = title; });
  }

  private updateNotes(notes: string) {
    this.updateState(draft => { draft.notes = notes; });
  }

  public render() {
    const quest = this.props.quest;
    const { title, notes, editing } = this.state;
    const renderBody = () => (
      <QuestNotes>
        <EditableText content={ notes }
                      editing={ editing }
                      update={ this.updateNotes }
                      submit={ this.submitChanges }
                      cancel={ this.cancelEditing }
        />
      </QuestNotes>
    );
    return (
      <Draggable draggableId={ quest.id } index={ quest.sortIndex }>
        {provided => (
          <QuestContainer ref={ provided.innerRef } { ...provided.draggableProps }>
            <QuestHeader quest={ quest }
                         title={ title }
                         editing={ editing }
                         startEditing={ this.startEditing }
                         updateTitle={ this.updateTitle }
                         submit={ this.submitChanges }
                         cancel={ this.cancelEditing }
                         dragHandleProps={ provided.dragHandleProps }
            />
            { quest.collapsed ? '' : renderBody() }
          </QuestContainer>
        )}
      </Draggable>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(QuestCard);
