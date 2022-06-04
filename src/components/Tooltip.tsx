/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef } from "react";

import { TooltipPlacement } from "@types";

const TooltipDemo = ({
  children,
  title,
  placement,
}: {
  children: React.ReactNode;
  title: string;
  placement: TooltipPlacement;
}) => {
  const tooltipRef = useRef();

  useEffect(() => {
   if(typeof document  !== undefined) {
    const bootstrap = require('bootstrap/dist/js/bootstrap')
    new bootstrap.Tooltip(tooltipRef.current, {
        title: title,
        placement: placement,
        trigger: 'hover'
    })
   }
  }, [placement, title]);

  return <div ref={tooltipRef}>{children}</div>;
};

export default TooltipDemo;
