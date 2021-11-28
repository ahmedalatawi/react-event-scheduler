import React from 'react'
import { render } from '@testing-library/react'
import Alert from './Alert'

describe('Alert', () => {
  const warningAlertMock = {
    type: 'warning',
    ariaLabel: 'Warning',
    fillType: '#exclamation-triangle-fill',
    msg: 'Warning message!',
  }

  const component = (props = warningAlertMock) => render(<Alert {...props} />)

  test('display the correct alert message', () => {
    const { getByTestId } = component();

    expect(getByTestId('Alert')).toHaveTextContent(warningAlertMock.msg)
  })
})
