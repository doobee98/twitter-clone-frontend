import React from 'react';
import styled from 'styled-components';
import PageTemplate from 'components/base/PageTemplate';
import Error from 'components/base/Error';
import ContentTemplate from 'components/base/ContentTemplate';

const ErrorWrapper = styled.div`
  padding-top: 80px;
  height: 100vh;
`;

const NotImplementedPage: React.FC = () => {
  return (
    <>
      <PageTemplate title="Error">
        <ContentTemplate width="900px">
          <ErrorWrapper>
            <Error
              title="404 Not Found"
              description="This page is not implemented now."
            />
          </ErrorWrapper>
        </ContentTemplate>
      </PageTemplate>
    </>
  );
};

export default NotImplementedPage;
