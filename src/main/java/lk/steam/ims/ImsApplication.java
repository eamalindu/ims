package lk.steam.ims;

import lk.steam.ims.dao.EmployeeDAO;
import lk.steam.ims.dao.RoleDAO;
import lk.steam.ims.dao.UserDAO;
import lk.steam.ims.entity.Role;
import lk.steam.ims.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
@RestController
public class ImsApplication {

	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;

	@Autowired
	private EmployeeDAO employeeDAO;

	@Autowired
	private RoleDAO roleDAO;

	@Autowired
	private UserDAO userDAO;

	public static void main(String[] args) {
		SpringApplication.run(ImsApplication.class, args);
		System.out.println("IMS System is now running!");
	}

	@RequestMapping(value = "/Administrations")
	public ModelAndView imsAdministration(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView imsAdminView = new ModelAndView();
		imsAdminView.addObject("username",auth.getName());
		imsAdminView.addObject("title","Administrations | STEAM IMS");
		imsAdminView.setViewName("administrations.html");

		return imsAdminView;
	}

	@RequestMapping(value = "/Inquiries")
	public ModelAndView imsInquiries(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView imsInquiriesView = new ModelAndView();
		imsInquiriesView.addObject("username",auth.getName());
		imsInquiriesView.setViewName("inquiries.html");
		imsInquiriesView.addObject("title","Inquiries | STEAM IMS");
		return imsInquiriesView;
	}

	@GetMapping(value = "/CreateAdmin")
	public String generateAdmin(){

		User adminUser = new User();
		adminUser.setUsername("Admin");
		adminUser.setEmail("admin@gmail.com");
		adminUser.setPassword(bCryptPasswordEncoder.encode("12345"));
		adminUser.setStatus(true);
		adminUser.setAddedTime(LocalDateTime.now());
		adminUser.setEmployeeID(employeeDAO.getReferenceById(1));

		Set<Role> roles =  new HashSet<Role>();
		roles.add(roleDAO.getReferenceById(1));
		adminUser.setRoles(roles);

		userDAO.save(adminUser);

		return "<script>window.location.replace('http://localhost:8888/login');</script>";
	}

}
