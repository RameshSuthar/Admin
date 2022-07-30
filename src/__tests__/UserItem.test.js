import UserItem from "../components/UserItem/UserItem";
import { render, screen, fireEvent } from '@testing-library/react';

const userData = {
    id: 1,
    name: 'Virat Kohli',
    email: 'viratkohli@mailinator.com',
    role: 'cricketer',
}

describe('Should Render the correct user data', () => {
    it('should render correct user name', async () => {
        render(<UserItem user={userData} />);
        const userName = await screen.findAllByRole('user-name');
        expect(userName[0].textContent).toBe(userData.name);
    });

    it('should render correct user email', async () => {
        render(<UserItem user={userData} />);
        const userEmail = await screen.findAllByRole('user-email');
        expect(userEmail[0].textContent).toBe(userData.email);
    });

    it('should render correct user role', async () => {
        render(<UserItem user={userData} />);
        const userRole = await screen.findAllByRole('user-role');
        expect(userRole[0].textContent).toBe(userData.role);
    })
})

describe('Should Render input element in edit mode', () => {
    it('should render input element with value as user name', async () => {
        render(<UserItem user={userData} isEdit={true}/>);
        const userName = await screen.findAllByRole('user-name');
        expect(userName[0].childNodes[0].value).toBe(userData.name);
    });

    it('should render input element with value as user email', async () => {
        render(<UserItem user={userData} isEdit={true}/>);
        const userEmail = await screen.findAllByRole('user-email');
        expect(userEmail[0].childNodes[0].value).toBe(userData.email);
    });

    it('should render input element with value as user role', async () => {
        render(<UserItem user={userData} isEdit={true}/>);
        const userRole = await screen.findAllByRole('user-role');
        expect(userRole[0].childNodes[0].value).toBe(userData.role);
    })
});

test('In edit mode, the checkbox has to be disabled', async () => {
    render(<UserItem user={userData} isEdit={true}/>);
    const userCheckbox = await screen.findAllByRole('user-checkbox');
    expect(userCheckbox[0].childNodes[0].disabled).toBe(true);
});

test('In non edit mode, the checkbox has to be enabled', async () => {
    render(<UserItem user={userData} isEdit={false}/>);
    const userCheckbox = await screen.findAllByRole('user-checkbox');
    expect(userCheckbox[0].childNodes[0].disabled).toBe(false);
});


