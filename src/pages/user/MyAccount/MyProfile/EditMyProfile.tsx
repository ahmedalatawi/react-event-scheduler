import { FC, FormEvent, useContext, useEffect, useRef, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { MdSaveAlt } from 'react-icons/md';
import { useNavigate } from 'react-router';
import { IUser } from '../../../../interfaces/types';
import AuthContext from '../../../../store/auth-context';
import Spinner from '../../../../components/UI/Spinner/Spinner';
import Alert from '../../../../components/UI/Alert/Alert';
import TitledCard from '../../../../components/UI/TitledCard/TitledCard';
import { useSaveUserMutation } from '../../../../generated/graphql';

type EditMyProfileType = {
  user: IUser | undefined;
  onReadOnlyMode: () => void;
};

const EditMyProfile: FC<EditMyProfileType> = ({ user, onReadOnlyMode }) => {
  const { _id, username, firstName, lastName, email, phoneNumber, bio } =
    user ?? {};

  const [validated, setValidated] = useState(false);

  const usernameRef = useRef<any>(username);
  const firstNameRef = useRef<any>(firstName);
  const lastNameRef = useRef<any>(lastName);
  const emailRef = useRef<any>(email);
  const phoneNumberRef = useRef<any>(phoneNumber);
  const bioRef = useRef<any>(bio);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const [saveUser, { error, loading, reset }] = useSaveUserMutation();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;

    event.preventDefault();
    event.stopPropagation();

    reset();

    setValidated(true);

    form.checkValidity() &&
      saveUser({
        variables: {
          user: {
            _id: _id ?? '',
            username: usernameRef.current?.value.trim(),
            firstName: firstNameRef.current?.value.trim(),
            lastName: lastNameRef.current?.value.trim(),
            email: emailRef.current?.value.trim(),
            phoneNumber: phoneNumberRef.current?.value.trim(),
            bio: bioRef.current?.value.trim(),
          },
        },
      })
        .then((res) => {
          const { userId, token, tokenExpiration } = authCtx.getAuth() ?? {
            token: '',
            userId: '',
          };
          authCtx.addAuth({
            userId,
            token,
            tokenExpiration,
            username: res.data?.saveUser.username ?? '',
          });
          onReadOnlyMode();
        })
        .catch((error) => {
          console.error(error);
          setValidated(false);
        });
  };

  useEffect(() => {
    !authCtx.auth && navigate('/');
  }, [authCtx, navigate]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {error && (
        <Alert
          msg={error.message}
          type="danger"
          ariaLabel="Warning"
          fillType="#exclamation-triangle-fill"
        />
      )}

      <TitledCard title="Edit My Profile">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustomUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  defaultValue={username}
                  ref={usernameRef}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Username is required.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First name"
                defaultValue={firstName}
                ref={firstNameRef}
              />
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last name"
                defaultValue={lastName}
                ref={lastNameRef}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12" controlId="validationCustomEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                defaultValue={email}
                ref={emailRef}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Phone number"
                defaultValue={phoneNumber}
                ref={phoneNumberRef}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3">
            <Form.Group as={Col} md="12">
              <Form.Label>Bio</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Bio"
                defaultValue={bio}
                ref={bioRef}
              />
            </Form.Group>
          </Row>

          <div className="mt-4">
            <Button type="submit" className="me-3">
              Save <MdSaveAlt />
            </Button>
            <Button type="button" onClick={onReadOnlyMode} variant="secondary">
              Cancel
            </Button>
          </div>
        </Form>
      </TitledCard>
    </>
  );
};

export default EditMyProfile;
