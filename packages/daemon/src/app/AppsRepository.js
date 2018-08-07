// @flow

// eslint-disable-next-line import/named
import { validateManifest, type ManifestData } from '@mainframe/app-manifest'
import {
  getRequirementsDifference,
  type PermissionKey, // eslint-disable-line import/named
  type PermissionGrant, // eslint-disable-line import/named
} from '@mainframe/app-permissions'
import type { MainframeID } from '@mainframe/data-types'
// eslint-disable-next-line import/named
import { uniqueID, idType, type ID } from '@mainframe/utils-id'

import { mapObject } from '../utils'

import App, {
  type AppSerialized,
  type AppUserSettings,
  type SessionData,
} from './App'
import OwnApp, { type OwnAppSerialized } from './OwnApp'

export type AppUpdate = {
  app: App,
  hasRequiredPermissionsChanges: boolean,
}

export type AppUpdateSerialized = {
  app: AppSerialized,
  hasRequiredPermissionsChanges: boolean,
}

type Apps = { [id: string]: App }
type AppUpdates = { [id: string]: AppUpdate }
type OwnApps = { [id: string]: OwnApp }

const appsToJSON = mapObject(App.toJSON)
const appsFromJSON = mapObject(App.fromJSON)

const updatesToJSON = mapObject((update: AppUpdate) => ({
  app: App.toJSON(update.app),
  hasRequiredPermissionsChanges: update.hasRequiredPermissionsChanges,
}))
const updatesFromJSON = mapObject((serialized: AppUpdateSerialized) => ({
  app: App.fromJSON(serialized.app),
  hasRequiredPermissionsChanges: serialized.hasRequiredPermissionsChanges,
}))

const ownAppsToJSON = mapObject(OwnApp.toJSON)
const ownAppsFromJSON = mapObject(OwnApp.fromJSON)

export type AppsRepositoryParams = {
  apps?: Apps,
  updates?: AppUpdates,
  ownApps?: OwnApps,
}

export type AppsRepositorySerialized = {
  apps: { [string]: AppSerialized },
  updates: { [string]: AppUpdateSerialized },
  ownApps: { [string]: OwnAppSerialized },
}

export default class AppsRepository {
  static fromJSON = (serialized: AppsRepositorySerialized): AppsRepository => {
    return new AppsRepository({
      // $FlowFixMe: mapping type
      apps: appsFromJSON(serialized.apps),
      // $FlowFixMe: mapping type
      updates: updatesFromJSON(serialized.updates),
      // $FlowFixMe: mapping type
      ownApps: ownAppsFromJSON(serialized.ownApps),
    })
  }

  static toJSON = (registry: AppsRepository): AppsRepositorySerialized => ({
    // $FlowFixMe: mapping type
    apps: appsToJSON(registry.apps),
    // $FlowFixMe: mapping type
    updates: updatesToJSON(registry.updates),
    // $FlowFixMe: mapping type
    ownApps: ownAppsToJSON(registry.ownApps),
  })

  _apps: Apps
  _byMainframeID: { [mainframeID: string]: ID }
  _updates: AppUpdates
  _ownApps: OwnApps

  constructor(params: AppsRepositoryParams = {}) {
    this._apps = params.apps || {}
    this._byMainframeID = Object.keys(this._apps).reduce((acc, appID) => {
      const id = idType(appID)
      acc[(this._apps[id].manifest.id: string)] = id
      return acc
    }, {})
    this._updates = params.updates || {}
    this._ownApps = params.ownApps || {}
  }

  get apps(): Apps {
    return this._apps
  }

  get updates(): AppUpdates {
    return this._updates
  }

  get ownApps(): OwnApps {
    return this._ownApps
  }

  getByID(id: ID): ?App {
    return this._apps[id]
  }

  getByMainframeID(mainframeID: MainframeID): ?App {
    const id = this._byMainframeID[mainframeID]
    if (id != null) {
      return this._apps[id]
    }
  }

  getID(mainframeID: MainframeID): ?ID {
    return this._byMainframeID[mainframeID]
  }

  add(manifest: ManifestData, userID: ID, settings: AppUserSettings): App {
    if (validateManifest(manifest) === 'valid') {
      throw new Error('Invalid manifest')
    }

    const appID = uniqueID()
    const app = new App({
      appID,
      manifest,
      installationState: 'pending',
      settings: {
        [(userID: string)]: {
          permissions: settings.permissions,
          permissionsChecked: settings.permissionsChecked,
        },
      },
    })
    this._apps[appID] = app
    this._byMainframeID[manifest.id] = appID

    return app
  }

  setUserSettings(appID: ID, userID: ID, settings: AppUserSettings): void {
    const app = this.getByID(appID)
    if (app == null) {
      throw new Error('Invalid app')
    }
    app.setSettings(userID, settings)
  }

  setUserPermission(
    appID: ID,
    userID: ID,
    key: PermissionKey,
    value: PermissionGrant,
  ): void {
    const app = this.getByID(appID)
    if (app == null) {
      throw new Error('Invalid app')
    }
    app.setPermission(userID, key, value)
  }

  removeUser(appID: ID, userID: ID): void {
    const app = this.getByID(appID)
    if (app == null) {
      throw new Error('Invalid app')
    }
    app.removeUser(userID)
  }

  remove(id: ID): void {
    const app = this.getByID(id)
    if (app != null) {
      // TODO: handle "clean" option to remove the app contents
      delete this._byMainframeID[app.manifest.id]
      delete this._apps[id]
    }
  }

  createSession(appID: ID, userID: ID): SessionData {
    const app = this.getByID(appID)
    if (app == null) {
      throw new Error('Invalid app')
    }
    return app.createSession(userID)
  }

  hasUpdate(id: ID): boolean {
    return this._updates[id] !== null
  }

  getUpdate(id: ID): ?AppUpdate {
    return this._updates[id]
  }

  createUpdate(appID: ID, manifest: ManifestData): AppUpdate {
    const app = this.getByID(appID)
    if (app == null) {
      throw new Error('Invalid app')
    }

    const permissionsDiff = getRequirementsDifference(
      app.manifest.permissions,
      manifest.permissions,
    )
    const hasRequiredPermissionsChanges =
      Object.keys(permissionsDiff.required.added).length > 0 ||
      Object.keys(permissionsDiff.required.changed).length > 0

    // When required permissions are added or changed,
    // reset `permissionsChecked` to false so it requires user action before any grant
    const settings = hasRequiredPermissionsChanges
      ? Object.keys(app.settings).reduce((acc, userID) => {
          acc[userID] = {
            ...app.settings[idType(userID)],
            permissionsChecked: false,
          }
          return acc
        }, {})
      : { ...app.settings }

    const update = {
      app: new App({
        appID,
        manifest,
        installationState: 'pending',
        settings,
      }),
      hasRequiredPermissionsChanges,
    }

    this._updates[appID] = update
    return update
  }
}
