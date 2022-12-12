interface ScriptDto {
  id: number;
  name: string;
  source: string;
  link: string;
  user: { email: string };
}

export interface UserScriptsDto {
  scripts: ScriptDto[];
}
