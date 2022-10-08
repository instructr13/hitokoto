import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    useDisclosure
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import SettingsContent from "./components/SettingsContent";
import SettingsHeader from "./components/SettingsHeader";

const SettingsModal = () => {
    const navigate = useNavigate(),
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
                    <SettingsHeader />
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody overflowY="scroll">
                    <SettingsContent modal />
                </ModalBody>
                <ModalFooter display="block"></ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SettingsModal;
