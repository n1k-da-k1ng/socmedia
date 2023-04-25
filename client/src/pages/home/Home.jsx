import Footer from "../../components/footer/Footer";
import MapBox from "../../components/mapbox/MapBox";
import Topbar from "../../components/topbar/Topbar";
// import News from "../news/News";
// import "./VerifyToken.js"

// import Profile from "../profile/Profile"
// import Chat from "../chat/Chat"
import {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css"


export default function Home() {
 const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/");
    }
    },[]);

    return (
      <div className="HomePageStruc">
        <>
        
        <Topbar/>
        <MapBox/>
        <Footer/>
        
        
        </>  
        
        
      </div>
    )
}
