package ru.doketov.forum.service.user;

import ru.doketov.forum.model.dto.FindUser;
import ru.doketov.forum.model.dto.RegisterUserRequest;
import ru.doketov.forum.model.dto.RegisterUserResponse;
import ru.doketov.forum.model.dto.UserResponse;
import ru.doketov.forum.model.entity.User;

import java.util.List;

public interface UserService {

    RegisterUserResponse saveUser(RegisterUserRequest user);

    List<UserResponse> getAllUsers();

    void banOrUnbanUser(String username);

    UserResponse getUserByUsername(String username);

    FindUser getFindUser();
}
