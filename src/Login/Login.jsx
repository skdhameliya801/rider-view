import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from '../CONSTANTS';
// const axios = require('axios').default;
import axios from 'axios'; 


const Login = () => {

    useEffect(() => {
        document.getElementById("login_btn").innerHTML = "Login";
        document.getElementById("response_message").style.display = "none";
    }, [])

    let form_login_submit = (event) => {
        event.preventDefault(); 
        
        document.getElementById("login_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

        let login_data = JSON.stringify({
            "whatsapp_no": document.getElementById("whatsapp_no").value,
            "password": document.getElementById("password").value
        });
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CONSTANTS.server_url + '/login_rider',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : login_data
        };

        axios.request(config)
            .then((response) => {
            // console.log(response.data);
            if(response.data.response){
                let logged_user_data = {
                    "fn" : response.data.user_data.full_name,
                    "whn" : response.data.user_data.whatsapp_no
                }
                localStorage.setItem("log_u_d",JSON.stringify(logged_user_data));
                window.location.href = "/rider_info";
            }else{
                document.getElementById("login_btn").innerHTML = "Login";
                document.getElementById("response_message").style.display = "block";
                document.getElementById("response_message").innerHTML = response.data.message
            }
        })
        .catch((error) => {
            document.getElementById("login_btn").innerHTML = "Login";
            console.log(error);
        });
    }

    // useEffect(() => {
        // let data = JSON.stringify({
        //     "whatsapp_no": whatsapp_no,
        //     "password": password
        //   });
    // }, [])
    

    return (
        <>
        <div className="d-flex justify-content-center align-items-center mb-5 p-3" style={{"height":"100vh"}}>
            <form onSubmit={form_login_submit} className='border border-primary bg-warning rounded-5 p-5 '>
                <h1 className="text-center">Yellow Ride - Login </h1>

                <p className="text-center bg-danger p-2" id='response_message'></p>

                <div className="m-3">
                    <label className="form-label">WhatsApp No.</label>
                    <input type="number" className="form-control" id="whatsapp_no" placeholder="only 10 digits" required />
                </div>
                <div className="m-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" placeholder="" required />
                </div>
                <div className="m-3">
                    {/* <Link to={'/rider_info'}> */}
                        <button type="submit" id='login_btn' className='btn btn-success'>Login</button>
                    {/* </Link> */}
                </div>
                <div className="m-3">
                    <Link to={'/forgot_password'}>forgot password?</Link>
                </div>
            </form>
        </div>
        </>
    )
}

export default Login