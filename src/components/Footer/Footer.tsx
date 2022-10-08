/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import styled from 'styled-components';

const Footer: FC = () => (
  <FooterContainer>
    <div className="container py-5">
      <div className="row text-center">
        <div className="col-md-12">
          <a className="pp-facebook btn btn-link" href="#">
            <i className="fab fa-facebook-f fa-2x " aria-hidden="true">
              <FaFacebookF />
            </i>
          </a>
          <a className="pp-twitter btn btn-link " href="#">
            <i className="fab fa-twitter fa-2x " aria-hidden="true">
              <FaTwitter />
            </i>
          </a>
          <a className="pp-youtube btn btn-link" href="#">
            <i className="fab fa-youtube fa-2x" aria-hidden="true">
              <FaYoutube />
            </i>
          </a>
          <a className="pp-instagram btn btn-link" href="#">
            <i className="fab fa-instagram fa-2x " aria-hidden="true">
              <FaInstagram />
            </i>
          </a>
        </div>
        <div className="col-md-12">
          <p className="mt-3">
            2022 Copyright &copy;{' '}
            <a href="https://github.com/AhmedAlatawi">Ahmed Alatawi</a>. All
            rights reserved under{' '}
            <a href="https://github.com/AhmedAlatawi/react-event-scheduler/blob/main/LICENSE">
              MIT license
            </a>
            .
          </p>
          <span>
            Give this{' '}
            <a href="https://github.com/AhmedAlatawi/react-event-scheduler">
              repo
            </a>{' '}
            a &#11088;
          </span>
        </div>
      </div>
    </div>
  </FooterContainer>
);

export const FooterContainer = styled.footer`
  margin-top: 5rem;
  background: #f8f8f8;
  a.credit {
    color: inherit;
    border-bottom: 1px dashed;
    text-decoration: none;
  }
  .fa {
    width: 18px;
  }
  .fa-2x {
    font-size: 22px;
  }
  i {
    color: #888;
  }
  .pp-facebook:hover i {
    color: #3b5998;
  }
  .pp-twitter:hover i {
    color: #1da1f2;
  }
  .pp-youtube:hover i {
    color: #ff0000;
  }
  .pp-instagram:hover i {
    color: #405de6;
  }
`;

export default Footer;
