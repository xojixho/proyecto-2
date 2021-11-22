package ciclo4.service;

import ciclo4.model.User;
import ciclo4.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 
 * @author Grupo desarrollo
 */
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    public Optional<User> getUser(int id){
        return userRepository.getUser(id);
    }
    
    public User registrar(User user){
        if(user.getId() == null){
            if(existeEmail(user.getEmail()) == false){
                return userRepository.save(user);
            }else{
                return user;
            }
        }else{
            return user;
        }
    }

    public User autenticarUsuario(String email, String password){
        Optional<User> usuario = userRepository.autenticarUsuario(email, password);
        
        if(usuario.isEmpty()){
            return new User(email, password, "NO DEFINIDO");
        }else{
            return usuario.get();
        }
    }
    
    public boolean existeEmail(String email){
        return userRepository.existeEmail(email);
    }
}
