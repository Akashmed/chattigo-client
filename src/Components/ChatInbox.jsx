/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { allmessages } from '../Api/route';
import Skeleton from './Loader/Skeleton';
import { GoDotFill } from "react-icons/go";
import useAuth from '../Hooks/useAuth';
import { IoInformationCircle } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import useUsers from '../Hooks/useUsers';
import { GoPaperAirplane } from "react-icons/go";
import { Helmet } from 'react-helmet-async';
import socket from './socket';

// const isMobileDevice = () => {
//     return /Mobi|Android/i.test(navigator.userAgent);
// };

const ChatInbox = () => {
    const { Id } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [users, isLoading] = useUsers();
    const [online, setOnline] = useState(false);
    const navigate = useNavigate();

    // get all users
    // const { data: users = [], isLoading } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: allUsers,
    // });

    const recipient = users.find(usr => usr._id === Id);
    const sender = users.find(usr => usr.name === user?.displayName);


    useEffect(() => {

        // Connect to socket server and log the socket ID
        socket.on("connect", () => {
            console.log("Connected to socket server with ID:", socket.id);
        });

        // Emit `userConnected` event only if both sender and recipient IDs are available
        if (sender?._id && recipient?._id) {
            console.log(`Connecting user with ID: ${sender._id} and recipient ID: ${recipient._id}`);
            socket.emit('userConnected', { userId: sender._id, sId: recipient._id });
        } else {
            console.log("Sender or recipient ID is not available.");
        }

        // check if user is online
        socket.on('userOnline', () => {
            setOnline(true);
        });
        // check if user is online
        socket.on('userOffline', () => {
            setOnline(false);
        });


        // Listen for incoming messages from the server
        socket.on('receiveMessage', (data) => {
            console.log("Message received from server:", data);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now(),
                    text: data.text,
                    sender: data.senderId === sender._id ? 'user' : 'recipient'
                },
            ]);
        });

        allmessages(sender?._id, recipient?._id)
            .then(data => {
                data.map(dt => setMessages((prevMessages) => [
                    ...prevMessages,
                    {
                        id: Date.now(),
                        text: dt.text,
                        sender: dt.senderId === sender._id ? 'user' : 'recipient'
                    },
                ]))
            })


        // Clean up all listeners when the component unmounts
        return () => {
            socket.emit("userDisconnected", { userId: sender?._id }); // Inform backend
            socket.off("receiveMessage");
            socket.off("connect");
            socket.off("disconnect");
        };
    }, [sender?._id, recipient?._id]);

    useEffect(() => {

    }, [])

    const sendMessage = () => {
        if (input.trim() && sender?._id && recipient?._id) {
            const newMessage = {
                senderId: sender._id,
                recipientId: recipient._id,
                text: input,
            };

            console.log("Sending message:", newMessage);

            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now(), text: input, sender: 'user' },
            ]);

            // Emit message to the server
            socket.emit('sendMessage', newMessage, (response) => {
                if (response.error) {
                    console.error("Message send error:", response.error);
                } else {
                    console.log("Message sent successfully:", response);
                }
            });

            setInput('');
        } else {
            console.log("Sender or recipient ID is missing.");
        }
    };

    const Message = ({ text }) => {
        const linkify = (text) => {
            return text.split(/(\s+)/).map((part, index) =>
                part.match(/(https?:\/\/[^\s]+)/g) ? (
                    <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                        {part}
                    </a>
                ) : (
                    part
                )
            );
        };

        return <p>{linkify(text)}</p>;
    };


    if (isLoading) return <Skeleton />;

    return (
        <div className='flex items-center px-4 h-screen bg-gray-900'>
            <Helmet>
                <title>Inbox | {recipient?.name}</title>
            </Helmet>
            <div className="flex flex-col w-full h-3/4 max-w-md mx-auto bg-[#dbecf4] shadow-lg rounded-lg overflow-hidden">
                <div className='p-3 border-b bg-[#00838F] border-black text-[#FFFFFF] flex justify-between'>
                    <div className='flex items-center'>
                        <img
                            src={recipient?.photo}
                            alt="Recipient"
                            className="w-8 h-8 rounded-full"
                        />
                        <span className="ml-2 font-semibold">{recipient?.name}</span>
                        {online && <GoDotFill className="text-green-400 text-2xl ml-2" />}
                    </div>
                    <div className='flex items-center gap-1'>
                        <button onClick={() => navigate(`/profile/${Id}`)}><IoInformationCircle className="text-2xl" /></button>
                        <button onClick={() => {
                            navigate('/messages');
                            window.location.reload();
                        }}><RxCross2 className="text-2xl" /></button>
                    </div>

                </div>

                <div className="flex flex-col flex-grow h-80 p-4 overflow-y-auto no-scrollbar">
                    {messages.map((msg, indx) => (
                        <div
                            key={indx}
                            className={`flex items-center gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}
                        >
                            {msg.sender !== 'user' && (
                                <img
                                    src={recipient?.photo}
                                    alt="Recipient"
                                    className="w-8 h-8 rounded-full"
                                />
                            )}

                            <div
                                className={`rounded-lg px-4 py-2 font-medium max-w-xs break-words overflow-hidden ${msg.sender === 'user' ? 'bg-gray-700 text-white' : 'bg-white text-black border border-gray-600'}`}
                            >
                                <Message text={msg.text} />
                            </div>

                            {msg.sender === 'user' && (
                                <img
                                    src={sender?.photo}
                                    alt="Sender"
                                    className="w-8 h-8 rounded-full"
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="p-3 bg-white  border-black">
                    <div className="relative flex">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type your message..."
                            className="w-full pl-4 pr-16 py-2 text-[#2c3e48] font-semibold border-b placeholder-black border-[#00838F] rounded-lg bg-transparent focus:outline-none"
                        />
                        <button
                            onClick={sendMessage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-4 py-1 rounded-md"
                        >
                            <GoPaperAirplane />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInbox;
