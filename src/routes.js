import React from "react";

const Projects = React.lazy(() => import('./components/projects/Projects'))
const ProjectDetails = React.lazy(() => import('./components/projects/ProjectDetails'))
const TaskDetails = React.lazy(() => import('./components/Tasks/TaskDetails'))

const routes = [
    { path: '', name: 'Home', element: Projects },
    { path: 'project/:id', name: 'Project Details', element: ProjectDetails },
    { path: '/project/:id/task/:id', name: 'Task Details', element: TaskDetails },
]

export default routes