import "./topbar.css"
import PersonSearchSharpIcon from '@mui/icons-material/PersonSearchSharp';
import SmsOutlinedIcon from '@mui/icons-material/SmsOutlined';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import {Link} from "react-router-dom";
import { useState } from 'react';


export default function Topbar() {
  
  const [searchState, setSearchState] = useState(false);
  const [usersSearch, setUsersSearch] = useState(false);

  function GetUsername(){
    var user=localStorage.getItem("user")
    var parsedUser = JSON.parse(user);
    return parsedUser.username;
  }

  function FindUsers(name){
    console.log(name)
    fetch(`/users/all`, {
      method: 'GET'
    }).then(response => response.json()).then(data => {
      console.log(data)
      let filteredUsers = data.filter(item => {
        if (item.username.includes(name)) {
          return(item)
        }
      });
      setUsersSearch(filteredUsers)
    })
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/home" style={{textDecoration:"none"}}>
          <span className="headerLogo"> Let`s Hoop</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
            <PersonSearchSharpIcon className="personSearch"/>
            <input placeholder="Search for friends" className="searchInput"  onFocus={() => setSearchState(!searchState)} onChange={(e) => FindUsers(e.target.value)} />
            {
              searchState && usersSearch.length ?
                <div className="search-results">
                  {
                    usersSearch.map((item, index) => 
                    <a className="search_item" key={index} href={`/profile/${item.username}`}>
                      
                      {item.username}
                    </a>
                    )
                  }
                </div> : ''
            }
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarNews">
        <Link to="/news" style={{textDecoration:"none"}}>
          <span href="/News"className="aNews">News</span>  
        </Link>
        </div>
        <div className="topbarIcon">
        <Link to="/chat" style={{textDecoration:"none"}}>
          <SmsOutlinedIcon className="rightIcon"/>
          <span className="topBarMesssageCounter">1</span>
        </Link>
          
          </div>
          <div className="topbarIcon">
          <PeopleRoundedIcon className="rightIcon"/>
          <span className="topBarMesssageCounter">1</span>
          </div>
          <Link to={`/myprofile/${GetUsername()}`} style={{textDecoration:"none"}}>
            <img src="/assets/profilePic.jpg" alt="" className="topbarProfileIMG" />
          </Link>
          
          
      </div>
    </div>
  )
}
