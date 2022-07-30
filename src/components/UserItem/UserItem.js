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
            <tr role="user-item" className={(checked ? 'dark-bg' : "")}>
                <td role="user-checkbox"><input type="checkbox" checked={checked} onChange={handleOnChangeOfSingleCheckbox}></input></td>
                <td role="user-name">{user.name}</td>
                <td role="user-email">{user.email}</td>
                <td role="user-role">{user.role}</td>
                <td>
                    <div role="user-delete" onClick={handleOnClickDelete} className="delete"></div>
                    <div role="user-edit" onClick={handleOnClickOfEdit} className="edit"></div>
                </td>
            </tr> 
        : 
            <tr role="user-item">
                <td role="user-checkbox"><input type="checkbox" disabled onChange={handleOnChangeOfSingleCheckbox}></input></td>
                <td role="user-name"><input type="text" value={updatedUser.name} name="name" onChange={handleOnChange}></input></td>
                <td role="user-email"><input type="email" value={updatedUser.email} name="email" onChange={handleOnChange}></input></td>
                <td role="user-role"><input type="text" value={updatedUser.role} name="role" onChange={handleOnChange}></input></td>
                <td>
                    <div role="user-update" onClick={handleOnClickOfUpdate} className="update">
                    </div>
                </td>
            </tr>
        )
    )
}

export default UserItem;