import { Form, Input, Modal } from 'antd';
import produce from 'immer';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addGame } from '../../model/games/GameActions';

interface OwnProps {
  visible: boolean;
  hide: () => void;
}

interface DispatchProps {
  readonly addGame: (name: string) => void;
}

type Props = OwnProps & DispatchProps;

interface OwnState {
  readonly title: string;
  readonly validTitle: boolean;
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    addGame: (name: string) => dispatch(addGame(name)),
  };
}

class AddGameModal extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = { title: '', validTitle: true };
    this.updateTitle = this.updateTitle.bind(this);
    this.submit = this.submit.bind(this);
    this.close = this.close.bind(this);
    this.reset = this.reset.bind(this);
  }

  private updateTitle(event: ChangeEvent<HTMLInputElement>) {
    const title = event.target.value;
    const nextState = produce(this.state, draft => { draft.title = title; });
    this.setState(nextState);
  }

  private submit() {
    this.props.addGame(this.state.title);
    this.close();
  }

  private close() {
    this.props.hide();
  }

  private reset() {
    const nextState = produce(this.state, draft => {
      draft.title = '';
      draft.validTitle = true;
    });
    this.setState(nextState);
  }

  public render() {
    const formItemLayout = {
      labelCol: {
        sm: { span: 6 },
      },
      wrapperCol: {
        sm: { span: 18 },
      },
    };

    return (
      <Modal title="Add Game"
             visible={ this.props.visible }
             onOk={ this.submit }
             onCancel={ this.close }
             afterClose={ this.reset }
             destroyOnClose={true}
             align={({})}
      >
        <Form {...formItemLayout} hideRequiredMark={true}>
          <Form.Item
            label="Title"
            validateStatus={this.state.validTitle ? '' : 'error'}
            >
            <Input value={this.state.title} autoFocus={true} onChange={this.updateTitle} onPressEnter={this.submit}/>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default connect(() => ({}), mapDispatchToProps)(AddGameModal);
