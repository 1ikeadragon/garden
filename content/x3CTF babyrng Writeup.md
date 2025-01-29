---
title: x3CTF babyrng Writeup
tags:
  - ctf
  - crypto
draft: false
date: 2025-01-30
---
This is my writeup for the babyrng cryptography chall from [x3CTF 2025](https://x3c.tf/). This was my first formal exposure to Haskell and x3CTF. 

I didn't do this live as I was engaged with some other work  but dived right into it when I was free.

Hope you learn something new from this thorough documentation of my brain coping and seething with Haskell syntax and crypto math.

--- 
## ./begin

The prompt:
> A flag has been stolen, destroyed and buried underground in a random location. System.Random was used, so it should be impossible to recover the flag... right?

**random** and the chall name itself interested me and I assumed that it'd be probably about breaking some sort of pseudo-deterministic random bit generation (I prefer DRBG instead of PRNG, sounds cooler).

Downloaded the `babyrng.tar.gz` tarball, extracted it to find  a `Dockerfile`,  the `source.hs`, and `output.txt`. Didn't have Haskell toolchain installed so started building the image.
![[docker-build-baberng.png]]
