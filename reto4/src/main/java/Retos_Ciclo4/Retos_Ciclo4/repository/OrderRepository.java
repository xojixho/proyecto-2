package Retos_Ciclo4.Retos_Ciclo4.repository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

import Retos_Ciclo4.Retos_Ciclo4.crud.InterfaceOrder;
import Retos_Ciclo4.Retos_Ciclo4.model.Order;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 * Clase Crea el repositorio OrderRepository
 * @since 11-12-2021
 * @version 1.0
 * @author Grupo 4 subgrupo 2
 */
@Repository
public class OrderRepository {
    
    @Autowired
    private InterfaceOrder interfaceOrder;
    
    @Autowired
    private MongoTemplate mongoTemplate;

    public List<Order> getAll() {
        return (List<Order>) interfaceOrder.findAll();
    }

    public Optional<Order> getOrder(int id) {
        return interfaceOrder.findById(id);
    }

    public Order create(Order order) {
        return interfaceOrder.save(order);
    }

    public void update(Order order) {
        interfaceOrder.save(order);
    }

    public void delete(Order order) {
        interfaceOrder.delete(order);
    }
    
    public Optional<Order> lastUserId(){
        return interfaceOrder.findTopByOrderByIdDesc();
    }
    
    public List<Order> findByZone(String zona) {
        return interfaceOrder.findByZone(zona);
    }
    
    //Reto 4: Ordenes de un asesor
    public List<Order> ordersSalesManByID(Integer id) {

        Query query = new Query();
        Criteria dateCriteria = Criteria.where("salesMan.id").is(id);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }
    
    //Reto 4: Ordenes de un asesor x Estado
    public List<Order> ordersSalesManByState(String state, Integer id) {

        Query query = new Query();
        Criteria dateCriteria = Criteria.where("salesMan.id").is(id)
                .and("status").is(state);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }
    
    //Reto 4: Ordenes de un asesor x Fecha
    public List<Order> ordersSalesManByDate(String dateStr, Integer id) {
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        Query query = new Query();
        Criteria dateCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(2).atStartOfDay())
                .and("salesMan.id").is(id);

        query.addCriteria(dateCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);

        return orders;
    }
    
}
