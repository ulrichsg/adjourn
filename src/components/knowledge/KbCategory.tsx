import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import KnowledgeCategory from '../../model/knowledge/KnowledgeCategory';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import State from '../../model/State';
import KbItem from './KbItem';

const KbCategoryHeader = styled.div`
  font-weight: bold;
  font-size: 1.5em;
`;

interface OwnProps {
  readonly category: KnowledgeCategory;
}

interface StateProps {
  readonly items: KnowledgeItem[];
}

type Props = OwnProps & StateProps;

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  return {
    items: state.knowledge.items.filter(item => item.categoryId === ownProps.category.id && !item.parentId),
  };
}

class KbCategory extends React.Component<Props> {
  public render() {
    const { category, items } = this.props;
    return (
      <li>
        <KbCategoryHeader>{ category.name }</KbCategoryHeader>
        { items.map(item => <KbItem item={ item } key={ item.id }/>) }
      </li>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(KbCategory);
