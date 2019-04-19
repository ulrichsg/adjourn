import React from 'react';

import {PageHeader} from 'antd';
// import styled from 'styled-components';

// tslint:disable-next-line no-var-requires
// require('typeface-galdeano');
//
// const HeaderBar = styled(AppBar)`
//   background-color: lightgray;
// `;
//
// const Brand = styled.p`
//   font-family: Galdeano, sans-serif;
//   color: black;
// `;

export default class Header extends React.Component<{}, {}> {

  public render() {
    return (
      <PageHeader backIcon={false} title="Adjourn"/>
    );
  }
}
