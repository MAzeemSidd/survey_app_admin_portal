import React from "react";

const Homepage = React.lazy(()=>import('./components/homepage/Homepage'))
const Projects = React.lazy(() => import('./components/projects/Projects'))
const ProjectDetails = React.lazy(() => import('./components/projects/ProjectDetails'))
const TaskDetails = React.lazy(() => import('./components/Tasks/TaskDetails'))
const EmployeeAnswers = React.lazy(()=>import('./components/Tasks/Answers'))

const routes = [
    { path: '/home', name: 'Home', element: Homepage },
    { path: '/clients', name: 'Clients', element: Projects },
    { path: '/client/:id', name: 'Surveys', element: ProjectDetails },
    { path: '/client/:id/survey/:id', name: 'Employees', element: TaskDetails },
    { path: '/client/:id/survey/:id/employee/:id', name: 'Questions', element: TaskDetails },
    { path: '/answers', name: 'Answers', element: EmployeeAnswers }
]

export default routes