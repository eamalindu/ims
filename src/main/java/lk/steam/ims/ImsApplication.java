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
import java.util.Base64;
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
		imsAdminView.addObject("activeNavItem","administrations");
		String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
		String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
		byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
		String base64Image = Base64.getEncoder().encodeToString(photoBytes);
		String imageSrc = "data:image/png;base64," + base64Image;
		imsAdminView.addObject("loggedInEmployeeName",loggedInEmployeeName);
		imsAdminView.addObject("loggedInDesignationName",loggedInDesignationName);
		imsAdminView.addObject("loggedInImage",imageSrc);

		return imsAdminView;
	}

	@RequestMapping(value = "/Inquiries")
	public ModelAndView imsInquiries(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		ModelAndView imsInquiriesView = new ModelAndView();
		imsInquiriesView.addObject("username",auth.getName());
		imsInquiriesView.setViewName("inquiries.html");
		imsInquiriesView.addObject("title","Inquiries | STEAM IMS");
		imsInquiriesView.addObject("activeNavItem","inquiries");
		String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
		String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
		byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
		String base64Image = Base64.getEncoder().encodeToString(photoBytes);
		String imageSrc = "data:image/png;base64," + base64Image;
		imsInquiriesView.addObject("loggedInEmployeeName",loggedInEmployeeName);
		imsInquiriesView.addObject("loggedInDesignationName",loggedInDesignationName);
		imsInquiriesView.addObject("loggedInImage",imageSrc);
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

	@GetMapping(value = "/Commission-Rate")
	public ModelAndView commissionRateUI(){
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();

		ModelAndView commissionView = new ModelAndView();
		commissionView.setViewName("manageComission.html");

		commissionView.addObject("username",auth.getName());
		commissionView.addObject("title","Manage Commission Rate | STEAM IMS");
		commissionView.addObject("activeNavItem","manageCommission");
		String loggedInEmployeeName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getFullName();
		String loggedInDesignationName = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getDesignationID().getDesignation();
		byte[] photoBytes = userDAO.getUserByUsername(auth.getName()).getEmployeeID().getPhotoPath();
		String base64Image = Base64.getEncoder().encodeToString(photoBytes);
		String imageSrc = "data:image/png;base64," + base64Image;
		commissionView.addObject("loggedInEmployeeName",loggedInEmployeeName);
		commissionView.addObject("loggedInDesignationName",loggedInDesignationName);
		commissionView.addObject("loggedInImage",imageSrc);;
		return commissionView;
	}

}
