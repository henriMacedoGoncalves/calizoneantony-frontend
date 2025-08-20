import { Address } from './address';
import { OrderItem } from './order-item';
import { User } from './user';

export class Order {
  orderItems!: OrderItem[];
  price!: number;
  user!: User;
  address!: Address;
}
