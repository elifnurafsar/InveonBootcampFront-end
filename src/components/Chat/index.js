import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import { useSelector }  from "react-redux";

const ChatComponent = () => {
    const [connection, setConnection] = useState(null);
    const [messages, setMessages] = useState([]);
    const [user, setUser] = useState('user');
    const [message, setMessage] = useState('');
    let this_user = useSelector((state) => state.user.user);

    useEffect(() => {
        const newConnection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:44346/messageHub') 
            .build();

        setConnection(newConnection);
    }, []);

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.error('Error while establishing connection:', err));

            connection.on('ReceiveMessage', (user, message) => {
                setMessages([...messages, { user, message }]);
            });
            if(this_user != null){
                setUser(this_user.name)
            }
            
        }
    }, [connection, messages]);

    const sendMessage = async () => {
        if (connection) {
            await connection.invoke('SendMessage', user, message);
        }
        document.getElementById('input_area').value=null;
    };

    return (
        <div className="myaccount-content">
            <ul class="chat-list">
                {messages.map((msg, index) => (
                    msg.user != this_user.name ? (
                        <li class="in" key={index}>
                            <div class="chat-img">
        						<img alt="Avtar Admin" src="https://bootdey.com/img/Content/avatar/avatar3.png"/>
        					</div>
        					<div class="chat-body">
        						<div class="chat-message">
        							<h5>{msg.user}</h5>
        							<p>{msg.message}</p>
        						</div>
        					</div>
                        </li>
                    ):(
                        <li class="out">
        					<div class="chat-img">
        						<img alt="Avtar User" src="https://bootdey.com/img/Content/avatar/avatar7.png"/>
        					</div>
        					<div class="chat-body">
        						<div class="chat-message">
        							<h5>You</h5>
        							<p>{msg.message}</p>
        						</div>
        					</div>
        				</li>
                    )
                ))}
            </ul>

            <input id="input_area" className='text_inp' type="text" onChange={(e) => setMessage(e.target.value)} placeholder="Your message" />
            <button className='send_message' onClick={() => sendMessage()}> Send </button> 
            
        </div>
    );
};

export default ChatComponent;
