import { Container } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

import Header from "./header";

import type { ReactElement } from "react";

const MainLayout = ({ children }: { children?: ReactElement }) => (
    <div
        onContextMenu={e => {
            e.preventDefault();
        }}
    >
        <Container as="main" maxW="container.md" pt={4}>
            <Header />
            {children ? <main>{children}</main> : <Outlet />}
        </Container>
    </div>
);

export default MainLayout;
