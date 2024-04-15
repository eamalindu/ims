package lk.steam.ims.controller;

import lk.steam.ims.dao.BatchDAO;
import lk.steam.ims.entity.Batch;
import org.springframework.beans.factory.annotation.Autowired;
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
        ModelAndView scheduleView = new ModelAndView();
        scheduleView.setViewName("Schedules.html");
        return scheduleView;
    }
}
