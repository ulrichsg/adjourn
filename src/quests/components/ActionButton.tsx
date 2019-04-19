import {Button, Icon} from 'antd';
import * as React from 'react';

interface Props {
  icon: string;
  onClick: () => void;
}

export default class ActionButton extends React.Component<Props, {}> {
  public render() {
    return (
      <Button size="small" onClick={this.props.onClick}>
        <Icon type={this.props.icon}/>
      </Button>
    );
  }
}