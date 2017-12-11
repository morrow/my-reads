import React from 'react';

const ErrorMessage = (props)=> {
  return (
    <div id='error-message'>
      <h2>Error</h2>
      <div className='message'>{props.message}</div>
    </div>
  )
}

export default ErrorMessage;
