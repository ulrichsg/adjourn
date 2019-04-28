import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { toggleKnowledgeItemCollapsed } from '../../model/knowledge/KnowledgeActions';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import CardHeader from '../shared/CardHeader';

interface OwnProps {
  item: KnowledgeItem;
}

interface DispatchProps {
  toggleCollapsed: () => void;
}

type Props = OwnProps & DispatchProps;

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  const itemId = ownProps.item.id;
  return {
    toggleCollapsed: () => dispatch(toggleKnowledgeItemCollapsed(itemId)),
  };
}

class KbItemHeader extends React.Component<Props, {}> {
  public render() {
    const { item, toggleCollapsed } = this.props;
    return (
      <CardHeader title={ item.title }
                  collapsed={ item.collapsed }
                  toggleCollapsed={ toggleCollapsed }
                  actions={ [] }
                  dragHandleProps={ null }
      />
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(KbItemHeader);
