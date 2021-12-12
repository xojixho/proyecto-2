package Retos_Ciclo4.Retos_Ciclo4.crud;

import Retos_Ciclo4.Retos_Ciclo4.model.Laptop;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface LaptopInterface extends MongoRepository <Laptop, Integer> {
    public List<Laptop> findByPriceLeesThanEqual(double precio);
}
