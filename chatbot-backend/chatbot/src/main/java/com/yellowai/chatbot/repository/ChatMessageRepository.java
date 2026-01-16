package com.yellowai.chatbot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yellowai.chatbot.model.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
}
