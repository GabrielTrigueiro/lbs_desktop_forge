export type TRole =
  | "ROLE_COURSES"
  | "ROLE_INDICATIONS"
  | "ROLE_SELLER"
  | "ROLE_CRUD_COURSES"
  | "ROLE_CRUD_INDICATIONS"
  | "ROLE_CRUD_SELLER"
  | "ROLE_ADMIN";

export function verifyRole(
  userRoles: String[] | undefined,
  allowedRoles: TRole[]
): boolean {
  if (!userRoles) {
    return false;
  }

  const hasAdmin = userRoles.includes("ROLE_ADMIN");

  if (hasAdmin) {
    return true;
  }

  return allowedRoles.some((role) => userRoles.includes(role));
}
