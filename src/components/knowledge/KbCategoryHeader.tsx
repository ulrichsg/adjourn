import { Button, Icon, Input, Tooltip } from 'antd';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { addKnowledgeItem, renameKnowledgeCategory } from '../../model/knowledge/KnowledgeActions';
import KnowledgeCategory from '../../model/knowledge/KnowledgeCategory';
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

interface DispatchProps {
  readonly addChildItem: () => void;
  readonly rename: (name: string) => void;
}

type Props = OwnProps & DispatchProps;

interface OwnState {
  readonly editing: boolean;
  readonly title: string;
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  const categoryId = ownProps.category.id;
  return {
    addChildItem: () => dispatch(addKnowledgeItem(categoryId, null, '', '')),
    rename: (name: string) => dispatch(renameKnowledgeCategory(categoryId, name)),
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

  public render() {
    const { category, addChildItem } = this.props;
    const title = this.state.editing
      ? (
        <Input value={ this.state.title }
               autoFocus={ true }
               onChange={ this.update }
               onKeyDown={ this.handleKeyDown }
        />
      )
      : <div>{ category.name }</div>;
    return (
      <CategoryHeader>
        { title }
        <CategoryActions>
          <Tooltip title="Rename Category">
            <Button shape="circle" onClick={ this.startEditing }>
              <Icon type="edit"/>
            </Button>
          </Tooltip>
          <Tooltip title="Add Item">
            <AddItemButton type="primary" shape="circle" onClick={ addChildItem }>
              <Icon type="plus"/>
            </AddItemButton>
          </Tooltip>
        </CategoryActions>
      </CategoryHeader>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(KbCategoryHeader);
