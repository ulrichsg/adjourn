import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../model';
import KnowledgeCategory from '../../model/knowledge/KnowledgeCategory';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import KbCategoryHeader from './KbCategoryHeader';
import KbItem from './KbItem';

const KbEntry = styled.li`
  margin-bottom: 10px;
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
      <KbEntry>
        <KbCategoryHeader category={ category }/>
        { items.map(item => <KbItem item={ item } key={ item.id }/>) }
      </KbEntry>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(KbCategory);
