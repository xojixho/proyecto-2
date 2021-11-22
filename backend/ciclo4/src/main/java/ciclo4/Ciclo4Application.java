package ciclo4;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@EnableConfigurationProperties
@EntityScan(basePackages={"ciclo4.model"})
@SpringBootApplication
public class Ciclo4Application {

    /**
     * Main
     * @param args 
     */
	public static void main(String[] args) {
		SpringApplication.run(Ciclo4Application.class, args);
	}

}
