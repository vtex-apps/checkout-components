import classnames from 'classnames'
import React, { ReactNode } from 'react'
import { IconDelete } from 'vtex.styleguide'

interface Props extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title: ReactNode
  description?: ReactNode
  auxiliaryText?: ReactNode
  onDeselect?: () => void
}

const SelectedCard: React.VFC<Props> = ({
  onDeselect,
  title,
  description,
  auxiliaryText,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classnames(
        props.className,
        'bg-muted-5 pa5 flex items-start lh-copy'
      )}
      role="option"
      aria-selected
    >
      <div className="flex w-100">
        <div className="flex flex-column">
          {title}
          {description}
        </div>
        {auxiliaryText}
      </div>
      <button
        className="flex-shrink-0 c-muted-1 ml5 pa2 flex items-center bg-transparent bn pointer self-start"
        onClick={onDeselect}
      >
        <IconDelete />
      </button>
    </div>
  )
}

export default SelectedCard
