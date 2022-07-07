/* eslint-disable jsx-a11y/anchor-is-valid */
import { FC } from 'react';
import { FooterContainer } from './styles';
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

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

export default Footer;
