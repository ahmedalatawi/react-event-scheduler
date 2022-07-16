import TestRenderer, { act } from 'react-test-renderer';
import { MockedProvider } from '@apollo/client/testing';
import AddEvent from './AddEvent';
import { SaveEventDocument } from '../../../generated/graphql';
import { GraphQLError } from 'graphql';

const mocks: any = [
  {
    request: {
      query: SaveEventDocument,
      variables: {
        event: {
          id: '',
          title: '',
          start: '',
          end: '',
          isPrivate: false,
          description: '',
        },
      },
    },
    result: {
      data: { saveEvent: { id: 'some-id' } },
    },
  },
];

describe('AddEvent', () => {
  it('should set state to loading when mutation is executed', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddEvent />
      </MockedProvider>
    );

    const e = { preventDefault: jest.fn() };

    const saveButton = component.root.findByType('form');
    act(() => {
      saveButton.props.onSubmit(e);
    });

    const tree = component.toJSON();
    expect(JSON.stringify(tree)).toContain('Loading...');
  });

  it('should add an event and display a success message', async () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddEvent />
      </MockedProvider>
    );

    const e = { preventDefault: jest.fn() };

    const saveButton = component.root.findByType('form');
    act(() => {
      saveButton.props.onSubmit(e);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)); // wait for response
    });

    const tree = component.toJSON();
    expect(JSON.stringify(tree)).toContain('Event was successfully added.');
  });

  xit('should display a generic error message when a network or graphgql error occurs', async () => {
    const errorMock = {
      request: {
        query: SaveEventDocument,
        variables: {
          event: {
            id: '',
            title: '',
            start: '',
            end: '',
            isPrivate: false,
            description: '',
          },
        },
      },
      result: {
        errors: [new GraphQLError('Error!')],
        data: null,
      },
    };

    const component = TestRenderer.create(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <AddEvent />
      </MockedProvider>
    );

    const e = { preventDefault: jest.fn() };

    const saveButton = component.root.findByType('form');
    act(() => {
      saveButton.props.onSubmit(e);
    });

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    const tree = component.toJSON();
    expect(JSON.stringify(tree)).toContain(
      'Error occurred while saving event! Please try again later.'
    );
  });
});
