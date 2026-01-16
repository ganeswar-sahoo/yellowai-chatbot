package com.yellowai.chatbot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.yellowai.chatbot.model.Project;
import com.yellowai.chatbot.model.User;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findByUser(User user);
}
