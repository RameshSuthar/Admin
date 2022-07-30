import { useState } from "react";
import './UserItem.css';

const UserItem = ({user, selectAll, checked, setSingleCheckBox, setSingleIsEditValue, isEdit, updateUser, handleSingleUserDelete}) => {

    const [updatedUser, setUpdatedUser] = useState({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    });

    const handleOnChangeOfSingleCheckbox = (e) => {
        setSingleCheckBox(user.id, !checked);
    }

    const handleOnClickOfEdit = (e) => {
        setSingleIsEditValue(user.id);
    }

    const handleOnChange = (e) => {
        const newObj = {...updatedUser};
        newObj[e.target.name] = e.target.value;
        setUpdatedUser(newObj);
    }

    const handleOnClickOfUpdate = (e) => {
        updateUser(updatedUser, user.id);
        setSingleIsEditValue(user.id);
    }

    const handleOnClickDelete = (e) => {
        handleSingleUserDelete(user.id);
    }

    return (
        (!isEdit ? 
            <tr data-testid="user-item" className={(checked ? 'dark-bg' : "")}>
                <td data-testid="user-checkbox"><input type="checkbox" checked={checked} onChange={handleOnChangeOfSingleCheckbox}></input></td>
                <td data-testid="user-name">{user.name}</td>
                <td data-testid="user-email">{user.email}</td>
                <td data-testid="user-role">{user.role}</td>
                <td>
                    <div data-testid="user-delete" onClick={handleOnClickDelete} className="delete"></div>
                    <div data-testid="user-edit" onClick={handleOnClickOfEdit} className="edit"></div>
                </td>
            </tr> 
        : 
            <tr data-testid="user-item">
                <td data-testid="user-checkbox"><input type="checkbox" disabled onChange={handleOnChangeOfSingleCheckbox}></input></td>
                <td data-testid="user-name"><input type="text" value={updatedUser.name} name="name" onChange={handleOnChange}></input></td>
                <td data-testid="user-email"><input type="email" value={updatedUser.email} name="email" onChange={handleOnChange}></input></td>
                <td data-testid="user-role"><input type="text" value={updatedUser.role} name="role" onChange={handleOnChange}></input></td>
                <td>
                    <div data-testid="user-update" onClick={handleOnClickOfUpdate} className="update">
                    </div>
                </td>
            </tr>
        )
    )
}

export default UserItem;