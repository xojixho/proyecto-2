package Retos_Ciclo4.Retos_Ciclo4.service;

import Retos_Ciclo4.Retos_Ciclo4.model.User;
import Retos_Ciclo4.Retos_Ciclo4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAll(){
        return userRepository.getAll();
    }

    public boolean existEmail(String email){
        return userRepository.existEmail(email);
    }

    public Optional<User> getUser(int id){
        return userRepository.getUser(id);
    }

    public User authenticateUser(String email, String password){
        Optional<User> usuario = userRepository.authenticateUser(email, password);

        if(usuario.isEmpty()){                                                            //Si el usuario no existe / vacio crea un objeto usuario vacio
            return new User();
        }
        else{
            return usuario.get();                                                         //Si no trae el objeto usuario que encuentre
        }
    }
    //Sacado de la tutoria del profe Cristian, gracias profe :)
    public User create(User user) {

        //obtiene el maximo id existente en la coleccion
        Optional<User> userIdMaximo = userRepository.lastUserId();

        //si el id del Usaurio que se recibe como parametro es nulo, entonces valida el maximo id existente en base de datos
        if (user.getId() == null) {
            //valida el maximo id generado, si no hay ninguno aun el primer id sera 1
            if (userIdMaximo.isEmpty())
                user.setId(1);
                //si retorna informacion suma 1 al maximo id existente y lo asigna como el codigo del usuario
            else
                user.setId(userIdMaximo.get().getId() + 1);

        }

        Optional<User> e = userRepository.getUser(user.getId());
        if (e.isEmpty()) {
            if (existEmail(user.getEmail()) == false){
                return userRepository.create(user);
            }else{
                return user;
            }
        }else{
            return user;
        }
    }

    public User update(User user){
        if(user.getId() != null){
            Optional<User> userOptional = userRepository.getUser(user.getId());
            if(!userOptional.isEmpty()){
                if(user.getIdentification() != null){
                    userOptional.get().setIdentification(user.getIdentification());
                }
                if(user.getName() != null){
                    userOptional.get().setName(user.getName());
                }
                if(user.getAddress() != null){
                    userOptional.get().setAddress(user.getAddress());
                }
                if(user.getCellPhone() != null){
                    userOptional.get().setCellPhone(user.getCellPhone());
                }
                if(user.getEmail() != null){
                    userOptional.get().setEmail(user.getEmail());
                }
                if(user.getPassword() != null){
                    userOptional.get().setPassword(user.getPassword());
                }
                if(user.getZone() != null){
                    userOptional.get().setZone(user.getZone());
                }
                if(user.getType() != null) {
                    userOptional.get().setType(user.getType());
                }

                userRepository.update(userOptional.get());
                return userOptional.get();

            } else {
                return user;
            }
        }else {
            return user;
        }
    }

    public boolean delete(int id){
        Optional<User> userOptional = userRepository.getUser(id);
        if(!userOptional.isEmpty()){
            userRepository.delete(userOptional.get());
            return true;
        }
        return false;
    }

    public List<User> getByMonthBirthtDay(String month){
        return userRepository.getByMonthBirthtDay(month);
    }
}
