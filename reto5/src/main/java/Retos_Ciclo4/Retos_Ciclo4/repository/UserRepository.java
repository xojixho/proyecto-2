package Retos_Ciclo4.Retos_Ciclo4.repository;

import Retos_Ciclo4.Retos_Ciclo4.crud.UserInterface;
import Retos_Ciclo4.Retos_Ciclo4.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * 
 * @author grupo desarrollo
 */
@Repository
public class UserRepository {
    @Autowired
    private UserInterface userInterface;
    
    /**
     * servicio listar todos los usuarios
     * @return lista
     */
    public List<User> getAll() {
        return userInterface.findAll();
    }

    /**
     * servicio buscar usuario por id
     * @param id
     * @return usuario
     */
    public Optional<User> getUser(int id) {                                              //Buscar por ID para el metodo DELETE
        return userInterface.findById(id);
    }

    /**
     * servicio ultimo usuario
     * @return usuario
     */
    public Optional<User> lastUserId(){
        return userInterface.findTopByOrderByIdDesc();
    }

    /**
     * servicio validar email
     * @param email
     * @return boolean
     */
    public boolean existEmail(String email){
        Optional<User> usuario = userInterface.findByEmail(email);

        return !usuario.isEmpty();
    }

    /**
     * servicio autenticar credenciales usuario
     * @param email
     * @param password
     * @return usuario
     */
    public Optional<User> authenticateUser(String email, String password){
        return userInterface.findByEmailAndPassword(email, password);
    }

    /**
     * servicio crear usuario
     * @param user
     * @return usuario
     */
    public User create(User user){
        return userInterface.save(user);
    }

    /**
     * servicio actualizar usuario
     * @param user 
     */
    public void update(User user){
        userInterface.save(user);
    }

    /**
     * servicio eliminar usuario
     * @param user 
     */
    public void delete(User user){
        userInterface.delete(user);
    }

    /**
     * servicio servivio listar usuarios por fecha 
     * @param month
     * @return 
     */
    public List<User> getByMonthBirthtDay(String month){
        return userInterface.findByMonthBirthtDay(month);
    }
}