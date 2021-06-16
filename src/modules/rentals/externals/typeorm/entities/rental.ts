import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import User from "@modules/accounts/externals/typeorm/entities/user";
import Car from "@modules/cars/externals/typeorm/entities/car";

@Entity("rentals")
class Rental {
  @PrimaryColumn()
  id: string;

  @Column()
  carId: string;

  @ManyToOne(() => Car)
  @JoinColumn({ name: "car_id" })
  car: Car;

  @Column()
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  pickUpDate: Date;

  @CreateDateColumn()
  expectedDropOffDate: Date;

  @CreateDateColumn()
  dropOffDate: Date;

  @Column()
  contractedDailyRate: number;

  @Column()
  contractedFineAmount: number;

  @Column()
  total: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  constructor() {
    this.id = uuidV4();
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.total = 0;
  }
}

export default Rental;
