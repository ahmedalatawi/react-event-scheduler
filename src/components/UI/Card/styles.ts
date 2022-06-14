import styled from 'styled-components';

export const StyledCard = styled.div.attrs(() => ({
  className: 'card',
}))`
  :hover {
    background-color: rgba(242, 241, 239);
    cursor: pointer;
  }
`;

export const StyledSubTitle = styled.span.attrs(() => ({
  className: 'badge rounded-pill bg-warning text-dark',
}))`
  font-size: small;
  font-weight: 500;
`;

export const StyledPrivateBadge = styled.span.attrs(() => ({
  className: 'badge rounded-pill bg-danger',
}))`
  font-size: small;
  font-weight: 500;
`;
