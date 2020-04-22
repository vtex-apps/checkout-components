import React from 'react'

const ListGroup: React.FC = ({ children }) => {
  return (
    <div className="nr5 nr0-ns bt bb b--muted-4">
      <div className="nl5 nl0-ns" role="group">
        {children}
      </div>
    </div>
  )
}

export default ListGroup
