---
title: "NOOB PCB Design Ingishts"
urlSlug: "noob-pcb-design-ingsights"
date: 2025-11-22
published: false
tags: [blogging, tech, ai, vr, robotics, embeddedsystems, pcb-design, jlcpcb, pcbway]
---

I'm in more of a nuts-and-bolts mood today. Check your nerd card at the door. This one's gonna get into the weeds.

After building over a dozen PCB circuit board ideas from concept to completion, I consider myself an expert on the subject.  

<div style="display: flex; gap: 1rem; align-items: stretch; margin: 1rem 0;">
  <img src="/ModernBlog/Images/dude-confused.gif" alt="Incredulous meme" style="max-width: 200px; height: auto; flex-shrink: 0;" />
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end;">
    <p style="margin: 0;">But really though...</p>
  </div>
</div>

I've been writing code for nearly 30 years, and I felt lacking on hardware dev pre-COVID, so these past few years I've done a LOT of datasheet-staring, ERC-error-solving, and new-PCB-smell sniffing.

If you've ever ordered a fresh PCB, you know what I mean. It's not a good smell, yet it IS though... it's the smell of Christmas for grown-ups. You make a thing. You order it. It FINALLY arrives...

...And then you fry it the moment you plug it in. Mmmm, Electric Fire Christmas Smell.  

<div style="display: flex; gap: 1rem; align-items: stretch; margin: 1rem 0;">
  <img src="/ModernBlog/Images/shrug-meme.jpg" alt="Shrug meme" style="max-width: 200px; height: auto; flex-shrink: 0;" />
  <div style="flex: 1; display: flex; flex-direction: column; justify-content: flex-end;">
    <p style="margin: 0;">You moved too fast. You inverted two traces or you should have added polarity inversion or...</p><br>
    <p style="margin: 0;">[INSERT OTHER NOOB PROTECTION HERE].</p>
  </div>
</div>

Though I'm no expert on hardware, I can safely say I carry a novice badge after half a decade of full-time tinkering. I know my pull-ups and my pull-downs. I'm a big kid now.

And as I work on the PCB design for an AWESOME new open-source project (yes I'm about to shill, but it's okay bc it's FREE!) called [LBEAST](https://github.com/YOUR_GITHUB_USERNAME/LBEAST#readme), a VR Arcade SDK that lets you deploy theme-park-level attractions rapidly...

...I have new insights about PCB design that are probably a big DUH to you veteran firmware engineers. But these insights are impactful for me on my novice-to-intermediate journey. Anyone who might find this helpful... here they are.

### Big PCB Design Insights From A Novice Firmware Guy/Actual Expert VR Guy:

<img src="/ModernBlog/Images/thinking-hard-meme.jpg" alt="Thinking meme" style="max-width: 100%; height: auto;" />

- Prototypes are dirt-cheap because manufacturers like JLC and PCBWay take a loss on them to seed brand awareness and train new firmware engineers on their workflow.
- Small batch (100s or low 1000s) leaps in price from prototype (dozens).
- Multi-layer boards beyond 2 top/bottom leap in price.
- If your delivery target will always be small-batch, you have to navigate these odd-ball cost waters with budgets that have one foot in prototyping and another in small-batch at all times.
- That means two-layers-only at all costs.
- That also means 2-layer boards with LOTS of traces needs LOTS of vias. I hate it, but it keeps the cost down.
- BUT... if you add 200 vias, you eat the whole savings. So keep it buttoned up if you can, and be aware if you max out your via budget, you should probably re-design with a 3rd layer.
- If your thing has a chance of mass production, consider multi-layer from the top.
- If your thing has RF (WiFi, Bluetooth, 433MHz, etc.) consider a hybrid approach (2-layer prototype for low-cost and then remap all traces that cut into the ground plane on a 3rd layer AKA best-of-both-worlds on cost versus redesign woes)

I had Grok chart us some averages (100 × 100 mm board, standard 1.6 mm FR4, 2025 pricing from JLCPCB/PCBWAY/etc.):

| Quantity   | 2-layer, low vias (<50) | 2-layer, very high vias (300–500) | 4-layer (any via count) | Approx. vias where 4-layer wins |
|------------|--------------------------|------------------------------------|--------------------------|---------------------------------|
| 5 pcs      | $5–12                   | $25–60+                           | $18–35                  | ~180–250 vias                  |
| 20 pcs     | $12–20                  | $50–120                           | $30–50                  | ~120–180 vias                  |
| 100 pcs    | $40–70                  | $150–300+                         | $70–110                 | ~80–120 vias                   |

Rough rule of thumb in 2025: once you’re north of ~150–200 vias on a 10 cm × 10 cm board, you’ve usually spent all the money you would have on a 4-layer board anyway… and you still don’t have a proper ground plane.

Hope this helps someone.

Cheers!  
Now get back to work, code monkey!