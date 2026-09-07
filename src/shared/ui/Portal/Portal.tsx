import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
  // DOM node to render into. Defaults to document.body.
  element?: Element;
}

export const Portal = ({ children, element = document.body }: PortalProps) => createPortal(children, element);
