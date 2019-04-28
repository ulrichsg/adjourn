import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import State from '../../model/State';
import KbItemHeader from './KbItemHeader';

const KbItemCard = styled.div`
  border: 1px solid #AAA;
  border-bottom-width: 0;
  
  &:last-child {
  border-bottom-width: 1px;
  }
`;

const KbItemContent = styled.div`
  border-top: 1px solid #AAA;
  padding: 5px 2px 5px 10px;
`;

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
    const { item, children } = this.props;
    const renderContent = () => (
      <KbItemContent>
        { item.content }
        { children.map(child => <ConnectedKbItem item={ child } key={ child.id }/>)}
      </KbItemContent>
    );
    return (
      <KbItemCard>
        <KbItemHeader item={ item }/>
        { item.collapsed || renderContent() }
      </KbItemCard>
    );
  }
}

const ConnectedKbItem = connect(mapStateToProps, () => ({}))(KbItem);
export default ConnectedKbItem;
