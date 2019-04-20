import { Button, Icon } from 'antd';
import { ButtonType } from 'antd/lib/button';
import * as React from 'react';

interface Props {
  icon: string;
  onClick: () => void;
  type?: ButtonType | null;
}

export default class ActionButton extends React.Component<Props, {}> {
  public render() {
    const type = this.props.type || 'default';
    return (
      <Button type={type} size="small" onClick={this.props.onClick}>
        <Icon type={this.props.icon}/>
      </Button>
    );
  }
}