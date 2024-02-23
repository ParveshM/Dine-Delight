export default function userEntity(
  name: string,
  email: string,
  password: string
) {
  return {
    name: (): string => name,
    getEmail: (): string => email,
    getPassword: (): string => password,
  };
}
export type userEntityType = ReturnType<typeof userEntity>;
