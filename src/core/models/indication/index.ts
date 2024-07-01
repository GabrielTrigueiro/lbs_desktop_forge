import { IPageable } from "../utils"

export type TIndicationRegister = {
  name: string,
  description: string,
  typeIndicationId: number
}

export type TTypeIndication = {
  id: number,
  indication: string
}

export type TIndicationBody = {
  id: number,
  name: string,
  description: string,
  typeIndication: TTypeIndication
}

export type TIndicationUpdate = {
  name: string,
  description: string
}

export type TIndicationFilterRequest = {
  name: string | undefined,
}

export type TIndicationPageable = TIndicationFilterRequest & IPageable