import styled from 'styled-components';

export const StyledModal = styled.div.attrs(() => ({
  className: 'modal-dialog',
}))`
  @media (min-width: 768px) {
    .modal-dialog {
      min-width: 512px;
    }
  }
`;
