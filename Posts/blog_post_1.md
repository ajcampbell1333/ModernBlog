---
title: "Why I'm Starting a Blog in 2025 (Yep, Plain Old Text)"
urlSlug: "why-im-starting-a-blog-in-2025-yep-plain-old-text"
date: 2025-11-20
published: true
tags: [blogging, tech, ai, vr]
---

# Why I'm Starting a Blog in 2025 (Yep, Plain Old Text)

Look, I'm the guy who:

- Built a VR "word volume" where you reach into a cloud of floating letters with your bare hands, grab clusters, and slam them together to make sentences—because QWERTY in mid-air is a crime against humanity.
- Is currently hacking on [LBEAST](https://github.com/YOUR_GITHUB_USERNAME), an open-source framework to turn dead shopping malls into location-based VR theme parks with almost zero new hardware.
- Is simultaneously code-herding a dozen AI agents that are writing Unity/Unreal modules for next-gen hand tracking, hydraulics firmware, and AI facemasks for live actors as I type this sentence.

And yet here I am opening a blank Markdown file like it's still a thing.

## 2025 is Absolutely Insane

<div style="display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0;">
  <img src="/ModernBlog/Images/bigscreen-beyond-2-orange.webp" alt="Bigscreen Beyond 2" style="max-width: 100%; height: auto; flex: 1; min-width: 150px;" />
  <img src="/ModernBlog/Images/steam-frame-green.webp" alt="Steam Frame" style="max-width: 100%; height: auto; flex: 1; min-width: 150px;" />
  <img src="/ModernBlog/Images/nvidia-nim.png" alt="NVIDIA NIM" style="max-width: 100%; height: auto; flex: 1; min-width: 150px;" />
  <img src="/ModernBlog/Images/comfyui.jpg" alt="ComfyUI" style="max-width: 100%; height: auto; flex: 1; min-width: 150px;" />
</div>

2025 is absolutely insane, in the best way.

Bigscreen Beyond 2 and the new Steam Frame decks are shipping with micro-OLEDs so sharp I forget I'm wearing a headset. NVIDIA's NIM microservices + ComfyUI workflows mean I can spin up a 4K stable-diffusion avatar that reacts to my voice in 40 ms on a single 4090. Humanoid robots from Figure, Agility, and 1X are walking out of labs and into pilot homes. The future is here and it sparkles.

## Why Text?

So why am I writing words instead of just dropping a 30-minute narrated Quest demo?

I might actually turn this into a VR blog eventually, come to think of it. VRlog? VRrrrrlog? Yeah that doesn't work. We'll worksop it.

Text is still the fastest, highest-bandwidth way to beam a precise idea from my brain to yours. No 6 GB download. No "update your runtime." No motion-sickness warning. Just pure thought, zero friction.

Also, full transparency in case you couldn't tell—I know you could: I'm using Grok right now to turn my rambling voice notes into coherent paragraphs because my actual day is spent telling AIs what code to write and then fixing the code the AIs wrote. That's the 2025 dev loop and I'm all in.

*(Thanks, Grok. You're getting top billing.)*

## The Stack

Here's the exact stack I used to make this blog live in one evening while my Unreal builds cooked:

- **Astro 4.15 + Starlight** (gorgeous docs-style theme out of the box)
- Plain `.md`/`.mdx` files in `/src/content/blog`
- Deployed on **Vercel** (free tier, instant edge cache)
- Single GitHub Actions workflow that:
  - Posts to Medium via their official API
  - Posts to Dev.to via theirs
  - Posts to LinkedIn via their API (status updates with links)
  - Pings my own site so the canonical URL is always mine
  - No Wordpress, Wix, Squarespace, or other pay-to-play WYSIWYG
  - And you can try it free! - Just enter your credit c...
  - JK, it's on my [Github](https://github.com/YOUR_GITHUB_USERNAME/ModernBlog) 

Seventy lines of YAML total. One git push → everywhere in <90 seconds. I will never manually copy-paste into another rich-text editor again.

## The Physical World Still Matters

I still love the physical world. There's no VR experience quite like blasting down the Pacific Coast Highway on my Harley Sportster 1200 at sunset—wind, salt air, the low rumble you feel in your chest—or sipping good coffee and having real conversation with a friend at a real table.

VR and AR are just new layers we get to paint on top of that world, not replacements for it.

But we'll still need words to tell each other what any of it actually felt like when we got there. Also, things are better left unrendered sometimes. It forces that old imagination engine to keep turning over in our aging noggins.

I wrote three (terrible, glorious, unpublished) novels before AI could edit a grocery list. I've probably got at least a dozen more in me now that AI is getting scary-good at being my co-author.

But no novels here. This new blog is for quick musings and concrete tips & tricks for you fellow human+AI Iron Legion pair-programmers out there.

---

This is post #1.

See you in the next `.md` file.