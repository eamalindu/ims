window.addEventListener('load', () => {
    getLoggedInUser();
})

const getLoggedInUser=()=>{
    //hide the update button
    loggedInUserUpdateBtn.classList.add('d-none');

    const loggedInUserName = loggedInUsernameText.innerText;
    loggedInUser = ajaxGetRequest("/User/getByUsername/"+loggedInUserName);

    //setting data
    loggedInUsername.value = loggedInUser.username;
    loggedInEmail.value = loggedInUser.email;
    loggedInUserTimestamp.innerText = loggedInUser.addedTime.replace("T"," ");
    loggedInUser.roles.forEach((role)=>{
        loggedInRoles.value += role.name+" ";
    })
}


const editLoggedInUser=()=>{
    //show the update button
    loggedInUserUpdateBtn.classList.remove('d-none');
}