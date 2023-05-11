package ru.doketov.forum.model.dto;

public class ArticleRequest {

    private Long id;

    private String header;

    private String content;

    private Integer rating;

    private String cre_date;

    private String author;

    private Long author_id;

    public ArticleRequest(Long id, String header, String content, Integer rating, String cre_date, String author, Long author_id) {
        this.header = header;
        this.content = content;
        this.rating = rating;
        this.cre_date = cre_date;
        this.author = author;
        this.id = id;
        this.author_id = author_id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getAuthor_id() {
        return author_id;
    }

    public void setAuthor_id(Long author_id) {
        this.author_id = author_id;
    }

    public ArticleRequest() { }

    public String getHeader() {
        return header;
    }

    public void setHeader(String header) {
        this.header = header;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getCre_date() {
        return cre_date;
    }

    public void setCre_date(String cre_date) {
        this.cre_date = cre_date;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
