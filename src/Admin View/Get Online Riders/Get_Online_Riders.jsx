import React from 'react'

const Get_Online_Riders = ({each_rider}) => {
  return (
    <div className='row'>
        <div className="col-6">
            {each_rider.full_name}
        </div>
        <div className="col-6">
            <a href={`https://wa.me/+1${each_rider.whatsapp_no}`} target='_blank'>{each_rider.whatsapp_no}</a>
        </div>
    </div>
  )
}

export default Get_Online_Riders