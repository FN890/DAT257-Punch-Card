package com.punchcard.bookingsystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final String mail = "alingsasvatten@gmail.com";

    private final JavaMailSender javaMailSender;

    @Autowired
    public EmailService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void sendEmail(String to) {
        SimpleMailMessage message = new SimpleMailMessage();

        message.setFrom(mail);
        message.setTo(to);
        message.setSubject("Bokningsbekräftelse Alingsås Vattenskidklubb");
        message.setText("Hejsan, gillar du också hollandaisesås?");

        javaMailSender.send(message);
    }
}
