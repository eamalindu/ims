package lk.steam.ims.controller;

import lk.steam.ims.entity.MailStructure;
import lk.steam.ims.service.MailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/mail")
public class EmailController {

    @Autowired
    private MailService mailService;

    @PostMapping("/send/{email}")
    public String sendEmail(@PathVariable String email, @RequestBody MailStructure mailStructure) {
        mailService.sendMail(email, mailStructure);
        return "OK";
    }
}
