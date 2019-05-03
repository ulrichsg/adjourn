import { Button, Icon } from 'antd';
import { ButtonType } from 'antd/lib/button';
import * as React from 'react';

interface Props {
  readonly icon: string;
  readonly onClick: () => void;
  readonly type?: ButtonType | null;
  readonly disabled?: boolean | null;
}

export default class ActionButton extends React.Component<Props, {}> {
  public render() {
    const type = this.props.type || 'default';
    return (
      <Button type={type} size="small" onClick={this.props.onClick} disabled={ !!this.props.disabled }>
        <Icon type={this.props.icon}/>
      </Button>
    );
  }
}
