package com.yellowai.chatbot.service;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.yellowai.chatbot.dto.LoginRequest;
import com.yellowai.chatbot.dto.RegisterRequest;
import com.yellowai.chatbot.model.User;
import com.yellowai.chatbot.repository.UserRepository;
import com.yellowai.chatbot.security.JwtUtil;

@Service
public class AuthService {

	private final UserRepository userRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	private final JwtUtil jwtUtil;

	public AuthService(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.jwtUtil = jwtUtil;
	}

// REGISTER
	public void register(RegisterRequest request) {

		if (userRepository.findByEmail(request.getEmail()).isPresent()) {
			// mapped to 409 Conflict
			throw new IllegalStateException("Email already exists");
		}

		User user = new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));

		userRepository.save(user);
	}

//	LOGIN
	
	public String login(LoginRequest request) {

		User user = userRepository.findByEmail(request.getEmail())
				// mapped to 401 Unauthorized
				.orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));

		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			throw new IllegalArgumentException("Invalid email or password");
		}

		return jwtUtil.generateToken(user.getEmail());
	}
}
