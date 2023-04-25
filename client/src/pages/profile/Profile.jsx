import Footer from "../../components/footer/Footer"
// import Rightbat from "../../components/rightbar/Rightbat"
import Topbar from "../../components/topbar/Topbar"
import "./profile.css"
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';


export default function Profile(props) {
  // const jwt = require('jsonwebtoken');

  const { register, handleSubmit, control, formState: { errors } } = useForm();

  const [user, setUser] = useState({});
  const [updateBlockState, setUpdateBlockState] = useState(false);
  const navigate = useNavigate();
  const { username } = useParams();
  // let user = JSON.parse(localStorage.getItem("user"));
  
  async function GetUser(username) {

    fetch(`/users/by-username/${username}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
    }).then(response => response.json()).then(data => {
      console.log(data)
      setUser(data)
    })

    // const url = `/users/by-username/${username}`;
    // const requestOptions = {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' }
    // };
    // const response = await fetch(url, requestOptions);
    // const user = await response.json();
    // console.log("function get user: ", user);
    // return user;
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

  const onUpdateAccount = (data) => {
    console.log(user._id)
    data.userId = user._id;

    fetch(`/users/update/${user._id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => response.json()).then(data => {
      console.log(data)
      setUpdateBlockState(false)
    })
  }

  return (
    <div>
      <Topbar/>
      <div className="profileWrapper">
        {
          user ? 
        <>
        <div className="profileContan">
          <img src="/assets/profilePic.jpg" alt="" className="profilePhoto" />
          <p className="nikname">{user.username}</p>
          </div>
          <div className="profileMainPartWrapper">
            {
              updateBlockState ?
              <form className="profileText" name="updateAccount"  onSubmit={handleSubmit(onUpdateAccount)}>
                <input className="infoInputToUpdate" type="text" placeholder="Write your city" defaultValue={user.city} {...register('city', {
                    required: 'Поле не может быть пустым.'
                })}/>
                <input className="infoInputToUpdate" type="text" placeholder="Write your age" defaultValue={user.yearsOld} {...register('yearsOld', {
                    required: 'Поле не может быть пустым.'
                })}/>
                <input className="infoInputToUpdate" type="text"placeholder="Write your height" defaultValue={user.bodyheight} {...register('bodyheight', {
                    required: 'Поле не может быть пустым.'
                })}/>
                <input className="infoInputToUpdate" type="text" placeholder="Write your weight" defaultValue={user.bodyweight} {...register('bodyweight', {
                    required: 'Поле не может быть пустым.'
                })}/>
                <input className="infoInputToUpdate" type="text" placeholder="Write your game position" defaultValue={user.position} {...register('position', {
                    required: 'Поле не может быть пустым.'
                })}/>
                <button className="dataProfUpdate" type='submit'>Update data</button>
              </form> :
              <div className="profileText">
                <p className="city">City: {user.city}</p>
                <p className="yearsOld">Age: {user.yearsOld}</p>
                <p className="bodyheight">Height: {user.bodyheight}</p>
                <p className="bodyweight">Weight: {user.bodyweight}</p>
                <p className="position">Position: {user.position}</p>
              </div>
            }

           <div className="updateProfileInfo">
            <button className="pppp" onClick={() => setUpdateBlockState(!updateBlockState)}>UpdateInfo</button>
           </div>
            
          </div>
          </> : ''
        }
          
          
      </div>
      <Footer/>
    </div>
  )
}