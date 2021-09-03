package com.artbazar.artbazarbackend.service;

import com.artbazar.artbazarbackend.dao.UserRepository;
import com.artbazar.artbazarbackend.entity.Profile;
import com.artbazar.artbazarbackend.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService, UserDetailsService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("Username not found");
        }

        List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(user.getType()));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public User getUserByName(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public User saveUser(User newUser) {
        newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
        newUser.setProfile(new Profile());
        return userRepository.save(newUser);
    }

    @Override
    public User updateUser(User updatedUser) {
        return userRepository.save(updatedUser);
    }
}
