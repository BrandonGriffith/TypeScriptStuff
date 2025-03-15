import { createInterface } from "node:readline";
import process from "node:process";

type Pizza = { name: string; price: number };
type Order = {
  id: number;
  name: string;
  price: number;
  status: "ordered" | "completed";
};

const menu: Pizza[] = [
  { name: "cheese", price: 5 },
  { name: "pepperoni", price: 6 },
  { name: "meatlovers", price: 7 },
];

let cashInRegister: number = 0;
const orderQueue: Order[] = [];
let orderID: number = 1;

const addNewPizzaToMenu = (name: string, price: number): void => {
  menu.push({ name, price });
};

addNewPizzaToMenu("leet", 1337);

const placeOrder = (pizza: Pizza): void => {
  orderQueue.push({ id: orderID++, ...pizza, status: "ordered" });
  console.log(`Order for ${pizza.name} placed in queue.`);
  console.log(`Cash in register: $${cashInRegister}`);
  completeOrder(orderID - 1);
};

const completeOrder = (id: number): void => {
  const order: Order | undefined = orderQueue.find((o) => o.id === id);
  if (order) {
    order.status = "completed";
    console.log(`Order ${id} completed`);
  } else {
    console.log("Order not found");
  }
};

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const promptUser = (): void => {
  rl.question(
    "Enter the name of the pizza to order (or type exit to quit): ",
    (answer: string) => {
      if (answer.toLowerCase() === "exit") {
        console.log("Exiting...");
        rl.close();
      } else {
        const pizzaItem: Pizza | undefined = menu.find((p) =>
          p.name === answer.toLowerCase()
        );
        if (pizzaItem) {
          cashInRegister += pizzaItem.price;
          placeOrder(pizzaItem);
          console.log(orderQueue);
        } else {
          console.log("Error: Pizza not found in menu.");
        }
        promptUser();
      }
    },
  );
};

setTimeout(() => {
  promptUser();
}, 1000);
