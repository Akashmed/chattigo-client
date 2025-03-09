/* eslint-disable react/prop-types */
import Container from '../../Components/Shared/Container'
import { RxCross2 } from "react-icons/rx";

const About = ({ on, toggle }) => {
    return (
        <Container>
            {on && (
                <div className="backdrop-blur-xl z-10 p-5 w-3/4 absolute max-h-screen overflow-y-scroll left-1/2 text-gray-200 transform -translate-x-1/2 bg-transparent">
                    <div className="grid grid-cols-3 items-center">
                        <div className='w-9'></div>
                        <div className="text-2xl font-bold mx-auto">About</div>
                        <button onClick={toggle} className="ml-auto bg-blue-600 p-2 hover:bg-blue-500 transition-colors duration-300 text-xl"><RxCross2 /></button>
                    </div>
                    <div className="p-6 font-sans">
                        <pre className="whitespace-pre-wrap text-base leading-relaxed">
                            {`Chattigo is an online messaging application. It is a personal project designed for individual use, though it is available to everyone.

Features of Chattigo:
- Chattigo offers functionalities for user registration and login. (Users need to register to use Chattigo, and the login feature allows users to switch between their accounts.)
- After registering and logging in, users can send connection requests.
- Accepting a request creates a connection between two users.
- Once connected, both users can exchange messages.
- There is an option to disconnect, which ends the connection between two users.
- The inbox shows whether a user is online or offline. (A user is deemed online in Chattigo only when both users have their inboxes open; otherwise, they are considered offline.)
- Notifications are sent when messages are received.
- Notifications are also sent for incoming connection requests.
- In the user profile, individuals can modify their name, biography, and profile picture.

Chattigo places a high priority on the security of each conversation. It can identify if a user is online. Messages are not stored in the database while both users are active; they are only saved (after encryption) when a user is offline. When the user comes back online, the messages are delivered (after decryption) and then deleted from the database. "Secure Messaging"

Chattigo was established by Akash Ahmed. All rights are reserved by the founder.

Your feedback for further enhancements to Chattigo is always appreciated at akashmed3@gmail.com.

Thank you for visiting Chattigo.`}
                        </pre>
                    </div>



                </div>
            )}
        </Container>
    );
};

export default About;