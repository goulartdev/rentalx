import User from "../externals/typeorm/entities/user";

interface UserProfileDTO {
  id: string;
  name: string;
  email: string;
  avatar: string;
  driverLicense: string;
}

class UserMap {
  static toDTO(user: User, avatarUrl: string): UserProfileDTO {
    const { id, name, email, driverLicense } = user;

    return {
      id,
      name,
      email,
      avatar: avatarUrl,
      driverLicense,
    };
  }
}

export { UserProfileDTO };
export default UserMap;
