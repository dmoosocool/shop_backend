export class UserDto {
  readonly email: string;
  readonly password: string;
}

export class UpdatePasswordDto {
  readonly password: string;
  readonly newPassword: string;
}
