import { FC, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import TitledCard from '../../../../components/UI/TitledCard/TitledCard'
import styled from 'styled-components'
import { useNavigateToHome } from '../../../../hooks/useNavigateToHome'

const BodyContainer = styled.div({
  minHeight: '15rem',
})

const MySettings: FC = () => {
  const [key, setKey] = useState<string | null>('inbox')

  useNavigateToHome()

  return (
    <TitledCard title='My Settings'>
      <Tabs
        id='controlled-tab-example'
        activeKey={key ?? 'inbox'}
        onSelect={(k: string | null) => setKey(k)}
        className='mb-3'
      >
        <Tab eventKey='inbox' title='Inbox'>
          <BodyContainer>
            <p>Coming soon (inbox) ...</p>
          </BodyContainer>
        </Tab>
        <Tab eventKey='changePassword' title='Change Password'>
          <BodyContainer>
            <p>Coming soon (Change Password) ...</p>
          </BodyContainer>
        </Tab>
        <Tab eventKey='notifications' title='Notifications'>
          <BodyContainer>
            <p>Coming soon (Notifications) ...</p>
          </BodyContainer>
        </Tab>
      </Tabs>
    </TitledCard>
  )
}

export default MySettings
