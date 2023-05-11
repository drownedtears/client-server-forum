package ru.doketov.forum.model.dto;

public class UserResponse {
    private Long id;

    private String username;

    private String regDate;

    private boolean banned;

    public UserResponse(Long id, String username, String regDate, boolean banned) {
        this.id = id;
        this.username = username;
        this.regDate = regDate;
        this.banned = banned;
    }

    public UserResponse() { }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRegDate() {
        return regDate;
    }

    public void setRegDate(String regDate) {
        this.regDate = regDate;
    }

    public boolean getBanned() {
        return banned;
    }

    public void setBanned(boolean banned) {
        this.banned = banned;
    }
}
