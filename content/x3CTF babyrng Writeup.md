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
Ran a container with the image and got the output
```sh

```

Hmm, interesting -- time to read the src now.
`source.hs`
```haskell
{-# LANGUAGE ScopedTypeVariables #-}

import Control.Monad.State.Lazy (evalState, State, state)

import Data.Bits (xor)

import Data.Char (chr, ord)

import Data.Word (Word64)

import System.Random (getStdGen, StdGen, uniform, uniformR)

import Text.Printf (printf)

  

flag = "MVM{[REDACTED]}"

  

shred :: String -> State StdGen String

shred "" = return ""

shred (c:cs) = do

k <- state $ uniformR (0, 255)

((:) (chr $ (ord c) `xor` k)) <$> (shred cs)

  

burryTreasure :: State StdGen String

burryTreasure = do

shredded <- shred flag

x :: Word64 <- state uniform

y :: Word64 <- state uniform

return $ printf "The shredded flag (%s) has been buried at (%d, %d)" (shredded >>= (printf "%02x" :: Char -> String)) x y

  

main :: IO ()

main = do

rng <- getStdGen

putStrLn $ evalState burryTreasure rng
```

Honest first reaction

Anyway, I started reading. It was just a ~30 line source file, from the looks of it not much going on we have a variable of type string defined which is the flag then some transformations on it which I can't really make sense of.

What next? Deepseek? GPT?

Nah -- we raw dog it.
![[ctf meme.png]]
And so I went head first into Haskell docs and tutorials to try and make sense of the spaghetti I see.
