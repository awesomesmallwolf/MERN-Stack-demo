module.exports = {
  reporters: [ "default", "jest-junit" ],
  roots: ['<rootDir>/src','<rootDir>/tests'],
  testRegex: '(/tests/.*|(\\.|/)(test|spec))\\.js?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: "node",
  preset: "@shelf/jest-mongodb"
}