import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

import Car from "./car";

@Entity("car_images")
class CarImage {
  @PrimaryColumn()
  id: string;

  @ManyToOne(() => Car, (car) => car.images)
  @JoinColumn({ name: "car_id" })
  carId: string;

  @Column()
  imageName: string;

  @CreateDateColumn()
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.createdAt = new Date();
    }
  }
}

export default CarImage;
