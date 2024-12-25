import { currentProfilePages } from "@/lib/current-profile-pages";
import { db } from "@/lib/db";
import { NextApiResponseServerIo } from "@/types";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponseServerIo,
) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const profile = await currentProfilePages(req);
        const { content, fileUrl } = req.body;
        const { conversationId } = req.query;

        if (!profile) return res.status(401).json({ error: "Unauthorized" })
        if (!conversationId) return res.status(400).json({ error: "Conversation Id Missing" })
        
        if (!content) return res.status(400).json({ error: "Content Missing" })

        const conversation = await db.conversation.findFirst({
            where: {
                id: conversationId as string,
                // OR: [
                //     {
                //         memberOne: {
                //             profileId: profile.id,
                //         }
                //     },
                //     {
                //         memberTwo: {
                //             profileId: profile.id,
                //         }
                //     },
                // ]
                // OR: [
                //     { AND: [{ memberOneId }, { memberTwoId }] },
                //     { AND: [{ memberOneId: memberTwoId }, { memberTwoId: memberOneId }] },
                // ]
            },
            include: {
                memberOne: true,
                memberTwo: true
            }
        })

        if(!conversation) return res.status(400).json({ error: "Conversation Missing" });

        const member = conversation.memberOne.id === profile.id ? conversation.memberOne : conversation.memberTwo
        if(!member) return res.status(400).json({ error: "Member Missing" });


        const message = await db.directMessage.create({
            data: {
                content,
                fileUrl,
                conversationId: conversationId as string,
                memberId: member.id,
            },
            include: {
                member: true
            }
        });
        const channelKey = `chat:${conversationId}:messages`;

        
        res?.socket?.server?.io?.emit(channelKey, message);
        
        return res.status(200).json(message);
    } catch (error) {
        console.log("[DIRECT_MESSAGES_POST]", error);
        return res.status(500).json({ message: "Internal Error" });
    }
}