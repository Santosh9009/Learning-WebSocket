import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [message, setMessage] = useState('');
  const [mymsg, setMymsg] = useState('');

  useEffect(() => {
    const newSocket = new WebSocket("ws://localhost:8080");

    newSocket.onopen = () => {
      console.log("connected!");
      setSocket(newSocket);
    };

    newSocket.onmessage = (message) => {
      const receivedMessage = message.data;
      setMessage(receivedMessage);
    };

    return () => {
      // Clean up the socket connection when the component unmounts
      // newSocket.close();
    };
  }, []);

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
