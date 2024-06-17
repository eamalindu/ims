package lk.steam.ims.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

//Using @AllArgsConstructor, @NoArgsConstructor, @Data annotations from Lombok to avoid boilerplate code
@AllArgsConstructor
@NoArgsConstructor
@Data
//Creating a class called MailStructure which contains two attributes
public class MailStructure {
    //subject - String type to store the subject of the email
    private String subject;
    //message - String to store the message of the email
    private String message;
}
