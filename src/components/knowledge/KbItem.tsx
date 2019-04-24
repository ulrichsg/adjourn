import React from 'react';
import { connect } from 'react-redux';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import State from '../../model/State';

interface OwnProps {
  item: KnowledgeItem;
}

interface StateProps {
  children: KnowledgeItem[];
}

type Props = OwnProps & StateProps;

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  return {
    children: state.knowledge.items.filter(item => item.parentId === ownProps.item.id),
  };
}

class KbItem extends React.Component<Props, {}> {
  public render() {
    const { item } = this.props;
    return (
      <div>
        <div>{ item.title }</div>
        <div>{ item.content }</div>
      </div>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(KbItem);
