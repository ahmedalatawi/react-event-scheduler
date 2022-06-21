import { FC, useContext, useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import AuthContext from '../../../../store/auth-context';
import TitledCard from '../../../../components/UI/TitledCard/TitledCard';

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
          <p>Coming soon (inbox) ...</p>
        </Tab>
        <Tab eventKey="changePassword" title="Change Password">
          <p>Coming soon (Change Password) ...</p>
        </Tab>
        <Tab eventKey="notifications" title="Notifications">
          <p>Coming soon (Notifications) ...</p>
        </Tab>
      </Tabs>
    </TitledCard>
  );
};

export default MySettings;
