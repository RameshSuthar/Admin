import './App.css';
import UserList from './components/UserList/UserList';
import { API_URL } from './app-constants';
import Search from './components/Search/Search';
import { useState, useEffect } from 'react';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [usersList, setUsersList] = useState([]);
  const [searchResult, setSearchResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [checkBoxValueArr, setCheckBoxValueArr] = useState([]);
  const [isEditArr, setIsEditArr] = useState([]);
  const [pageUsers, setPageUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiErrMsg, setAPIErrMsg] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setUsersList(data);
        setSearchResult(data);
        setInitialCheckBoxOrIsEditValues(data, setCheckBoxValueArr);
        setInitialCheckBoxOrIsEditValues(data, setIsEditArr);
        setLoading(false);
      })
      .catch((err) => {
        console.log("couldn't fetch the users list.", err);
        setAPIErrMsg("Something went wrong, while fetching the data from server.");
        setLoading(false);
      })
  }, []);

  useEffect(() => {
    if(searchResult.length < 10) {
      setPageUsers(searchResult);
      setCurrentPage(1);
      return;
    }
    let pageStartIndex = (currentPage * 10) - 10;
    let pageEndIndex = currentPage * 10;
    let pageContent = [];
    for(let i = pageStartIndex; i < searchResult.length; i++) {
      if(i >= pageEndIndex) break;
      pageContent.push(searchResult[i]);
    }
    setPageUsers(pageContent);

  }, [searchResult, currentPage])

  const handleCurrentPageChange = (val) => {
    setCurrentPage(val);
    setSelectAll(false);
    resetTheGivenArray(checkBoxValueArr, setCheckBoxValueArr)
  }

  const resetTheGivenArray = (arr, setFunc) => {
    const newArr = arr.map((prevVal) => false);
    setFunc(newArr);
  }

  const setInitialCheckBoxOrIsEditValues = (data, setFunc) => {
    let newObj = [];
    data.forEach((user) => {
      newObj[user.id] = false;
    });
    setFunc(newObj);
  }

  const setSingleCheckBox = (id, val) => {
    const arr = [...checkBoxValueArr];
    arr[id] = val;
    setCheckBoxValueArr(arr);
  }

  const setSingleIsEditValue = (id) => {
    const arr = [...isEditArr];
    arr[id] = !isEditArr[id];
    setIsEditArr(arr);
  }

  const handleOnChange = () => {
    setSelectAll((prevVal) => !prevVal);
  }

  useEffect(() => {
    const arr = [...checkBoxValueArr];
    pageUsers.forEach(user => {
      arr[user.id] = selectAll;
    })
    setCheckBoxValueArr(arr);
  }, [selectAll]);

  const handleOnSearch = (val) => {
    const searchRes = usersList.filter((user) => {
      return user.name.toLowerCase().startsWith(val) || user.name.toLowerCase().includes(val) || 
             user.email.toLowerCase().startsWith(val) || user.role.toLowerCase().startsWith(val);
    });
    setSearchResult(searchRes);
    if(searchRes.length > 0) {
      setCurrentPage(1);
    }
    setSelectAll(false);
  }

  const updateUser = (newUser, id) => {
    //update the searchResult with the updated user data
    let userListCopy = [...searchResult];
    userListCopy = userListCopy.map((user) => {
      if(user.id === id) {
        return newUser;
      } else {
        return user
      }
    });
    setSearchResult(userListCopy);
    //update the main usersList with the updated user data
    updateUserList(newUser, id);
  }

  const updateUserList = (newUser, id) => {
    const updatedUserList = usersList.map((user) => {
      return user.id === id ? newUser : user;
    })
    setUsersList(updatedUserList);
  }

  const handleDeleteSelected = (e) => {
    const idsToBeDeleted = [];

    checkBoxValueArr.forEach((eachList, i) => {
      if(eachList === true) {
        idsToBeDeleted.push(i);
      }
    });

    if(idsToBeDeleted.length > 0) {
      const filteredUserList = usersList.filter((user) => {
        return !idsToBeDeleted.includes(Number(user.id));
      });
      setUsersList(filteredUserList);
      setSearchResult(filteredUserList);
      setSelectAll(false);
      if(currentPage > filteredUserList.length / 10) {
        setCurrentPage((oldState) => oldState - 1)
      }
    }
  }

  const handleSingleUserDelete = (id) => {
    const filteredUserList = usersList.filter((user) => {
      return user.id !== id;
    });

    setUsersList(filteredUserList);
    setSearchResult(filteredUserList);
  }

  if(loading) {
    return (
      <div className='msg-box'>
        <h2>Loading...</h2>
      </div>
    )
  }

  if(!loading && apiErrMsg) {
    return (
      <div className='msg-box'>
        <h2>{apiErrMsg}</h2>
      </div>
    )
  }

  return (
    <>
    <div className="App">
      <Search onSearch={handleOnSearch}/>
      {pageUsers.length > 0 ?
        <UserList usersList={pageUsers} selectAll={selectAll} isEditArr={isEditArr}
        setSingleCheckBox={setSingleCheckBox} setSingleIsEditValue={setSingleIsEditValue}
        checkBoxValueArr={checkBoxValueArr} onSelectAllChange={handleOnChange}
        updateUser={updateUser} handleSingleUserDelete={handleSingleUserDelete}/>
        :
        (usersList.length === 0 ?
          <h3><center>No user data found on server.</center></h3>
          :
          <h3><center>No User Data Found!!!</center></h3>
        )
      }

      <div className='pagination-btn-wrapper'>
        {searchResult.length > 0 && <button type="button" className='delete-all-btn' onClick={handleDeleteSelected}>Delete Selected</button>}
        <Pagination currentPage={currentPage} totalCount={searchResult.length} handleCurrentPageChange={handleCurrentPageChange}/>
      </div>
    </div>
    </>
  );
}

export default App;
