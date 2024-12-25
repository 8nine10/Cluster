"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-modal-store";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Check, Copy, RefreshCw } from "lucide-react";
import { useOrigin } from "@/hooks/use-origin";
import { useState } from "react";
import axios from "axios";


export const InviteModal = () => {
    const origin = useOrigin();
    const { onOpen, isOpen, onClose, type, data } = useModal();
    const isModalOpen = isOpen && type === "invite";
    const { server } = data;

    const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);

    const onCopy = () => {
        navigator.clipboard.writeText(inviteUrl);
        setCopied(false);

        setTimeout(() => {
            setCopied(true);
        }, 1000)
    }

    const onNew = async () => {
        try {
            setLoading(true);
            const response = await axios.patch(`/api/servers/${server?.id}/invite-code`);
            onOpen("invite", { server: response.data });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-2xl text-center">
                        Invite people
                    </DialogTitle>
                    <DialogDescription />
                </DialogHeader>
                <div className="p-6">
                    <Label className="uppercase text-xs fond-bold text-zinc dark:text-secondary/70">
                        Server Invite Link
                    </Label>
                    <div className="flex items-center mt-2 gap-x-2">
                        <Input
                            disabled={loading}
                            className="bg-zinc-300/50 brder-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
                            value={inviteUrl}
                            readOnly
                        />
                        <Button disabled={loading} onClick={onCopy} size="icon">
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                    </div>
                    <Button
                        disabled={loading}
                        variant="link"
                        size="sm"
                        className="text-xs text-zinc-500 mt-4"
                        onClick={onNew}
                    >
                        Generate New Link
                        <RefreshCw className="w-4 h-4 ml-2" />
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}