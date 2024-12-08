import { formatDate } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ImageIcon, Users, VideoIcon } from "lucide-react";
import { MessageSeenSvg } from "~/lib/svgs";

// Define types for the conversation object and its nested properties
interface Message {
    sender: string;
    _creationTime: number;
    content: string | null; // content can be null
    messageType: 'text' | 'image' | 'video';
}

interface ConversationType {
    _id: string;
    groupName: string | null;
    groupImage: string | null;
    lastMessage: Message | null;
    isOnline: boolean;
    isGroup: boolean;
    _creationTime: number; // Add _creationTime to ConversationType
}

interface ConversationProps {
    conversation: ConversationType;
}

const Conversation = ({ conversation }: ConversationProps) => {
    const { groupImage, groupName, lastMessage, isOnline, isGroup, _creationTime } = conversation;
    const conversationImage = groupImage ?? "/placeholder.png";  // Use nullish coalescing
    const conversationName = groupName ?? "Private Chat";  // Use nullish coalescing
    const lastMessageType = lastMessage?.messageType;
    const authUser = { _id: "user1" };

    return (
        <>
            <div className={`flex gap-2 items-center p-3 hover:bg-chat-hover cursor-pointer`}>
                <Avatar className='border border-gray-900 overflow-visible relative'>
                    {isOnline && (
                        <div className='absolute top-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-foreground' />
                    )}
                    <AvatarImage src={conversationImage} className='object-cover rounded-full' />
                    <AvatarFallback>
                        <div className='animate-pulse bg-gray-tertiary w-full h-full rounded-full'></div>
                    </AvatarFallback>
                </Avatar>
                <div className='w-full'>
                    <div className='flex items-center'>
                        <h3 className='text-xs lg:text-sm font-medium'>{conversationName}</h3>
                        <span className='text-[10px] lg:text-xs text-gray-500 ml-auto'>
                            {formatDate(lastMessage?._creationTime ?? _creationTime)} {/* Use nullish coalescing */}
                        </span>
                    </div>
                    <p className='text-[12px] mt-1 text-gray-500 flex items-center gap-1'>
                        {lastMessage?.sender === authUser?._id ? <MessageSeenSvg /> : ""}
                        {isGroup && <Users size={16} />}
                        {!lastMessage && "Say Hi!"}
                        {lastMessageType === "text" ? (
                            lastMessage?.content && lastMessage.content.length > 30 ? (
                                <span className='text-xs'>{lastMessage.content.slice(0, 30)}...</span>
                            ) : (
                                <span className='text-xs'>{lastMessage?.content ?? ""}</span> // Use nullish coalescing
                            )
                        ) : null}
                        {lastMessageType === "image" && <ImageIcon size={16} />}
                        {lastMessageType === "video" && <VideoIcon size={16} />}
                    </p>
                </div>
            </div>
            <hr className='h-[1px] mx-10 bg-gray-primary' />
        </>
    );
};

export default Conversation;
