import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export default function StompMessage() {
    const [client, setClient] = useState(null);
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');

    useEffect(() => {
        // Set up the STOMP client
        const sockJSClient = new SockJS('http://localhost:8080/ws');
        const stompClient = Stomp.over(sockJSClient);
        stompClient.connect({}, (frame) => {
            setClient(stompClient);

            // Subscribe to messages from the server
            stompClient.subscribe('/topic/messages', (message) => {
                console.log(message.body);
            });
        });

        // Disconnect the client when the component unmounts
        return () => {
            if (client) {
                client.disconnect();
            }
        }
    }, []);

    // Send a message to the server when the "Send" button is clicked
    const handleSend = () => {
        if (client) {
            client.send('/app/send', {}, 'Hello, Server!');
        }
    }

    const handleChange = (event) => {
        setChat(event.target.value);
    }

    const handleSubmit = (event, chat) => {
        event.preventDefault();
        client.send(chat);
    }

    return (
        // <div>
        //     <br></br>
        //     <br></br>
        //     <br></br>
        //     <br></br>
        //     <button onClick={handleSend}>Send</button>
        // </div>
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className={'chat-list'}>{chatList}</div>
            <form onSubmit={(event) => handleSubmit(event, chat)}>
                <div>
                    <input type={'text'} name={'chatInput'} onChange={handleChange} value={chat} />
                </div>
                <input type={'submit'} value={'의견 보내기'} />
            </form>
        </div>
    );
}
