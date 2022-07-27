export interface Repository extends FormFilterTypes {
  id: string | number;
}

export interface FormFilterTypes {
  name: string;
  language: string[] | string;
  languageList?: string[];
  license: any;
  archived: boolean;
  private: boolean;
  fork: boolean;
}

export interface Commit {
  id: string | number;
  sha: string;
  author: string;
  email: string;
  message: string;
  date: string;
}
