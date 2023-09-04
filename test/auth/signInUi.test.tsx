import SignInUi from '../../components/SignIn/SignInUi';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

describe('SignInUi Component', () => {
  test('renders SignInUi component', () => {
    const { getByText } = render(<SignInUi />);

    expect(getByText(/HAPOOM/i)).toBeInTheDocument();
  });
});
