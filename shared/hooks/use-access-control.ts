import { AccessControl } from '@/shared/lib/types/access-control';
import { useAccessControlStore } from '@/shared/store/access-control';

const dataSelector = (store: AccessControl.Store) => store.permissions;

const selector = (store: AccessControl.Store) => ({
  hasPermission: store.hasPermission,
  udpatePermission: store.udpatePermission,
  removePermission: store.removePermission,
  updateFeaturePermission: store.updateFeaturePermission,
});
const profileSelector = (store: AccessControl.Store) =>
  store.permissions.profile;

export function useAccessControl() {
  return useAccessControlStore(selector);
}

export function useAccessControlData() {
  return useAccessControlStore(dataSelector);
}
export function useProfileAccess() {
  return useAccessControlStore(profileSelector);
}
