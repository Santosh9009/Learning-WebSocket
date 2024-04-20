import { useEffect, useState } from "react";
import "./App.css";

function useSocket(){
  const [socket, setSocket] = useState<null | WebSocket>(null);

  useEffect(()=>{
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("connected!");
      setSocket(newSocket);
    };
    return () => {
    
      newSocket.close();
    };
  },[])
  return socket;
}

function App() {
  const socket = useSocket();
  const [message, setMessage] = useState('');
  const [mymsg, setMymsg] = useState('');

  useEffect(() => {
    if (socket) {
      socket.onmessage = (message) => {
        const receivedMessage = message.data;
        setMessage(receivedMessage);
      };
    }

    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [socket]);

  const handleSend = () => {
    if (socket) {
      socket.send(mymsg);
    }
  };

  if (!socket) {
    return <div>Connecting to server...</div>;
  }

  return (
    <>
      <div>
        <input onChange={(e) => setMymsg(e.target.value)} type="text" placeholder="Add your message" />
        <button onClick={handleSend}>Send</button>
      </div>
      {message && <div>{message}</div>}
    </>
  );
}

export default App;
