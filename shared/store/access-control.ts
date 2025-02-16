import { create } from 'zustand';
import { AccessControl, ACTIONS, PERMISSIONS } from '@/shared/lib/types/access-control';

const DEFAULT_ALL_DISABLE_FEATURE = {
  access: false,
  create: false,
  update: false,
  delete: false,
};

export const useAccessControlStore = create<AccessControl.Store>()(
  (set, get) => ({
    permissions: PERMISSIONS,

    hasPermission(feature, action) {
      const permissions = get().permissions;
      const featurePermissions = permissions[feature];
      return featurePermissions ? featurePermissions[action] : false;
    },

    udpatePermission(feature, action, value) {
      set(state => {
        if (!state.permissions[feature]) {
          return state;
        }

        return {
          ...state,
          permissions: {
            ...state.permissions,
            [feature]: {
              ...state.permissions[feature],
              [action]: value,
            },
          },
        };
      });
    },

    removePermission(feature, action) {
      set(state => {
        if (!state.permissions[feature]) {
          return state;
        }

        if (!action) {
          return {
            ...state,
            permissions: {
              ...state.permissions,
              [feature]: DEFAULT_ALL_DISABLE_FEATURE,
            },
          };
        }

        return {
          ...state,
          permissions: {
            ...state.permissions,
            [feature]: {
              ...state.permissions[feature],
              [action]: false,
            },
          },
        };
      });
    },

    updateFeaturePermission(feature, value) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      set(state => {
        if (!state.permissions[feature]) {
          return state;
        }

        const updatedFeaturePermissions = ACTIONS.reduce(
          (acc, action) => ({
            ...acc,
            [action]: value,
          }),
          {},
        );

        return {
          ...state,
          permissions: {
            ...state.permissions,
            [feature]: updatedFeaturePermissions,
          },
        };
      });
    },
  }),
);
