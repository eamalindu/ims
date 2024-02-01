package lk.steam.ims.service;

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
import java.util.List;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private UserDAO userDAO;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User extUser = userDAO.getUserByUsername(username);

        ArrayList<GrantedAuthority> grantedAuthorities = new ArrayList<GrantedAuthority>();

        for(Role role : extUser.getRoles()){
            grantedAuthorities.add(new SimpleGrantedAuthority(role.getName()));
        }

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(extUser.getUsername(),extUser.getPassword(),extUser.getStatus(),false,false,false, grantedAuthorities);

        return userDetails;
    }
}
