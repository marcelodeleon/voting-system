import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import 'mutationobserver-shim';
import App from './App';

global.MutationObserver = window.MutationObserver;

test('Renders App correctly', () => {
  const { container } = render(<App />, { wrapper: MemoryRouter });

  expect(container.firstChild).toMatchSnapshot()
});
