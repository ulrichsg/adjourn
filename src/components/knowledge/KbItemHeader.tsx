import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import {
  addKnowledgeItem,
  deleteKnowledgeItem,
  toggleKnowledgeItemCollapsed,
} from '../../model/knowledge/KnowledgeActions';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import ActionButton from '../shared/ActionButton';
import CardHeader from '../shared/CardHeader';

interface OwnProps {
  readonly item: KnowledgeItem;
  readonly title: string;
  readonly editing: boolean;
  readonly startEditing: () => void;
  readonly updateTitle: (title: string) => void;
  readonly submit: () => void;
  readonly cancel: () => void;
}

interface DispatchProps {
  readonly toggleCollapsed: () => void;
  readonly addChildItem: () => void;
  readonly deleteMe: () => void;
}

type Props = OwnProps & DispatchProps;

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  const itemId = ownProps.item.id;
  return {
    toggleCollapsed: () => dispatch(toggleKnowledgeItemCollapsed(itemId)),
    addChildItem: () => dispatch(addKnowledgeItem(ownProps.item.categoryId, itemId, '', '')),
    deleteMe: () => dispatch(deleteKnowledgeItem(itemId)),
  };
}

class KbItemHeader extends React.Component<Props> {
  public render() {
    const {
      item,
      title,
      editing,
      startEditing,
      updateTitle,
      submit,
      cancel,
      toggleCollapsed,
      addChildItem,
      deleteMe,
    } = this.props;
    const editButton = editing
      ? <ActionButton icon="save" key={ 'save_' + item.id } onClick={ submit }/>
      : <ActionButton icon="edit" key={ 'edit_' + item.id } onClick={ startEditing }/>;
    const actions = [
      <ActionButton icon="plus" key={ 'add_child_' + item.id } onClick={ addChildItem }/>,
      <ActionButton icon="delete" key={ 'delete_' + item.id } onClick={ deleteMe } type="danger"/>,
      editButton,
    ];
    return (
      <CardHeader title={ title }
                  collapsed={ item.collapsed }
                  toggleCollapsed={ toggleCollapsed }
                  actions={ actions }
                  editing={ editing }
                  update={ updateTitle }
                  submit={ submit }
                  cancel={ cancel }
                  dragHandleProps={ null }
      />
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(KbItemHeader);
