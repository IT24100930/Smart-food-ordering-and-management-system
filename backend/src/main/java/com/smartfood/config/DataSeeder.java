package com.smartfood.config;

import com.smartfood.entity.Category;
import com.smartfood.entity.Food;
import com.smartfood.entity.User;
import com.smartfood.repository.CategoryRepository;
import com.smartfood.repository.FoodRepository;
import com.smartfood.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final PasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedData(CategoryRepository categoryRepository,
                               FoodRepository foodRepository,
                               UserRepository userRepository) {
        return args -> {
            Category rice = getOrCreateCategory(categoryRepository, "Rice");
            Category burger = getOrCreateCategory(categoryRepository, "Burger");
            Category pizza = getOrCreateCategory(categoryRepository, "Pizza");
            Category drinks = getOrCreateCategory(categoryRepository, "Drinks");

            if (!userRepository.existsByEmail("admin@smartfood.com")) {
                userRepository.save(User.builder()
                        .name("Admin User")
                        .email("admin@smartfood.com")
                        .password(passwordEncoder.encode("admin123"))
                        .role("admin")
                        .build());
            }

            if (!userRepository.existsByEmail("jane@student.com")) {
                userRepository.save(User.builder()
                        .name("Jane Student")
                        .email("jane@student.com")
                        .password(passwordEncoder.encode("password123"))
                        .role("customer")
                        .build());
            }

            if (foodRepository.count() == 0) {
                foodRepository.save(Food.builder()
                        .name("Chicken Kottu")
                        .category(rice)
                        .price(8.50)
                        .rating(4.7)
                        .stock(24)
                        .prepTime("15 min")
                        .description("A popular Sri Lankan style street food with chicken and vegetables.")
                        .image("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80")
                        .build());
                foodRepository.save(Food.builder()
                        .name("Cheese Burger")
                        .category(burger)
                        .price(6.75)
                        .rating(4.5)
                        .stock(18)
                        .prepTime("10 min")
                        .description("Juicy burger with melted cheese, fresh salad, and house sauce.")
                        .image("https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80")
                        .build());
                foodRepository.save(Food.builder()
                        .name("Pepperoni Pizza")
                        .category(pizza)
                        .price(11.99)
                        .rating(4.8)
                        .stock(12)
                        .prepTime("20 min")
                        .description("Classic pizza with pepperoni, mozzarella, and tomato sauce.")
                        .image("https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80")
                        .build());
                foodRepository.save(Food.builder()
                        .name("Iced Coffee")
                        .category(drinks)
                        .price(3.25)
                        .rating(4.4)
                        .stock(30)
                        .prepTime("5 min")
                        .description("Refreshing cold coffee for a quick energy boost.")
                        .image("https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80")
                        .build());
            }
        };
    }

    private Category getOrCreateCategory(CategoryRepository categoryRepository, String name) {
        return categoryRepository.findByName(name)
                .orElseGet(() -> categoryRepository.save(Category.builder().name(name).build()));
    }
}
