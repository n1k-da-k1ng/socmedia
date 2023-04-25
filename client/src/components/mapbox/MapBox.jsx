import "./mapbox.css"
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {Marker, Popup} from 'react-map-gl';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useEffect, useState } from "react";
import axios from "axios"
import { Checkbox, FormControlLabel } from "@mui/material";

export default function MapBox() {
  const zoom=12;

  const [pins,setPins]=useState([]);
  const [currentPlaceId,setCurrentPlaceId]=useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [date, setDate] = useState(null);
  const [isPrivate, setIsPrivate] = useState(false);
  const [username, setUsername] = useState(JSON.parse(localStorage.getItem("user")).username);

  let CurUser = JSON.parse(localStorage.getItem("user"));

  useEffect(()=>{
    const getPins= async()=>{
      try{
        const res=await axios.get("/pins");
        setPins(res.data);
      }catch(err){
        console.log(err)
      }
    }
    getPins()
  },[])

  const handleMarkerClick=(id)=>{
    setCurrentPlaceId(id);
  }

  
  const handleAddClick = (e) => {

    setNewPlace({
      lat: e.lngLat.lat,
      long: e.lngLat.lng,
    });
  };
  
  
  const handleSubmit=async (e)=>{
    console.log(isPrivate)
    e.preventDefault();
    const newPin={
      username,
      title,
      desc,
      date,
      lat: newPlace.lat,
      long: newPlace.long,
      isPrivate: isPrivate
    }
    try{
      const res= await axios.post("/pins",newPin);
      setPins([...pins,res.data]);
      setNewPlace(null);
    }catch(err){
      console.log(err);
    }
  };

  return (
    <div id="map" className="mapWrapper">
      
          <Map
    initialViewState={{
      longitude: 36.232845,
      latitude: 49.988358,
      zoom: zoom,
      attributionControl: false
    }}
    style={{width: '100%', height: '100vh' }}
    mapStyle="mapbox://styles/mapbox/dark-v11"
    mapboxAccessToken={process.env.REACT_APP_MAPBOX}
    onDblClick={handleAddClick}
  >
    {pins.map(p=>(
      <>
      <Marker 
      longitude={p.long} 
      latitude={p.lat}  
      
      offsetTop={-20}
      offsetLeft={-10}
      >
        <LocationOnIcon style={{fontSize:zoom*5, color:"orange",cursor: "pointer"}}
        onClick={()=>handleMarkerClick(p._id)}
        />
        </Marker>
        {p._id === currentPlaceId && (
        <Popup 
          longitude={p.long} 
          latitude={p.lat}
          anchor="left"
          closeButton={true}
          closeOnClick={false}
          onClose={()=>setCurrentPlaceId(null)}
          >
          <div className="card">
            <label>Title</label>
            <h4 className="cardTitle">{p.title}</h4>
            <label>Description</label>
            <p className="cardDesc">{p.desc}</p>
            <label>Date</label>
            <p className="cardDate">{p.date}</p>
            <label>Created By</label>
            {console.log(p)}
            <p className="username">{p.username}</p>
          </div>
          </Popup >
          )}
        </>
    ))}
    {newPlace && (
    <Popup 
          longitude={newPlace.long} 
          latitude={newPlace.lat}
          anchor="left"
          closeButton={true}
          closeOnClick={false}
          onClose={() => ()=>setNewPlace(null)}
          >
          <div>
            <form onSubmit={handleSubmit}>
              <label>Title</label>
              <input placeholder="Enter a title" onChange={(e)=>setTitle(e.target.value)}/>
              <label>Description</label>
              <textarea placeholder="Description" onChange={(e)=>setDesc(e.target.value)}/>
              <label>Time</label>
              <input placeholder="Write Date and Time" onChange={(e)=>setDate(e.target.value)}/>
              <FormControlLabel
                label="Parent"
                control={
                  <Checkbox onChange={() => setIsPrivate(!isPrivate)}/>
                }
              />
              <button className="submitPinButton" type="submit">Add Pin</button>
            </form>
          </div>
          </Popup>
          )}
    </Map>
    </div>

      
  ) 
}