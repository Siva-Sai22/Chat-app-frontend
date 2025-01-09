import React from "react";
import styled from "styled-components";

type VisuallyHiddenProps = {
  children: React.ReactNode;
  [key: string]: unknown;
};

const VisuallyHiddenComp = ({ children, ...delegated }: VisuallyHiddenProps) => {
  const [forceShow, setForceShow] = React.useState(false);

  React.useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(true);
        }
      };

      const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.key === "Alt") {
          setForceShow(false);
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      window.addEventListener("keyup", handleKeyUp);

      return () => {
        window.removeEventListener("keydown", handleKeyDown);
        window.removeEventListener("keyup", handleKeyUp);
      };
    }
  }, []);

  if (forceShow) {
    return children;
  }

  return (
    <span className="visually-hidden" {...delegated}>
      {children}
    </span>
  );
};

const VisuallyHidden = styled(VisuallyHiddenComp)`
  &:not(:focus):not(:active) {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    white-space: nowrap;
  }
`;


export default VisuallyHidden;
