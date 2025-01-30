import * as React from "react"

type ButtonPropsType = {
  title: string
  onClick: () => void
}

export const Button = (props: ButtonPropsType) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.title}</button>
    </div>
  )
}
