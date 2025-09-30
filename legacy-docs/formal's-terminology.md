---
title: "Formal's Terminology"
---

<span className="page-description">Glossary of Formal</span>

| Name               | Description                                                                                  |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Connector          | Formal's protocol-aware reverse proxy.                                                       |
| Resource           | The resource protected by the Connector (_e.g._ databases, APIs or K8s cluster).                       |
| Satellite          | Application that can be deployed along Connectors to enable advanced features.    |
| Space              | A collection of Connectors, Satellites and Resources that can access each other.             |
| Native User        | The native user used to connect to a Resource.                                               |
| Policy             | Rule set (written in the Rego language) that Connectors apply for each request.   |
| Policy Data Loader | Code that extends the Policy engine with your own custom data.                               |
| Tags               | Informal controlled labels that help in search and discovery attached to columns.            |
| Data Label         | PII entity detected by the Satellite attached to a column.                                   |
| Listener           | Configuration on the Connector that routes connections on a particular port to resources.    |
