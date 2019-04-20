import { Button, Icon, Tooltip } from 'antd';
import produce from 'immer';
import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Quest from '../quest';
import { State } from '../QuestReducer';
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
  margin-left: auto;
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

interface Props {
  readonly quests: Quest[];
}

interface OwnState {
  readonly showCompleted: boolean;
  readonly adding: boolean;
  readonly editing: boolean;
  readonly editedQuest: Quest | null;
}

const mapStateToProps = (state: State): Props => ({
  quests: state.quests,
});

class QuestList extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      showCompleted: false,
      adding: false,
      editing: false,
      editedQuest: null,
    };
    this.openAddQuestModal = this.openAddQuestModal.bind(this);
    this.closeAddQuestModal = this.closeAddQuestModal.bind(this);
    this.openEditQuestModal = this.openEditQuestModal.bind(this);
    this.closeEditQuestModal = this.closeEditQuestModal.bind(this);
    this.toggleShowCompleted = this.toggleShowCompleted.bind(this);
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

  public render() {
    const showCompleted = this.state.showCompleted;
    const quests = this.props.quests.filter(quest => {
      return showCompleted || !quest.done;
    });
    const listContent = quests.length > 0
      ? quests.map(quest => (<QuestCard quest={quest} key={quest.id} edit={this.openEditQuestModal}/>))
      : <p>No quests here.</p>;
    return (
      <div className="quests">
        <ListHeader>
          <div>Quests</div>
          <ListActions>
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
        {listContent}
      </div>
    );
  }
}

export default connect<Props, {}, {}, State>(mapStateToProps, () => ({}))(QuestList);
