package lk.steam.ims.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

//Using @Configuration annotation to make the java class into a spring configuration class
@Configuration
//Using @EnableWebSecurity annotation to enable the spring web security
@EnableWebSecurity
//Create a class named WebConfig
public class WebConfig {

   //Create an object of the BCryptPasswordEncoder class named bCryptPasswordEncoder
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{

        httpSecurity.authorizeHttpRequests(auth -> {
            auth
                    .requestMatchers("/Reset-Password/**").permitAll()
                    .requestMatchers("/login").permitAll()
                    .requestMatchers("/CreateAdmin").permitAll()
                    .requestMatchers("/User/loggedInUser").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Employee").hasAnyAuthority("Admin","Manager")
                    .requestMatchers("/User/**").hasAnyAuthority("Admin","Manager")
                    .requestMatchers("/Administrations/**").hasAnyAuthority("Admin","Manager")
                    .requestMatchers("/error").permitAll()
                    .requestMatchers("/resources/**").permitAll()
                    .requestMatchers("/Schedules/**").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Inquiries/**").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Inquiry/**").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Dashboard").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Commission/**").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Performance").hasAnyAuthority("Admin","Manager","Counsellor")
                    .requestMatchers("/Performance/All").hasAnyAuthority("Admin","Manager")
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
