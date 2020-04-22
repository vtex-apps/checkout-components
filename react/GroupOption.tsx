import classnames from 'classnames'
import React, { Fragment } from 'react'
import { IconCaretRight, Divider } from 'vtex.styleguide'

import styles from './GroupOption.css'

interface OptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

const GroupOption: React.FC<OptionProps> = ({
  className = '',
  onClick = () => {},
  children,
  selected = false,
}) => {
  return (
    <Fragment>
      <button
        className={classnames(
          'w-100 tl pointer db lh-copy c-on-base bg-base hover-bg-action-secondary ph5 pv4 pv5-ns bn flex justify-between',
          className
        )}
        onClick={onClick}
        role="option"
        aria-selected={selected}
      >
        {children}
        <span className="c-action-primary dib ml5">
          <IconCaretRight />
        </span>
      </button>
      <div className={classnames(styles.optionDivider, 'mh5')}>
        <Divider orientation="horizontal" />
      </div>
    </Fragment>
  )
}

export default GroupOption
