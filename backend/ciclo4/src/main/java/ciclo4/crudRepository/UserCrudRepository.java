package ciclo4.crudRepository;

import ciclo4.model.User;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UserCrudRepository extends CrudRepository<User, Integer> {
    public List<User> findAllByEmail (String user_email);
}
