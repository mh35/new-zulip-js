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
  group_id: number
}

export type UpdateUserGroupUpdatePermissionObj = {
  new: number | GroupPermissionGroupObj
  old?: number | GroupPermissionGroupObj
}

type UpdateUserGroupUpdateNameParams = {
  name: string
}

type UpdateUserGroupUpdateDescriptionParams = {
  description: string
}

type UpdateUserGroupUpdateCanAddMembersParams = {
  can_add_members_group: UpdateUserGroupUpdatePermissionObj
}

type UpdateUserGroupUpdateCanJoinParams = {
  can_join_group: UpdateUserGroupUpdatePermissionObj
}

type UpdateUserGroupUpdateCanLeaveParams = {
  can_leave_group: UpdateUserGroupUpdatePermissionObj
}

type UpdateUserGroupUpdateCanManageParams = {
  can_manage_group: UpdateUserGroupUpdatePermissionObj
}

type UpdateUserGroupUpdateCanMentionParams = {
  can_mention_group: UpdateUserGroupUpdatePermissionObj
}

type UpdateUserGroupUpdateCanRemoveMembersParams = {
  can_remove_members_group: UpdateUserGroupUpdatePermissionObj
}

type UpdateUserGroupReactivateParams = {
  deactivated: false
}

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
 * Get user groups
 * @param client Axios client initialized by generateCallApi function in api.ts
 * @param params API parameters
 * @returns The response of GetUserGroups API
 * @see https://zulip.com/api/get-user-groups
 */
export async function getUserGroups(
  client: AxiosInstance,
  params: GetUserGroupsParams,
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
