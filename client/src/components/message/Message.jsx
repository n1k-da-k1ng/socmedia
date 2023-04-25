import "./message.css"

export default function Message({own}) {
  return (
    <div className={own ? "message own ": "message"}>
      <div className="messageTop">
        <img src="https://cdn.nba.com/headshots/nba/latest/1040x760/202681.png" alt="" className="messageIMG" />
        <p className="messageText">Hello this is message</p>
      </div>
      <div className="messageBottom">1 hour ago</div>
    </div>
  )
}
