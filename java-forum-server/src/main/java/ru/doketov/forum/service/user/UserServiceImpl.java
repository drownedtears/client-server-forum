package ru.doketov.forum.service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import ru.doketov.forum.dao.UserRepository;
import ru.doketov.forum.model.dto.FindUser;
import ru.doketov.forum.model.dto.RegisterUserRequest;
import ru.doketov.forum.model.dto.RegisterUserResponse;
import ru.doketov.forum.model.dto.UserResponse;
import ru.doketov.forum.model.entity.Role;
import ru.doketov.forum.model.entity.User;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserDetailsService, UserService {

    private final FindUser findUser;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserServiceImpl(BCryptPasswordEncoder bCryptPasswordEncoder,
                           UserRepository userRepository, FindUser findUser) {
        this.findUser = findUser;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        }

        return user;
    }

    @Override
    public RegisterUserResponse saveUser(RegisterUserRequest user) {
        User userFromDB = userRepository.findByUsername(user.getUsername());

        if (userFromDB != null) {
            return new RegisterUserResponse(false, "User already exists");
        }

        String timePattern = "dd:MM:YYYY";
        ZonedDateTime curTime = ZonedDateTime.now(ZoneId.of( "Europe/Moscow"));
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(timePattern);

        User newUser = new User();
        newUser.setPassword(user.getPassword());
        newUser.setPasswordConfirm(user.getPasswordConfirm());
        newUser.setUsername(user.getUsername());
        newUser.setBanned(false);
        newUser.setRegDate(curTime.format(dateTimeFormatter));
        newUser.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        newUser.setRoles(Collections.singleton(new Role(1L, "ROLE_USER")));
        userRepository.save(newUser);

        return new RegisterUserResponse(true, "success");
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepository.findAll().stream().filter(user ->
                user.getRoles().size() < 2)
                .map(this::toUserResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void banOrUnbanUser(String username) {
        User userFromDb = userRepository.getUserById(getUserByUsername(username).getId());
        userFromDb.setBanned(!userFromDb.getBanned());

        userRepository.save(userFromDb);
    }

    @Override
    public UserResponse getUserByUsername(String username) { return toUserResponse(userRepository.getUserByUsername(username)); }

    @Override
    public FindUser getFindUser() {
        return findUser;
    }

    private UserResponse toUserResponse(User user) {
        return new UserResponse(user.getId(), user.getUsername(), user.getRegDate(), user.getBanned());
    }
}
