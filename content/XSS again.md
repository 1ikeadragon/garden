---
title: XSS, again.
tags:
  - websec
draft: true
---

XSS is probably one of the oldest web vulns. It has been explained, then once more, and once more, and again by all/any security content creators.

But, I'll do it once more because, why not.

## ./la familia de XSS
Contrary to popular belief (*read: trash internet articles*) there are **NOT** only three types of XSS — Stored XSS, Reflected XSS, and DOM XSS.

It's such a shallow degradation of the beauty and the beast the vuln that is XSS. There's more to it. Types of XSS depend on the attack vector.

If it's in client-sided code
- Self XSS
- Reflected XSS
- DOM XSS

The server is involved?
- Stored XSS

Backend is secure, client-side code is secure but, the browser itself is cooked
- uXSS (Universal XSS)