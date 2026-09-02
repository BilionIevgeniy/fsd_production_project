import { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Opt-in helper: only tests that actually render router-aware components (e.g. AppLink)
// pull in a Router, instead of every test file paying for a global setup-file side effect.
export function renderWithRouter(component: ReactNode) {
  return render(<MemoryRouter>{component}</MemoryRouter>);
}
