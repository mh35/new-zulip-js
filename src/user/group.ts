import type { AxiosInstance } from 'axios'
import type { GeneralSuccessResponse } from '../api'

/**
 * API parameters of GetUserGroups API
 * @see https://zulip.com/api/get-user-groups#parameters
 */
export type GetUserGroupsParams = {
  /**
   * Whether to include deactivated user groups in the response
   * @since Zulip 10.0 (feature level 294)
   * @see https://zulip.com/api/get-user-groups#parameter-include_deactivated_groups
   */
  include_deactivated_groups?: boolean
}

export type GroupPermissionGroupObj = {
  /**
   * The list of IDs of individual users
   */
  direct_members: number[]
  /**
   * The list of IDs of the groups
   */
  direct_subgroups: []
}

export type GetUserGroupsResponseGroup = {
  /**
   * The human-readable description of the group
   */
  description: string
  /**
   * The ID of the group
   */
  id: number
  /**
   * The UNIX timestamp for when the user group was created
   * @since Zulip 10.0 (feature level 292)
   */
  date_created: number | null
  /**
   * The ID of the user who created this user group
   * @since Zulip 10.0 (feature level 292)
   */
  creator_id: number | null
  /**
   * User IDs of the user group's members
   */
  members: number[]
  /**
   * User group IDs of the direct subgroups
   * @since Zulip 6.0 (feature level 131)
   */
  direct_subgroup_ids: number[]
  /**
   * User group name
   */
  name: string
  /**
   * Whether the user group is a system group
   * @since Zulip 5.0 (feature level 93)
   */
  is_system_group: boolean
  /**
   * A group-setting value defining the set of users who have permission to add members
   * @since Zulip 10.0 (feature level 305)
   */
  can_add_members_group: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to join
   * @since Zulip 10.0 (feature level 301)
   */
  can_join_group: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to leave
   * @since Zulip 10.0 (feature level 308)
   */
  can_leave_group: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to manage
   * @since Zulip 10.0 (feature level 283)
   */
  can_manage_group: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to mention
   * @since Zulip 8.0 (feature level 191)
   */
  can_mention_group: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to remove members
   * @since Zulip 10.0 (feature level 324)
   */
  can_remove_members_group: number | GroupPermissionGroupObj
  /**
   * Whether the user group is deactivated
   * @since Zulip 10.0 (feature level 290)
   */
  deactivated: boolean
}

/**
 * The response of GetUserGroups API
 * @see https://zulip.com/api/get-user-groups#response
 */
export type GetUserGroupsResponse = GeneralSuccessResponse & {
  /**
   * User groups
   */
  user_groups: GetUserGroupsResponseGroup[]
}

/**
 * The parameters of CreateUserGroup API
 * @see https://zulip.com/api/create-user-group#parameters
 */
export type CreateUserGroupParams = {
  /**
   * User group name
   * @see https://zulip.com/api/create-user-group#parameter-name
   */
  name: string
  /**
   * The description of the user group
   * @see https://zulip.com/api/create-user-group#parameter-description
   */
  description: string
  /**
   * User IDs of the initial members
   * @see https://zulip.com/api/create-user-group#parameter-members
   */
  members: number[]
  /**
   * IDs of the initial subgroups
   * @since Zulip 10.0 (feature level 311)
   * @see https://zulip.com/api/create-user-group#parameter-subgroups
   */
  subgroups?: number[]
  /**
   * A group-setting value defining the set of users who have permission to add members
   * @since Zulip 10.0 (feature level 305)
   */
  can_add_members_group?: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to join
   * @since Zulip 10.0 (feature level 301)
   */
  can_join_group?: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to leave
   * @since Zulip 10.0 (feature level 308)
   */
  can_leave_group?: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to manage
   * @since Zulip 10.0 (feature level 283)
   */
  can_manage_group?: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to mention
   * @since Zulip 8.0 (feature level 191)
   */
  can_mention_group?: number | GroupPermissionGroupObj
  /**
   * A group-setting value defining the set of users who have permission to remove members
   * @since Zulip 10.0 (feature level 324)
   */
  can_remove_members_group?: number | GroupPermissionGroupObj
}

/**
 * The response of CreateUserGroup API
 * @see https://zulip.com/api/create-user-group#response
 */
export type CreateUserGroupResponse = GeneralSuccessResponse & {
  /**
   * Group ID
   */
  group_id: number
}

/**
 * Group permission specification of UpdateUserGroup API
 */
export type UpdateUserGroupUpdatePermissionObj = {
  /**
   * New permission target
   */
  new: number | GroupPermissionGroupObj
  /**
   * Expected old permission target
   */
  old?: number | GroupPermissionGroupObj
}

/**
 * Update name parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateNameParams = {
  /**
   * New group name
   * @see https://zulip.com/api/update-user-group#parameter-name
   */
  name: string
}

/**
 * Update description parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateDescriptionParams = {
  /**
   * New group description
   * @see https://zulip.com/api/update-user-group#parameter-description
   */
  description: string
}

/**
 * Update add members permission parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateCanAddMembersParams = {
  /**
   * A group-setting value defining the set of users who have permission to add members
   * @since Zulip 10.0 (feature level 305)
   * @see https://zulip.com/api/update-user-group#parameter-can_add_members_group
   */
  can_add_members_group: UpdateUserGroupUpdatePermissionObj
}

/**
 * Update join permission parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateCanJoinParams = {
  /**
   * A group-setting value defining the set of users who have permission to join
   * @since Zulip 10.0 (feature level 301)
   * @see https://zulip.com/api/update-user-group#parameter-can_join_group
   */
  can_join_group: UpdateUserGroupUpdatePermissionObj
}

/**
 * Update leave permission parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateCanLeaveParams = {
  /**
   * A group-setting value defining the set of users who have permission to leave
   * @since Zulip 10.0 (feature level 308)
   * @see https://zulip.com/api/update-user-group#parameter-can_leave_group
   */
  can_leave_group: UpdateUserGroupUpdatePermissionObj
}

/**
 * Update manage permission parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateCanManageParams = {
  /**
   * A group-setting value defining the set of users who have permission to manage
   * @since Zulip 10.0 (feature level 283)
   * @see https://zulip.com/api/update-user-group#parameter-can_manage_group
   */
  can_manage_group: UpdateUserGroupUpdatePermissionObj
}

/**
 * Update mention permission parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateCanMentionParams = {
  /**
   * A group-setting value defining the set of users who have permission to mention
   * @since Zulip 8.0 (feature level 191)
   * @see https://zulip.com/api/update-user-group#parameter-can_mention_group
   */
  can_mention_group: UpdateUserGroupUpdatePermissionObj
}

/**
 * Update remove members permission parameters for UpdateUserGroup API
 */
type UpdateUserGroupUpdateCanRemoveMembersParams = {
  /**
   * A group-setting value defining the set of users who have permission to remove members
   * @since Zulip 10.0 (feature level 324)
   * @see https://zulip.com/api/update-user-group#parameter-can_remove_members_group
   */
  can_remove_members_group: UpdateUserGroupUpdatePermissionObj
}

/**
 * Reactivate group parameters for UpdateUserGroup API
 */
type UpdateUserGroupReactivateParams = {
  /**
   * Group deactivation status.
   *
   * If you want to deactivate group, use DeactivateUserGroup API instead
   * @since Zulip 11.0 (feature level 386)
   * @see https://zulip.com/api/update-user-group#parameter-deactivated
   */
  deactivated: false
}

/**
 * Parameters for UpdateUserGroup API
 * @see https://zulip.com/api/update-user-group#parameters
 */
export type UpdateUserGroupParams =
  | UpdateUserGroupUpdateNameParams
  | UpdateUserGroupUpdateDescriptionParams
  | UpdateUserGroupUpdateCanAddMembersParams
  | UpdateUserGroupUpdateCanJoinParams
  | UpdateUserGroupUpdateCanLeaveParams
  | UpdateUserGroupUpdateCanManageParams
  | UpdateUserGroupUpdateCanMentionParams
  | UpdateUserGroupUpdateCanRemoveMembersParams
  | UpdateUserGroupReactivateParams

/**
 * Delete user parameters for UpdateGroupMembers API
 */
type UpdateGroupMembersDeleteUserParams = {
  /**
   * User IDs to delete from the target group
   * @see https://zulip.com/api/update-user-group-members#parameter-delete
   */
  delete: number[]
}

/**
 * Add user parameters for UpdateGroupMembers API
 */
type UpdateGroupMemberAddUserParams = {
  /**
   * User IDs to add to the target group
   * @see https://zulip.com/api/update-user-group-members#parameter-add
   */
  add: number[]
}

/**
 * Delete subgroup parameters for UpdateGroupMembers API
 */
type UpdateUserGroupMemberDeleteSubgroupParams = {
  /**
   * Subgroup IDs to remove from the target group
   * @since Zulip 10.0 (feature level 311)
   * @see https://zulip.com/api/update-user-group-members#parameter-delete_subgroups
   */
  delete_subgroups: number[]
}

/**
 * Add subgroup parameters for UpdateGroupMembers API
 */
type UpdateUserGroupMemberAddSubgroupMarams = {
  /**
   * Subgroup IDs to add to the target group
   * @since Zulip 10.0 (feature level 311)
   * @see https://zulip.com/api/update-user-group-members#parameter-add_subgroups
   */
  add_subgroups: number[]
}

/**
 * Parameters for UpdateGroupMembers API
 * @see https://zulip.com/api/update-user-group-members#parameters
 */
export type UpdateGroupMemberParams =
  | UpdateGroupMembersDeleteUserParams
  | UpdateGroupMemberAddUserParams
  | UpdateUserGroupMemberDeleteSubgroupParams
  | UpdateUserGroupMemberAddSubgroupMarams

/**
 * Parameters to remove subgroups from the group for UpdateUserGroupSubgroups API
 */
type UpdateUserGroupSubgroupsDeleteParams = {
  /**
   * Subgroup IDs to remove
   * @see https://zulip.com/api/update-user-group-subgroups#parameter-delete
   */
  delete: number[]
}

/**
 * Parameters to add subgroups to the group for UpdateUserGroupSubgroups API
 */
type UpdateUserGroupSubgroupsAddParams = {
  /**
   * Subgroup IDs to add
   * @see https://zulip.com/api/update-user-group-subgroups#parameter-add
   */
  add: number[]
}

/**
 * Parameters for UpdateUserGroupSubgroups API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/update-user-group-subgroups#parameters
 */
export type UpdateUserGroupSubgroupsParams =
  | UpdateUserGroupSubgroupsDeleteParams
  | UpdateUserGroupSubgroupsAddParams

/**
 * Parameters for CheckUserGroupMembershipStatus API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-is-user-group-member#parameters
 */
export type CheckUserGroupMembershipStatusParams = {
  /**
   * Whether to consider only the direct members or not. Default is false
   * @see https://zulip.com/api/get-is-user-group-member#parameter-direct_member_only
   */
  direct_member_only?: boolean
}

/**
 * The response of CheckUserGroupMembershipStatus API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-is-user-group-member#response
 */
export type CheckUserGroupMembershipStatusResponse = GeneralSuccessResponse & {
  /**
   * Whether the user is the member of the group or not
   */
  is_user_group_member: boolean
}

/**
 * Parameters for GetUserGroupMembers API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-user-group-members#parameters
 */
export type GetUserGroupMembersParams = {
  /**
   * Whether to consider only the direct members or not. Default is false
   * @see https://zulip.com/api/get-user-group-members#parameter-direct_member_only
   */
  direct_member_only?: boolean
}

/**
 * The response of GetUserGroupMembers API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-user-group-members#response
 */
export type GetUserGroupMembersResponse = GeneralSuccessResponse & {
  /**
   * User IDs of the group
   */
  members: number[]
}

/**
 * Parameters for GetUserGroupSubgroups API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-user-group-subgroups#parameters
 */
export type GetUserGroupSubgroupsParams = {
  /**
   * Whether to consider only the direct subgroup or not. Default is false
   * @see https://zulip.com/api/get-user-group-subgroups#parameter-direct_subgroup_only
   */
  direct_subgroup_only?: boolean
}

/**
 * The response of GetUserGroupSubgroups API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-user-group-subgroups#response
 */
export type GetUserGroupSubgroupsResponse = GeneralSuccessResponse & {
  /**
   * IDs of subgroups
   */
  subgroups: number[]
}

/**
 * Get user groups
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of GetUserGroups API
 * @see https://zulip.com/api/get-user-groups
 */
export async function getUserGroups(
  client: AxiosInstance,
  params: GetUserGroupsParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      sendParams[key] = JSON.stringify(value)
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      sendParams[key] = String(value)
    } else {
      // Other values (strings, numbers)
      sendParams[key] = String(value)
    }
  }

  const resp = await client.get<GetUserGroupsResponse>('/user_groups', {
    params: sendParams,
  })

  return resp.data
}

/**
 * Create a user group
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of CreateUserGroup API
 * @see https://zulip.com/api/create-user-group
 */
export async function createUserGroup(
  client: AxiosInstance,
  params: CreateUserGroupParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.post<CreateUserGroupResponse>(
    '/user_groups/create',
    body,
  )
  return resp.data
}

/**
 * Update a user group
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @param params API parameters
 * @returns The response of UpdateUserGroup API
 * @see https://zulip.com/api/update-user-group
 */
export async function updateUserGroup(
  client: AxiosInstance,
  groupId: number,
  params: UpdateUserGroupParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value) || typeof value === 'object') {
      body.append(key, JSON.stringify(value))
    } else {
      body.append(key, String(value))
    }
  }

  const resp = await client.patch<GeneralSuccessResponse>(
    `/user_groups/${groupId}`,
    body,
  )

  return resp.data
}

/**
 * Deactivate a user group
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @returns The response of DeactivateUserGroup API
 * @since Zulip 10.0 (feature level 290)
 * @see https://zulip.com/api/deactivate-user-group
 */
export async function deactivateUserGroup(
  client: AxiosInstance,
  groupId: number,
) {
  const body = new URLSearchParams()

  const resp = await client.post<GeneralSuccessResponse>(
    `/user_groups/${groupId}/deactivate`,
    body,
  )

  return resp.data
}

/**
 * Update user group members
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @param params API parameters
 * @returns The response of UpdateUserGroupMembers API
 * @see https://zulip.com/api/update-user-group-members
 */
export async function updateUserGroupMembers(
  client: AxiosInstance,
  groupId: number,
  params: UpdateGroupMemberParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    body.append(key, JSON.stringify(value))
  }
  const resp = await client.post<GeneralSuccessResponse>(
    `/user_groups/${groupId}/members`,
    body,
  )

  return resp.data
}

/**
 * Update subgroups of the group
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @param params API parameters
 * @returns The response of UpdateUserGroupSubgroups API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/update-user-group-subgroups
 */
export async function updateUserGroupSubgroups(
  client: AxiosInstance,
  groupId: number,
  params: UpdateUserGroupSubgroupsParams,
) {
  const body = new URLSearchParams()
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }
    body.append(key, JSON.stringify(value))
  }
  const resp = await client.post<GeneralSuccessResponse>(
    `/user_groups/${groupId}/subgroups`,
    body,
  )

  return resp.data
}

/**
 * Check whether the user is the member of the user group or not
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @param userId User ID
 * @param params API parameters
 * @returns The response of CheckUserGroupMembershipStatus API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-is-user-group-member
 */
export async function checkUserGroupMembershipStatus(
  client: AxiosInstance,
  groupId: number,
  userId: number,
  params: CheckUserGroupMembershipStatusParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      sendParams[key] = JSON.stringify(value)
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      sendParams[key] = String(value)
    } else {
      // Other values (strings, numbers)
      sendParams[key] = String(value)
    }
  }

  const resp = await client.get<CheckUserGroupMembershipStatusResponse>(
    `/user_groups/${groupId}/members/${userId}`,
    {
      params: sendParams,
    },
  )

  return resp.data
}

/**
 * Get the members of the user group
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @param params API parameters
 * @returns The response of GetUserGroupMembers API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-user-group-members
 */
export async function getUserGroupMembers(
  client: AxiosInstance,
  groupId: number,
  params: GetUserGroupMembersParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      sendParams[key] = JSON.stringify(value)
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      sendParams[key] = String(value)
    } else {
      // Other values (strings, numbers)
      sendParams[key] = String(value)
    }
  }

  const resp = await client.get<GetUserGroupMembersResponse>(
    `/user_groups/${groupId}/members`,
    {
      params: sendParams,
    },
  )

  return resp.data
}

/**
 * Get subgroups of the group
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param groupId User group ID
 * @param params API parameters
 * @returns The response of GetUserGroupSubgroups API
 * @since Zulip 6.0 (feature level 127)
 * @see https://zulip.com/api/get-user-group-subgroups
 */
export async function getUserGroupSubgroups(
  client: AxiosInstance,
  groupId: number,
  params: GetUserGroupSubgroupsParams = {},
) {
  const sendParams = {} as Record<string, string>
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) {
      continue
    }

    if (Array.isArray(value)) {
      // Encode arrays as JSON strings
      sendParams[key] = JSON.stringify(value)
    } else if (typeof value === 'boolean') {
      // Encode booleans as strings
      sendParams[key] = String(value)
    } else {
      // Other values (strings, numbers)
      sendParams[key] = String(value)
    }
  }

  const resp = await client.get<GetUserGroupSubgroupsResponse>(
    `/user_groups/${groupId}/subgroups`,
    {
      params: sendParams,
    },
  )

  return resp.data
}
