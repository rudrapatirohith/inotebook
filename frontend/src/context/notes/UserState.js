import { useCallback, useEffect, useState } from "react";
import UserContext from "./UserContext";
const UserState = (props) => { // Defining a functional component named NoteState that accepts props.
  const host = "http://localhost:5000" // Setting the host URL for API calls.
  const [user, setUser] = useState({name: ""}) //Here I am Using the useState hook to create a state variable notes and a function setNotes to update it, initializing it with notesInitial.

  // GET ALL User Details
  const fetchUserDetails = useCallback(async () => {
    //Have to do API CALL
    //Here i am Making an asynchronous GET request to the /api/notes/fetchallnotes endpoint, awaiting the response.
    try{
        const response = await fetch(`${host}/api/auth/getUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const userData = await response.json() // I am parsing the response as JSON, awaiting the result.
    // console.log(userData) // logs the parsed json to the console
    setUser(userData) // updates the notes state with the fetched notes.    props.showAlert("Updated the Note Successfully","success");
    // props.showAlert("Welcome to iNotebook Where you can save your notes","success");
    }
    catch(error){
        console.log("Failed to fetch user details:", error);
    }
  },[host]);


  useEffect(() => {
    if (localStorage.getItem('token')) {
        fetchUserDetails();
    }
}, [fetchUserDetails]);


return(
    <UserContext.Provider value={{user,fetchUserDetails}} >{props.children}</UserContext.Provider>
)
  


  }
export default UserState;