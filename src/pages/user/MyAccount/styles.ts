import styled from 'styled-components'
import { NavDropdown } from 'react-bootstrap'

export const StyledNavDropdown = styled(NavDropdown)`
  margin-left: 12px;

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

  .dropdown-menu {
    right: 0;
    left: auto;
  }
`

export const BootstrapTableWrapper = styled.div`
  .table {
    overflow: auto;
    table-layout: auto !important;
  }

  .react-bootstrap-table {
    min-height: 15rem;
  }
`
