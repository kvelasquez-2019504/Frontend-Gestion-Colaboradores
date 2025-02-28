import React from 'react'

export const Button = ({ typeBtn, className, onClickBtn, text, disabled, idBtn=''}) => {
  return (
        <button type={typeBtn} onClick={onClickBtn} className={className} disabled={disabled}
          id={idBtn}>
          {text}
        </button>
  )
}
