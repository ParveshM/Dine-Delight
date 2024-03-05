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

export function googleSignInUserEntity(
  name: string,
  email: string,
  picture: string,
  email_verified: boolean
) {
  return {
    name: (): string => name,
    email: (): string => email,
    picture: (): string => picture,
    email_verified: (): boolean => email_verified,
  };
}
export type googleSignInUserEntityType = ReturnType<
  typeof googleSignInUserEntity
>;
