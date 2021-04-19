import Rental from "@modules/rentals/externals/typeorm/entities/rental";

// interface CreateRentalDTO {
//   userId: string;
//   carId: string;
//   pickUpDate: Date;
//   expectDropOffDate: Date;
// }

type CreateRentalDTO = Pick<
  Rental,
  "userId" | "carId" | "pickUpDate" | "expectedDropOffDate"
>;

export default CreateRentalDTO;
