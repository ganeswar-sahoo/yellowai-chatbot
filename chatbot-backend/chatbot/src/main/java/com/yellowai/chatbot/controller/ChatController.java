package com.yellowai.chatbot.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.yellowai.chatbot.dto.ChatRequest;
import com.yellowai.chatbot.model.ChatMessage;
import com.yellowai.chatbot.model.Project;
import com.yellowai.chatbot.model.User;
import com.yellowai.chatbot.repository.ChatMessageRepository;
import com.yellowai.chatbot.repository.ProjectRepository;
import com.yellowai.chatbot.repository.UserRepository;
import com.yellowai.chatbot.security.JwtUtil;
import com.yellowai.chatbot.service.LLMService;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final ProjectRepository projectRepository;
    private final ChatMessageRepository chatMessageRepository;
    private final LLMService llmService;

    public ChatController(
            JwtUtil jwtUtil,
            UserRepository userRepository,
            ProjectRepository projectRepository,
            ChatMessageRepository chatMessageRepository,
            LLMService llmService
    ) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.projectRepository = projectRepository;
        this.chatMessageRepository = chatMessageRepository;
        this.llmService = llmService;
    }

    @PostMapping
    public String chat(
            @RequestBody ChatRequest request,
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = authHeader.substring(7);
        String email = jwtUtil.extractEmail(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow();

        Project project = projectRepository.findById(request.getProjectId())
                .orElseThrow();

        // Save user message
        ChatMessage userMessage = new ChatMessage();
        userMessage.setProject(project);
        userMessage.setSender("USER");
        userMessage.setMessage(request.getMessage());
        chatMessageRepository.save(userMessage);

        // Call LLM
        String aiResponse = llmService.getResponse(request.getMessage());

        // Save AI message
        ChatMessage aiMessage = new ChatMessage();
        aiMessage.setProject(project);
        aiMessage.setSender("AI");
        aiMessage.setMessage(aiResponse);
        chatMessageRepository.save(aiMessage);

        return aiResponse;
    }
}
