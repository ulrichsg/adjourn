import { Form, Input, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import produce from 'immer';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { addQuest } from '../QuestActions';
import { State } from '../QuestReducer';

interface OwnProps {
  readonly visible: boolean;
  readonly hide: () => void;
}

interface StateProps {
  readonly gameId: string;
}

interface DispatchProps {
  addQuest: (gameId: string, title: string, notes: string) => void;
}

type Props = OwnProps & StateProps & DispatchProps;

function mapStateToProps(state: State): StateProps {
  return { gameId: state.activeGameId };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return { addQuest: (gameId: string, title: string, notes: string) => dispatch(addQuest(gameId, title, notes)) };
}

interface OwnState {
  readonly title: string;
  readonly notes: string;
  readonly validTitle: boolean;
}

class AddQuestModal extends React.Component<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: '',
      notes: '',
      validTitle: true,
    };
    this.submit = this.submit.bind(this);
    this.close = this.close.bind(this);
    this.updateTitle = this.updateTitle.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.reset = this.reset.bind(this);
  }

  private submit() {
    const valid = this.validateTitle(this.state.title);
    if (valid) {
      this.props.addQuest(this.props.gameId, this.state.title, this.state.notes);
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
            <TextArea rows={5} value={this.state.notes} onChange={this.updateNotes}/>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddQuestModal);
