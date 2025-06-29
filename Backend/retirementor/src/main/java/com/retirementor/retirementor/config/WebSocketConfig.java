package com.retirementor.retirementor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws")
                .setAllowedOrigins("http://localhost:3001")  // Allow frontend connection
                .withSockJS()
                .setHeartbeatTime(30000);  // Set heartbeat interval to 30 seconds
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // Enable topic-based public messaging and private messaging
        registry.enableSimpleBroker("/topic", "/queue");
        
        // Set the application prefix for message-mapping
        registry.setApplicationDestinationPrefixes("/app");

        // Enable user-specific messaging (for private messages)
        registry.setUserDestinationPrefix("/user");
    }
}
