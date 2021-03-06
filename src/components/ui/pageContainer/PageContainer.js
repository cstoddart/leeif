import styled from 'styled-components';

import { SITE_WIDTH } from 'src/constants';

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  padding: 35px 0 100px;
  width: 90%;
  max-width: ${SITE_WIDTH};
  margin: 0 auto;
`;
