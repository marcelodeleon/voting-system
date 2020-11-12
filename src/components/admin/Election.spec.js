import React from 'react';
import { render } from '@testing-library/react';
import 'mutationobserver-shim';
import Election from './Election';

global.MutationObserver = window.MutationObserver;

describe('Election', () => {
  test('Renders Election correctly', () => {
    const { container } = render(<Election />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
