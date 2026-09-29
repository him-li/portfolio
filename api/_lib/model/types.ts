export type CopilotMode = "explore" | "role-match";

export type CopilotRequest = {
  question: string;
  locale: string;
  mode: CopilotMode;
};

export type CopilotResult = {
  answer: string;
  citations: string[];
  provider: string;
};

export interface ModelAdapter {
  generate(input: CopilotRequest, context: string): Promise<CopilotResult>;
}
