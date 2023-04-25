import React, { useEffect, useState } from "react";
import "./news.css"
import Topbar from "../../components/topbar/Topbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from 'react-router-dom';

const useAnswer = () => {
  const [answer, setAnwser] = useState();

  const getAnswer = async () => {
    const res = await fetch("https://newsapi.org/v2/everything?q='Basketballs&from=2023-04-01&sortBy=popularity&apiKey=8ad42b0ad37c480cb877d79c0b0cd525");
    const answer = await res.json();
    setAnwser(answer);
  };

  useEffect(() => {
    getAnswer();
  }, []);
  return answer;
};

export default function News() {
    const answer = useAnswer();
    const navigate = useNavigate();
  useEffect(()=>{
    if(!localStorage.getItem("accessToken")){
      navigate("/");
    }
    },[]);
  return (
    <div>
      <Topbar/>
      <div className="News">
      
    {answer ? (
      
        <ul className="BenchOfNews">
          {answer.articles.map((article, index) => (
            <li className="NewsWrapper" key={index}>
              <h2 className="articleTitle">{article.title}</h2>
              <p className="articleDesc">{article.description}</p>
              <img className="articleIMG" src={article.urlToImage} alt={article.title} />
              <a className="articleLink" href={article.url} target="_blank" rel="noreferrer">
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
      
  </div>
  <Footer/>
  </div>
    
  );
}