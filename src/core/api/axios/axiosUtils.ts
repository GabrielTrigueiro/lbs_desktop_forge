import { HttpStatusCode } from "axios";

function getMessageFromHttpStatus(status: number | undefined): string {
  const httpMessage:any = {};

  httpMessage[HttpStatusCode.BadRequest] = "Falha ao executar a requisição.";
  httpMessage[HttpStatusCode.Unauthorized] = "Acesso não autorizado.";

  return httpMessage[status || 0];
}

export default getMessageFromHttpStatus;