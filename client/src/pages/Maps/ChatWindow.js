import io from "socket.io-client";
import React, { useEffect, useState } from "react";
import auth from "../../utils/auth";
import TextField from "@mui/material/TextField";
function ChatWindow(props) {
  const [socket, setSocket] = useState(null);
  const [name, setGroupName] = useState("");
  const [chat, setChat] = useState([]);
  function doThis() {
    console.log("doing Emit too:",props.groupName);
    if(name !== ""){
        socket.emit(props.groupName, {user:auth.getUser().data.username,msg:name });
    }
    setGroupName("");
  }
  const handleInputChange = (e) => {
    const { target } = e;
      setGroupName(target.value);
  };
  useEffect(() => {
    const newSocket = io({
      auth: {
        user: auth.getUser().data.username,
        group: props.groupName
      },
    }); 
    console.log(newSocket);
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on(props.groupName, (obj) => {
          setChat(obj );
        });
      });
    }
  }, [socket]);


  return (
    <div>
      <h1>ChatWindow Bitch</h1>
      <TextField value={name} onChange={handleInputChange}  variant="standard"/>
      <button onClick={doThis}> SEND </button>
      <div style={{overflow:"scroll", height:"400px"}}>
            {chat.map(e=>(
               <div> {e.user} : {e.msg} </div>
            ))}
      </div>

    </div>
  );
}

export default ChatWindow;
