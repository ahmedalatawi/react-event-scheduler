import styled from 'styled-components'
import WelcomeImage from '../../assests/images/mtb.jpg'
import { Link } from 'react-router-dom'

const Container = styled.main`
  &.welcome {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    position: absolute;
    margin: 0.8rem;
    color: var(--color-light--2);
    background-image: linear-gradient(
        rgba(36, 42, 46, 0.8),
        rgba(36, 42, 46, 0.8)
      ),
      url(${WelcomeImage});
    background-size: cover;
    background-position: center;
    padding: 2.5rem 5rem;
  }

  &.welcome section {
    display: flex;
    flex-direction: column;
    height: 85%;
    align-items: center;
    justify-content: center;
    gap: 2.5rem;
    text-align: center;
  }

  &.welcome h1 {
    font-size: 3.4rem;
    font-size: 3.4vw;
    line-height: 1.3;
  }

  &.welcome h2 {
    width: 90%;
    font-size: 2vh;
    color: var(--color-light--1);
    font-size: 1.5rem;
    font-size: 1.5vw;
    line-height: 1.4;
  }

  .btn:link,
  .btn:visited {
    display: inline-block;
    background-color: var(--color-brand--2);
    color: var(--color-dark--1);
    text-transform: uppercase;
    text-decoration: none;
    font-size: 1.2rem;
    font-size: 1.2vw;
    font-weight: 600;
    padding: 0.8rem 2rem;
    border-radius: 5px;
  }
`

function Welcome() {
  return (
    <Container className='welcome'>
      <section>
        <h1>
          Add and share events with family & friends.
          <br />
          Event Scheduler keeps track of your events.
        </h1>
        <h2>
          An event booking/scheduling system designed to help you schedule,
          manage, and run events. it aims to help and improvement user&apos;s
          experience by helping you stay organized, keeping relevant information
          right where you need it, and allowing you to do things like share
          events on FB & Twitter.
        </h2>
        <Link to='/addEvent' className='btn'>
          Start adding events now
        </Link>
      </section>
    </Container>
  )
}

export default Welcome
