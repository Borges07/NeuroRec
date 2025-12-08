package com.example.NeuroRec;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest(properties = {
		"spring.datasource.url=jdbc:h2:mem:neurorec;MODE=PostgreSQL;DB_CLOSE_DELAY=-1;DATABASE_TO_UPPER=false",
		"spring.datasource.username=sa",
		"spring.datasource.password=",
		"spring.datasource.driver-class-name=org.h2.Driver",
		"spring.jpa.hibernate.ddl-auto=create-drop",
		"spring.sql.init.mode=never"
})
@ActiveProfiles("test")
@TestPropertySource(properties = {
		"groq.api.key=dummy" // evita falha se algum bean tentar ler a chave
})
class NeuroRecApplicationTests {

	@Test
	void contextLoads() {
		// Smoke test: ensures Spring context starts with H2 in-memory profile.
	}
}
