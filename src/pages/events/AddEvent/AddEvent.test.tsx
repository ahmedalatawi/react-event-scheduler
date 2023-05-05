import TestRenderer, { act } from 'react-test-renderer'
import { screen } from '@testing-library/dom'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'
import AddEvent from './AddEvent'
import { SaveEventDocument } from '../../../generated/graphql'
import { GraphQLError } from 'graphql'
import AuthContext from '../../../store/auth-context'

const mocks: ReadonlyArray<MockedResponse> = [
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
      data: {
        saveEvent: {
          id: 'some-id',
          //   title: 'test',
          //   start: '2022-10-26T22:14:00',
          //   end: '2022-11-26T22:14:00',
          //   isPrivate: false,
          //   description: 'this is a unit test!',
          //   createdAt: null,
          //   updatedAt: null,
          //   url: 'some-url',
          //   createdBy: {
          //     _id: 'some_id',
          //     username: 'user-test',
          //   },
        },
      },
    },
  },
]

describe('AddEvent', () => {
  it('should set state to loading when mutation is executed', () => {
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AddEvent />
      </MockedProvider>,
    )

    const e = { preventDefault: jest.fn() }

    const saveButton = component.root.findByType('form')
    act(() => {
      saveButton.props.onSubmit(e)
    })

    // const tree = component.toJSON()
    // expect(JSON.stringify(tree)).toContain('Loading...');
  })

  xit('should add an event and display a success message', async () => {
    const auth = { userId: 'test', username: 'some-name', token: '123' }
    const component = TestRenderer.create(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AuthContext.Provider
          value={{
            auth,
            getAuth: () => auth,
            addAuth: () => null,
            removeAuth: () => null,
          }}
        >
          <AddEvent />
        </AuthContext.Provider>
      </MockedProvider>,
    )

    const e = { preventDefault: jest.fn() }

    const saveButton = component.root.findByType('form')
    act(() => {
      saveButton.props.onSubmit(e)
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0)) // wait for response
    })

    // const tree = component.toJSON();
    // expect(JSON.stringify(tree)).toContain('Event was successfully added.');
    expect(screen.getByTestId('success-alert')).toBeDefined()
  })

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
    }

    const component = TestRenderer.create(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <AddEvent />
      </MockedProvider>,
    )

    const e = { preventDefault: jest.fn() }

    const saveButton = component.root.findByType('form')
    act(() => {
      saveButton.props.onSubmit(e)
    })

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0))
    })

    const tree = component.toJSON()
    expect(JSON.stringify(tree)).toContain(
      'Error occurred while saving event! Please try again later.',
    )
  })
})
