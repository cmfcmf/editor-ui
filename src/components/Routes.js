import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import ProjectComponentLoader from './Editor/ProjectComponentLoader/ProjectComponentLoader'
import NewProject from './NewProject/NewProject'
import ProjectViewer from './ProjectViewer/ProjectViewer'

const Routes = () => (
  <BrowserRouter>
    <Switch>
     <Route
        exact
        path="/"
        component={ProjectComponentLoader}
      />
     <Route
        exact
        path="/new"
        component={NewProject}
      />
     <Route
        exact
        path="/:projectType"
        component={ProjectComponentLoader}
      />

     <Route
        exact
        path="/:projectType/:identifier"
        component={ProjectComponentLoader}
      />
     <Route
        exact
        path="/python/share/:identifier"
        component={ProjectViewer}
      />
    </Switch>
  </BrowserRouter>
)

export default Routes
