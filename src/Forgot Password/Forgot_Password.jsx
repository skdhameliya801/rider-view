import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { CONSTANTS } from '../CONSTANTS';
import axios from 'axios'; 

const Forgot_Password = () => {

    useEffect(() => {
        document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
        document.getElementById("response_message").style.display = "none";
    }, [])
    

    let form_forgot_pass_submit = (event) => {
        event.preventDefault(); 
        document.getElementById("set_new_pass_btn").innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>';

        let form_data = JSON.stringify({
            "whatsapp_no": document.getElementById("whatsapp_no").value,
            "password": document.getElementById("password").value,
            "security_code" : document.getElementById("security_code").value
        });

        if(document.getElementById("password").value == document.getElementById("confirm_password").value){
            let config = {
                method: 'patch',
                maxBodyLength: Infinity,
                url: CONSTANTS.server_url + '/forgot_password_rider',
                headers: { 
                    'Content-Type': 'application/json'
                },
                data : form_data
            };
    
            axios.request(config)
                .then((response) => {
                // console.log(response.data);
                document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
                document.getElementById("response_message").style.display = "block";
                document.getElementById("response_message").innerHTML = response.data.message;
            })
            .catch((error) => {
                document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
                console.log(error);
            });
        }else{
            document.getElementById("set_new_pass_btn").innerHTML = "Set New Password";
            alert("password and confirm password are not same");
        }
    }

  return (
    <div className="container p-2">
        <div className="row">
            <div className="col">
                <div class="d-flex justify-content-center align-items-center" style={{"height":"100vh"}}>
                    <form onSubmit={form_forgot_pass_submit} className='border border-primary bg-warning rounded-5 p-5 '>
                        <h1 className="text-center">Forgot Password</h1>
                        <p className="text-center bg-danger p-2" id='response_message'></p>
                        <div class="m-3">
                            <label for="formGroupExampleInput" class="form-label">WhatsApp No.</label>
                            <input type="number" class="form-control" id="whatsapp_no" placeholder="only 10 digits" required />
                        </div>
                        <div class="m-3">
                            <label for="formGroupExampleInput" class="form-label">Write your security code</label>
                            <input type="text" class="form-control" id="security_code" placeholder="" required />
                            <b>Not remembered? <a href="https://wa.me/+15483333597?text=Hi, I forgot my security code." target='_blank'>click here to chat with us</a></b>
                        </div>
                        <div class="m-3">
                            <label for="formGroupExampleInput" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" placeholder="password" required />
                        </div>
                        <div class="m-3">
                            <label for="formGroupExampleInput" class="form-label">Confirm password</label>
                            <input type="password" class="form-control" id="confirm_password" placeholder="confirm password" required />
                        </div>
                        {/* <div class="m-3">
                            <label for="inputState" class="form-label">Select security question</label>
                            <select id="inputState" class="form-select">
                                <option selected>What is your first school?</option>
                                <option>What is your favorite subject?</option>
                                <option>What is your favorite game?</option>
                                <option>What is your favorite teacher?</option>
                                <option>What is your favorite player?</option>
                                <option>What was your first pet's name?</option>
                                <option>What is your favorite movie?</option>
                                <option>In which city were you born?</option>
                                <option>What is your mother's maiden name?</option>
                                <option>What was the name of your first school?</option>
                                <option>What is your favorite book?</option>
                                <option>What is your favorite food?</option>
                                <option>What is your favorite vacation spot?</option>
                                <option>What is your favorite color?</option>
                                <option>What is the name of your best childhood friend?</option>
                            </select>
                        </div> */}
                        {/* <div class="m-3">
                            <label for="formGroupExampleInput2" class="form-label">Write your answer</label>
                            <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="" />
                        </div> */}
                        <div class="m-3">
                            <button type="submit" id='set_new_pass_btn' className='btn btn-success'>Set New Password</button>
                        </div>
                        <div class="m-3">
                            <Link to={'/login'}>Login?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Forgot_Password