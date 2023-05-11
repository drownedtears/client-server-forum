package ru.doketov.forum.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.*;
import ru.doketov.forum.model.dto.RegisterUserRequest;
import ru.doketov.forum.model.dto.RegisterUserResponse;
import ru.doketov.forum.model.dto.UserAuth;
import ru.doketov.forum.model.entity.Article;
import ru.doketov.forum.service.article.ArticleService;
import ru.doketov.forum.service.user.UserService;
import ru.doketov.forum.model.entity.User;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

@Controller
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true", allowedHeaders = {"Authorization", "Content-Type"})
public class GeneralController {

    private final UserService userService;

    @Autowired
    public GeneralController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/registration")
    @ResponseBody
    public RegisterUserResponse addUser(@RequestBody RegisterUserRequest user) {
        return userService.saveUser(user);
    }

    @GetMapping("/auth")
    @ResponseBody
    public UserAuth isAuthenticated() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        List<String> roles = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        String mainRole = "ANONYM";
        if (roles.contains("ROLE_ADMIN")) {
            mainRole = "ADMIN";
        } else if (roles.contains("ROLE_USER")) {
            mainRole = "USER";
        }
        return authentication.isAuthenticated()
                ? new UserAuth(authentication.isAuthenticated(), authentication.getName(), mainRole)
                : new UserAuth(authentication.isAuthenticated(), null, mainRole);
    }
}
