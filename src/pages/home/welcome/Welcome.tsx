import { FC } from 'react';
import { Col, Row } from 'react-bootstrap';
import WelcomeImage from '../../../assests/images/mtb.jpg';

const Welcome: FC = () => {
  return (
    <div>
      <h4>Welcome to Event Scheduler App</h4>
      <br />
      <Row>
        <Col md={6}>
          <p>
            Event Scheduler is a fullstack React app that allows users to create
            events. An event can be anything, such as a sport event, team
            meeting, party announcement, personal advertisement, etc.
            <br />
            An event consists of title, start and end date/time, and
            description. Events can also be shared on FB or Twitter. All events
            are public by default (visible to everyone). They can also be
            private (only visible to you) by checking the private checkbox.
          </p>
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
        </Col>
        <Col md={6}>
          <img
            src={WelcomeImage}
            alt="welcome"
            style={{ maxWidth: '100%' }}
            loading="lazy"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Welcome;
