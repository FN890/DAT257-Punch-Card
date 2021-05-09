package com.punchcard.bookingsystem.services;

import com.punchcard.bookingsystem.tables.Activity;
import com.punchcard.bookingsystem.tables.Reservation;
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

    public void sendEmail(String to, List<Reservation> reservations) {
        SimpleMailMessage message = new SimpleMailMessage();

        String activityMessage = creatFAQMessage(reservations);

        message.setFrom(from);
        message.setTo(to);
        message.setSubject("Bokningsbekräftelse Alingsås Vattenskidklubb");
        message.setText(activityMessage);

        javaMailSender.send(message);
    }

    private String creatFAQMessage(List<Reservation> reservations) {
        StringBuilder message = new StringBuilder();

        for (Reservation reservation : reservations) {
            message.append(reservation.getActivity().getName() + "\n");
            message.append(reservation.getStartTime() + " - " + reservation.getEndTime() + "\n");
            message.append("\n" + reservation.getActivity().getFaq() + "\n");
        }
        message.append("\nTack för bokningen /Punch Card");
        return message.toString();
    }
}
