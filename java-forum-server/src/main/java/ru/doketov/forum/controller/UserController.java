package ru.doketov.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.neo4j.Neo4jProperties;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.doketov.forum.model.dto.ArticleRequest;
import ru.doketov.forum.model.dto.ArticleResponse;
import ru.doketov.forum.model.dto.UserAuth;
import ru.doketov.forum.model.entity.Article;
import ru.doketov.forum.model.entity.User;
import ru.doketov.forum.service.article.ArticleService;
import ru.doketov.forum.service.article.ArticleServiceImpl;
import ru.doketov.forum.service.user.UserService;

import java.security.Principal;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Authorization", "Content-Type"})
public class UserController {

    private final UserService userService;
    private final ArticleService articleService;

    @Autowired
    public UserController(UserService userService, ArticleService articleService) {
        this.userService = userService;
        this.articleService = articleService;
    }

    @PostMapping("/rate")
    @ResponseBody
    public ArticleResponse rate(@RequestBody ArticleRequest article) {
        return articleService.rate(article);
    }

    @GetMapping("/articles")
    @ResponseBody
    public List<ArticleResponse> getArticles() {
        return articleService.getAllArticles();
    }

    @PostMapping("/add")
    @ResponseBody
    public ArticleResponse addArticle(@RequestBody ArticleRequest article) {
        return articleService.saveArticle(article, SecurityContextHolder.getContext().getAuthentication().getName());
    }
}
