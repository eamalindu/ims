package lk.steam.ims;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
@RestController
public class ImsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImsApplication.class, args);
		System.out.println("IMS System is now running!");
	}

	@RequestMapping(value = "/Administrations")
	public ModelAndView imsAdministration(){
		ModelAndView imsAdminView = new ModelAndView();
		imsAdminView.setViewName("administrations.html");
		return imsAdminView;
	}

	@RequestMapping(value = "/Inquiries")
	public ModelAndView imsInquiries(){
		ModelAndView imsInquiriesView = new ModelAndView();
		imsInquiriesView.setViewName("inquiries.html");
		return imsInquiriesView;
	}

}
