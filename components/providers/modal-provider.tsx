"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "@/components/modals/create-server-modal";
import { InviteModal } from "@/components/modals/invite-modal";
import { EditServerModal } from "../modals/edit-server-modal";
import { MembersModal } from "../modals/members-modal";
import { CreateChannelModal } from "../modals/create-channel-modal";
import { useModal } from "@/hooks/use-modal-store";
import { LeaveServerModal } from "../modals/leave-server-modal";
import { DeleteServerModal } from "../modals/delete-server-modal";
import { DeleteChannelModal } from "../modals/delete-channel-modal";
import { EditChannelModal } from "../modals/edit-channel-modal";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);
    const { type, isOpen } = useModal(); // Access modal state

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    // Render only the relevant modal based on `type`
    return (
        <>
            {type === "createServer" && isOpen && <CreateServerModal />}
            {type === "invite" && isOpen && <InviteModal />}
            {type === "editServer" && isOpen && <EditServerModal />}
            {type === "members" && isOpen && <MembersModal />}
            {type === "createChannel" && isOpen && <CreateChannelModal />}
            {type === "editChannel" && isOpen && <EditChannelModal />}
            {type === "leaveServer" && isOpen && <LeaveServerModal />}
            {type === "deleteServer" && isOpen && <DeleteServerModal />}
            {type === "deleteChannel" && isOpen && <DeleteChannelModal />}
        </>
    );
};