import React from 'react'
import {PuffLoader} from "react-spinners";

function LoadingState() {
  return (
    <div className='w-full flex items-center justify-center h-full'>
      <PuffLoader size={70} color='#ff3381' />
    </div>
  )
}

export default LoadingState
