import { Button, Icon } from 'antd';
import React, { ReactNode } from 'react';
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
  readonly dragHandleProps: DraggableProvidedDragHandleProps | null;
}

export default class CardHeader extends React.Component<Props, {}> {
  public render(): ReactNode {
    const {
      title,
      backgroundColor,
      collapsed,
      toggleCollapsed,
      actions,
      dragHandleProps,
    } = this.props;
    return (
      <Header style={ { backgroundColor } } { ...dragHandleProps }>
        <CardExpander>
          <Icon type={ collapsed ? 'caret-right' : 'caret-down' } onClick={ toggleCollapsed }/>
        </CardExpander>
        <CardTitle>
          { title }
        </CardTitle>
        <CardActions>
          { actions }
        </CardActions>
      </Header>
    );
  }
}
