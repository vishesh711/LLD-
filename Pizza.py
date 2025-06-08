from abc import ABC, abstractmethod

#abstract pizza component
class Pizza(ABC):
    @abstractmethod
    def get_description(self):
        pass

    @abstractmethod
    def get_cost(self):
        pass

#concrete base pizzas with size
class ThinCrustPizza(Pizza):
    def __init__(self, size):
        self.size=size
        self.baseprice=self._set_base_price()

    def _set_base_price(self):
        size_prices={"Small": 5, "Mid":7, "Large":9}
        return size_prices.get(self.size)
    
    def get_description(self):
        return f"{self.size} Thin Crust Pizza"
    
    def get_cost(self):
        return self.baseprice
    

''' .... add other bases, just change the base price map and description'''

#decorator abstract class
class PizzaDecorator(Pizza):
    def __init__(self,pizza):
        self.pizza=pizza

    def get_description(self):
        return self.pizza.get_description()

    def get_cost(self):
        return self.pizza.get_cost()     

#concrete decorators
class Cheese(PizzaDecorator):
    def get_description(self):
        return self.pizza.get_description() + ", Cheese"
    def get_cost(self):
        return self.pizza.get_cost() + 2
    
'''....add other toppings, just change the name and incremental price'''


# Step 5: Client Code (Ordering Pizza)
pizza = ThinCrustPizza("Large")  # Choose base: ThinCrustPizza or StuffedCrustPizza
pizza = Cheese(pizza)

print(f"Order: {pizza.get_description()} - Cost: ${pizza.get_cost()}")