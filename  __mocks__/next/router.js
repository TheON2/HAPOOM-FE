// __mocks__/next/router.js

const useRouter = jest.spyOn(require('next/router'), 'useRouter');

useRouter.mockImplementation(() => ({
  route: '/',
  pathname: '',
  query: '',
  asPath: '',
}));

module.exports = require('next/router');
