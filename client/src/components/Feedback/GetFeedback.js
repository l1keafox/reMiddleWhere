import React, { useEffect,useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { TextField } from "@mui/material";

export default function Feedback(prop) {
  const [isShowing, setIsShowing] = useState(false)
  useEffect(() => {
    setIsShowing(true);
  },[]);
  useEffect(() => {
    setIsShowing(prop.isShowing);
  },[prop.isShowing]);

  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    console.log("handle change?");
    setEmail(e.target.value);
  };
  const handleName = (e) => {
    console.log("handle change?");
    setName(e.target.value);
  };
  const handleMsg = (e) => {
    console.log("handle change?");
    setMessage(e.target.value);
  };
  const form = useRef();

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(e.target, "submit!", message);
    if(message === '' || handleName === '' || name === '') {
      console.log('bad!');
      alert("Please fill out the form");
      return;
    }
    let result = emailjs.sendForm(
      "service_3l5kfbj",
      "template_7630s4a",
      form.current,
      "b3A_HBPJ0CCCA_D0d"
    )
    alert("Thank you for sendin me a message,I will get back too you asap");
    setEmail("");
    setName("");
    setMessage("");
    prop.doClose();
  };

  return (
    <div className="justify-center items-center content-center container lg:w-3/4  2xl:w-1/2 bg-slate-700 p-3 mt-10">

    <form ref={form} onSubmit={sendEmail} className="emailForm flex flex-col ">
      <label htmlFor="nameInput" className="labelContact dark:text-slate-300">
        Name:
      </label>
      <TextField
        className = "bg-slate-50"
        value={name}
        type="text"
        name="from_name"
        id="nameInput"
        placeholder="Your name here!"
        onChange={handleName}
      />


      <label htmlFor="reply_to" className="labelContact dark:text-slate-300">
        Email:
      </label>
      <TextField
      className = "bg-slate-50 "
        value={email}
        type="email"
        name="reply_to"
        id="reply_to"
        placeholder="Your email here!"
        onChange={handleEmail}
      />
      <label htmlFor="messageInput" className="labelContact dark:text-slate-300">
        Message:
      </label>
      <textarea
      className = "bg-slate-50 h-40 p-2"
        value={message}
        name="message"
        id="messageInput"
        placeholder="Ideas? Bugs? Thoughts?"
        onChange={handleMsg}
      />
      <button className="contactBtn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-2 rounded"  type="submit" value="Send" >Send
      </button>
    </form>
    
    </div>
  );
}
