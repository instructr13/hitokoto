import { AccordionItem, Box, Heading, AccordionButton, AccordionIcon, AccordionPanel, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import type { AccordionItemProps } from "@chakra-ui/react";
import type { ReactElement, ReactNode } from "react";

export type AboutAccordionItemProps = AccordionItemProps & {
    children: ReactNode;
    label: string;
    rightElement?: ReactElement | string;
};

const AboutAccordionItem = ({ children, label, rightElement, ...props }: AboutAccordionItemProps) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <AccordionItem {...props}>
            {function Component({ isExpanded }) {
                useEffect(() => {
                    setLoaded(isExpanded || loaded);
                });

                return (
                    <>
                        <Heading as="h2" fontSize="lg">
                            <AccordionButton>
                                <Box flex={1} textAlign="left">
                                    {label}
                                </Box>
                                {rightElement || <AccordionIcon />}
                            </AccordionButton>
                        </Heading>
                        <AccordionPanel pb={4}>{loaded ? children : <Spinner />}</AccordionPanel>
                    </>
                );
            }}
        </AccordionItem>
    );
};

export default AboutAccordionItem;
