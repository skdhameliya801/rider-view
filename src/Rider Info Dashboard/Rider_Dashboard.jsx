import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'; 
import { CONSTANTS } from '../CONSTANTS';

const Rider_Dashboard = () => {

  let [session_info, setSession_info] = useState({});
  const [is_rider_online, setIs_rider_online] = useState(false);
  
  useEffect(() => {
      session_info = JSON.parse(sessionStorage.getItem("log_u_d"))
      // JSON.parse(sessionStorage.getItem("log_u_d"))
      // document.getElementById("response_message").style.display = "none";
      if(session_info != null){
        // console.log(session_info);
        setSession_info(session_info)
        // click_me();
      }
      else{
        window.location.href = "/login"
      }
    }, [])
    
    let click_me = () => {
      
      // console.log("click_me")
      // console.log(session_info.whn, is_rider_online)
      let data = JSON.stringify({
        "whatsapp_no": session_info.whn,
        "on_off_rider": !is_rider_online
      });

      let config = {
        method: 'patch',
        maxBodyLength: Infinity,
        url: CONSTANTS.server_url + '/on_off_rider',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };

      axios.request(config)
      .then((response) => {
        setIs_rider_online(!is_rider_online)
        if(response.data.response){
          // document.getElementById("rider_status").innerHTML = is_rider_online;
        }else{
          // console.log(response.data.message)
          // document.getElementById("response_message").style.display = "block";
          // document.getElementById("response_message").innerHTML = response.data.message;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    }

  return (
    <div className='container p-2'>
      <div className="row">
        <div className="d-flex justify-content-center align-items-center" style={{"height":"100vh"}}>
          <div>
            <h1 className="text-center mt-2">Welcome, {session_info.fn}</h1>
            <h2 className="text-center mt-5 text-warning">Get ready for both the way from KWC to Brantford route</h2>
            <h3 className="text-center mt-5 text-success">WhatsApp No : {session_info.whn}</h3>
            <div className="text-center mt-5">
              {/* <h2 id="response_message" className='text-center bg-danger p-3 m-3'></h2> */}
              {/* { is_rider_online ? 
                // <p className='bg-success p-5' style={{fontWeight:"bold"}} id='rider_status'>I am online</p> 
                <button className='btn btn-success p-5 rounded-pill' style={{fontWeight:"bold"}} id='rider_status' onClick={click_me}>I am online</button>:
                // <p className='bg-danger p-5'  style={{fontWeight:"bold"}} id='rider_status'>I am offline </p> 
                <button className='btn btn-danger p-5 rounded-pill' style={{fontWeight:"bold"}} id='rider_status' onClick={click_me}>I am offline</button>
              } */}

              <button className='btn btn-info p-5 rounded-pill' style={is_rider_online? {"backgroundColor":"#4CBB17"} : {"backgroundColor":"#E50000"}} id='rider_status' onClick={click_me}>{is_rider_online? "I am Online" : "I am Offline"}</button>


              {/* <button className='btn btn-success p-5' style={{fontWeight:"bold"}} id='rider_status' onClick={click_me}>I am online</button> */}
            </div>
            {/* <br /> */}
            <p className='text-center mt-5'><b>***Please be <b className='text-success'>online</b> to get passengers in WhatsApp.</b></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rider_Dashboard