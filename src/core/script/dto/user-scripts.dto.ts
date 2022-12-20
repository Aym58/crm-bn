export interface UserScriptsDto {
  id: number;
  name: string;
  source: string;
  link: string;
  user: { email: string };
}
