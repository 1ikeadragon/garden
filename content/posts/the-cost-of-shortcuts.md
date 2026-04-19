---
date: '2026-04-15'
title: The Cost of Shortcuts
description: on engineering debt and the half-life of hacks
tags:
  - essay
  - engineering
---

Every hack is a loan taken from your future self at a variable interest rate. The principal is the thing you skipped — the test you did not write, the edge case you did not handle, the abstraction you bent into a shape it was not meant to hold. The interest is compounding confusion: every new engineer reading that code will build a slightly wrong mental model and ship a slightly wrong change on top of it, and then the next engineer inherits *that*.

People talk about technical debt as though it were a spreadsheet entry you can pay down when the sprint allows. It is not. It is a set of Chesterton's fences that nobody remembers building, scattered across a codebase that is shipping to production whether anyone has time to read it or not. The fence was a shortcut once. It is a landmark now.

This is why I have a strong prior against cleverness. Not against thinking — against the specific aesthetic thrill of a three-line solution that replaces a twelve-line one at the cost of being harder to read. Three lines saved one week, eleven minutes lost per engineer per year for six years. You did not actually save anything. You just moved the bill.

The honest version of engineering is almost always longer than the clever version, and looks, to someone reading the diff over coffee, like it is doing *less*. That is because it is. The clever version was doing too much; the honest version does only what is asked.

Related, and slightly contrary: [[the-real-bubble-isnt-ai]]. The same drive to offload — "let the language do it", "let the framework figure it out", "let the LLM write it" — is the drive to take the shortcut and hope the interest rate is zero. It never is.

A small rule I try to follow: if I cannot explain, in one sentence, why the shorter version is both correct *and* obvious, I write the longer version.
