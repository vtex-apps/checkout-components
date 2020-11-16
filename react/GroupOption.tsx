import classnames from 'classnames'
import React, { Fragment } from 'react'
import { Divider } from 'vtex.styleguide'

import IconCaretRight from './IconCaretRight'
import styles from './GroupOption.css'
import { useListContext } from './ListGroup'

interface OptionProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  caretAlign?: 'start' | 'center' | 'end'
  lean?: boolean
  isLast?: boolean
}

const GroupOption: React.FC<OptionProps> = ({
  className = '',
  onClick = () => {},
  children,
  selected = false,
  caretAlign = 'start',
  lean = false,
  isLast = false,
}) => {
  const borderPosition = useListContext()?.borderPosition ?? 'top'

  return (
    <Fragment>
      <button
        className={classnames(
          styles.groupOption,
          className,
          'w-100 tl pointer db lh-copy c-on-base bg-base hover-bg-action-secondary ph5 pv5-ns flex items-center justify-between bn',
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
      {(!isLast || borderPosition === 'top') && (
        <div className="w-100 pr5 pr0-ns pl5">
          <Divider orientation="horizontal" />
        </div>
      )}
    </Fragment>
  )
}

export default GroupOption
