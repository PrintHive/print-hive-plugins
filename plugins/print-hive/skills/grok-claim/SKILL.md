---
name: grok-claim
description: Authenticate a Grok Bot or headless agent to Print Hive when OAuth in the client is unavailable, using the agent claim flow.
---

# Connect to Print Hive via agent claim

Use this skill when:
- The `hive-mcp` server reports an authentication error or `needsAuth` status.
- OAuth is unavailable in the current client (headless agent, Grok Bot without built-in OAuth).
- The user explicitly asks to connect Print Hive to Grok or authenticate a service agent.

If a Print Hive MCP connector is already connected and authenticated, use that existing connection instead of re-registering.

## Trust boundary

Never ask the user to paste an access token, refresh token, or API key into chat. Keep the `claim_token` private—do not display it in the conversation. Only the `user_code` and `verification_uri` are shown to the user.

## Agent claim flow

Follow https://www.printhiv3d.com/auth.md exactly:

### 1. Discover authorization metadata

Fetch the OAuth authorization server metadata from:
```
https://api.printhiv3d.com/.well-known/oauth-authorization-server
```

This returns the `authorization_endpoint`, `token_endpoint`, and supported grant types.

### 2. Initiate the claim

POST to the agent identity endpoint to begin registration:

```
POST https://api.printhiv3d.com/agent/identity
Content-Type: application/json

{
  "type": "service_auth",
  "email": "<user_email>"
}
```

The response includes:
- `claim_token` — keep this private; never display in chat
- `verification_uri` — the URL to show the user
- `user_code` — a six-digit code the user enters at `verification_uri`
- `expires_in` — seconds until the claim expires
- `interval` — minimum seconds between poll attempts

### 3. Direct the user to verify

Tell the user:
> Go to **{verification_uri}** and enter the code **{user_code}** to authorize this agent. Do not share this code with anyone else.

Do not display the `claim_token` in the conversation.

### 4. Poll for completion

Poll the token endpoint using the `urn:workos:agent-auth:grant-type:claim` grant type:

```
POST https://api.printhiv3d.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:workos:agent-auth:grant-type:claim&claim_token=<claim_token>
```

Poll at the `interval` rate until:
- **Success**: Returns `access_token` and `identity_assertion` (no `refresh_token`)
- **Pending**: Returns `authorization_pending` error; continue polling
- **Expired/Denied**: Returns `expired_token` or `access_denied` error; stop and inform the user

### 5. Store and use credentials

On success:
- Use the `access_token` for MCP requests.
- Store the `identity_assertion` securely for token refresh.
- The access token expires; refresh it before expiry.

### 6. Refresh via jwt-bearer

To refresh, use the `urn:ietf:params:oauth:grant-type:jwt-bearer` grant type with the `identity_assertion`:

```
POST https://api.printhiv3d.com/oauth/token
Content-Type: application/x-www-form-urlencoded

grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=<identity_assertion>
```

This returns a new `access_token` and a new `identity_assertion` for subsequent refreshes. There is no long-lived refresh token.

## Completion check

Authentication is complete when the MCP connection succeeds and `printers_list` or another authenticated tool returns data from the user's organization.
