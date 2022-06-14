import styled from 'styled-components';
import { NavDropdown } from 'react-bootstrap';

export const StyledNavDropdown = styled(NavDropdown)`
  .dropdown > a::after {
    color: #6c757d;
  }

  .dropdown > a {
    padding-right: 0 !important;
  }

  .dropdown-menu a:active {
    color: black;
    background-color: white;
  }
`;
