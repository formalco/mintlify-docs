---
title: "Discovery Satellite Changelog"
---

# Changelog

## 0.5.0 (2025-02-27)

- Significant reliability improvements for communications with the control plane
- Fixes bugs with data labelling using the classifier satellite

## 0.4.1 (2025-02-21)

- Bug fixes

## 0.4.0 (2025-02-13)

- Remove the data classifier from the discovery satellite

## 0.3.5 (2025-02-12)

- Bug fixes

## 0.3.4 (2025-02-10)

- Bug fixes

## 0.3.3 (2025-01-22)

- Refactor communications between classifier and discovery satellites

## 0.3.2 (2024-10-27)

-  Improve performance by implementing zlib

## 0.3.1 (2024-10-27)

- Improve the performance by avoiding calling the NLP in a goroutine

## 0.3.0 (2024-10-26)

- Add data_classifier to data_discovery image

## 0.2.2 (2024-10-22)

- Improve OAI classification

## 0.2.1 (2024-10-22)

- Change classification to always call OAI

## 0.2.0 (2024-10-21)

- Update classifier to return data labels directly