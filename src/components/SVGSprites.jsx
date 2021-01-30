import React from 'react'
import svg_sprite from '../assets/sprite.svg';

function SVGSprites({ name, title, className }) {
  return (
    <svg id={name} title={title} className={`icon ${className ? className : ""}`} >
      <use xlinkHref={`${svg_sprite}#${name}`} />
    </svg>
  )
}

export default SVGSprites
