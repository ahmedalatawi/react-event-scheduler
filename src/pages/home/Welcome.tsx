import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import styled from 'styled-components';
import WelcomeImage from '../../assests/images/mtb.jpg';

const ImageContainer = styled(Col)({
  backgroundSize: 'cover',
  padding: 20,
  backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${WelcomeImage})`,
});

const Welcome: FC = () => {
  return (
    <div>
      <Row style={{ color: 'white' }}>
        <ImageContainer xs={12} md={12}>
          <h4 style={{ textTransform: 'uppercase', fontSize: '1.7rem' }}>
            Welcome to Event Scheduler App
          </h4>
          <br />
          <p>
            <a
              title="GDPR-compliant Web Analytics"
              href="https://clicky.com/101370668"
            >
              <img
                alt="Clicky"
                src="//static.getclicky.com/media/links/badge.gif"
              />
            </a>
            <script async src="//static.getclicky.com/101370668.js"></script>
            <noscript>
              <p>
                <img
                  alt="Clicky"
                  width="1"
                  height="1"
                  src="//in.getclicky.com/101370668ns.gif"
                />
              </p>
            </noscript>
          </p>
          <div style={{ fontSize: '1.2rem' }}>
            <Row>
              <Col xs={6} md={6}>
                <p>
                  Event Scheduler is a fullstack React app that allows users to
                  create events. An event can be anything, such as a sport
                  event, team meeting, party announcement, personal
                  advertisement, etc.
                  <br />
                  An event consists of title, start and end date/time, and
                  description. Events can also be shared on FB or Twitter. All
                  events are public by default (visible to everyone). They can
                  also be private (only visible to you) by checking the private
                  checkbox.
                </p>
              </Col>
            </Row>
            <br />
            <h5>Tech Stack</h5>
            <strong>Frontend</strong>
            <ul>
              <li>React (react hooks)</li>
              <li>Typescript</li>
              <li>Styled components</li>
              <li>Bootstrap 5</li>
              <li>React bootstrap</li>
              <li>JS cookie</li>
              <li>Apollo client</li>
            </ul>

            <strong>Backend</strong>
            <ul>
              <li>NodeJS with Express</li>
              <li>Apollo server express</li>
              <li>Typescript</li>
              <li>JSON web token</li>
              <li>MongoDB with mongoose</li>
            </ul>
          </div>
        </ImageContainer>
      </Row>
    </div>
  );
};

export default Welcome;
