export interface Repository extends FormFilterTypes {
  id: string | number;
}

export interface FormFilterTypes {
  name: string;
  language: string[] | string;
  languageList: string[];
  license: any;
  archived: boolean | string;
  private: boolean | string;
  fork: boolean | string;
  commit: Commit[];
}

export interface Commit {
  sha: string;
  author: string;
  email: string;
  message: string;
  date: string;
}
