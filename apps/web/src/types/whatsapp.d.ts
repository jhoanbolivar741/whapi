export interface WAState {
  qr: string
  status: 'open' | 'connecting' | 'close'
  user: {
    id: string
    name?: string
    [key: string]: unknown
  } | null
}

export interface WAMessage {
  type: 'state'
  data: WAState
}
