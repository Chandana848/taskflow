export const GITHUB_OAUTH_CONFIG = {
  clientId: process.env.GITHUB_CLIENT_ID || 'mock_github_client_id',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock_github_client_secret',
  authorizeUrl: 'https://github.com/login/oauth/authorize',
  tokenUrl: 'https://github.com/login/oauth/access_token',
  userUrl: 'https://api.github.com/user',
};

export function getGitHubAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: GITHUB_OAUTH_CONFIG.clientId,
    scope: 'user:email read:user',
    state,
  });
  return `${GITHUB_OAUTH_CONFIG.authorizeUrl}?${params.toString()}`;
}
