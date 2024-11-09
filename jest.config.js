//@ts-expect-error fix this later
const config = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

export default config
