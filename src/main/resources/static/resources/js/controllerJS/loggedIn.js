window.addEventListener('load', () => {
    getLoggedInUser();
})

const getLoggedInUser=()=>{
    //hide the update button
    loggedInUserUpdateBtn.classList.add('d-none');

    const loggedInUsername = loggedInUsernameText.innerText;
    loggedInUser = ajaxGetRequest("/User/getByUsername/"+loggedInUsername);

    //setting data
    loggedInUsername.value = loggedInUser.username;
    loggedInEmail.value = loggedInUser.email;
    loggedInUserTimestamp.innerText = loggedInUser.addedTime.replace("T"," ");
    loggedInUser.roles.forEach((role)=>{
        loggedInRoles.value += role.name+" ";
    })
    loggedInUsername.value = loggedInUser.username;
}


const editLoggedInUser=()=>{
    //show the update button
    loggedInUserUpdateBtn.classList.remove('d-none');
}