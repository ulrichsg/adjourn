import { Button, Icon, Input, Tooltip } from 'antd';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import {
  addKnowledgeItem,
  deleteKnowledgeCategory,
  renameKnowledgeCategory,
} from '../../model/knowledge/KnowledgeActions';
import KnowledgeCategory from '../../model/knowledge/KnowledgeCategory';
import State from '../../model/State';
import ImmerStateComponent from '../shared/ImmerStateComponent';

const CategoryHeader = styled.div`
  display: flex;
  font-weight: bold;
  font-size: 1.5em;
  margin-bottom: 10px;
`;

const CategoryActions = styled.div`
  white-space: nowrap;
  margin-left: auto;
  flex-shrink: 0;
  button {
    margin-left: 5px;
  }
`;

const AddItemButton = styled(Button)`
  &, &:focus {
    background-color: #43a047;
    border-color: #43a047;
  }
  &:hover {
    background-color: #2e7d32;
    border-color: #2e7d32;
  }
`;

interface OwnProps {
  readonly category: KnowledgeCategory;
}

interface StateProps {
  readonly hasEntries: boolean;
  readonly isOnlyCategoryForGame: boolean;
}

interface DispatchProps {
  readonly addChildItem: () => void;
  readonly rename: (name: string) => void;
  readonly deleteMe: () => void;
}

type Props = OwnProps & StateProps & DispatchProps;

interface OwnState {
  readonly editing: boolean;
  readonly title: string;
}

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  const { knowledge: kb, activeGameId } = state;
  return {
    hasEntries: kb.items.some(item => item.categoryId === ownProps.category.id),
    isOnlyCategoryForGame: kb.categories.filter(cat => cat.gameId === activeGameId).length === 1,
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  const categoryId = ownProps.category.id;
  return {
    addChildItem: () => dispatch(addKnowledgeItem(categoryId, null, '', '')),
    rename: (name: string) => dispatch(renameKnowledgeCategory(categoryId, name)),
    deleteMe: () => dispatch(deleteKnowledgeCategory(categoryId)),
  };
}

class KbCategoryHeader extends ImmerStateComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editing: false,
      title: props.category.name,
    };

    this.startEditing = this.startEditing.bind(this);
    this.update = this.update.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private startEditing() {
    this.updateState(draft => { draft.editing = true; });
  }

  private update(event: ChangeEvent<HTMLInputElement>) {
    this.updateState(draft => { draft.title = event.target.value; });
  }

  private handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      this.props.rename(this.state.title);
      this.updateState(draft => { draft.editing = false; });
    }
    if (['Escape', 'Esc'].includes(event.key)) {
      this.updateState(draft => {
        draft.title = this.props.category.name;
        draft.editing = false;
      });
    }
  }
  private renderTitle(): React.ReactNode {
    const name = this.props.category.name;
    return this.state.editing
      ? (
        <Input value={ this.state.title }
               autoFocus={ true }
               onChange={ this.update }
               onKeyDown={ this.handleKeyDown }
        />
      )
      : <div>{ name }</div>;
  }

  private renderDeleteButton(): React.ReactNode {
    const { deleteMe, hasEntries, isOnlyCategoryForGame } = this.props;
    const canDelete = !hasEntries && !isOnlyCategoryForGame;
    let tooltip;
    if (canDelete) {
      tooltip = 'Delete Category';
    } else if (hasEntries) {
      tooltip = 'Delete all entries first';
    } else {
      tooltip = 'Cannot delete the last category';
    }
    return (
      <Tooltip title={ tooltip }>
        <Button shape="circle" type="danger" disabled={ !canDelete } onClick={ deleteMe }>
          <Icon type="delete"/>
        </Button>
      </Tooltip>
    );
  }

  public render() {
    const title = this.renderTitle();
    const deleteButton = this.renderDeleteButton();
    return (
      <CategoryHeader>
        { title }
        <CategoryActions>
          { deleteButton }
          <Tooltip title="Rename Category">
            <Button shape="circle" onClick={ this.startEditing }>
              <Icon type="edit"/>
            </Button>
          </Tooltip>
          <Tooltip title="Add Item">
            <AddItemButton type="primary" shape="circle" onClick={ this.props.addChildItem }>
              <Icon type="plus"/>
            </AddItemButton>
          </Tooltip>
        </CategoryActions>
      </CategoryHeader>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KbCategoryHeader);
