package com.example.NeuroRec;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest
@ActiveProfiles("test")
class NeuroRecApplicationTests {

	@Test
	void contextLoads() {
		// Smoke test: ensures Spring context starts with the test profile (H2 in-memory DB).
	}
}
