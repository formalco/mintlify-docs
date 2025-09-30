---
title: "Spaces"
---

import { CardInfo } from '@site/src/components/card/card';

<span className="page-description">How to manage Formal Spaces?</span>

Spaces in Formal represent a group of Connectors, Satellites and Resources that can access each other. This is useful if you want to segment access or create a logical grouping that replicates your internal connectivity patterns.

<CardInfo>
Connectors, Satellites and Resources can only have one Space. Connectors and Satellites without a Space can access any Resource, with or without a Space.
</CardInfo>

## Example

As an example to understand Spaces, you can:
* Create a new Space
* Add a new Connector that uses that Space
* Update a Resource to change its Space

Run the connector: it will only be able to access this Resource because they share the same Space.

## Updates

Connectors, Satellites and Resources can be edited to change their Space, but because it implies a connectivity change, you are required to restart the Connector or Satellite for the change to take effect.

## Deletion

Spaces can't be deleted if they are not empty. You must first remove all Connectors, Satellites and Resources from a Space before deleting it.
