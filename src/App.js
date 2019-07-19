import React from 'react';
import './App.css';

import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import { UmlShow } from './UmlShow'
import { Menu } from './Menu'

function App() {

  return (
    <Admin dataProvider={restProvider('/model-server/uml')} menu={Menu}>
      <Resource name="entities" show={UmlShow} />
      <Resource name="functions" show={UmlShow} />
      <Resource name="usecases" show={UmlShow} />
    </Admin>
  );
}

export default App;
