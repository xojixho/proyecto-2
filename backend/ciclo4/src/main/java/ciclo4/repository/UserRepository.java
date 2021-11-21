package ciclo4.repository;

import ciclo4.crudRepository.UserCrudRepository;
import ciclo4.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserRepository {
    @Autowired
    private UserCrudRepository userCrudRepository;

    public List<User> getUsers() {
        return (List<User>) userCrudRepository.findAll();
    }

    public User save(User user){
        return userCrudRepository.save(user);
    }

    public List<User> getEmail(String user_email){
        return userCrudRepository.findAllByEmail(user_email);
    }

    public Optional<User> getClient(int id){
        return userCrudRepository.findById(id);
    }
}
