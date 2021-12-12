package Retos_Ciclo4.Retos_Ciclo4.service;

import Retos_Ciclo4.Retos_Ciclo4.model.Order;
import Retos_Ciclo4.Retos_Ciclo4.repository.OrderRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author grupo desarrollo
 */
@Service
public class OrderService {
    @Autowired
    private OrderRepository orderRepository;
    
    public List<Order> getAll(){
        return orderRepository.getAll();
    }
    
    public Optional<Order> getOrder(int id){
        return orderRepository.getOrder(id);
    }
    
    public Order create(Order order){
        if(order.getId() == null){
            return order;
        }else{
            return orderRepository.create(order);
        }
    }
    
    public Order update(Order order){
        if(order.getId() != null){
            Optional<Order> orderDb = orderRepository.getOrder(order.getId());
            if(!orderDb.isEmpty()){
                if(order.getStatus() != null){
                    orderDb.get().setStatus(order.getStatus());
                }
                orderRepository.update(orderDb.get());
                return orderDb.get();
            } else{
                return order;
            }
        }else{
            return order;
        }
    }
    
    public boolean delete(int id){
        Boolean aBoolean = getOrder(id).map(order ->{
            orderRepository.delete(order);
            return true;
        }).orElse(false);
        return aBoolean;
    }
    
    public List<Order> findByZone(String zone){
        return orderRepository.findByZone(zone);
    }
    
    public List<Order> orderSalesManByDate(String dateStr, int id){
        return orderRepository.ordersSalesManByDate(dateStr, id);
    }
    
    public List<Order> ordersSalesManByState(String state, Integer id){
        return orderRepository.ordersSalesManByState(state, id);
    }
}
