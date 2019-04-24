import React from 'react';
import { connect } from 'react-redux';
import KnowledgeCategory from '../../model/knowledge/KnowledgeCategory';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import State from '../../model/State';
import KbItem from './KbItem';

interface OwnProps {
  category: KnowledgeCategory;
}

interface StateProps {
  items: KnowledgeItem[];
}

type Props = OwnProps & StateProps;

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  return {
    items: state.knowledge.items.filter(item => item.categoryId === ownProps.category.id && !item.parentId),
  };
}

class KbCategory extends React.Component<Props, {}> {
  public render() {
    const { category, items } = this.props;
    return (
      <li>
        <div>{ category.name }</div>
        { items.map(item => <KbItem item={item}/>) }
      </li>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(KbCategory);
