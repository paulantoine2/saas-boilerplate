export type AuthResponse = {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    teamId: string | null;
    teamName: string | null;
  };
  token: string;
};