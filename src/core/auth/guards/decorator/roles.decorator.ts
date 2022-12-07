import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/usuarios/enum/user.role";

export const Roles = (...roles: UserRole[]) => SetMetadata("roles", roles);