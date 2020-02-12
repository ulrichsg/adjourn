import produce, { Draft } from 'immer';
import React from 'react';

export default class ImmerStateComponent<P, S> extends React.Component<P, S> {
  protected updateState(recipe: (draft: Draft<Readonly<S>>) => void) {
    const nextState = produce(this.state, recipe);
    this.setState(nextState);
  }
}
