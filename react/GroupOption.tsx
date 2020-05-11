import classnames from 'classnames'
import React, { Fragment } from 'react'
import { IconCaretRight, Divider } from 'vtex.styleguide'

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
          'w-100 tl pointer db lh-copy c-on-base bg-base hover-bg-action-secondary ph5 pv5-ns bn flex items-center justify-between',
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
      <div className={classnames(styles.optionDivider, 'mh5')}>
        <Divider orientation="horizontal" />
      </div>
    </Fragment>
  )
}

export default GroupOption
