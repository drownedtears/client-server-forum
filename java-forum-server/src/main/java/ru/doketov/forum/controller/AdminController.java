package ru.doketov.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import ru.doketov.forum.model.dto.*;
import ru.doketov.forum.model.entity.Article;
import ru.doketov.forum.model.entity.User;
import ru.doketov.forum.service.article.ArticleServiceImpl;
import ru.doketov.forum.service.user.UserService;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Authorization", "Content-Type"})
public class AdminController {

    private final UserService userService;

    private final ArticleServiceImpl articleService;

    @Autowired
    public AdminController(UserService userService, ArticleServiceImpl articleService) {
        this.userService = userService;
        this.articleService = articleService;
    }

    @PostMapping("/users")
    @ResponseBody
    public List<UserResponse> userList(FindUser findUser) {
       return userService.getAllUsers();
    }

    @PostMapping("/users/{username}")
    @ResponseBody
    public List<UserResponse> getUserByUsername(FindUser findUser) {
        UserResponse user = userService.getUserByUsername(findUser.getUsername());
        return List.of(new UserResponse(user.getId(), user.getUsername(), user.getRegDate(), user.getBanned()));
    }

    @GetMapping("/users/ban/{username}")
    @ResponseBody
    public void banUser(@PathVariable("username") String username) {
        userService.banOrUnbanUser(username);
    }

    @PostMapping("/articles")
    @ResponseBody
    public List<ArticleResponse> getArticles(ArticleRequest articleRequest) {
        return articleService.getAllArticles();
    }

    @PostMapping("/articles/{header}")
    @ResponseBody
    public List<ArticleResponse> getArticlesByHeader(ArticleRequest articleRequest) {
        return articleService.getArticlesByHeader(articleRequest.getHeader());
    }

    @GetMapping("/articles/delete/{id}")
    @ResponseBody
    public ArticleResponse deleteArticle(@PathVariable Integer id) {
        articleService.deleteArticle(Long.valueOf(id));
        return new ArticleResponse();
    }
}
