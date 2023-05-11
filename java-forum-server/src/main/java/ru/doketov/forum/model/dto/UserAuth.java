package ru.doketov.forum.model.dto;

public class UserAuth {
    private boolean isAuth;

    private String username;

    private String role;

    public UserAuth(boolean isAuth, String username, String role) {
        this.isAuth = isAuth;
        this.username = username;
        this.role = role;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public boolean isAuth() {
        return isAuth;
    }

    public void setAuth(boolean auth) {
        isAuth = auth;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
