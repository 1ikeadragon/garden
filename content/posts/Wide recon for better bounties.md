---
title: Wide recon for better bounties.
tags:
  - bug-bounty
  - websec
  - technical
date: 2024-12-18
draft: true
---
Recon is a big part of getting your bounties, probably the most important when you're dealing with __ran through__ targets. You'll see some hunters say, "as a beginner, don't do recon".

What they try to mean is don't *just* focus on recon. That is true. Don't just run a recon automation tool and call it a day. Do it smart. To demo, I'll be doing recon on [Wells Fargo](https://hackerone.com/wellsfargo-bbp?type=team), a public program on HackerOne.

## ./the idea of recon

A Google search on how to do bug bounty recon will land you articles, tweets and videos with either one-liners or a generic flow like:

```bash
subfinder → httpx → nmap → nuclei
```

Recon flow is ****not**** linear. There's a lot of jumping around involved. Recon is a recursive process.

> Even if you're sure you've exhausted all your techniques and found everything there was to find, make sure to revisit the domain every 1-2 months.

## ./horizontal recon with ASNs

Autonomous System Numbers are large swabs of IP addresses assigned to a single parent company. Getting your hands on the ASN will grant you an overview into a company's networks and owned IP ranges. More IPs mean more assets.

> DO ASN NUMBERS GET UPDATED??? How is it related to BGP

[Hurricane Electric](https://bgp.he.net) is reliable for manual recon of ASN. It's recommended by GOATs of recon like [Jason Haddix](https://x.com/jhaddix), whose talks have inspired this piece.

You can also use the latest CLI automation that's trending on Twitter, make sure it outputs the description verbosely otherwise you'll be running into the problem I discuss a para below.




Notice how it shows multiple AS numbers with Wells Fargo in description but, AS number is not relevant to our target. You'll have to manually sift through the noise and note relevant IP ranges.

Now we have list of IP addresses owned by the company. Great, what next?

Next, we resolve those IP addresses to their domain names. You can use services like WhoisXMLApi to feed a list of IPs and resolve their domains or, you can do it on the CLI with beloved Project Discovery tools suite:

```sh
mapcidr -cl asn -silent | dnsx -ptr -resp-only -silent -o out
```

>Resolving the ASNs might bring up some false positive apex domains too, along with CDN. domains, make sure to validate and clean the data thoroughly.

## ./shodan is watching

Shodan.io scans the internet 24ｘ7. In doing so it effectively creates a phonebook of all online assets (servers) with some basic fingerprinting of them. It's really useful, especially if you have an API because it essentially cuts a lot of the manual work. You just have to query and it gives you data about the target.
>Shodan data can be stale, so make sure to resolve the subs, IPs, and other new assets that are returned by your query.
## ./cloud gazing


## ./organising 
## ./r in recon is for recursive

  

## ./never enough recon

### ./documentation

RTFM.

### ./acquisitions

More.

### ./advertisements (*what?*)

Ads can be a blessing in disguise.

## ./resources

- [Jhaddix](https://x.com/jhaddix)
- [Orwa](https://x.com/GodfatherOrwa)
- [Rhynorater](https://x.com/Rhynorater)
- [BlackLanternSec](https://www.blacklanternsecurity.com/)
- [Huli's Beyond XSS](https://aszx87410.github.io/beyond-xss/en/)
- [Return to Monke](https://www.monke.ie/p/monkes-guide-bug-bounty-methodology)
- [Apex](https://apexvicky.medium.com/)