module.exports = {
  verbose: true,
  rootDir: 'client',
  roots: ['<rootDir>'],
  setupFiles: ['<rootDir>/test/testConfig.js', '<rootDir>/test/mocks/globals.js'],
  testPathIgnorePatterns: [
    '/node_modules/',
    '/template/',
    '/sever/',
    '/.github/',
    '/.vscode/',
    '/.nyc_output/',
    '/coverage/',
    '<rootDir>/coverage/',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/src/constants/',
    '<rootDir>/src/resources/',
    '<rootDir>/test/',
    '<rootDir>/src/app',
    '<rootDir>/src/store',
    '<rootDir>/dist/',
    '<rootDir>/coverage/',
    '<rootDir>/src/reducers/rootReducer',
    '<rootDir>/src/components/addCenterComponent',
    '<rootDir>/src/components/addEventComponent',
    '<rootDir>/src/components/centerRouter',
    '<rootDir>/src/components/dashboardComponent',
    '<rootDir>/src/components/eventListComponent',
    '<rootDir>/src/components/eventRouter',
    '<rootDir>/src/components/manageDetailsHeader',
    '<rootDir>/src/components/manageEventComponent',
    '<rootDir>/src/components/manageFacilityComponent',
    '<rootDir>/src/components/navBarComponent',
    '<rootDir>/src/components/profileComponent',
    '<rootDir>/src/components/routerComponent',
    '<rootDir>/src/components/table',
    '<rootDir>/src/components/userListComponent',
    '<rootDir>/src/services',
    '<rootDir>/src/components/rePasswordComponent',
    '<rootDir>/src/components/sidebarComponent',
    '<rootDir>/src/components/centerListComponent',
    '<rootDir>/src/components/centerDetailsComponent',
  ],
  unmockedModulePathPatterns: ['./node_modules/react'],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleFileExtensions: ['js', 'jsx'],
  collectCoverage: true,
  collectCoverageFrom: ['**/*.{js,jsx}', '!**/node_modules/**'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm)$':
      '<rootDir>/test/mocks/fileMock.js',
    '\\.(css)$': '<rootDir>/test/mocks/styleMock.js',
  },
};
