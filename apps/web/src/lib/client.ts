import { treaty } from '@elysia/eden'
import type { App } from '../../../api/src'

export const client = treaty<App>('localhost:3000')
