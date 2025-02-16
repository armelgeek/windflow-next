export const PERMISSIONS: AccessControl.Permissions = {
  profile: { access: true, create: false, delete: false, update: false },
};

export const ACTIONS = ['access', 'create', 'update', 'delete'] as const;

export const FEATURES = [
  'profile',
] as const;
// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace AccessControl {
  type Feature = (typeof FEATURES)[number];
  type ActionType = (typeof ACTIONS)[number];
  export type Permission = Record<ActionType, boolean>;

  export type Permissions = Record<Feature, Permission>;

  export type State = {
    permissions: Permissions;
  };

  export type Action = {
    removePermission(feature: Feature, action?: ActionType): void;
    hasPermission: (feature: Feature, action: ActionType) => boolean;
    udpatePermission(
      feature: Feature,
      action: ActionType,
      value: boolean,
    ): void;
    updateFeaturePermission(feature: Feature, value: boolean): void;
  };

  export type Store = State & Action;
}
