export type RequestState = "idle" | "pending" | "fulfilled" | "rejected";

export type User = {
  login: string;
  password: string;
  role: string;
};

export type DataUser = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  login: string;
  password: string;
  role: string;
};
