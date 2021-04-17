import Specification from "@modules/cars/externals/typeorm/entities/specification";

interface CreateCarData {
  id?: string;
  name: string;
  description: string;
  dailyRate: number;
  licensePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
  specifications?: Specification[];
}

export default CreateCarData;
