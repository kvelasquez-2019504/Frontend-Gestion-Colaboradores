export const Button = ({ typeBtn, className, onClickBtn, text, disabled, idBtn=''}) => {

  return (
        <button type={typeBtn} onClick={onClickBtn} className={className} 
          id={idBtn} disabled={disabled}>
          {text}
        </button>
  )
}
