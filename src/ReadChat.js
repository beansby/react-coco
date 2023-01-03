import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from 'sockjs-client';


function ReadChat() {
    const [chatList, setChatList] = useState([]);
    const [chat, setChat] = useState('');

    const { apply_id } = useParams();
    // const client = useRef({});

    const [client, setClient] = useState(null);


    // const connect = () => {
    //     client.current = new StompJs.Client({
    //         brokerURL: "http://localhost:8080/ws",
    //         onConnect: () => {
    //             console.log("success");
    //             subscribe();
    //         },
    //     });
    //     client.current.activate();
    // }

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

    const publish = (chat) => {
        // if (!client.current.connected) return;

        client.current.publish({
            destination: '/pub/chat',
            body: JSON.stringify({
                applyId: apply_id,
                chat: chat,
            }),
        });
        setChat('');
    }

    const subscribe = () => {
        client.current.subscribe("/sub/chat/" + apply_id, (body) => {
            const json_body = JSON.parse(body.body);
            setChatList((_chat_list) => [
                ..._chat_list, json_body
            ])
        })
    }

    const disconnect = () => {
        client.current.deactivate();
    }

    const handleChange = (event) => {
        setChat(event.target.value);
    }

    const handleSubmit = (event, chat) => {
        event.preventDefault();
        publish(chat);
    }

    // useEffect(() => {
    //     connect();
    //     return () => disconnect();
    // }, []);

    return (
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
    )
}

export default ReadChat;