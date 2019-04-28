import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { editKnowledgeItem } from '../../model/knowledge/KnowledgeActions';
import KnowledgeItem from '../../model/knowledge/KnowledgeItem';
import State from '../../model/State';
import ImmerStateComponent from '../shared/ImmerStateComponent';
import KbItemContent from './KbItemContent';
import KbItemHeader from './KbItemHeader';

const KbItemCard = styled.div`
  border: 1px solid #AAA;
  border-bottom-width: 0;

  &:last-child {
  border-bottom-width: 1px;
  }
`;

const KbItemBody = styled.div`
  border-top: 1px solid #AAA;
  padding: 5px 2px 5px 10px;
`;

interface OwnProps {
  readonly item: KnowledgeItem;
}

interface StateProps {
  readonly children: KnowledgeItem[];
}

interface DispatchProps {
  readonly edit: (title: string, content: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: State, ownProps: OwnProps): StateProps {
  return {
    children: state.knowledge.items.filter(item => item.parentId === ownProps.item.id),
  };
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: OwnProps): DispatchProps {
  return {
    edit: (title: string, content: string) => dispatch(editKnowledgeItem(ownProps.item.id, title, content)),
  };
}

interface OwnState {
  readonly editing: boolean;
  readonly title: string;
  readonly content: string;
}

class KbItem extends ImmerStateComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      editing: props.item.title.length === 0,
      title: props.item.title,
      content: props.item.content,
    };

    this.startEditing = this.startEditing.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.cancelEditing = this.cancelEditing.bind(this);
    this.updateContent = this.updateContent.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  private startEditing() {
    this.updateState(draft => { draft.editing = true; });
  }

  private updateTitle(title: string) {
    this.updateState(draft => { draft.title = title; });
  }

  private updateContent(content: string) {
    this.updateState(draft => { draft.content = content; });
  }

  private cancelEditing() {
    this.updateState(draft => {
      draft.editing = false;
      draft.title = this.props.item.title;
      draft.content = this.props.item.content;
    });
  }

  private submitChanges() {
    this.props.edit(this.state.title, this.state.content);
    this.updateState(draft => { draft.editing = false; });
  }

  private renderBody(): React.ReactNode {
    const { item, children } = this.props;
    return (
      <KbItemBody>
        <KbItemContent item={ item }
                       editing={ this.state.editing }
                       content={ this.state.content }
                       updateContent={ this.updateContent }
                       cancelEditing={ this.cancelEditing }
                       submit={ this.submitChanges }
        >
          { item.content }
        </KbItemContent>
        { children.map(child => <ConnectedKbItem item={ child } key={ child.id }/>)}
      </KbItemBody>
    );
  }

  public render() {
    const { item } = this.props;
    const body = item.collapsed || this.renderBody();
    return (
      <KbItemCard>
        <KbItemHeader
          item={ item }
          title={ this.state.title }
          editing={ this.state.editing }
          startEditing={ this.startEditing }
          updateTitle={ this.updateTitle }
          cancel={ this.cancelEditing }
          submit={ this.submitChanges }
        />
        { body }
      </KbItemCard>
    );
  }
}

const ConnectedKbItem = connect(mapStateToProps, mapDispatchToProps)(KbItem);
export default ConnectedKbItem;
