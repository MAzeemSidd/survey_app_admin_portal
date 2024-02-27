import React from "react";

const Projects = React.lazy(() => import('./components/projects/Projects'))
const ProjectDetails = React.lazy(() => import('./components/projects/ProjectDetails'))

const routes = [
    { path: '', name: 'Home', element: Projects },
    { path: 'project-details/:id', name: 'Project Details', element: ProjectDetails },
]

export default routes