import { IPage, IPageable, IResponseBody } from "../utils";

export type TContact = {
  id: number;
  name: string;
  success: boolean;
  telephone: string;
};

export type TExecution = {
  id: number;
  dateInitial: string;
  dateFinal: string;
  amountExecution: number;
  status: string;
  contacts: TContact[];
};

export type TCampaign = {
  id: number;
  name: string;
  description: string;
  active: boolean;
  createdAt: string;
  updated_at: string;
  executions: TExecution[];
};

export type TCampaignRequest = {
  name: string;
  message: string;
};

export type TCampaignPostResponse = IResponseBody<TCampaign>;

export type TCampaignGetResponse = IPage<TCampaign> | undefined;

export type TCampaignPageable = IPageable;
