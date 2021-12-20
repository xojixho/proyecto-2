package Retos_Ciclo4.Retos_Ciclo4.repository;

import Retos_Ciclo4.Retos_Ciclo4.crud.LaptopInterface;
import Retos_Ciclo4.Retos_Ciclo4.model.Laptop;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class LaptopRepository {
    @Autowired
    private LaptopInterface laptopInterface;

    public List<Laptop> getAll() {
        return laptopInterface.findAll();
    }

    public Optional<Laptop> getLaptop(int id) {
        return laptopInterface.findById(id);
    }

    public Laptop create(Laptop laptop) {
        return laptopInterface.save(laptop);
    }

    public void update(Laptop laptop) {
        laptopInterface.save(laptop);
    }

    public void delete(Laptop laptop) {
        laptopInterface.delete(laptop);
    }

    public List<Laptop> getByPrice(double price){
        return laptopInterface.findByPrice(price);
    }

    public List<Laptop> getByDescriptionContains(String description){
        return laptopInterface.findByDescriptionContainingIgnoreCase(description);
    }
}