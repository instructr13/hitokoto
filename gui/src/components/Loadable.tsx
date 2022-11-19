import NProgress from "nprogress";
import { Suspense, useEffect } from "react";

import type { FC, ReactNode } from "react";

import "@/styles/scss/nprogress.scss";

export interface LoaderProps {
    children?: ReactNode;
}

export const Loader = ({ children }: LoaderProps) => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    });

    return <>{children}</>;
};

const Loadable = (Component: FC, CustomSkeleton: FC | string = "div") =>
    function Loadable(props: JSX.IntrinsicAttributes) {
        return (
            <Suspense
                fallback={
                    <Loader>
                        <CustomSkeleton />
                    </Loader>
                }
            >
                <Component {...props} />
            </Suspense>
        );
    };

export default Loadable;
