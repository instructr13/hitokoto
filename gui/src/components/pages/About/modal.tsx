import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { useAbout } from "@/hooks/about";

import AboutContent from "./components/AboutContent";
import AboutFooter from "./components/AboutFooter";
import AboutHeader from "./components/AboutHeader";

const AboutModal = () => {
    const navigate = useNavigate(),
        { application } = useAbout(),
        { isOpen, onClose: disclosureOnClose } = useDisclosure({ isOpen: true }),
        onClose = () => {
            disclosureOnClose();

            navigate(-1);
        };

    return (
        <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside" size="2xl">
            <ModalOverlay />

            <ModalContent>
                <ModalHeader mt={10} textAlign="center">
                    <AboutHeader
                        name="Hitokoto"
                        comment={application.comment}
                        packageName={application.name}
                        version={application.version}
                        coreName={application.coreName}
                        coreVersion={application.coreVersion}
                        toolkitName="Tauri"
                        toolkitVersion={application.tauriVersion}
                    />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="scroll">
                    <AboutContent authors={application.authors} license={application.license} />
                </ModalBody>
                <ModalFooter display="block">
                    <AboutFooter
                        coreName={application.coreName}
                        coreVersion={application.coreVersion}
                        packageName={application.name}
                        toolkitName="Tauri"
                        toolkitVersion={application.tauriVersion}
                    />
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default AboutModal;
