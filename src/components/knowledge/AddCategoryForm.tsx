import { Input } from 'antd';
import React, { ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import styled from 'styled-components';
import { State } from '../../model';
import { addKnowledgeCategory } from '../../model/knowledge/KnowledgeActions';
import ImmerStateComponent from '../shared/ImmerStateComponent';

const InputField = styled(Input)`
  width: 50%;
`;

interface StateProps {
  readonly gameId: string;
}

interface DispatchProps {
  readonly addCategory: (gameId: string, name: string) => void;
}

type Props = StateProps & DispatchProps;

interface OwnState {
  readonly title: string;
}

function mapStateToProps(state: State): StateProps {
  return { gameId: state.activeGameId };
}

function mapDispatchToProps(dispatch: Dispatch): DispatchProps {
  return {
    addCategory: (gameId: string, name: string) => dispatch(addKnowledgeCategory(gameId, name)),
  };
}

class AddCategoryForm extends ImmerStateComponent<Props, OwnState> {
  constructor(props: Props) {
    super(props);
    this.state = { title: '' };

    this.update = this.update.bind(this);
    this.submit = this.submit.bind(this);
  }

  private update(event: ChangeEvent<HTMLInputElement>) {
    this.updateState(draft => { draft.title = event.target.value; });
  }

  private submit() {
    this.props.addCategory(this.props.gameId, this.state.title);
    this.updateState(draft => { draft.title = ''; });
  }

  public render() {
    return (
      <InputField placeholder="Add Category"
                  value={ this.state.title }
                  onChange={ this.update }
                  onPressEnter={ this.submit }
      />
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryForm);
