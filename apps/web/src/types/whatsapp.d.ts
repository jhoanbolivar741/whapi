export interface WAState {
  qr: string
  status: 'open' | 'connecting' | 'close'
  user: {
    id: string
    name?: string
    [key: string]: unknown
  } | null
}

export interface SentMessage {
  id: string
  number: string
  message: string
  status: 'sent' | 'failed'
  error: string | null
  sentAt: number
}

export type WAMessage =
  | { type: 'state'; data: WAState }
  | { type: 'message'; data: SentMessage }
