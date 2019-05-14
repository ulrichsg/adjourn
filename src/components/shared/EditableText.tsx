import { Input } from 'antd';
import React, { ChangeEvent, KeyboardEvent } from 'react';
import styled from 'styled-components';

const EditableContent = styled.div`
  p {
    margin-bottom: 0.5em;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

interface Props {
  readonly content: string;
  readonly editing: boolean;
  readonly update: (value: string) => void;
  readonly submit: () => void;
  readonly cancel: () => void;
}

export default class EditableText extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.update = this.update.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  private update(event: ChangeEvent<HTMLTextAreaElement>) {
    this.props.update(event.target.value);
  }

  private handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (['Escape', 'Esc'].includes(event.key)) {
      this.props.cancel();
    }
    if (event.key === 'Enter' && event.shiftKey) {
      this.props.submit();
    }
  }

  public render() {
    const { content, editing } = this.props;
    const displayedContent = content
      .split('\n')
      // tslint:disable-next-line:jsx-key
      .map(paragraph => <p>{ paragraph }</p>);
    return editing
      ? <Input.TextArea value={ content } tabIndex={ 2 } onChange={ this.update } onKeyDown={ this.handleKeyDown }/>
      : <EditableContent>{ displayedContent }</EditableContent>;
  }
}
