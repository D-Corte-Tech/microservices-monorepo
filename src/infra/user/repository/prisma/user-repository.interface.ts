import type { RepositoryInterface } from "../../../../domain/@shared/repository/repository-interface";
import type { User } from "../../../../domain/user/entity/user";

export interface UserRepositoryInterface extends RepositoryInterface<User> {}
