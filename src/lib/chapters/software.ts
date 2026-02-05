import type { Chapter } from './types'

export const SOFTWARE_CHAPTERS: Chapter[] = [
  {
    id: 'software_ch1_idea_creation',
    pathId: 'software_digital_product',
    sequence: 1,
    title: 'Idea Creation',
    description: 'Define what you want to build and who it is for.',
    whatThisAchieves: 'You will have a clear idea of what you are making, who needs it, and what problem it solves.',
    completionCriteria: 'Done when you have defined: what you want to build, who it is for, and what problem it solves.',
    howTo: {
      intro: 'You do not need a genius idea. You need a clear idea. Most successful products solve a boring, specific problem for a specific group of people. Here is how to find yours.',
      steps: [
        {
          title: 'Start with problems you have experienced yourself',
          body: 'Think about times you were frustrated, wasted time, or wished something existed. What annoying task do you do every week? What tool did you search for and could not find? What process at work or school is unnecessarily painful? Your own frustrations are the best starting point because you deeply understand the problem.',
          tip: 'Write down 5 frustrations you have had in the past month. Do not filter them -- just list them. Then pick the one that other people probably have too.',
        },
        {
          title: 'Check if other people have this problem',
          body: 'Search online for your problem. Google it. Search Reddit, Twitter, forums. Look for people complaining about the same thing. If you find lots of people frustrated about it, that is a good sign. If you cannot find anyone else with this problem, it might be too niche.',
          tip: 'Search phrases like "[your problem] solution" or "[your problem] app" or "[your problem] tool" to see if anything exists. If competitors exist, that is actually a good sign -- it means people pay to solve this problem.',
        },
        {
          title: 'Describe your idea in one sentence',
          body: 'Write one sentence: "[Product name] helps [specific type of person] [do something specific] so they [get a specific result]." If you cannot fit it in one sentence, your idea is too complicated. Simplify it.',
        },
      ],
      commonMistakes: [
        'Trying to build something for "everyone." The best products start by solving one problem for one type of person extremely well.',
        'Starting with a technology ("I want to build an AI app") instead of a problem ("people waste 3 hours a week on this task"). Always start with the problem.',
        'Picking an idea because it sounds impressive instead of because you actually understand the problem. Build what you know.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'product_idea',
        label: 'What do you want to build?',
        type: 'textarea',
        placeholder: 'e.g., An app that helps students track their study time and stay focused',
        helpText: 'Describe the thing you want to make in one or two sentences.',
        howToFill: {
          guidanceText: 'Describe what the product DOES, not what it IS. Instead of "a productivity platform" say "a timer that blocks distracting websites while you study." Be specific about the action it performs.',
          exampleThought: 'Thinking process: "I keep getting distracted when studying. I have tried other apps but they are too complicated. I want something dead simple -- just a timer that shows how long I have actually studied today and blocks social media while the timer is running."',
        },
      },
      {
        fieldName: 'target_user',
        label: 'Who is this for?',
        type: 'textarea',
        placeholder: 'e.g., High school students who get distracted easily when studying',
        helpText: 'Be specific about who will use this.',
        howToFill: {
          guidanceText: 'Describe a real person, not a category. Instead of "students" say "high school students who get distracted by their phone when they should be studying for exams." You should be able to picture this person in your head.',
          exampleThought: 'Thinking process: "Who has this problem the worst? College students who live alone and have nobody watching them. They sit down to study, open their laptop, and suddenly it is 2 hours later and they have been on YouTube. That is my person."',
        },
      },
      {
        fieldName: 'problem',
        label: 'What problem does this solve?',
        type: 'textarea',
        placeholder: 'e.g., They lose track of time and do not know if they are actually studying or just scrolling',
        helpText: 'What frustrates these people? What do they struggle with?',
        howToFill: {
          guidanceText: 'Describe the problem in their words, not yours. How would THEY describe their frustration to a friend? Use plain language. If you are not sure, search for people complaining about this problem online and borrow their language.',
        },
      },
    ],
  },
  {
    id: 'software_ch2_idea_shaping',
    pathId: 'software_digital_product',
    sequence: 2,
    title: 'Idea Shaping',
    description: 'Narrow your idea to the smallest version that could work.',
    whatThisAchieves: 'You will know exactly what you are building first, and what you are NOT building.',
    completionCriteria: 'Done when you have defined: the core feature, what you are NOT building, and why this version is small enough to start.',
    howTo: {
      intro: 'Your idea is probably too big right now. Every first-time builder tries to build too much. This chapter forces you to cut your idea down to the smallest thing that could possibly work. Smaller is better because you can build it faster, test it sooner, and learn what actually matters.',
      steps: [
        {
          title: 'Ask: what is the ONE thing this needs to do?',
          body: 'If your product could only do one single thing, what would it be? Not two things, not three -- one. That is your core feature. Everything else is a distraction right now. For a study timer, the one thing is: track study time. Not analytics, not social features, not gamification -- just track time.',
          tip: 'A good test: if you removed this feature, would the product be useless? If yes, it is a core feature. If the product still works without it, cut it.',
        },
        {
          title: 'Write a "NOT building" list',
          body: 'This is just as important as deciding what to build. Write down every feature you have thought about and explicitly say "not building this yet." This list protects you from feature creep -- the slow, deadly process of adding "just one more thing" until you have been building for 6 months with nothing to show.',
        },
        {
          title: 'Make sure you can build it in 2-4 weeks',
          body: 'Look at your core feature. Can you build a working (not pretty, not perfect -- working) version in 2-4 weeks? If not, you have not cut enough. Keep removing things until the answer is yes. The point is to get something into people\'s hands as fast as possible.',
          tip: 'If you cannot code, your first version might be a spreadsheet, a no-code tool (Bubble, Notion, Airtable), or even a manual process you do by hand. The first version does not need to be an app.',
        },
      ],
      commonMistakes: [
        'Building the "real" version instead of the smallest version. Your first version should feel embarrassingly simple.',
        'Adding features because they are easy to build, not because they are needed. Just because you CAN build it does not mean you should.',
        'Spending weeks designing before building anything. Build something ugly that works. Make it pretty later.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'core_feature',
        label: 'What is the one main thing it does?',
        type: 'textarea',
        placeholder: 'e.g., Tracks study time with a simple timer and shows daily total',
        helpText: 'If you could only build ONE feature, what would it be?',
        howToFill: {
          guidanceText: 'Describe the single most important action a user takes. Use a verb: "tracks...", "sends...", "connects...", "generates..." If you need the word "and" in your description, you probably have two features and should pick one.',
        },
      },
      {
        fieldName: 'not_building',
        label: 'What are you NOT building?',
        type: 'textarea',
        placeholder: 'e.g., No social features, no analytics, no gamification, no calendar integration',
        helpText: 'List features you are deliberately leaving out for now.',
        howToFill: {
          guidanceText: 'List every feature you have thought about that is NOT the core feature. Writing them down and explicitly saying "no" makes it easier to resist adding them later. Be specific: "No user profiles, no sharing, no mobile app, no payment processing."',
        },
      },
      {
        fieldName: 'why_small_enough',
        label: 'Why is this version small enough?',
        type: 'textarea',
        placeholder: 'e.g., I can build a working timer in a weekend and test if people actually use it',
        helpText: 'What makes this version achievable?',
        howToFill: {
          guidanceText: 'Explain why you can realistically build this in 2-4 weeks. If you cannot, go back and cut more features. Name the tools you will use and roughly how long each part takes. The goal is confidence that you can ship something soon.',
        },
      },
    ],
  },
  {
    id: 'software_ch3_idea_validation',
    pathId: 'software_digital_product',
    sequence: 3,
    title: 'Idea Validation',
    description: 'Talk to real people and see if they care about this problem.',
    whatThisAchieves: 'You will know if people actually want this, or if you need to change direction.',
    completionCriteria: 'Done when you have logged reactions from real people and made a decision to continue or change direction.',
    howTo: {
      intro: 'This is the chapter most people skip, and it is the reason most products fail. You need to find out if real humans actually care about the thing you want to build. Here is how to do it without it feeling weird.',
      steps: [
        {
          title: 'Make a list of 10 people who might have this problem',
          body: 'Think about who you said your product is for in Chapter 1. Now think of 10 actual human beings who match that description. They can be people you know, people in online communities, or people you could reach on social media. Write down their names or usernames.',
          tip: 'If you cannot think of 10 people, that is a red flag. It might mean the problem is not common enough, or you do not know where these people are. Both are important to discover now, not after you build something.',
        },
        {
          title: 'Talk to them -- do not survey them',
          body: 'Reach out and have a real conversation. Do NOT send a survey or a Google Form -- those get polite answers, not real ones. Say something like "Hey, I am trying to understand how people deal with [problem]. Can I ask you a few questions?" Then listen. Let them talk. Take notes.',
          tip: 'The number one mistake: describing your idea and asking "would you use this?" Everyone says yes to be polite. Instead ask "how do you deal with [problem] today?" and "what have you tried?" Their current behavior tells you more than their promises.',
        },
        {
          title: 'Write down their exact words',
          body: 'After each conversation, write down what they actually said. Not your interpretation -- their real words. Did they say "yeah that sounds cool" (polite but not interested) or did they say "oh my god, I was just searching for something like that yesterday" (actually interested)? The difference matters enormously.',
        },
        {
          title: 'Make an honest decision',
          body: 'Look at what people actually said. If most people shrugged, that is useful information. If even 2 out of 10 people got genuinely excited, that might be enough to keep going. The goal is not to get permission to build -- it is to learn whether the problem is real and painful enough that people would use a solution.',
          tip: 'It is okay to decide to change your idea based on what you learn. That is not failure -- that is the whole point of talking to people before spending weeks building.',
        },
      ],
      commonMistakes: [
        'Only talking to friends and family. They will be nice to you. Talk to strangers who have no reason to spare your feelings.',
        'Describing your solution instead of asking about their problem. You want to validate the PROBLEM exists, not your specific solution to it.',
        'Talking to 1-2 people and calling it done. You need at least 5 real conversations to see patterns.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'who_talked_to',
        label: 'Who did you talk to?',
        type: 'textarea',
        placeholder: 'e.g., 5 students from my school, 3 people in study Discord servers',
        helpText: 'List the people or groups you talked to.',
        howToFill: {
          guidanceText: 'List real people or real communities. "I posted in a Discord server for students and got 4 replies" counts. "I thought about what people might say" does not count. You need actual conversations, not imagined ones.',
        },
      },
      {
        fieldName: 'what_they_said',
        label: 'What did they say?',
        type: 'textarea',
        placeholder: 'e.g., 4 people said they already use other apps, 2 people said they would try it, 1 person asked if it works on phone',
        helpText: 'Summarize the reactions. Be honest about negative feedback.',
        howToFill: {
          guidanceText: 'Write their actual reactions, including the negative ones. Sort them into categories: excited (actively want this), interested (would try it), indifferent (did not care), or negative (said something critical). Be brutally honest with yourself.',
        },
      },
      {
        fieldName: 'decision',
        label: 'What are you doing next?',
        type: 'textarea',
        placeholder: 'e.g., Building it because 2 people want to try it, or changing the idea because nobody cared',
        helpText: 'Based on what you learned, what is your decision?',
        howToFill: {
          guidanceText: 'State your decision clearly: continue as planned, change direction (and what you are changing), or try a different idea entirely. Then explain WHY based on what people told you. No decision is wrong as long as it is based on real feedback.',
        },
      },
    ],
  },
  {
    id: 'software_ch4_first_version',
    pathId: 'software_digital_product',
    sequence: 4,
    title: 'First Version',
    description: 'Build the smallest version that someone can actually use.',
    whatThisAchieves: 'You will have something real that works, even if it is basic.',
    completionCriteria: 'Done when a minimal usable version exists (not full product).',
    howTo: {
      intro: 'Time to build. But remember: you are not building the final product. You are building the first version -- the one that is ugly, basic, and just barely works. That is exactly what you want.',
      steps: [
        {
          title: 'Choose the simplest tool that works',
          body: 'If you can code, pick a framework you already know. Do not learn a new one for this project. If you cannot code, use no-code tools: Bubble for web apps, Notion or Airtable for data-heavy tools, Carrd for landing pages, or Zapier to connect things together. The tool does not matter -- shipping something does.',
          tip: 'Your first version can be surprisingly low-tech. A "meal planning app" could start as a Google Sheet you share with people. A "client scheduling tool" could start as a Calendly link. Use what you have.',
        },
        {
          title: 'Build only the core feature from Chapter 2',
          body: 'Go back to your Chapter 2 answers. Build ONLY the one core feature you defined. Nothing else. No settings page, no user accounts (unless absolutely necessary), no fancy design. Make it work first. Make it pretty never (or much later).',
        },
        {
          title: 'Get it to a point where ONE person can use it',
          body: 'Your first version is done when one real human being (not you) could use it to solve their problem. It does not need to be online. It does not need to handle 1000 users. It just needs to work for one person, one time. Ship it.',
          tip: 'If you have been building for more than 3 weeks and it is still not usable by anyone, you are overbuilding. Cut features until someone can use it today.',
        },
      ],
      commonMistakes: [
        'Spending weeks on design before the thing works. Function first, then form.',
        'Learning a new programming language or framework for this project. Use what you already know.',
        'Waiting until it is "ready." It will never feel ready. Ship it when it works, not when it is perfect.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'what_built',
        label: 'What did you build?',
        type: 'textarea',
        placeholder: 'e.g., A simple webpage with a timer and a display of total hours studied today',
        helpText: 'Describe what you made. Keep it simple.',
        howToFill: {
          guidanceText: 'Describe what it does, what tools you used, and what it looks like. Be honest about how basic it is -- that is the point. "I built a simple timer using HTML/CSS/JavaScript that tracks study time and shows a daily total. It looks ugly but it works."',
        },
      },
      {
        fieldName: 'where_access',
        label: 'Where can someone use it?',
        type: 'text',
        placeholder: 'e.g., studytimer.com or Link to Google Drive or Installed on my computer',
        helpText: 'How do people access this?',
      },
      {
        fieldName: 'what_missing',
        label: 'What is still missing?',
        type: 'textarea',
        placeholder: 'e.g., No save feature, no history, timer resets if you close the page',
        helpText: 'List what does not work yet or is missing.',
        howToFill: {
          guidanceText: 'Be honest about what is broken or missing. This is not a failure list -- it is a prioritization tool. After you get feedback from users, some of these "missing" features will turn out to be unnecessary, and others will turn out to be critical.',
        },
      },
    ],
  },
  {
    id: 'software_ch5_first_users',
    pathId: 'software_digital_product',
    sequence: 5,
    title: 'First Users',
    description: 'Get real people using it and collect their feedback.',
    whatThisAchieves: 'You will know if people actually use it and what needs to change.',
    completionCriteria: 'Done when real people are using it and feedback is logged.',
    howTo: {
      intro: 'You have built something. Now you need to put it in front of real people and see what happens. This is scary because they might not like it. But that feedback is exactly what you need.',
      steps: [
        {
          title: 'Go back to the people you talked to in Chapter 3',
          body: 'Remember the people who were interested when you described the idea? Contact them first. Send them the link or invite them to try it. Say something like: "Hey, remember when we talked about [problem]? I actually built something. Would you try it and tell me what you think? It is very basic right now -- I want honest feedback."',
          tip: 'Ask them to use it while you watch (in person or screen share). Watching someone use your product is 10x more valuable than hearing them describe it afterward. You will see where they get confused, what they click on, and what they ignore.',
        },
        {
          title: 'Share it in communities where your target users hang out',
          body: 'Post in the same communities where you validated the idea. Do not be salesy -- be honest: "I built a free tool that does [thing]. Looking for people to try it and give me feedback." People in niche communities are usually happy to help someone building something for them.',
        },
        {
          title: 'Track what people actually DO, not just what they SAY',
          body: 'People will say "cool!" but never use it again. What matters is behavior: did they come back a second time? Did they use the core feature? How long did they spend? If you can, add basic tracking (even just a page view counter). If not, ask them directly: "Did you use it again after the first time?"',
          tip: 'The most important metric at this stage is retention. Getting 100 people to try it means nothing if nobody comes back. Getting 3 people who use it every day is a much stronger signal.',
        },
      ],
      commonMistakes: [
        'Asking "do you like it?" -- this is a useless question because everyone says yes. Ask "did you use it more than once?" instead.',
        'Getting discouraged by small numbers. 3 real users who keep coming back is better than 100 signups who never use it.',
        'Immediately building requested features without checking if other users want them too. One person\'s request is not a pattern.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'how_many_users',
        label: 'How many people tried it?',
        type: 'text',
        placeholder: 'e.g., 3 people',
        helpText: 'Count the number of people who actually used it.',
      },
      {
        fieldName: 'did_they_use_it',
        label: 'Did they actually use it?',
        type: 'textarea',
        placeholder: 'e.g., 1 person used it twice, 2 people tried it once and stopped',
        helpText: 'Be honest. Did they come back? Or did they try it once and never again?',
        howToFill: {
          guidanceText: 'Be brutally honest. For each person, note: did they try it? Did they come back? How many times? If they stopped, do you know why? "1 person used it 4 times and said they liked it. 2 people tried it once and never came back. 1 person said it was too confusing."',
        },
      },
      {
        fieldName: 'feedback',
        label: 'What feedback did you get?',
        type: 'textarea',
        placeholder: 'e.g., Said it was too basic, asked for phone app, one person said they liked the simplicity',
        helpText: 'What did people say? What did they want changed?',
        howToFill: {
          guidanceText: 'Write down actual quotes from users. Separate the feedback into: things they liked, things they did not like, things they asked for, and things they found confusing. Look for patterns -- if 3 people say the same thing, pay attention.',
        },
      },
    ],
  },
  {
    id: 'software_ch6_direction_decision',
    pathId: 'software_digital_product',
    sequence: 6,
    title: 'Direction Decision',
    description: 'Decide if you are doubling down, changing direction, or stopping.',
    whatThisAchieves: 'You will have a clear decision about what to do next.',
    completionCriteria: 'Done when you choose to double down, change direction, or stop.',
    howTo: {
      intro: 'You have built something, put it in front of people, and collected feedback. Now it is time to be honest with yourself about what the data is telling you. There are three options, and all of them are valid.',
      steps: [
        {
          title: 'Review your evidence honestly',
          body: 'Look at everything from Chapters 3-5. How many people cared about the problem? How many tried your product? How many came back? Write down the honest numbers. Do not count "interested" as "committed." Only count people who actually used it.',
        },
        {
          title: 'Apply the three-option framework',
          body: 'Double down: people are using it and coming back. There is clear demand. Build more of what works. Change direction: the problem is real but your solution is wrong. Keep the audience, change the product. Or keep the product type, change the audience. Stop: nobody cares about the problem, or you do not enjoy working on this. Both are valid reasons to stop.',
          tip: 'Stopping is not failure. Building 5 things and stopping 4 of them is normal. The only real failure is spending a year on something nobody wants because you were too attached to quit.',
        },
        {
          title: 'Make a concrete plan for the next 30 days',
          body: 'Whatever you decide, write down exactly what you will do in the next 30 days. If doubling down, what features will you build? If changing direction, what will you change and how will you test it? If stopping, what will you try next? Be specific.',
        },
      ],
      commonMistakes: [
        'Interpreting polite interest as real demand. "That sounds cool" is not the same as "I would pay for this."',
        'Refusing to stop because you already put work in. Sunk cost is not a reason to continue.',
        'Making this decision alone in your head without looking at the actual data. Let the numbers decide, not your feelings.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'decision',
        label: 'What are you doing?',
        type: 'textarea',
        placeholder: 'e.g., Doubling down and building more features, or Changing to focus on phone app instead, or Stopping because nobody used it',
        helpText: 'Pick one: double down, change direction, or stop. Explain why.',
        howToFill: {
          guidanceText: 'State your choice clearly in one sentence, then explain why. Reference specific evidence: "I am doubling down because 3 out of 5 users came back multiple times" or "I am stopping because nobody used it more than once despite 10 people trying it."',
        },
      },
      {
        fieldName: 'reason',
        label: 'Why this decision?',
        type: 'textarea',
        placeholder: 'e.g., People keep coming back to use it, or Nobody used it more than once',
        helpText: 'What information led to this decision?',
        howToFill: {
          guidanceText: 'List the key pieces of evidence. How many people tried it? How many came back? What did they say? What patterns did you see? The best decisions are boring because they are obvious from the data.',
        },
      },
    ],
  },
]
