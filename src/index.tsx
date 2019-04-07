import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';
// tslint:disable-next-line no-var-requires
require('typeface-open-sans');

const Hello = styled.div`
  font-family: "Open Sans", serif;
  font-weight: bold;
  color: red;
`;

render(
    <Hello>Hello world!</Hello>,
    document.getElementById('app'),
);
