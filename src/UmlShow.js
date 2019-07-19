import { Show, SimpleShowLayout } from 'react-admin'
import { SvgField } from './SvgField'
import React from 'react';
export const UmlShow = (props) => {
    return (<Show {...props}>
        <SimpleShowLayout>
            <SvgField label={'UML'}></SvgField>
        </SimpleShowLayout>

    </Show>
    )
}