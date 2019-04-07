import React from 'react';
import {render} from 'react-dom';
import styled from 'styled-components';

const Hello = styled.div`
  font-weight: bold;
  color: red;
`;

render(
    <Hello>Hello world!</Hello>,
    document.getElementById('app'),
);
