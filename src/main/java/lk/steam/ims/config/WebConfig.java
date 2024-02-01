package lk.steam.ims.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class WebConfig {

    //password encrypt instance
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity.authorizeHttpRequests(auth -> {
            auth
                    .requestMatchers("/login").permitAll()
                    .requestMatchers("/Employee/**").hasAnyRole("Admin","Manager")
                    .requestMatchers("/User/**").hasAnyRole("Admin","Manager")
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/resources/**").permitAll()
                    .requestMatchers("/Dashboard").hasAnyRole("Admin","Manager","Counsellor")
                    .anyRequest().authenticated();

        })
                //login handling
                .formLogin(login ->{
                    login
                            .loginPage("/login")
                            .defaultSuccessUrl("/Dashboard",true)
                            .failureUrl("/login?error=failed")
                            .usernameParameter("username")
                            .passwordParameter("password");

                })

                //logout handling
                .logout(logout->{
                    logout
                            .logoutSuccessUrl("/login")
                            .logoutUrl("/logout");
                })

                //exception handling
                .exceptionHandling(exception ->{
                    exception.accessDeniedPage("/error");
                })

                //cross side reference
                .csrf(csrf->{
                    csrf.disable();
                });

        return httpSecurity.build();
    }

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoderMethod(){
        bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder;
    }
}
