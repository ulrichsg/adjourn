import { Button, Icon, Input, Tooltip } from 'antd';
import produce from 'immer';
import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import Quest from '../../model/quests/Quest';
import { changeQuestOrder } from '../../model/quests/QuestActions';
import State from '../../model/State';
import AddQuestModal from './AddQuestModal';
import EditQuestModal from './EditQuestModal';
import QuestCard from './QuestCard';

const ListHeader = styled.div`
  display: flex;
  font-size: 150%;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ListActions = styled.div`
  white-space: nowrap;
  margin-left: auto;
  flex-shrink: 0;
  button {
    margin-left: 5px;
  }
`;

const AddQuestButton = styled(Button)`
  &, &:focus {
    background-color: #43a047;
    border-color: #43a047;
  }
  &:hover {
    background-color: #2e7d32;
    border-color: #2e7d32;
  }
`;

const QuestCards = styled.ul`
  list-style: none outside;
  padding-inline-start: 0;
`;

interface StateProps {
  readonly gameId: string;
  readonly quests: Quest[];
}

interface DispatchProps {
  readonly changeQuestOrder: (questId: string, newIndex: number) => void;
}

type Props = StateProps & DispatchProps;

interface OwnState {
  readonly showCompleted: boolean;
  readonly searchString: string;
  readonly adding: boolean;
  readonly editing: boolean;
  readonly editedQuest: Quest | null;
}

const mapStateToProps = (state: State): StateProps => ({
  gameId: state.activeGameId,
  quests: state.quests,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  changeQuestOrder: (questId: string, newIndex: number) => dispatch(changeQuestOrder(questId, newIndex)),
});

class QuestList extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCompleted: false,
      searchString: '',
      adding: false,
      editing: false,
      editedQuest: null,
    };
    this.openAddQuestModal = this.openAddQuestModal.bind(this);
    this.closeAddQuestModal = this.closeAddQuestModal.bind(this);
    this.openEditQuestModal = this.openEditQuestModal.bind(this);
    this.closeEditQuestModal = this.closeEditQuestModal.bind(this);
    this.toggleShowCompleted = this.toggleShowCompleted.bind(this);
    this.filter = this.filter.bind(this);
    this.handleDragDrop = this.handleDragDrop.bind(this);
  }

  private openAddQuestModal() {
    const nextState = produce(this.state, draft => { draft.adding = true; });
    this.setState(nextState);
  }

  private closeAddQuestModal() {
    const nextState = produce(this.state, draft => { draft.adding = false; });
    this.setState(nextState);
  }

  private openEditQuestModal(quest: Quest) {
    const nextState = produce(this.state, draft => { draft.editedQuest = quest; });
    this.setState(nextState);
  }

  private closeEditQuestModal() {
    const nextState = produce(this.state, draft => { draft.editedQuest = null; });
    this.setState(nextState);
  }

  private toggleShowCompleted() {
    const nextState = produce(this.state, draft => { draft.showCompleted = !this.state.showCompleted; });
    this.setState(nextState);
  }

  private filter(searchString: string) {
    const nextState = produce(this.state, draft => { draft.searchString = searchString; });
    this.setState(nextState);
  }

  private handleDragDrop(result: DropResult) {
    if (result.reason === 'CANCEL' || !result.destination) {
      return;
    }
    const questId = result.draggableId;
    // result.destination.index gives us the position relative to the currently displayed list,
    // so we have to convert that into the position relative to all quests for the current game
    let newIndex = result.destination.index;
    if (newIndex > 0) {
      const allQuests = this.filterQuests();
      const questToPlaceThisAfter = allQuests[newIndex];
      newIndex = questToPlaceThisAfter.sortIndex;
    }
    const quest = this.props.quests.find(q => q.id === questId);
    if (quest && quest.sortIndex !== newIndex) {
      this.props.changeQuestOrder(questId, newIndex);
    }
  }

  private filterQuests(): Quest[] {
    const { showCompleted, searchString } = this.state;
    return Array
      .from(this.props.quests)
      .filter(quest => {
        return quest.gameId === this.props.gameId
          && (showCompleted || !quest.done)
          && (searchString === '' || quest.title.includes(searchString) || quest.notes.includes(searchString))
          ;
      })
      .sort((left: Quest, right: Quest) => left.sortIndex > right.sortIndex ? 1 : -1);
  }

  public render() {
    const { showCompleted } = this.state;
    const quests = this.filterQuests();
    const listContent = quests.length > 0
      ? quests.map(quest => (<QuestCard quest={quest} key={quest.id} edit={this.openEditQuestModal}/>))
      : <p>No quests here.</p>;
    return (
      <DragDropContext onDragEnd={this.handleDragDrop}>
        <div className="quests">
          <ListHeader>
            <div>Quests</div>
            <ListActions>
              <Input.Search placeholder="Filter" onSearch={this.filter} style={{ width: 200 }}/>
              <Tooltip title={showCompleted ? 'Hide Completed' : 'Show Completed'}>
                <Button type={showCompleted ? 'default' : 'dashed'} shape="circle" onClick={this.toggleShowCompleted}>
                  <Icon type="check"/>
                </Button>
              </Tooltip>
              <Tooltip title="Add Quest">
                <AddQuestButton type="primary" shape="circle" onClick={this.openAddQuestModal}>
                  <Icon type="plus"/>
                </AddQuestButton>
              </Tooltip>
            </ListActions>
          </ListHeader>
          <AddQuestModal visible={this.state.adding} hide={this.closeAddQuestModal}/>
          <EditQuestModal quest={this.state.editedQuest}
                          hide={this.closeEditQuestModal}
          />
          <Droppable droppableId="quests">
            {provided => (
              <QuestCards ref={provided.innerRef} {...provided.droppableProps}>
                {listContent}
                {provided.placeholder}
              </QuestCards>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuestList);
