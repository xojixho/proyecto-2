package Retos_Ciclo4.Retos_Ciclo4.controller;

import Retos_Ciclo4.Retos_Ciclo4.model.Order;
import Retos_Ciclo4.Retos_Ciclo4.service.OrderService;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author grupo desarrollo
 */
@RestController
@RequestMapping("/api/order")
@CrossOrigin("*")
public class OrderController {
    
    @Autowired
    private OrderService OrderService;
    
    @GetMapping("/all")
    public List<Order> getAll() {
        return OrderService.getAll();
    }
    
    @GetMapping("/{id}")
    public Optional<Order> getOrder(@PathVariable("id") int id) {
        return OrderService.getOrder(id);
    }
    
    @PostMapping("/new")
    @ResponseStatus(HttpStatus.CREATED)
    public Order create(@RequestBody Order input) {
        return OrderService.create(input);
    }
    
    @PutMapping("/update")
    @ResponseStatus(HttpStatus.CREATED)
    public Order update(@RequestBody Order input) {
        return OrderService.update(input);
    }
    
    
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public boolean delete(@PathVariable("id") int id) {
        return OrderService.delete(id);
    }
    
    /**
     * R3 - Metodo para listar ordenes de compra de los asesores de zona
     * @param zona
     * @return lista ordenes de compra por zona
     */
    @GetMapping("/zona/{zona}")
    public List<Order> findByZone(@PathVariable("zona") String zona){
        return OrderService.findByZone(zona);
    }
    
    /**
     * 
     * @param date
     * @param id
     * @return Ordenes de un asesor por fecha
     */
    @GetMapping("/date/{date}/{id}")
    public List<Order> ordersSalesManByDate(@PathVariable("date") String date, @PathVariable("id") int id){
        return OrderService.orderSalesManByDate(date, id);
    }
    
    /**
     * 
     * @param state
     * @param id
     * @return Ordenes de un asesor por estado
     */
    @GetMapping("/state/{state}/{id}")
    public List<Order> ordersSalesManByState(@PathVariable("state") String state, @PathVariable("id") int id ){
        return OrderService.ordersSalesManByState(state, id);
    }
    
}
