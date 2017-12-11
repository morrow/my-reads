import React from 'react'

const Link = (props) => {
  return <a className={props.className} onClick={props.onClick} href={props.href}>{props.children}</a>
}

export default Link