import "./rightbar.css"

export default function Rightbat() {

  
  return (
    <div className="rightbar">
        <div className="rightbarWrapper">
            <ul className="rightbarFriendlist">
                <li className="rightBarFriend">
                    <div className="rightbarProfileImgContainer">
                    <img src="/assets/person/2.jpg" alt="" className="rightbarProfileImg" />
                        <span className="rightbarOnline"></span>
                    </div>
                    <span className="rightbarUsername">Monika</span>
                </li>
            </ul>
        </div>
    </div>
  )
}
