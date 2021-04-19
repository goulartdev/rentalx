**Functional Requeriments (FR)**
**Non-Functional Requeriments (NFR)**
**Business Rules(BR)**

# Cars register
**FR**
[X] Should be possible to register new cars.

**BR**
[X] Should not be possible to register two cars with the same license plate.
[X] A new car should be registered as "available" by default.
[X] Should not be possible to a non-admin users to create or edit cars.

# Car update
**BR**
[ ] Should not be possible to change the license plate of an already registered car.

# Cars listing
**FR**
[X] Should be possible to list all available cars.
[X] Should be possible to filter all avaliable cars by category.
[X] Should be possible to filter all avaliable cars by brand.
[X] Should be possible to filter all avaliable cars by name.

**BR**
[X] Should be possible for a user to list all available cars without having to log in.

# Cars Specifications register
**FR**
[X] Should be possible to register a new specification for a car.

**BR**
[X] Should not be possible to register a specification for a non-existing car.
[X] Should not be possible to register the same specification for a car twice.
[X] Should not be possible to a non-admin users to create or edit cars.

# Cars images
**FR**
[X] Should be possible to add images to a car.

**NFR**
[X] Multer should be used to images upload.

**RN**
[X] Should be possible to add more than one image to the same car.
[X] Should not be possible to a non-admin users to add or remove cars.

# Cars rent
**FR**
[X] Should be possible to schedule the rental.

**BR**
[X] Should not be possible to rent for less than 24 hour.
[X] Should not be possible for a user to schedule two rentals for the same date.
[X] Should not be possible to schedule a rental for a car in the same date twice.
