import { Form, Input, Modal } from 'antd';
import produce from 'immer';
import React, { ChangeEvent } from 'react';

interface Props {
  readonly visible: boolean;
  readonly hide: () => void;
  readonly onSubmit: (title: string, notes: string) => void;
  readonly title?: string | null;
  readonly notes?: string | null;
}

interface OwnState {
  readonly title: string;
  readonly notes: string;
  readonly validTitle: boolean;
}

export default class QuestModal extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: props.title || '',
      notes: props.notes || '',
      validTitle: true,
      // initially the title isn't actually valid, but we don't want to show an error
      // before the user has done anything, that's also why we have to put an extra
      // validation step into submit() for when they click Ok without entering anything
    };
    this.submit = this.submit.bind(this);
    this.close = this.close.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.reset = this.reset.bind(this);
  }

  public componentDidUpdate(prevProps: Readonly<Props>) {
    if (prevProps.title !== this.props.title || prevProps.notes !== this.props.notes) {
      const nextState = produce(this.state, draft => {
        draft.title = this.props.title || '';
        draft.notes = this.props.notes || '';
        draft.validTitle = true;
      });
      this.setState(nextState);
    }
  }

  private submit() {
    const valid = this.validateTitle(this.state.title);
    if (valid) {
      this.props.onSubmit(this.state.title, this.state.notes);
      this.close();
    }
  }

  private close() {
    this.props.hide();
  }

  private updateTitle(event: ChangeEvent<HTMLInputElement>) {
    const title = event.target.value;
    const valid = this.validateTitle(title);
    const nextState = produce(this.state, draft => {
      draft.title = title;
      draft.validTitle = valid;
    });
    this.setState(nextState);
  }

  private validateTitle(title: string): boolean {
    const valid = title.length > 0;
    const nextState = produce(this.state, draft => { draft.validTitle = valid; });
    this.setState(nextState);
    return valid;
  }

  private updateNotes(event: ChangeEvent<HTMLTextAreaElement>) {
    const notes = event.target.value;
    const nextState = produce(this.state, draft => { draft.notes = notes; });
    this.setState(nextState);
  }

  private reset() {
    const nextState = produce(this.state, draft => {
      draft.title = '';
      draft.notes = '';
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
      <Modal visible={this.props.visible}
             title="Add Quest"
             onOk={this.submit}
             onCancel={this.close}
             afterClose={this.reset}
             align={({})} // dafuq?
      >
        <Form {...formItemLayout} hideRequiredMark={true}>
          <Form.Item
            label="Title"
            validateStatus={this.state.validTitle ? '' : 'error'}
          >
            <Input value={this.state.title} onChange={this.updateTitle}/>
          </Form.Item>
          <Form.Item label="Description">
            <Input.TextArea rows={5} value={this.state.notes} onChange={this.updateNotes}/>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
