import { Input } from 'antd';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import State from '../../model/State';

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
  constructor(props: Props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private update(event: ChangeEvent<HTMLTextAreaElement>) {
    this.props.updateContent(event.target.value);
  }

  private handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (['Escape', 'Esc'].includes(event.key)) {
      this.props.cancelEditing();
    }
    if (event.key === 'Enter' && event.shiftKey) {
      this.props.submit();
    }
  }

  public render() {
    const { item, editing, content, hasChildren } = this.props;
    const element = editing
      ? <Input.TextArea value={ content } tabIndex={ 2 } onChange={ this.update } onKeyDown={ this.handleKeyDown }/>
      : <div>{ item.content }</div>
    ;
    return <ItemContent className={ hasChildren ? 'withChildren' : '' }>{ element }</ItemContent>;
  }
}

export default connect(mapStateToProps, () => ({}))(KbItemContent);
