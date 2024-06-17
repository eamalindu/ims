package lk.steam.ims.service;

import jakarta.transaction.Transactional;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.Role;
import lk.steam.ims.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

//Make the java class into a spring service class
@Service
//Implement the UserDetailsService interface
//This interface is used to retrieve user-related data
public class MyUserDetailService implements UserDetailsService {
    //Using autowired to inject dependencies
    @Autowired
    //Create an object of the UserDAO class named userDAO
    private UserDAO userDAO;

    //Override the loadUserByUsername method
    @Override
    //Using the @Transactional make the loadUserByUsername method transactional
    @Transactional
    //crate a method to load user by username with only one parameter
    //1) username -> String type parameter to get the username
    //Using the UsernameNotFoundException to throw an exception if the user is not found
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        //Create an object of the User class named extUser
        //call the getUserByUsername method from the userDAO object and pass the username as a parameter
        //catch the result in the extUser object
        User extUser = userDAO.getUserByUsername(username);

        //Check if the extUser object is null
        if (extUser == null) {
            //this means there is no user with the given username
            //throw an exception
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        //Create a set of GrantedAuthority named userRoles
        //Create a new HashSet of GrantedAuthority and pass the userRoles as a parameter
        Set<GrantedAuthority> userRoles = new HashSet<GrantedAuthority>();

        //Create a for loop to loop through the roles of the user
        for (Role role : extUser.getRoles()) {
            //Add the roles of the user to the userRoles set
            //Create a new SimpleGrantedAuthority and pass the role.getName() as a parameter
            //Add the result to the userRoles set
            userRoles.add(new SimpleGrantedAuthority(role.getName()));
        }

        //Create an ArrayList of GrantedAuthority named grantedAuthorities
        //Create a new ArrayList of GrantedAuthority and pass the userRoles as a parameter
        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>(userRoles);

        //Create an object of the clas UserDetail named userDetails
        //Create a new User object [security core package]
        //seven parameters are passed to the User object
        //1) extUser.getUsername() -> get the username of the user
        //2) extUser.getPassword() -> get the password of the user
        //3) extUser.getStatus() -> get the status of the user
        //4) true -> accountNonExpired [true if the account is not expired]
        //5) true -> credentialsNonExpired [true if the credentials are not expired]
        //6) true -> accountNonLocked [true if the account is not locked]
        //7) grantedAuthorities -> get the authorities of the user
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(extUser.getUsername(), extUser.getPassword(), extUser.getStatus(), true, true, true, grantedAuthorities);
        //return the userDetails object
        return userDetails;
    }
}
