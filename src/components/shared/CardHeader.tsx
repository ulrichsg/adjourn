import { Button, Icon, Input } from 'antd';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import { DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Header = styled.div`
  display: flex;
  background-color: #CCC;
  padding: 1px;
`;

const CardTitle = styled.div`
  font-weight: bold;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const CardExpander = styled.div`
  margin: 0 5px;
`;

const CardActions = styled(Button.Group)`
  margin-left: auto;
  flex-shrink: 0;
`;

interface Props {
  readonly title: string;
  readonly backgroundColor?: string;
  readonly collapsed: boolean;
  readonly toggleCollapsed: () => void;
  readonly actions: React.ReactNode[];
  readonly editing: boolean;
  readonly update?: (value: string) => void;
  readonly submit?: () => void;
  readonly cancel?: () => void;
  readonly dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export default class CardHeader extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  private update(event: ChangeEvent<HTMLInputElement>): void {
    if (this.props.update) {
      const value = event.target.value;
      this.props.update(value);
    }
  }

  private handleKeyPress(event: KeyboardEvent<HTMLInputElement>): void {
    switch (event.key) {
      case 'Enter':
        if (this.props.submit) {
          this.props.submit();
        }
        break;
      case 'Esc':
      case 'Escape':
        if (this.props.cancel) {
          this.props.cancel();
        }
        break;
    }
  }

  private renderEditField(): React.ReactNode {
    return (
      <Input size="small"
             value={ this.props.title }
             autoFocus={ true }
             tabIndex={ 1 }
             onChange={ this.update }
             onKeyDown={ this.handleKeyPress }
      />
    );
  }

  public render() {
    const {
      title,
      backgroundColor,
      collapsed,
      toggleCollapsed,
      actions,
      editing,
      dragHandleProps,
    } = this.props;
    const cardTitle = editing ? this.renderEditField() : <CardTitle>{ title }</CardTitle>;
    return (
      <Header style={ { backgroundColor } } { ...dragHandleProps }>
        <CardExpander>
          <Icon type={ collapsed ? 'caret-right' : 'caret-down' } onClick={ toggleCollapsed }/>
        </CardExpander>
        { cardTitle }
        <CardActions>
          { actions }
        </CardActions>
      </Header>
    );
  }
}
