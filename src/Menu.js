import React from 'react';


import {MenuItemLink} from 'react-admin'
import  LabelIcon from '@material-ui/icons/Label';

export const Menu  = (props)=>{
    const {  onMenuClick } = props

    return (
        <div>
            <MenuItemLink key={'svg'} to={'/svg/1/show'} primaryText={'SVG'} leftIcon={<LabelIcon />} onClick={onMenuClick} />
        </div>
    )
}