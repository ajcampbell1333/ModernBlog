---
title: "Why I Hate VR Raycasting as an Interaction Model"
urlSlug: "why-i-hate-vr-raycasting-as-an-interaction-model"
date: 2025-12-02
published: true
tags: [vr, tech, coding, philosophy]
---

I hate raycasting in VR the way anyone should hate trying to drag-and-drop a desktop icon on a 20" monitor from ten feet away using a laser pointer.

<div style="display: flex; gap: 1rem; align-items: center; margin: 1rem 0;">
  <img src="Images/laser-pointer-meme.jpg" alt="Laser pointer meme" style="flex: 0 0 33.33%; width: 33.33%; max-width: 33.33%; height: auto; object-fit: contain; flex-shrink: 0;" />
  <div style="flex: 2;">
    <p style="margin: 0;">Your eyes can see the icon perfectly. You can picture exactly where you want it to go. Yet the tool you're given is an excruciating, jittery beam that turns a two-second task into a frustrating minute of micro-corrections and overshoots.</p>
  </div>
</div>

That is raycasting in XR, and it is fundamentally broken.

## The Mouse Comparison

To fully grasp why, compare it to the 2D mouse.

With a mouse, move on X/Y → the cursor moves on X/Y. A single flick of the wrist gives you instant, uniform access to every single pixel on the entire interactable canvas with the same speed and precision.

Now try the same thought experiment with VR raycasting:

What does it mean to hover and/or select **ANYTHING** in **ANY** accessible spot in your interactable canvas?

What even **IS** your interactable canvas in XR?

It's not just the zone of arm's reach (we solved near-field grabbing years ago).

In XR we're promised superpowers: we can be Jean Grey on anything in view.

But how?

## The Orange Slice Problem

Assume you keep your head perfectly still and point your nose straight toward the horizon.

Your total field of view is roughly a full hemisphere forward of your face.

The ground slices that hemisphere clean in half, leaving only the upper half usable.

That usable volume is a quarter-sphere radiating outward from your eyes, bounded below by the floor.

I call it **the orange slice**: thick near your face, tapering to a curved rind around 100 ft away toward the far horizon. The rind of the orange slice is the limit of your two eyes' ability to tell you 'this item is closer than that one.'

The mouse has X×Y pixels.

The orange slice has billions (possibly trillions) of voxels.

Now ask yourself:

How do you give the user instant, uniform hover-and-select over **EVERY** single one of those voxels in the same effortless way as the mouse does over pixels?

Raycasting's answer: draw a straight line from your controller and pray.

**Yikes.**

## The Fidelity Collapse

Raycasting gives you a high-fidelity illusion of reach for maybe 3–5 extra feet beyond arm's length. Beyond that, interactive fidelity gives an accelerating collapse along depth because it's perspective-based.

A 2° wrist twitch moves an object 3 inches when it's 2 m away.

The same 2° twitch moves it 6 feet (a ~25X precision loss) when the object is 50 m away.

Try moving something a few inches when it's 50 m out. You literally can't.

HCI researchers have documented this failure for years:

<div style="display: flex; gap: 1rem; align-items: flex-start; margin: 1rem 0;">
  <div style="flex: 1.5;">
    <p style="margin: 0;">A 2019 study by Baloup, Pietrzak, and Casiez (CHI 2019) on raycasting techniques found that selecting small and distant targets leads to increased error rates, with researchers proposing filtering and cursor enhancements specifically to address precision degradation at distance. Users abandon raycasting and physically walk closer whenever the system allows it.</p>
  </div>
  <div style="flex: 1;">
    <div class="youtube-embed" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%;">
      <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/J0aQtUiQJ_E" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
      </iframe>
    </div>
  </div>
</div>

We keep adding curve beams, progressive refinement, heuristic snapping, and "smart" cursors because raycasting is the devil we know.

But no amount of polish turns a broken paradigm into the right one.

## So What's the Answer?

All of this begs the question: what **IS** the way?

You'll probably be disappointed by the conclusion of this post: **I don't know the final answer.**

I have strong hunches (near-field-to-far-field peripheral proxy widgets are a massive piece of it), but thousands of brilliant HCI researchers have hammered at this nut for three decades and no one has cracked it yet.

The industry drastically underestimates how deep this challenge runs.

Give the user equal, instant access to every voxel in the orange slice for hover or selection, with the same effortless fidelity we take for granted on a 2D screen.

**Good luck.**

## The Bottom Line

Raycasting will never cut it.

It is not a flawed first draft of the mouse of VR.

It is the wrong tool entirely.

When we finally invent the real mouse of spatial computing, XR will stop feeling like a tech demo and start feeling like the intuitive superpower it was always meant to be.

Until then, every time another headset ships with an "operating system" that brags about "improved raycasting," I die a little inside.

If you don't have a mouse yet, do you really have an operating system?
