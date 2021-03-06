import React , {useState,useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';


import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Example from '../Input/Modal';
import TextContainer from '../TextContainer/TextContainer';
import './Chat.css';
//import Demo1 from '../Input/Demo1'

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('room');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name)

    socket.emit('join', { name, room }, (error) => {
      if(error) {
        alert(error);
      }
    });
  }, [ENDPOINT, location.search]);
  
//   useEffect(() => {
//     socket.on('message', message => {
//       setMessages(messages => [ ...messages, message ]);
//     });
    
//     socket.on("roomData", ({ users }) => {
//       setUsers(users);
//     });
// }, []);
  useEffect(() => {
    socket.on('message', message => {
      console.log(message)
      setMessages([...messages, message])
      
    })
    return () => {
      socket.off()
    }
  }, [messages]);
  
  useEffect(() => {
    socket.on('roomno', roomno => {
      setRoom(roomno)
    })
    
  }, room);
    
  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const creategrp = (event) => {
    event.preventDefault();
      socket.emit('createGroup', "nano", () => setMessage(''));
  }

  return (
    <div className="outerContainer">
      <div className="container">
          <InfoBar room={room} />
          <Messages messages={messages} name={name} />
          <Input message={message} setMessage={setMessage} sendMessage={sendMessage}  />
          <Example />
          
         
      </div>
      <TextContainer />
    </div>
  );
}

export default Chat;