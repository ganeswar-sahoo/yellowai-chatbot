package com.yellowai.chatbot.service;

import com.yellowai.chatbot.dto.ProjectRequest;
import com.yellowai.chatbot.model.Project;
import com.yellowai.chatbot.model.User;
import com.yellowai.chatbot.repository.ProjectRepository;
import com.yellowai.chatbot.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

	private final ProjectRepository projectRepository;
	private final UserRepository userRepository;

	public ProjectService(ProjectRepository projectRepository, UserRepository userRepository) {
		this.projectRepository = projectRepository;
		this.userRepository = userRepository;
	}

	public Project createProject(ProjectRequest request, String email) {

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		Project project = new Project();
		project.setName(request.getName());
		project.setDescription(request.getDescription());
		project.setUser(user);

		return projectRepository.save(project);
	}

	public List<Project> getUserProjects(String email) {

		User user = userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));

		return projectRepository.findByUser(user);
	}
}
