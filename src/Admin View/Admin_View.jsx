import React, { useState } from 'react'
import { useEffect } from 'react';
import Get_Online_Riders from './Get Online Riders/Get_Online_Riders';
import { CONSTANTS } from '../CONSTANTS';
import axios from 'axios'; 

const Admin_View = () => {

    const [is_admin_credential_right, setIs_admin_credential_right] = useState(false)
    let [N1, setN1] = useState(0);
    let [some_online_riders, setSome_online_riders] = useState([]);


    
    useEffect(() => {
        let admin_credential = prompt("Please enter admin credentials");
        if(admin_credential == "testt"){
            setIs_admin_credential_right(true)
        }

        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: CONSTANTS.server_url + '/admin007/' + N1,
            headers: { },
            // data : data
        };

        axios.request(config)
            .then((response) => {
                // console.log(response.data);
                console.log(response.data.length);
                if(response.data.length != 0){
                    setSome_online_riders(response.data)
                }else{
                    console.log("no more riders")
                    document.getElementById("loadMoreBtn").style.display = "none"
                }
            })
            .catch((error) => {
                console.log(error);
            });

    }, [N1])
    
    if(is_admin_credential_right){
        return (
            <div className='container mt-5'>
                <div className="row bg-info">
                    <div className="col-6">NAME</div>
                    <div className="col-6">WHATSAPP</div>
                </div>
                {
                    some_online_riders.map((rider, id) => (
                        <Get_Online_Riders each_rider={rider} key={id} />
                    ))
                }
                <center><button id='loadMoreBtn' className="btn btn-success m-4" onClick={() => setN1(N1+10)}>Load More Riders</button></center>
            </div>
        )
    }

}

export default Admin_View