import type { Chapter } from './types'

export const CLIENT_SERVICES_CHAPTERS: Chapter[] = [
  {
    id: 'client_ch1_offer_creation',
    pathId: 'client_services',
    sequence: 1,
    title: 'Offer Creation',
    description: 'Define what service you are offering.',
    whatThisAchieves: 'You will have a clear description of what you do for people.',
    completionCriteria: 'Done when you can clearly describe what you offer, who it is for, and what they get.',
    howTo: {
      intro: 'You do not need to have the perfect service figured out. You just need a first version that is clear enough to explain to someone in 30 seconds. Here is how to get there.',
      steps: [
        {
          title: 'Start with what you already know how to do',
          body: 'Think about skills you have right now. Not skills you want to learn -- skills you actually have. What do friends or family already ask you to help with? What have you done at work or school that other people struggled with?',
          tip: 'If you are stuck, open your text messages and look at the last 5 times someone asked you for help. That is usually a clue.',
        },
        {
          title: 'Pick the one thing you could do this week',
          body: 'From your list, pick the one skill that someone could pay you for today. Not the most exciting one, not the one with the biggest market -- the one you could actually deliver right now without learning anything new.',
          tip: 'The best first service is boring. Editing documents, organizing files, setting up spreadsheets, managing social media posts. Boring is good because you can start immediately.',
        },
        {
          title: 'Describe it like you are texting a friend',
          body: 'Write down what you would do for someone as if you were explaining it in a text message. No business language. Just "I help [type of person] do [thing] so they get [result]." If you cannot explain it simply, you have not figured it out yet.',
        },
      ],
      commonMistakes: [
        'Making it too broad. "I help businesses with marketing" means nothing. "I write Instagram captions for restaurants" is clear.',
        'Trying to offer something you have never actually done before. Stick to what you can do now.',
        'Worrying about competition. Other people doing the same thing is a good sign -- it means people pay for it.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'service_offering',
        label: 'What service are you offering?',
        type: 'textarea',
        placeholder: 'e.g., I help students edit their college essays',
        helpText: 'Describe what you will do for people.',
        howToFill: {
          guidanceText: 'Use this format: "I [verb] for [specific type of person]." Keep it to one sentence. If you need more than one sentence, your service is probably too broad -- narrow it down.',
          exampleThought: 'Thinking process: "I am good at writing. But writing is too broad. I have helped 3 friends with their college essays and they all said it really helped. So my service is: I edit college application essays."',
        },
      },
      {
        fieldName: 'target_client',
        label: 'Who is this for?',
        type: 'textarea',
        placeholder: 'e.g., High school seniors applying to college',
        helpText: 'Be specific about who needs this.',
        howToFill: {
          guidanceText: 'Name a specific type of person, not a broad group. "Small businesses" is too vague. "Restaurant owners in my city who post on Instagram but get no engagement" is specific. The more specific you are, the easier it is to find them later.',
          exampleThought: 'Thinking process: "Who actually needs essay editing? Students applying to college. But which ones? The ones who care about getting into good schools but are not confident writers. High school seniors in college prep mode."',
        },
      },
      {
        fieldName: 'what_they_get',
        label: 'What do they get?',
        type: 'textarea',
        placeholder: 'e.g., Edited essay with specific feedback and suggestions',
        helpText: 'What is the end result they receive?',
        howToFill: {
          guidanceText: 'Describe the concrete thing they walk away with. Not a feeling, not a vague outcome -- the actual deliverable. Think: if you handed it to them in a box, what would be in the box?',
          exampleThought: 'Thinking process: "They get their essay back, but better. Specifically: a Google Doc with tracked changes, comments explaining why I changed things, and a summary of the 3 biggest things to improve."',
        },
      },
    ],
  },
  {
    id: 'client_ch2_ideal_client',
    pathId: 'client_services',
    sequence: 2,
    title: 'Ideal Client',
    description: 'Figure out who you want to work with and where to find them.',
    whatThisAchieves: 'You will know exactly who your ideal client is and where they hang out.',
    completionCriteria: 'Done when you have described your ideal client and where to reach them.',
    howTo: {
      intro: 'Not all clients are equal. Some are easy to work with, pay on time, and appreciate your work. Others drain your energy and argue about everything. This chapter helps you figure out who to go after.',
      steps: [
        {
          title: 'Think about the best person you have helped so far',
          body: 'If you have done this work for anyone (even for free), think about the person who was easiest to work with. What made them easy? Were they organized? Did they know what they wanted? Did they value your time? That is the type of person you want more of.',
          tip: 'If you have not helped anyone yet, think about who would appreciate this the most. Who has the problem AND the willingness to pay to solve it?',
        },
        {
          title: 'Get specific about WHO they are',
          body: 'Write down details: What age are they? What is their job or situation? What are they trying to accomplish? The more specific, the better. "Anyone who needs help" makes it impossible to find them. "Parents of high school seniors who are stressed about college applications" -- now you know exactly where to look.',
        },
        {
          title: 'Find where they already gather',
          body: 'Your ideal clients are already somewhere online or in person, talking about their problems. Your job is to find where. Search Facebook groups, subreddits, forums, local community boards, or professional meetups related to their problem.',
          tip: 'Go to these places and just read for a while. Look at what people complain about, ask for help with, and recommend to each other. This tells you how they think and what language they use.',
        },
      ],
      commonMistakes: [
        'Saying "everyone" is your ideal client. If you try to serve everyone, you end up serving no one well.',
        'Only thinking about online spaces. Sometimes your best clients are at local events, school boards, or community groups.',
        'Picking the richest possible client instead of the one you can actually reach and help right now.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'ideal_client_description',
        label: 'Describe your ideal client',
        type: 'textarea',
        placeholder: 'e.g., Students who care about getting into good schools and are willing to spend time on their essays',
        helpText: 'What makes someone a good fit to work with?',
        howToFill: {
          guidanceText: 'Describe a real person, not a demographic. Include: what situation they are in, what they care about, and what makes them ready to pay for help. A good test: could you walk into a room and point at them?',
          exampleThought: 'Thinking process: "My best client would be a high school junior or senior who is serious about college applications, has parents who value education, but the student is not a strong writer. They want help but do not want someone to write it for them -- they want to learn."',
        },
      },
      {
        fieldName: 'where_to_find',
        label: 'Where can you find them?',
        type: 'textarea',
        placeholder: 'e.g., School guidance counselor recommendations, college prep Facebook groups, r/ApplyingToCollege',
        helpText: 'List specific places where these people are.',
        howToFill: {
          guidanceText: 'List 3-5 specific places, not general categories. Instead of "social media" write "the Facebook group called College Admissions Moms with 15k members." Instead of "online forums" write "r/ApplyingToCollege on Reddit." Be specific enough that you could go there right now and start reading.',
        },
      },
    ],
  },
  {
    id: 'client_ch3_proof_positioning',
    pathId: 'client_services',
    sequence: 3,
    title: 'Proof & Positioning',
    description: 'Create examples and explain why people should choose you.',
    whatThisAchieves: 'You will have proof that you can do this and a reason why people should pick you.',
    completionCriteria: 'Done when you have examples of your work and a reason people should hire you.',
    howTo: {
      intro: 'Nobody hires a stranger without some evidence they can do the job. You need proof, and you need a reason someone would pick YOU over doing it themselves or hiring someone else. Here is how to create both.',
      steps: [
        {
          title: 'Gather or create examples of your work',
          body: 'If you have done this work before (even for free), collect screenshots, before-and-after examples, or testimonials. If you have not done it for anyone yet, do it for free for 2-3 people specifically to get examples. Offer your service to friends, family, or people in online communities for free in exchange for honest feedback.',
          tip: 'A before-and-after is the most powerful proof. Show what something looked like before you helped, and what it looked like after. This is more convincing than any description.',
        },
        {
          title: 'Write down results, not just activities',
          body: 'People care about results, not your process. Instead of "I edited the essay and fixed grammar," say "After my edits, the student got accepted to 3 of their top 5 schools." If you do not have results yet, describe what your work makes possible: "My editing helps students sound like themselves, not like a robot wrote their essay."',
        },
        {
          title: 'Answer the question: why you?',
          body: 'You do not need to be the world expert. You just need ONE reason someone would choose you. Maybe you went through the same process recently and remember what it is like. Maybe you are faster than alternatives. Maybe you are more affordable. Maybe you give more personal attention. Pick the honest reason.',
          tip: 'The best positioning for a beginner is: "I recently went through this myself and I give you way more personal attention than the big companies." That is a real advantage.',
        },
      ],
      commonMistakes: [
        'Waiting until you have 50 clients to create proof. You need proof from day one -- even one example is better than nothing.',
        'Copying how big companies position themselves. You are not a big company. Your advantage is being personal, flexible, and hungry.',
        'Making up results or exaggerating. People can tell. Honest, modest proof is more convincing than inflated claims.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'proof',
        label: 'What proof do you have?',
        type: 'textarea',
        placeholder: 'e.g., Edited 5 essays for friends, 3 got into their top schools',
        helpText: 'Examples of your work or results you have helped create.',
        howToFill: {
          guidanceText: 'List every piece of evidence you have, no matter how small. Even "I helped my neighbor set up their Instagram and they got 50 new followers in a week" counts. If you have zero proof, your first step after this chapter is to do 2-3 free projects to get some.',
        },
      },
      {
        fieldName: 'why_you',
        label: 'Why should someone pick you?',
        type: 'textarea',
        placeholder: 'e.g., I got into 3 top schools and know what admissions officers look for',
        helpText: 'What makes you different or better than other options?',
        howToFill: {
          guidanceText: 'Finish this sentence: "People should pick me because..." Be honest. Good answers include: personal experience with the problem, more attention than bigger options, specific expertise in a niche area, or a unique combination of skills.',
          exampleThought: 'Thinking process: "Why would someone pick me over a professional essay editing service? Because I just went through college admissions last year, I remember exactly what the process feels like, and I will spend 2 hours on their essay instead of 15 minutes like the big services do."',
        },
      },
    ],
  },
  {
    id: 'client_ch4_outreach',
    pathId: 'client_services',
    sequence: 4,
    title: 'Outreach',
    description: 'Start contacting potential clients and see who responds.',
    whatThisAchieves: 'You will know if people are interested and willing to pay.',
    completionCriteria: 'Done when you have contacted people and logged their responses.',
    howTo: {
      intro: 'This is the chapter most people dread. Reaching out to strangers feels awkward. But it does not have to be a sales pitch -- it is just a conversation. Here is how to do it without feeling like a used car salesperson.',
      steps: [
        {
          title: 'Write a message that helps first',
          body: 'Do not start with "I offer XYZ service." Start by being useful in the places where your ideal clients hang out. Answer their questions. Share a tip. Help someone for free in a comment. Once people see you are helpful, they are far more likely to respond when you mention your service.',
          tip: 'A good outreach message template: "Hey, I noticed you mentioned [their problem]. I actually help people with that -- I [what you do]. Would it be helpful if I [specific small thing you could do for them]?"',
        },
        {
          title: 'Go where you said your clients are',
          body: 'In the last chapter, you listed specific places where your clients gather. Now go there. Post in those Facebook groups. Comment on those Reddit threads. Message those people. Reach out to at least 10 people this week. Not 2 or 3 -- at least 10.',
          tip: 'Most people will not respond. That is normal. If you message 10 people and 2 respond, that is a good rate. Do not take silence personally -- people are busy.',
        },
        {
          title: 'Set a price and say it out loud',
          body: 'Pick a starting price. It does not need to be perfect. For your first few clients, price lower than you think you should -- you are buying experience and testimonials. A good starting formula: think about what feels fair for the time it takes, then go slightly below that. You can always raise prices later.',
          tip: 'If you have no idea what to charge, look at what others charge for similar services on Fiverr or Upwork. Price yourself at 50-75% of that to start. Or offer the first 3 clients a "launch price" to reduce the pressure of getting the price right.',
        },
      ],
      commonMistakes: [
        'Writing one post in one place and waiting. Outreach is a numbers game. You need volume.',
        'Being vague about what you offer. "Let me know if you need help" is too weak. Be specific: "I can edit your essay and send it back in 48 hours for $50."',
        'Not following up. If someone expressed interest but did not respond to your last message, send one polite follow-up a few days later. Many sales happen on the follow-up.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'who_contacted',
        label: 'Who did you contact?',
        type: 'textarea',
        placeholder: 'e.g., Posted in 3 Facebook groups, messaged 10 people on Reddit, asked 5 friends to refer me',
        helpText: 'List where and how many people you reached out to.',
        howToFill: {
          guidanceText: 'Be specific. List each channel and the number of people. "Posted in College Admissions Moms Facebook group (15k members), commented on 5 posts in r/ApplyingToCollege, DMed 8 people who posted asking for essay help, asked 4 friends to tell people about me." Aim for 15+ total contacts.',
        },
      },
      {
        fieldName: 'responses',
        label: 'What responses did you get?',
        type: 'textarea',
        placeholder: 'e.g., 2 people interested, 1 booked a call, 8 no responses',
        helpText: 'How many people responded? How many were interested?',
        howToFill: {
          guidanceText: 'Be honest about the numbers. Count: total contacted, total who responded, total who expressed interest, total who actually bought or booked. Low numbers are normal at first -- the data is what matters, not the outcome.',
        },
      },
      {
        fieldName: 'pricing',
        label: 'What are you charging?',
        type: 'text',
        placeholder: 'e.g., $50 per essay or Free for first 3 clients',
        helpText: 'What price did you tell people?',
        howToFill: {
          guidanceText: 'Write the actual number you told people. If you offered different prices to different people, write down each one. There is no wrong answer here -- just be honest about what you said. If you offered it for free, write that too.',
        },
      },
    ],
  },
  {
    id: 'client_ch5_delivery_system',
    pathId: 'client_services',
    sequence: 5,
    title: 'Delivery System',
    description: 'Create a process for how you deliver your service.',
    whatThisAchieves: 'You will have a clear process that makes delivering your service easier and faster.',
    completionCriteria: 'Done when you have documented your process from start to finish.',
    howTo: {
      intro: 'Right now you are probably figuring things out as you go with each client. That works for 1-2 clients, but quickly becomes exhausting. This chapter helps you write down a clear process so every client gets the same experience.',
      steps: [
        {
          title: 'Think about your last client from start to finish',
          body: 'Walk through everything that happened: how they found you, how they told you what they needed, how you did the work, how you delivered it, how you got paid. Write down every single step, even the small ones like "checked my email for their file."',
        },
        {
          title: 'Identify what was messy or slow',
          body: 'Look at your list of steps. Which ones took too long? Which ones caused confusion? Maybe you went back and forth 5 times about what they needed. Maybe you forgot to ask for payment. These are the steps you need to fix or simplify.',
          tip: 'The biggest time waste for most service providers is the back-and-forth at the start. Create a simple intake form or questionnaire that gets you everything you need upfront instead of asking questions one at a time.',
        },
        {
          title: 'Write down your ideal process',
          body: 'Now write the process you WISH had happened. Make it clear enough that if someone else had to follow your steps, they could deliver the same result. Number each step. Include how the client communicates with you, how you deliver the work, and how you get paid.',
          tip: 'Keep it simple. 5-7 steps is ideal. If your process has 15 steps, you are overcomplicating it.',
        },
      ],
      commonMistakes: [
        'Skipping this chapter because you think your service is too simple for a process. Even "simple" services benefit from consistency.',
        'Making the process too rigid. Leave room for small adjustments, but have a default flow.',
        'Forgetting about the payment step. Decide when you get paid (upfront, after delivery, 50/50) and stick to it.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'process_steps',
        label: 'What are the steps?',
        type: 'textarea',
        placeholder: 'e.g., 1) Client sends essay, 2) I read and make notes, 3) I edit with tracked changes, 4) I send back with explanation',
        helpText: 'List the steps you follow from getting a client to finishing the work.',
        howToFill: {
          guidanceText: 'Write numbered steps. Start from "Client reaches out" and end with "Work is done and paid for." Include: how they contact you, how you learn what they need, how you do the work, how you deliver it, and how you get paid.',
          exampleThought: 'Thinking process: "1) Client fills out my Google Form with their essay and deadline, 2) I confirm within 24 hours and send payment link, 3) They pay upfront, 4) I read the essay and make notes, 5) I edit with tracked changes in Google Docs, 6) I send back with a short summary of what I changed and why."',
        },
      },
      {
        fieldName: 'how_long',
        label: 'How long does it take?',
        type: 'text',
        placeholder: 'e.g., 2-3 hours per essay',
        helpText: 'How much time does one client take?',
        howToFill: {
          guidanceText: 'Include ALL the time, not just the "doing the work" time. Count the time you spend communicating, setting up, reviewing, and following up. This number tells you how many clients you can handle per week.',
        },
      },
    ],
  },
  {
    id: 'client_ch6_scale_or_specialise',
    pathId: 'client_services',
    sequence: 6,
    title: 'Scale or Specialise',
    description: 'Decide if you want to do more of the same or focus on a specific type of client.',
    whatThisAchieves: 'You will have a clear plan for growing this service.',
    completionCriteria: 'Done when you decide to scale (more clients) or specialise (specific niche).',
    howTo: {
      intro: 'You have a working service and a delivery process. Now you have a real decision to make: do you take on more clients of all types, or do you narrow down to serve one specific type really well? Here is how to think about it.',
      steps: [
        {
          title: 'Look at which clients gave you the best results',
          body: 'Go through all the clients you have worked with. Which ones were the easiest? Which ones paid the most? Which ones were happiest with the result? Which type of work did you enjoy most? Look for patterns -- often one type of client is clearly better than the rest.',
        },
        {
          title: 'Understand the trade-off',
          body: 'Scaling means taking on more clients of all types. It makes more money faster but you spread yourself thin. Specialising means picking one type and becoming the go-to person for that niche. It is slower at first but you can charge more and work is easier because you get really good at one thing.',
          tip: 'If you are unsure, specialise. Most beginners make the mistake of staying too broad. The riches are in the niches.',
        },
        {
          title: 'Make a plan for the next 30 days',
          body: 'If scaling: decide how many more clients you want and where you will find them. If specialising: decide which niche, update your messaging, and find where THOSE specific clients hang out. Either way, write down 3 concrete actions you will take in the next 30 days.',
        },
      ],
      commonMistakes: [
        'Trying to do both at the same time. Pick one direction and commit to it for at least 30 days.',
        'Specialising based on what sounds cool instead of what the data shows. Look at your actual clients and results.',
        'Being afraid to turn away clients who do not fit your niche. Saying no to bad-fit clients frees up time for good-fit clients.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'decision',
        label: 'Scale or specialise?',
        type: 'textarea',
        placeholder: 'e.g., Specialising in essays for engineering schools because those clients pay more',
        helpText: 'Are you taking on more clients of all types, or focusing on one specific type?',
        howToFill: {
          guidanceText: 'State your choice clearly and explain why. Reference actual data from your experience: "I am specialising in [niche] because [what you observed]" or "I am scaling because [reason]."',
        },
      },
      {
        fieldName: 'reason',
        label: 'Why this choice?',
        type: 'textarea',
        placeholder: 'e.g., Engineering students have more money and specific needs I can serve well',
        helpText: 'What led you to this decision?',
        howToFill: {
          guidanceText: 'Point to specific evidence. Which clients were best? What patterns did you see? What do you enjoy most? Decisions based on real experience are better than decisions based on what sounds good.',
        },
      },
    ],
  },
]
