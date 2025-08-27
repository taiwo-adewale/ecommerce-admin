import { useUser, UserRole } from "@/contexts/UserContext";

const permissions = {
  orders: {
    canChangeStatus: ["super_admin", "admin", "cashier"],
    canPrint: ["super_admin", "admin", "cashier"],
  },
  categories: {
    canCreate: ["super_admin", "admin"],
    canDelete: ["super_admin", "admin"],
    canEdit: ["super_admin", "admin"],
    canTogglePublished: ["super_admin", "admin"],
  },
  coupons: {
    canCreate: ["super_admin", "admin"],
    canDelete: ["super_admin", "admin"],
    canEdit: ["super_admin", "admin"],
    canTogglePublished: ["super_admin", "admin"],
  },
  customers: {
    canDelete: ["super_admin"],
    canEdit: ["super_admin", "admin"],
  },
  products: {
    canCreate: ["super_admin", "admin"],
    canDelete: ["super_admin", "admin"],
    canEdit: ["super_admin", "admin"],
    canTogglePublished: ["super_admin", "admin"],
  },
  staff: {
    canDelete: ["super_admin"],
    canEdit: ["super_admin"],
    canTogglePublished: ["super_admin"],
  },
} as const;

type PermissionMap = typeof permissions;
type Feature = keyof PermissionMap;

export function useAuthorization() {
  const { user, profile, isLoading } = useUser();

  const hasPermission = <F extends Feature>(
    feature: F,
    action: keyof PermissionMap[F]
  ): boolean => {
    if (isLoading || !profile || !profile.role) return false;

    const allowedRoles = permissions[feature][action];
    return (allowedRoles as UserRole[]).includes(profile.role);
  };

  const isSelf = (staffId: string) => {
    return user?.id === staffId;
  };

  return { hasPermission, isSelf, isLoading };
}

export type HasPermission = ReturnType<
  typeof useAuthorization
>["hasPermission"];
export type IsSelf = ReturnType<typeof useAuthorization>["isSelf"];
