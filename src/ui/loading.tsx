import React from 'react'

// 

type LoadingProps = {
  params: string;
};

const Loading = ({params}: LoadingProps) => {
  return (
    <span className="loading loading-dots loading-xl">{params}</span>
  )
}

export default Loading
