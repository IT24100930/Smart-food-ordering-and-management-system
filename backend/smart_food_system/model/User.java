package com.example.smart_food_system.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
 
import java.time.LocalDateTime;
 
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {
 
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
 
    @Column(name = "first_name", nullable = false, length = 50)
    private String firstName;
 
    @Column(name = "last_name", nullable = false, length = 50)
    private String lastName;
 
    @Column(nullable = false, unique = true, length = 100)
    private String email;
 
    @Column(nullable = false)
    private String password;
 
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.CUSTOMER;
 
    @Column(length = 500)
    private String address;
 
    @Column(length = 20)
    private String telephone;
 
    @Enumerated(EnumType.STRING)
    @Builder.Default
    private Status status = Status.ACTIVE;
 
    @Column(name = "reset_token")
    private String resetToken;
 
    @Column(name = "reset_token_expiry")
    private LocalDateTime resetTokenExpiry;
 
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
 
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
 
    // Enums
    public enum Role { ADMIN, STAFF, CUSTOMER }
    public enum Status { ACTIVE, INACTIVE }
}