import "./chat.css"
import "../../components/topbar/Topbar"
import Topbar from "../../components/topbar/Topbar"
import Footer from "../../components/footer/Footer"
import Conversation from "../../components/conversations/Conversation"
import Message from "../../components/message/Message"
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {

    const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/");
    }
    },[]);
  return (
    <>
    <Topbar/>
    <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput"/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
                <Conversation/>
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                <div className="chatBoxTop">
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                    <Message/>
                    <Message own={true}/>
                    <Message/>
                </div>
                <div className="ChatBoxBottom">
                    <textarea placeholder="Write Something Here ..." className="chatMessageInput"></textarea>
                    <button className="chatSubmitButton">Send</button>

                </div>
            </div>
        </div>
        
      
    </div>
    <Footer/>
    </>
  )
}
