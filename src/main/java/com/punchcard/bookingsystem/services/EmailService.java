package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.tables.Activity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private final String from = "alingsasvatten@gmail.com";

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to, List<Activity> activityList) {
        SimpleMailMessage message = new SimpleMailMessage();

        String activityMessage = creatFAQMessage(activityList);

        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Bokningsbekräftelse Alingsås Vattenskidklubb");
        message.setText(activityMessage);

        javaMailSender.send(message);
    }

    private String creatFAQMessage(List<Activity> activityList) {
        StringBuilder message = new StringBuilder();

        for (Activity activity : activityList) {
            message.append("<b>" + activity.getName() + "</b>\n");
            message.append(activity.getFaq() + "\n");
        }
        return message.toString();
    }
}
