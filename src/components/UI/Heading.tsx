import React from 'react'

type HeadingProps = {
  title: string;
  discription: string;
}


function Heading({title,discription}:HeadingProps) {
  return (
    <div className='text-center pb-(--space-xl)'>
      <h1 className='md:text-h2 text-3xl font-semibold pb-(--space-sm)'>{title}</h1>
      <p className='text-muted text-small lg:w-1/2 mx-auto'>{discription}</p>
    </div>
  )
}

export default Heading
