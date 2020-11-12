import classnames from 'classnames'
import React, { useContext, useMemo, createContext } from 'react'

interface ListContext {
  borderPosition: 'top' | 'bottom'
}

const ctx = createContext<ListContext | undefined>(undefined)

export const useListContext = () => useContext(ctx)

const ListGroup: React.FC<{ borderPosition?: 'top' | 'bottom' }> = ({
  children,
  borderPosition = 'top',
}) => {
  const context = useMemo(
    () => ({
      borderPosition,
    }),
    [borderPosition]
  )

  return (
    <div className="nh5 nh0-ns pl5 pl0-ns" role="group">
      <div
        className={classnames('b--muted-4', {
          bt: borderPosition === 'top',
          bb: borderPosition === 'bottom',
        })}
      >
        <ctx.Provider value={context}>{children}</ctx.Provider>
      </div>
    </div>
  )
}

export default ListGroup
