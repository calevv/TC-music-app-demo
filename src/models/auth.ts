export interface ClientCredentialTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

export interface AuthUrlarams {
  response_type: "code";
  client_id: String;
  scope: String;
  code_challenge_method: "S256";
  code_challenge: String;
  redirect_uri: String;
}

export interface ExchangeTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}
