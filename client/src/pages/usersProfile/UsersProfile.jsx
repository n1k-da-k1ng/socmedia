import Footer from "../../components/footer/Footer"
// import Rightbat from "../../components/rightbar/Rightbat"
import Topbar from "../../components/topbar/Topbar"
import "./usersprofile.css"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'


export default function Profile(props) {
  // const jwt = require('jsonwebtoken');

 
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const { username } = useParams();
  // let CurUser = JSON.parse(localStorage.getItem("user"));
 
 

  async function GetUser(username) {
    const url = `/users/by-username/${username}`;
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    const response = await fetch(url, requestOptions);
    const user = await response.json();
    console.log("function get user: ", user);
    return user;
  }

  useEffect(() => {
    async function fetchData() {
      const user = await GetUser(username);
      setUser(user);
    }
    fetchData();
  }, [username]);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      navigate("/");
    }
  }, [navigate]);


  // async function isCurrentUser(username) {
  //   const token=localStorage.getItem('accessToken');
  //   var decodedToken = jwt.decode(token, process.env.JWT_SECRET, { complete: true });
  //   const url = `/users/id/${decodedToken.id}`;
  //   const requestOptions = {
  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' }
  //   };
  //   const response = await fetch(url, requestOptions);
  //   const user = await response.json();
  //   console.log("function get user: ", user);
  //   if(user.username===username){
  //     return true;
  //   }
    
  //   return false;
  // }


  // const [subscribed, setSubscribed] = useState(false);




  const handleClick = async() => {
    // setSubscribed(!subscribed);
    try{

    }catch(err){
      console.log(err)
    }
  };

  return (
    <div>
      <Topbar/>
      <div className="profileWrapper">
        <div className="profileContan">
          <img src="/assets/profilePic.jpg" alt="" className="profilePhoto" />
          <p className="nikname">{user.username}</p>
          </div>
          <div className="profileMainPartWrapper">
            <div className="profileText">
              <p className="city">{user.city}</p>
              <p className="yearsOld">{user.yearsOld}</p>
              <p className="bodyheight">{user.bodyheight}</p>
              <p className="bodyweight">{user.bodyweight}</p>
              <p className="position">{user.position}</p>
            </div>
            <div className="updateProfileInfo">
            <button className="folUnfol" onClick={handleClick}>
            
            </button>
           </div>
            
          </div>
          
          
      </div>
      <Footer/>
    </div>
  )
}