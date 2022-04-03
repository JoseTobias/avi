import React, { ReactNode } from "react";

import { Container } from "@mui/material";

interface IProps {
  children: ReactNode;
}

const Layout: React.FC<IProps> = ({ children }) => {
  return (
    <>
      <Container maxWidth="md">
        <div>{children}</div>
      </Container>
    </>
  );
};

export default Layout;
