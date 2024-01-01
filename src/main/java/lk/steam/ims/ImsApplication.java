package lk.steam.ims;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@SpringBootApplication
public class ImsApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImsApplication.class, args);
		System.out.println("IMS System is now running!");
	}
	@RequestMapping(value = "/Dashboard")
	public ModelAndView imsDashboard(){
		ModelAndView imsView = new ModelAndView();
		imsView.setViewName("Dashboard.html");
		return imsView;
	}

}
