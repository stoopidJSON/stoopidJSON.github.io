import { Clock, CalendarDays, Disc3, Moon, FileSearch } from 'lucide-svelte';
import type { Plank } from '$types';

/**
 * The platform. Single source of truth for the homepage, /platform, every
 * /platform/[slug] page, /resign, the footer, and the sitemap.
 *
 * Adding a plank here adds it everywhere. Slugs are public URLs that get
 * dropped into video captions — don't rename one after it's been posted.
 */
export const planks: Plank[] = [
  {
    number: 1,
    slug: 'daylight-saving',
    title: 'Abolish Daylight Saving Time',
    shortTitle: 'Daylight Saving',
    tagline: 'One time. All year. Forever.',
    summary:
      'Everybody agrees this is stupid. Everybody does it anyway, twice a year, forever. It is the last thing in America we all agree on — so it is where we start.',
    icon: Clock,
    resignationTrigger: true,
    position: [
      'Ask anyone. Left, right, city, country, union hall, country club — ask them about changing the clocks twice a year and you will get the same answer. This is stupid. There is no constituency for it. There is no lobby defending it. There is not one person in America whose life is improved by it. And we keep doing it, every single year, forever.',
      'That is not a scheduling problem. That is a demonstration that we have forgotten how to finish anything, even the easy things, even the things nobody is against.',
      'So this administration will not ask Congress to fix it. This administration will demand it. One bill, roughly one sentence long, on the desk, first.',
      'And to be extremely clear about the part people keep trying to argue with me about: I do not care which one we keep. Standard time, daylight time, I genuinely do not care. It literally does not matter what number we agree to call it — the sun does what the sun does either way. We are not trying to choose the better time. We are trying to choose one time, any time, and then never discuss it again. Pick one and stop.',
      'Here is why this is first and not last. We are a country that currently cannot agree on anything. We have lost the muscle. You do not rebuild that by starting with the hardest thing in the room — you rebuild it by proving to ourselves, once, in public, that three hundred and forty million people can still identify a dumb thing and stop doing it together. Then we go find a bigger one.'
    ],
    objections: [
      {
        question: 'Isn’t this a small thing to run for president on?',
        answer:
          'Yes. That is the entire point. It is small, it is obvious, and we still cannot get it done — which tells you something much worse about us than the clocks do. Start small. Prove we can still do it. Then start asking about the big ones.'
      },
      {
        question: 'Which time would we keep — standard or daylight?',
        answer:
          'I do not care. I really, genuinely do not care. It does not matter what we call it; it is not going to change how much daylight there is. Pick either one. Flip a coin. I will sign whichever one reaches me and I will not complain about it afterward.'
      },
      {
        question: 'But one of them is better for your health, isn’t it?',
        answer:
          'Probably, and people who study sleep for a living should absolutely be in the room when Congress picks. They should not be the reason Congress fails to pick. If this turns into a ten-year argument about which time is superior, we have reproduced the exact problem this plank exists to solve.'
      },
      {
        question: 'What about the farmers?',
        answer:
          'We asked. They did not request this, have never requested this, and have spent a century being confused about why they keep getting blamed for it.'
      },
      {
        question: 'What about Arizona and Hawaii?',
        answer: 'I’ve never been there.'
      },
      {
        question: 'Why is this a resignation trigger?',
        answer:
          'Because it is finishable and you can check the work yourself, in March, by looking at a clock. A promise you cannot verify is not a promise.'
      }
    ]
  },
  {
    number: 2,
    slug: 'summer-vacation',
    title: 'End Summer Vacation',
    shortTitle: 'Summer Vacation',
    tagline: 'Same days off. Better days off.',
    summary:
      'Not more school — the same school, spread out. Keep all 180 days, keep every day off, and stop delivering eleven of those weeks in a single block in July that works for no working parent in America.',
    icon: CalendarDays,
    resignationTrigger: false,
    position: [
      'To be clear about what this plank is not: it is not more school. The number of instructional days does not change. The number of days off does not change. What changes is that the time off stops arriving in one enormous summer block and gets distributed across the year in breaks of two to three weeks.',
      'The summer calendar is an artifact. It was not built for agriculture — that is the thing everyone says, and it is backwards; nineteenth-century rural schools often ran through the summer and closed for planting and harvest. It was built for cities, for heat, for buildings with no air conditioning, and for families wealthy enough to leave town in July. All four of those conditions have since changed.',
      'What this fixes, in order: the single largest childcare cliff in the country, which arrives on the same day every year and lasts a quarter of it. The learning loss that shows up in the data every autumn. And a teaching profession in which every member is contractually required to take vacation during the most expensive eleven weeks of the travel year.',
      'Teachers work the same number of days for the same pay, and get the option of a holiday in October.'
    ],
    objections: [
      {
        question: 'You want to take summer away from children.',
        answer:
          'We want to give them October, February, and April instead. Identical total. Children do not require that their rest be administered in one eleven-week dose, and the research on what happens academically during that dose is not kind.'
      },
      {
        question: 'What about teachers?',
        answer:
          'Same days worked, same pay, and a vacation they are no longer forced to take simultaneously with every other teacher in America. Balanced calendars are not our invention — thousands of schools already run them. We just put it on a yard sign.'
      },
      {
        question: 'What happens to summer camp?',
        answer:
          'It operates year-round at roughly a quarter of the intensity and roughly the same annual volume. We are not unsympathetic to the disruption. We are also not changing course.'
      },
      {
        question: 'Family vacations?',
        answer:
          'Will become possible in months when flights are cheap and the parks are empty. You are welcome.'
      },
      {
        question: 'Isn’t school scheduling a local matter?',
        answer:
          'It is, and it stays that way. The federal government does not set your district’s calendar. It can fund, study, and loudly advocate for balanced ones, which is the entire mechanism being proposed here.'
      }
    ]
  },
  {
    number: 3,
    slug: 'hamster-wheels',
    title: 'Human-Powered Compute',
    shortTitle: 'Hamster Wheels',
    tagline: 'If the data center wants power, it can ask a person.',
    summary:
      'New data centers may draw their electricity from exactly one source: human beings, running, on wheels. Every watt. No exceptions.',
    icon: Disc3,
    resignationTrigger: false,
    position: [
      'The policy is as written. A data center may be built anywhere in the United States, at any scale, by anyone — provided every watt it consumes is generated on site by people running on wheels.',
      'I want to be clear that this is not a protest. This is the single most comprehensive piece of domestic policy anybody has put in front of the American people in forty years, and it solves four separate national crises at once. Let me take them in order.',
      'Jobs. Everyone agrees artificial intelligence is going to eliminate millions of American jobs, and nobody has said what replaces them. This does. It creates two entirely new sectors: somebody has to build the wheels, and somebody has to run on the wheels. The machine that takes your job now requires you to power it. The symmetry here is, frankly, beautiful.',
      'Childhood obesity. We have a generation of children who do not move, and we have tens of millions of wheels that need turning. I am not going to insult anyone by pretending I do not see the overlap. Realizing the full public-health benefit will require revisiting some of this country’s more draconian child labor restrictions, and my administration is prepared to have that conversation.',
      'Electricity. A data center that cannot draw power from the grid does not draw power from the grid. The savings are total. Your bill goes down the day this passes.',
      'Community. We used to have bowling leagues. We used to know the people on our street. Under this policy you will spend eight hours a day on a wheel directly beside your neighbor, and you will talk, because there is nothing else to do. We are not just powering a server farm. We are rebuilding civic life in this country, one shift at a time.',
      'The wheels will be union.'
    ],
    objections: [
      {
        question: 'A person generates about a hundred watts. This is not physically possible.',
        answer: 'That’s for the nerds to figure out. Or maybe AI.'
      },
      {
        question:
          'No, seriously — a mid-sized facility would need millions of people running continuously, forever.',
        answer:
          'Millions of jobs. I appreciate you doing the math on that, because that is a much stronger number than the one I came in with.'
      },
      {
        question: 'Is this a jobs program?',
        answer:
          'Enthusiastically, yes. Two sectors, built from nothing: wheel fabrication and wheel operation. No degree required for either. These are the kind of jobs people say they want brought back, and I notice the people who say that have gone quiet since I started bringing them back.'
      },
      {
        question: 'You are proposing that children run on wheels.',
        answer:
          'I am proposing that children be permitted to participate. There is a difference, and I would ask people to stop collapsing it. We have an epidemic of inactivity on one side and an enormous unmet demand for sustained low-intensity motion on the other, and the only thing standing between them is paperwork from 1938.'
      },
      {
        question: 'What about the data centers already operating?',
        answer:
          'Ten years to convert. The conversion is straightforward: remove the connection to the grid, install the wheels, hire the neighborhood.'
      },
      {
        question: 'What is the campaign’s position on AI?',
        answer: 'Warm. Genuinely warm. We support our future overlords in every way possible.'
      }
    ]
  },
  {
    number: 4,
    slug: 'moon-display',
    title: 'The Lunar Readout',
    shortTitle: 'Moon Display',
    tagline: 'A sign on the Moon that tells you whether the Moon is full.',
    summary:
      'The United States will place a display on the surface of the Moon, legible from Earth with the naked eye, that reads FULL when the Moon is full and NOT FULL when it is not.',
    icon: Moon,
    resignationTrigger: false,
    position: [
      'The requirements are brief. The display must be readable from the ground, on Earth, without equipment, by a person who has just walked outside. It must read FULL or NOT FULL. There is no third state. Partial information is how we got here.',
      'We are aware of the central engineering objection — that the near face is only lit when the Moon is near full, which is precisely when the sign is least necessary. The campaign considers this the contractor’s problem. That is what a contract is.',
      'And the reason: the last two generations of American spaceflight have been justified on grounds the public cannot see. This one can be seen from a driveway in Nebraska. A country should occasionally build something enormous and pointless that every single person in it can look at. That is what the first Moon landing was. We would like to do it again, slightly stupider.'
    ],
    objections: [
      {
        question: 'You could just look at the Moon.',
        answer: 'You could. The sign is faster, and it settles the argument.'
      },
      {
        question: 'Or an app?',
        answer:
          'An app requires a phone, a charge, a signal, and the decision to look at a phone. The sign requires a window.'
      },
      {
        question: 'NASA or SpaceX?',
        answer:
          'We genuinely do not care. We will not be commenting further and consider the question a distraction.'
      },
      {
        question: 'Why not the far side?',
        answer:
          'The far side would defeat the purpose, and this campaign has been consistent that there is a purpose.'
      },
      {
        question: 'What does it cost?',
        answer: 'Less than one aircraft carrier. We checked.'
      }
    ]
  },
  {
    number: 5,
    slug: 'public-inquiry',
    title: 'A Full Public Accounting',
    shortTitle: 'Public Inquiry',
    tagline: 'Every name in the files. On the record. Under oath.',
    summary:
      'Release the Epstein files, and convene a standing public commission that works through them name by name — so that every person who appears in them accounts publicly for how and why they appear.',
    icon: FileSearch,
    resignationTrigger: true,
    position: [
      'The files exist. Names are in them. The present arrangement is that the public knows a list exists, is not told what is on it, and is invited to speculate forever. That arrangement serves exactly one group of people, and it is neither the public nor the survivors.',
      'The proposal: full release with survivor identities redacted, and a standing public commission with subpoena power that works through the documents name by name. For each person named in any way, the commission establishes on the record what the document actually says, and the named person is given the opportunity — under oath, in public — to explain how and why they appear in it.',
      'Appearing in a document is not a crime, and this campaign will not pretend otherwise. Flight logs contain pilots. Address books contain dentists. Investigative files contain investigators, witnesses, and people who did nothing more than attend a dinner in 1997. A great many of the people in these documents will have a complete and boring explanation, and the commission’s job is to get that explanation on the record so it stops being a rumor. Where an explanation does not survive contact with the evidence, the commission refers the matter to prosecutors, who handle the part that requires a courtroom.',
      'Survivors first, throughout. Any identity a survivor has asked to keep protected stays protected. The purpose here is accountability for the people in the files — not another round of exposure for the people they hurt.',
      'This plank is not about any individual. The campaign will not publish a list, confirm a list, or answer questions about who is on one. We are asking for a process, because the process is what produces answers. A guy with a website is not.'
    ],
    objections: [
      {
        question: 'Isn’t this a witch hunt?',
        answer:
          'A witch hunt skips the part where you establish the facts. This is almost entirely that part. Most of the people called will walk out with their names cleared on the record, which is the opposite of what a witch hunt is for.'
      },
      {
        question: 'Why not just release everything and let people read it?',
        answer:
          'Release is step one and should have happened already. But a document dump is not accountability — it is tens of thousands of pages and a comment section. Somebody has to go through it out loud, under oath, with the power to compel an answer.'
      },
      {
        question: 'Who is on the list?',
        answer:
          'We do not know. Neither do you. That is the actual problem. This campaign will not speculate about any individual — ask the commission, once it exists.'
      },
      {
        question: 'What if it implicates people on your own side?',
        answer: 'There is no side. That is the one thing this plank is genuinely for.'
      },
      {
        question: 'Why is this a resignation trigger?',
        answer:
          'Because it has an end state. The commission finishes the documents and publishes its findings, and at that point the thing either happened or it did not. There is no version of this where it is 80 percent done forever.'
      }
    ]
  }
];

/** The two planks whose completion triggers the resignation. */
export const resignationPlanks = planks.filter((p) => p.resignationTrigger);

export function getPlank(slug: string): Plank | undefined {
  return planks.find((p) => p.slug === slug);
}
