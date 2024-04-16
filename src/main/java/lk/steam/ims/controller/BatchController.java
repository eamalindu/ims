package lk.steam.ims.controller;

import lk.steam.ims.dao.BatchDAO;
import lk.steam.ims.entity.Batch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.List;

@RestController
@RequestMapping(value = "/Schedules")
public class BatchController {

    @Autowired
    private BatchDAO batchDAO;

    @GetMapping(value = "/findall",produces = "application/json")
    public List<Batch> findAll(){
        return batchDAO.findAll();
    }

    @GetMapping
    public ModelAndView scheduleUI() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        ModelAndView scheduleView = new ModelAndView();
        scheduleView.setViewName("Schedules.html");
        scheduleView.addObject("username",auth.getName());
        scheduleView.addObject("title","Schedules | STEAM IMS");
        scheduleView.addObject("activeNavItem","schedules");
        return scheduleView;
    }

    @GetMapping(value = "/activeBatches",produces = "application/json")
    public List<Batch> activeBathes(){
        return batchDAO.getActiveBatches();
    }
}
