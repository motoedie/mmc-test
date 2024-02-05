import React, {FC, Fragment, memo} from 'react';
import styled from 'styled-components';
import {GlobalStyle} from './GlobalStyle';

const AppContainer = styled.div`
  align-items: center;
  background: #fafafa;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;
`;

const ContentWrapper = styled.div`
  align-self: stretch;
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 32em;
  padding: 2em;

  @media (min-width: 1024px) {
    align-self: center;
    width: 60em;
  }
`;

interface Props {
  children: React.ReactNode;
}

const BareLayout:FC<Props> = props => {
  return (
    <Fragment>
      <GlobalStyle />
      <AppContainer>
        <ContentWrapper>
          {props.children}
        </ContentWrapper>
      </AppContainer>
    </Fragment>
  );
};

export const Layout = memo(BareLayout);
