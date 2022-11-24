import React from 'react'
import AccountIcon from './AccountIcon';
import CompareButton from './CompareButton';

const Header = () => {
  return (
    <div className="header">
        <div className="logo" style={{display: 'flex'}}>
            <span style={{display:'block', marginRight:'6px'}}>
              LOGO
            </span>
            
            <CompareButton/>
        </div>
        <div className="icons">
            {/* account icon */}
            <AccountIcon/>
        </div>
    </div>
  )
}

export default Header