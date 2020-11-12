import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'mutationobserver-shim';
import Home from './Home';
import { isAuthenticated } from '../utils/auth';

global.MutationObserver = window.MutationObserver;
jest.mock('../utils/auth');

describe('Home', () => {
  beforeEach(() => {
    isAuthenticated.mockRestore()
  })

  test('Renders Welcome screen if user authenticated correctly', () => {
    isAuthenticated.mockResolvedValue(true);
    const { container } = render(<Home />, { wrapper: MemoryRouter });
    expect(container.firstChild).toMatchSnapshot();
  });

  test.only('Renders LogIn screen if user is not authenticated', () => {
    const { container } = render(<Home />, { wrapper: MemoryRouter });
    expect(container.firstChild).toMatchSnapshot()
  });
});
