import { Link } from "@chakra-ui/react";
import { open } from "@tauri-apps/api/shell";
import { toast } from "react-toastify";

import type { LinkProps } from "@chakra-ui/react";

export type ExternalLinkProps = Omit<LinkProps, "href" | "target"> & {
    href: string;
};

const ExternalLink = ({ children, href, ...props }: ExternalLinkProps) => {
    const onClick = () => {
        open(href).catch((error: Error) => {
            toast.error(error.message, {
                pauseOnFocusLoss: true,
                pauseOnHover: true
            });
        });
    };

    return (
        <Link color="blue.600" onClick={onClick} {...props}>
            {children}
        </Link>
    );
};

export default ExternalLink;
