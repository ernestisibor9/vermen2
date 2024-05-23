import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import moment from "moment";

function Home() {
  const [personInfo, setPersonInfo] = useState();
  const navigate = useNavigate();

  const getPersonData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("person"));
      const response = await axios.get(
        "http://localhost:5000/api/person/loginperson",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if(response.data.success){
        setPersonInfo(response.data.person);
        console.log(personInfo);
      }
      else{
        toast.error('Invalid authorization');
      }
    } 
    catch (error) {
      toast.error(error);
      console.log(error);
    }
  };

  useEffect(() => {
    getPersonData();
  }, []);

  const logout = ()=>{
    localStorage.removeItem('person')
    navigate('/login') 
  }

  return (
    <div>
      <h1>Home</h1>
      <h2>{personInfo?.name}</h2>
      <h2>{personInfo?.email}</h2>
      <button className="btn btn-danger" onClick={logout}>Logout</button>
      <p>Date: {new Date(personInfo?.createdAt).toLocaleDateString()}</p>
      <p>Date2: {moment(personInfo?.createdAt).format("DD-MM-YY hh:mm:ss A")}</p>
      <p>Date3: {moment(personInfo?.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
      <p>Date4: {moment(personInfo?.createdAt).fromNow()}</p>
      <p>Date5: {moment(personInfo?.createdAt).calendar()}</p>
      <p>Date6: {moment(personInfo?.createdAt).format("dddd")}</p>
      <p>Date7: {moment(personInfo?.createdAt).format("MMM Do YY")}</p>
      <p>Date8: {moment(personInfo?.createdAt).format("h:mm:ss a")}</p>
      <p>Date9: {moment(personInfo?.createdAt).format("h:mm a")}</p>
      <p>Date10: {moment(personInfo?.createdAt).format("h:mm A")}</p>
      <p>Date11: {moment("20221031", "YYYYMMDD").fromNow()}</p>
      <p>Date12: {moment(personInfo?.createdAt, "YYYYMMDD").fromNow()}</p>
    </div>
  );
}

export default Home;
