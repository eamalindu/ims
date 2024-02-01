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
import java.util.List;
import java.util.Set;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        System.out.println(username);

        User extUser = userDAO.getUserByUsername(username);

        // Check if user exists
        if (extUser == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }

        System.out.println(extUser.getUsername());

        Set<GrantedAuthority> userRoles = new HashSet<GrantedAuthority>();

        for(Role role : extUser.getRoles()){
            userRoles.add(new SimpleGrantedAuthority(role.getName()));
        }

        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>(userRoles);



        UserDetails userDetails = new org.springframework.security.core.userdetails.User(extUser.getUsername(),extUser.getPassword(),extUser.getStatus(),true,true,true, grantedAuthorities);

        return userDetails;
    }
}
