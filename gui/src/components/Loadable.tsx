import NProgress from "nprogress";
import { Suspense, useEffect } from "react";

import type { FC } from "react";

import "@/styles/scss/nprogress.scss";

export const Loader = () => {
    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        };
    });

    // eslint-disable-next-line unicorn/no-null
    return null;
};

const Loadable = (Component: FC) =>
    function Loadable(props: JSX.IntrinsicAttributes) {
        return (
            <Suspense fallback={<Loader />}>
                <Component {...props} />
            </Suspense>
        );
    };

export default Loadable;
