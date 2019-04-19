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
      adding: false,
      editing: false,
      editedQuest: null,
    };
    this.openAddQuestModal = this.openAddQuestModal.bind(this);
    this.closeAddQuestModal = this.closeAddQuestModal.bind(this);
    this.openEditQuestModal = this.openEditQuestModal.bind(this);
    this.closeEditQuestModal = this.closeEditQuestModal.bind(this);
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

  public render() {
    const quests = this.props.quests;
    const listContent = quests.length > 0
      ? quests.map(quest => (<QuestCard quest={quest} key={quest.id} edit={this.openEditQuestModal}/>))
      : <p>No quests here.</p>;
    return (
      <div className="quests">
        <ListHeader>
          <div>Quests</div>
          <ListActions>
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
