import React from 'react';

// Stand-in for @svgr/webpack, which turns .svg imports into React components at build time.
const SvgMock = React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>((props, ref) => (
  <svg ref={ref} {...props} />
));

export default SvgMock;
export const ReactComponent = SvgMock;
