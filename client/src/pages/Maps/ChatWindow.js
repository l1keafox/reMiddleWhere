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
      <h1 className="font-bold items-center justify-center flex text-xl">ChatWindow</h1>
      <div className="flex">
        <TextField value={name} onChange={handleInputChange}  variant="standard" className="w-3/4  m-2 p-1 "/>
        <button onClick={doThis} className="bg-yellow-300 m-2 p-1 border-1 border-blue-200"> SEND </button>
      </div>
      <div style={{overflowX:"scroll",overflowY:"scroll", height:"400px"}}>
            {chat.map(e=>(
               <div> {e.user} : {e.msg} </div>
            ))}
      </div>

    </div>
  );
}

export default ChatWindow;
