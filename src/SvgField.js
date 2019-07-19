
import React from 'react'
import InlineSVG from 'svg-inline-react';

export const SvgField = ({ record = {} })=>{
    return (
        <InlineSVG src={record.source} />
    )
}