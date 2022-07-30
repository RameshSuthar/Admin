import UserItem from "../UserItem/UserItem";
import './UserList.css';

const UserList = ({selectAll, onSelectAllChange, usersList, checkBoxValueArr, setSingleCheckBox, 
                  isEditArr, setSingleIsEditValue, updateUser, handleSingleUserDelete}) => {
    const listOfUserItems = usersList.map((user) => {
        return (
            <UserItem key={user.id} user={user} isEdit={isEditArr[user.id]} checked={checkBoxValueArr[user.id]} 
              setSingleCheckBox={setSingleCheckBox} setSingleIsEditValue={setSingleIsEditValue}
              updateUser={updateUser} handleSingleUserDelete={handleSingleUserDelete}/>
        )
    })
    return (
        <div className="UserList-wrapper">
            <table>
                <thead>
                  <tr>
                    <th><input type="checkbox" name="selectBox" checked={selectAll} onChange={onSelectAllChange}></input></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listOfUserItems}
                </tbody>
            </table>
        </div>
    )
}

export default UserList;