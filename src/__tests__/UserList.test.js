import UserList from "../components/UserList/UserList";
import { render, screen } from '@testing-library/react';

const usersList = [
    { id: 1, name: 'Virat Kohli', email: 'viratkohli@mailinator.com', role: 'cricketer'} ,
    { id: 2, name: 'Adam', email: 'adam@mailinator.com', role: 'admin',} ,
    { id: 3, name: 'Rohit', email: 'rohit@mailinator.com', role: 'member',} ,
    { id: 4, name: 'Smith', email: 'smith@mailinator.com', role: 'lead',} 
];

const isEditArr = [false, false, false, false, false];
const checkBoxArr = [false, false, false, false, false];

describe('Should render the correct list of users', () => {
    it('should render the correct length of users', async () => {
        render(<UserList usersList={usersList} isEditArr={isEditArr} checkBoxValueArr={checkBoxArr}/>)
        const users = await screen.findAllByRole('user-item');
        expect(users).toHaveLength(usersList.length);
    });
});





