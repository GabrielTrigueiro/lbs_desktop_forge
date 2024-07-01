export type TVideo = {
  name: string;
  url: string;
  sequence: number;
};

export type TVideos = TVideo[];

export type TCourse = {
  description: string;
  videos: TVideos;
};
