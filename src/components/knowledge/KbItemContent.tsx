import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { State } from '../../model';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import EditableText from '../shared/EditableText';

const ItemContent = styled.div`
  &.withChildren {
    margin-bottom: 5px;
  }
`;

interface OwnProps {
  readonly item: KnowledgeItem;
  readonly editing: boolean;
  readonly content: string;
  readonly updateContent: (content: string) => void;
  readonly cancelEditing: () => void;
  readonly submit: () => void;
}

interface StateProps {
  readonly hasChildren: boolean;
}

type Props = OwnProps | StateProps;

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  return { hasChildren: state.knowledge.items.find(item => item.parentId === ownProps.item.id) !== undefined };
}

class KbItemContent extends React.Component<Props> {
  public render() {
    const { editing, content, updateContent, cancelEditing, submit, hasChildren } = this.props;
    return (
      <ItemContent className={ hasChildren ? 'withChildren' : '' }>
        <EditableText content={ content }
                      editing={ editing }
                      update={ updateContent }
                      submit={ submit }
                      cancel={ cancelEditing }
        />
      </ItemContent>
    );
  }
}

export default connect(mapStateToProps, () => ({}))(KbItemContent);
