/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { allmessages, allUsers } from '../Api/route';
import { useQuery } from '@tanstack/react-query';
import Skeleton from './Loader/Skeleton';
import { io } from 'socket.io-client';
import useAuth from '../Hooks/useAuth';
import useUsers from '../Hooks/useUsers';

const socket = io.connect("http://localhost:5000");

const ChatInbox = () => {
    const { Id } = useParams();
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [users, isLoading] = useUsers();


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
            socket.off("connect");
            socket.off("receiveMessage");
        };
    }, [sender?._id, recipient?._id]);


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

    if (isLoading) return <Skeleton />;

    return (
        <div className="flex flex-col w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <h6>Chat with ID: {Id}</h6>

            <div className="flex flex-col flex-grow h-80 p-4 overflow-y-auto">
                {messages.map((msg, indx) => (
                    <div key={indx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`rounded-lg px-4 py-2 max-w-xs ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
            </div>

            <div className="p-3 border-t border-gray-200">
                <div className="relative flex">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                        placeholder="Type your message..."
                        className="w-full pl-4 pr-12 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <button
                        onClick={sendMessage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-lg"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInbox;
