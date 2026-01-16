package com.yellowai.chatbot.controller;

import com.yellowai.chatbot.dto.ProjectRequest;
import com.yellowai.chatbot.dto.ProjectResponse;
import com.yellowai.chatbot.model.Project;
import com.yellowai.chatbot.service.ProjectService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
public class ProjectController {

	private final ProjectService projectService;

	public ProjectController(ProjectService projectService) {
		this.projectService = projectService;
	}

	@PostMapping
	public ProjectResponse createProject(@RequestBody ProjectRequest request, Authentication authentication) {
		String email = authentication.getName();
		Project project = projectService.createProject(request, email);

		return new ProjectResponse(project.getId(), project.getName(), project.getDescription());
	}

	@GetMapping
	public List<ProjectResponse> getProjects(Authentication authentication) {
		String email = authentication.getName();

		return projectService.getUserProjects(email).stream()
				.map(p -> new ProjectResponse(p.getId(), p.getName(), p.getDescription())).toList();
	}
}
