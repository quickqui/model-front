import React from 'react';


import {MenuItemLink} from 'react-admin'
import  LabelIcon from '@material-ui/icons/Label';

export const Menu  = (props)=>{
    const {  onMenuClick } = props

    return (
        <div>
            <MenuItemLink key={'entities'} to={'/entities/1/show'} primaryText={'Entities'} leftIcon={<LabelIcon />} onClick={onMenuClick} />
            <MenuItemLink key={'functions'} to={'/functions/1/show'} primaryText={'Functions'} leftIcon={<LabelIcon />} onClick={onMenuClick} />
            <MenuItemLink key={'usecases'} to={'/usecases/1/show'} primaryText={'Usecases'} leftIcon={<LabelIcon />} onClick={onMenuClick} />
        </div>
    )
}