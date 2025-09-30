---
title: "Chrome Extension"
---

<span className="page-description">Formal has a Chrome Extension to propagate identity on web applications.</span>

The Formal Chrome Extension is designed to facilitate the propagation of end-user identity across various web applications. By integrating with the Formal Desktop App, this extension empowers users to maintain their identity seamlessly across different online platforms.

## Installation

You can easily install the Formal Chrome Extension directly from the [Chrome Web Store](https://chromewebstore.google.com/detail/formal-chrome-extension/kmnofogiemfbfnkgikmkaiagohndnlef)

## How it works

Once both the Chrome Extension and the Formal Desktop App are installed and you're logged in, the extension seamlessly propagates your identity to Formal whenever you execute queries on supported websites (e.g., \*.grafana.net).

## Impersonation mechanism

Formal implements a robust mechanism to authenticate requests, ensuring the security and integrity of user interactions.

To authenticate requests, the following steps are undertaken:

1. Formal Desktop App Authentication: The user must have the Formal Desktop App installed and running. The Desktop App must be a binary signed by Formal to ensure authenticity.

2. ECDSA Key Generation: Each running Desktop App can request an ECDSA Key. The private key is stored securely in memory within the Desktop App, while the public key is shared with the Connector.

3. Communication with Chrome Extension: The Chrome Extension communicates with the Desktop App (via the Native Messaging AP) to sign comments within SQL queries, ensuring their authenticity.

4. Verification by the Connector: The Connector verifies the signature against the public key associated with the user's device, ensuring the validity of the request.
