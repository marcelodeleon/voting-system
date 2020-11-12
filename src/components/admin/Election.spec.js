import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import 'mutationobserver-shim';
import Election from './Election';
// import { isAuthenticated } from '../utils/auth';

global.MutationObserver = window.MutationObserver;
// jest.mock('../utils/auth');

describe('Election', () => {
  beforeEach(() => {
    // isAuthenticated.mockRestore()
  })

  test('Renders Election correctly', () => {
    const { container } = render(<Election />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test.only('test', async () => {
    render(<Election />);
    fireEvent.click(screen.getByText(/submit/i))

    // const test = await waitFor(() => screen.getByText(/error/i))

    console.log({ test })
  })
});
