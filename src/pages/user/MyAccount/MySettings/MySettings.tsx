import { FC, useContext, useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContext from '../../../../store/auth-context';
import TitledCard from '../../../../components/UI/TitledCard/TitledCard';
import styled from 'styled-components';

const BodyContainer = styled.div({
  minHeight: '15rem',
});

const MySettings: FC = () => {
  const [key, setKey] = useState('inbox');

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    !authCtx.auth && navigate('/');
  }, [authCtx, navigate]);

  return (
    <TitledCard title="My Settings">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k: any) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="inbox" title="Inbox">
          <BodyContainer>
            <p>Coming soon (inbox) ...</p>
          </BodyContainer>
        </Tab>
        <Tab eventKey="changePassword" title="Change Password">
          <BodyContainer>
            <p>Coming soon (Change Password) ...</p>
          </BodyContainer>
        </Tab>
        <Tab eventKey="notifications" title="Notifications">
          <BodyContainer>
            <p>Coming soon (Notifications) ...</p>
          </BodyContainer>
        </Tab>
      </Tabs>
    </TitledCard>
  );
};

export default MySettings;
