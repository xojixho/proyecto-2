package ciclo4.crudRepository;

import ciclo4.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;


/**
 * 
 * @author Grupo desarrollo
 */

public interface UserCrudRepository extends CrudRepository<User, Integer> {
    
    Optional<User> findByEmail(String email);
    
    Optional<User> findByEmailAndPassword (String email, String password);
}
