package Retos_Ciclo4.Retos_Ciclo4.repository;

import Retos_Ciclo4.Retos_Ciclo4.crud.OrderInterface;
import Retos_Ciclo4.Retos_Ciclo4.model.Order;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

/**
 *
 * @author grupo desarrollo
 */
@Repository
public class OrderRepository {
    
    @Autowired
    private OrderInterface orderInterface;
    
    @Autowired
    private MongoTemplate mongoTemplate;
    
    public List<Order> getAll(){
        return (List<Order>) orderInterface.findAll();
    }
    
    public Optional<Order> getOrder(int id){
        return orderInterface.findById(id);
    }
    
    public Order create(Order order){
        return orderInterface.save(order);
    }
    
    public void update(Order order){
        orderInterface.save(order);
    }
    
    public void delete(Order order){
        orderInterface.delete(order);
    }
    
    public List<Order> findByZone(String zona){
        return orderInterface.findByZone(zona);
    }
    
    public List<Order> ordersSalesManByDate(String dateStr, Integer id){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        Query query = new Query();
        Criteria dataCriteria = Criteria.where("registerDay")
                .gte(LocalDate.parse(dateStr, dtf).minusDays(1).atStartOfDay())
                .lt(LocalDate.parse(dateStr, dtf).plusDays(2).atStartOfDay())
                .and("salseMan.id").is(id);
        
        query.addCriteria(dataCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        
        return orders;
        
    }
    
    public List<Order> ordersSalesManByState(String state, Integer id){
        Query query = new Query();
        Criteria dataCriteria = Criteria.where("salesMan.id").is(id)
                .and("status").is(state);
        
        query.addCriteria(dataCriteria);
        List<Order> orders = mongoTemplate.find(query, Order.class);
        return orders;
    }
    
}
