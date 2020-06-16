import Employee from '../views/Employee';
import EmployeeForm from '../views/EmployeeForm';
export default [
    {
        name: 'employee',
        path: '/',
        component: Employee,
    },
    {
        name: 'employee-form',
        path: '/employee-form/:id',
        component: EmployeeForm,
    },
];
