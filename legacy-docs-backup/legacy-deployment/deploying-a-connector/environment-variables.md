---
title: "Environment variables"
---

import { CardWarning } from '@site/src/components/card/card';

<span className="page-description">What are the environment variables configurable on the Connectors?</span>

<CardWarning>
You must restart the Formal Connector every time you change the environment variables.
</CardWarning>

| Name                                    | Type        | Description                                                                                                                                                                                               |
| --------------------------------------- | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `FORMAL_CONTROL_PLANE_API_KEY`          | **STRING**  | Lets the Connector authenticate itself with the Control Plane. (Obtained from the Control Plane, via the console or terraform provider)                                                                   |
| `LOG_LEVEL`                             | **ENUM**    | This variable sets the level of logging for the Connector. It is useful for debugging purposes. Accepted values are `debug`, `info`, `warn`, `error`, `fatal`, `panic` and `disabled`. Defaults to `info` |                                                                                                                                   |
