# Zulip bindings for JavaScript/TypeScript

This is the implementation of the Zulip API client library for JavaScript and TypeScript.

## How to use

```typescript

import * as zulip from '@mh35/new-zulip'

const SERVER_URL = 'https://chat.example.com/'
const EMAIL = 'example@example.com'
const PASSWORD = 'SecretPassword'

const apiKey = await zulip.auth.authByPassword(SERVER_URL, EMAIL, PASSWORD)
const client = zulip.api.generateCallApi(SERVER_URL, EMAIL, apiKey)
```
