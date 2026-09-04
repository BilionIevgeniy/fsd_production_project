import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  // Where in the DOM to render `children`. Defaults to document.body — the usual
  // choice for anything that must escape a parent's overflow/z-index (tooltips,
  // dropdowns, modals). Callers that need `children` to inherit CSS custom
  // properties scoped to a specific ancestor (see Modal, which targets `.app`
  // for theme variables) can pass a more specific element.
  element?: Element;
}

export const Portal = ({ children, element = document.body }: PortalProps) => createPortal(children, element);
