package com.punchcard.bookingsystem.bodies;

public class JwtResponse {

    private final String jwt;
    private final String username;

    public JwtResponse(String jwt, String username) {
        this.jwt = jwt;
        this.username = username;
    }

    public String getJwt() {
        return jwt;
    }

    public String getUsername() {
        return username;
    }

}
