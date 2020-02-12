import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../model';
import KnowledgeCategory from '../../model/knowledge/KnowledgeCategory';
import AddCategoryForm from './AddCategoryForm';
import KbCategory from './KbCategory';

const Categories = styled.ul`
  list-style: none outside;
  padding-inline-start: 0;
`;

interface StateProps {
  readonly categories: KnowledgeCategory[];
}

function mapStateToProps(state: State): StateProps {
  const allCategories = state.knowledge.categories;
  return {
    categories: allCategories.filter(category => category.gameId === state.activeGameId),
  };
}

class KnowledgeBase extends React.Component<StateProps, {}> {
  public render() {
    const { categories } = this.props;
    return (
      <React.Fragment>
        <Categories>
          { categories.map(category => <KbCategory category={category} key={category.id}/>) }
        </Categories>
        <AddCategoryForm/>
      </React.Fragment>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(KnowledgeBase);
