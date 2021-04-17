import { Request, Response } from "express";
import { container } from "tsyringe";

import AddImagesToCar from "./add-images-to-car";

class AddImagesToCarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const images = Object.values(request.files);

    const addImagesToCar = container.resolve(AddImagesToCar);

    const imagesNames = images.map((file: Express.Multer.File) => file.filename);

    // todo: if any errors then delete images
    const car = await addImagesToCar.execute({ carId: id, imagesNames });

    return response.status(201).json(car.images);
  }
}

export default AddImagesToCarController;
