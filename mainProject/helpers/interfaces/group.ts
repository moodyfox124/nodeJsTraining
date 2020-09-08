import { Permission } from "../types/permissions";

interface IGroup {
  id: string;
  name: string;
  permissions: Array<Permission>;
}
