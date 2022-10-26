import type { Config as _Config } from 'goqoo'

export type Env = 'development' // | 'staging' | 'production'

export type AppId = {
  app: number
}

export type Context = {
  env: Env
  host: string
  appId: AppId
}

export type Config = _Config<Env, Context>
