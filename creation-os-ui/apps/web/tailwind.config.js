const shared = require('../../tailwind.config.js')

module.exports = {
  ...shared,
  content: [
    // local app files
    './app/**/*.{ts,tsx}',
    // reuse root sources
    '../../src/**/*.{ts,tsx}',
  ],
}
y