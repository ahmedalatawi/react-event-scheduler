import '@testing-library/jest-dom'

import { TextEncoder, TextDecoder } from 'util'

global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder

// Mock ESM-built date picker for Jest (avoids parsing ESM in node_modules)
jest.mock('@atawi/react-date-picker', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  DateTimePicker: (props: any) => {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const React = require('react')
    return React.createElement('input', {
      'data-testid': 'datetimepicker',
      onChange: () => props.onChange && props.onChange(new Date()),
      value: props.value ?? '',
    })
  },
}))
