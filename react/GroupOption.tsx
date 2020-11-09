import classnames from 'classnames'
import React, { Fragment } from 'react'

import IconCaretRight from './IconCaretRight'
import styles from './GroupOption.css'

interface OptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  caretAlign?: 'start' | 'center' | 'end'
  lean?: boolean
}

const GroupOption: React.FC<OptionProps> = ({
  className = '',
  onClick = () => {},
  children,
  selected = false,
  caretAlign = 'start',
  lean = false,
}) => {
  return (
    <Fragment>
      <button
        className={classnames(
          styles.groupOption,
          className,
          'w-100 tl pointer db lh-copy c-on-base bg-base ph5 ph0-ns pv5-ns flex items-center justify-between bl-0 bt-0 br-0 bb b--muted-4',
          {
            pv4: !lean,
            pv3: lean,
          }
        )}
        onClick={onClick}
        role="option"
        aria-selected={selected}
      >
        {children}
        <span
          className={classnames(
            styles.caretWrapper,
            'c-action-primary ml5 inline-flex items-center',
            `self-${caretAlign}`
          )}
        >
          <IconCaretRight />
        </span>
      </button>
    </Fragment>
  )
}

export default GroupOption
