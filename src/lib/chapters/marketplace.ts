import type { Chapter } from './types'

export const MARKETPLACE_CHAPTERS: Chapter[] = [
  {
    id: 'marketplace_ch1_concept',
    pathId: 'marketplace',
    sequence: 1,
    title: 'Marketplace Concept - Define what you are connecting and why it needs a marketplace',
    description: 'Define what you are connecting and why it needs a marketplace.',
    whatThisAchieves: 'You will have a clear idea of what your marketplace does.',
    completionCriteria: 'Done when you know who you are connecting, what transaction happens, and why a marketplace is needed.',
    howTo: {
      intro: 'A marketplace connects two groups of people who need each other but have trouble finding each other. Think Airbnb (hosts and guests), Uber (drivers and riders), or Etsy (crafters and buyers). Before you start building anything, you need to get crystal clear on who you are connecting, what they are exchanging, and why they cannot just find each other on their own. This chapter helps you figure out if you actually have a marketplace idea or something else entirely.',
      steps: [
        {
          title: 'Identify the two sides of your marketplace',
          body: 'Every marketplace has two distinct groups: people who provide something (supply) and people who want something (demand). Write down who these two groups are. Be specific about what kind of people they are. "Freelancers" is too vague. "Freelance graphic designers who specialize in logo design" is better. The more specific you are about both sides, the easier everything else becomes.',
          tip: 'If you can only think of one side, you might not have a marketplace idea. You might have a service business or a product business instead, and that is totally fine -- it just means a different path is a better fit.',
        },
        {
          title: 'Define what transaction happens between them',
          body: 'What are the two sides actually exchanging? This could be a service (tutoring sessions, rides, cleaning), a physical product (handmade goods, used items), or access to something (parking spots, storage space). Be specific about the transaction. "They connect" is not enough. You need to describe the actual exchange: "A homeowner lists their driveway, a commuter books it for the day and pays $10."',
          tip: 'If money is not changing hands, think carefully about whether this is a marketplace or a community. Marketplaces work because there is a transaction you can facilitate and eventually take a cut of.',
        },
        {
          title: 'Explain why they cannot just connect directly',
          body: 'This is the most important question. If the two sides can easily find each other without you, you do not have a marketplace opportunity. Good reasons a marketplace is needed: they do not know each other exists, there is no trust between strangers, comparing options is hard, or the logistics of the transaction are complicated. Bad reason: "it would be more convenient." Convenience alone is usually not enough to get two groups of people to change their behavior.',
        },
        {
          title: 'Test your idea against the "Craigslist test"',
          body: 'Could someone do this on Craigslist or Facebook Marketplace right now? If yes, why don\'t they? If the answer is "they do, and it works fine," then you might not have a strong enough reason to build a dedicated marketplace. But if the answer is "they try, but it is a bad experience because of trust issues, quality problems, or logistical headaches," then you might be onto something. The gap between what Craigslist offers and what people actually need is where marketplace opportunities live.',
          tip: 'Look at Craigslist categories, Facebook groups, and Reddit communities. If people are already doing informal versions of what you want to build, that is a great sign. It proves demand exists. Your job is to make the experience dramatically better.',
        },
      ],
      commonMistakes: [
        'Confusing a marketplace with a directory or listing site. A marketplace facilitates the actual transaction. A directory just lists options and says "good luck." If you are not involved in the exchange happening, you are building a directory, not a marketplace.',
        'Thinking you need to serve everyone from day one. The best marketplaces started with a tiny niche. Airbnb started with air mattresses during conferences. Start with the smallest, most specific version of your two-sided market.',
        'Assuming both sides want a marketplace. Sometimes one side is perfectly happy with the status quo. If landlords have no trouble finding tenants, they have no reason to join your rental marketplace. Make sure BOTH sides have a real pain point.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'connecting_who',
        label: 'Who are you connecting?',
        type: 'textarea',
        placeholder: 'e.g., Students who need tutoring and college students who want to tutor',
        helpText: 'Define both sides of your marketplace.',
        howToFill: {
          guidanceText: 'Describe both groups of people clearly. For each side, include who they are, what they need, and why they would join your marketplace. Be specific -- "dog owners who need a walker during work hours" is much better than "pet owners." The more specific you are, the easier it will be to find and recruit these people later.',
          exampleThought: 'Thinking process: "On one side I have busy professionals who travel frequently and need someone to watch their dog for a few days. On the other side I have dog lovers who have flexible schedules and would enjoy spending time with dogs while earning extra money. Both sides exist but they have no easy way to find and trust each other."',
        },
      },
      {
        fieldName: 'transaction',
        label: 'What transaction happens?',
        type: 'textarea',
        placeholder: 'e.g., Students book 1-hour tutoring sessions and pay tutors',
        helpText: 'What are people exchanging?',
        howToFill: {
          guidanceText: 'Describe the exact exchange step by step. What does one side offer? What does the other side pay or provide in return? How does the transaction actually work? For example: "A dog owner posts a request for dog sitting from Friday to Sunday. A dog sitter accepts the request. The owner drops off the dog and pays $40 per night through the platform."',
          exampleThought: 'Thinking process: "The transaction is simple: a student browses tutor profiles, picks one, books a 1-hour session for a specific time, and pays $25. The tutor shows up (in person or video call), delivers the session, and gets paid minus our fee. The key is that money and a service are both changing hands."',
        },
      },
      {
        fieldName: 'why_marketplace',
        label: 'Why is a marketplace needed?',
        type: 'textarea',
        placeholder: 'e.g., Students do not know which tutors are good, tutors do not know how to find students',
        helpText: 'Why cannot they just connect directly?',
        howToFill: {
          guidanceText: 'Explain the specific friction that prevents these two groups from finding each other and transacting today. Good answers include: they do not know each other exists, there is no way to verify quality or build trust, the search process is painful, or coordinating the logistics is a hassle. Be honest -- if the answer is "they can connect directly pretty easily," then you may not need a marketplace.',
          exampleThought: 'Thinking process: "Right now students ask friends for tutor recommendations, but most students do not know anyone who tutors. Tutors post flyers on campus but only reach people who walk past that specific bulletin board. Neither side has a way to check if the other is reliable. A student has no idea if a random tutor is actually good, and a tutor has no idea if a student will actually show up and pay."',
        },
      },
    ],
  },
  {
    id: 'marketplace_ch2_which_side_first',
    pathId: 'marketplace',
    sequence: 2,
    title: 'Which Side First - Pick which side you will get first',
    description: 'Pick which side of the marketplace you will recruit first.',
    whatThisAchieves: 'You will have a strategy for solving the chicken-and-egg problem.',
    completionCriteria: 'Done when you choose to start with supply or demand and explain why.',
    howTo: {
      intro: 'Every marketplace faces the chicken-and-egg problem: buyers will not come if there are no sellers, and sellers will not come if there are no buyers. You cannot launch both sides at once -- you have to pick one side to get first. This is one of the most important decisions you will make, and there is no single right answer. But there are smart ways to think through it.',
      steps: [
        {
          title: 'Understand the supply-first vs demand-first tradeoff',
          body: 'Most successful marketplaces start with supply (the people who provide the service or product). The logic is simple: if you have great supply ready and waiting, you can attract demand by showing them options. Nobody searches an empty marketplace. But sometimes demand-first makes more sense -- if you can show providers that paying customers are already waiting, they will rush to join. Think about which side would be more motivated by seeing the other side already present.',
          tip: 'A good rule of thumb: start with whichever side is harder to get. If finding quality tutors is hard but finding students is easy, get the tutors first. The hard side is usually more valuable, and once you have them, the easy side follows.',
        },
        {
          title: 'Ask which side has more to gain',
          body: 'Think about which side benefits more from your marketplace. If you are building a marketplace for freelance translators, the translators might benefit enormously because finding clients is their biggest challenge. But if clients already have agencies they use, they might not need you as much. Start with the side that gains the most from your platform -- they will be the most motivated to join even when the other side is not there yet.',
        },
        {
          title: 'Consider who you can access more easily',
          body: 'Be practical. Which group can you actually reach? If you are a college student building a tutoring marketplace, you probably know tutors personally but might not know parents looking for tutoring. Start with the group you can realistically recruit in the next two weeks. Do not pick the theoretically "best" side if you have no way to reach them.',
          tip: 'Your personal network matters a lot at this stage. If you know 5 people on one side, start there. You can always pivot your strategy later, but right now you need to get moving with whatever you have access to.',
        },
        {
          title: 'Plan what you will tell the first side',
          body: 'The first people you recruit are joining an empty marketplace. You need a compelling pitch for why they should join anyway. Good approaches: "Join now and be one of the first -- you will get all the early customers." Or: "I will personally make sure you get your first 3 customers." Or: "It is free to list right now, and I will feature you prominently when we launch." Give them a reason to take a chance on you before the other side shows up.',
        },
      ],
      commonMistakes: [
        'Trying to launch both sides at the same time. This almost never works because you spread yourself too thin. Focus on one side, get them locked in, then go get the other.',
        'Choosing based on which side is more exciting to you instead of which side is more practical to recruit. Your personal enthusiasm does not help if you cannot reach those people.',
        'Not giving the first side a reason to stay while the other side is empty. If you recruit 10 tutors but have no students for a month, those tutors will leave. Have a plan to keep them engaged.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'which_side',
        label: 'Which side will you get first?',
        type: 'text',
        placeholder: 'e.g., Supply (tutors) first',
        helpText: 'Pick supply or demand and name the group.',
        howToFill: {
          guidanceText: 'State clearly whether you are starting with supply or demand, and name the specific group. For example: "Supply first -- freelance photographers" or "Demand first -- small businesses looking for logos." Do not say "both" -- the whole point of this chapter is to pick one.',
          exampleThought: 'Thinking process: "I am going to start with supply -- the tutors. I know several college students who would tutor, and I can recruit them from my university. Once I have 10 solid tutors with profiles, I can show that to parents and students as proof this platform has real, vetted tutors available."',
        },
      },
      {
        fieldName: 'why_this_side',
        label: 'Why are you starting with this side?',
        type: 'textarea',
        placeholder: 'e.g., If I have 10 good tutors ready, students will actually book sessions',
        helpText: 'Explain your reasoning.',
        howToFill: {
          guidanceText: 'Give 2-3 concrete reasons. Think about: which side you can actually reach, which side benefits more from your platform, and what story you can tell the other side once this side is in place. A strong answer sounds like: "I am starting with tutors because (1) I know 5 personally, (2) tutors struggle to find clients so they are motivated, and (3) I can show students a page of available tutors as proof the platform works."',
          exampleThought: 'Thinking process: "If I have 10 good tutors ready, students will actually see value when they visit. An empty marketplace with no tutors would make students leave immediately. Plus, tutors are motivated to join because they need clients. Students are not searching for a tutoring platform -- they need to be shown one that already has options."',
        },
      },
    ],
  },
  {
    id: 'marketplace_ch3_first_side',
    pathId: 'marketplace',
    sequence: 3,
    title: 'First Side - Get your first group on one side',
    description: 'Recruit your first group of suppliers or buyers.',
    whatThisAchieves: 'You will have supply or demand ready.',
    completionCriteria: 'Done when you have at least 5-10 people on your first side.',
    howTo: {
      intro: 'Now you need to actually go out and get people to join your marketplace. This is hands-on, often uncomfortable work. You are not going to run ads or build a viral loop -- you are going to personally reach out to people, one by one, and convince them to join something that does not exist yet. This is how every successful marketplace started. Airbnb founders went door to door. DoorDash founders called restaurants one at a time. You are going to do the same thing at a smaller scale.',
      steps: [
        {
          title: 'Make a list of 20-30 potential recruits',
          body: 'Write down every person you can think of who fits the profile of your first side. Include people you know personally, people in online communities you belong to, people in local groups, and people you could reach through mutual connections. You need a list of at least 20 because not everyone will say yes -- expect a 25-50% success rate at best.',
          tip: 'Do not just think about people you know directly. Think about who THEY know. Ask friends: "Do you know anyone who does [thing]?" One introduction from a trusted friend is worth 10 cold messages.',
        },
        {
          title: 'Craft a simple pitch that explains what is in it for them',
          body: 'Your pitch should answer one question: "Why should I join this when there is nobody on the other side yet?" Good pitches include concrete benefits: "You will be one of our first 10 tutors, which means you get featured at the top of the page when students start searching." Or: "I will personally find you your first 3 clients." Do not talk about your vision for the company -- talk about what they get out of it right now. Keep it to 3-4 sentences.',
          tip: 'The best pitch often includes a personal guarantee. "If you do not get at least one booking in the first month, I will refund your time." You are asking people to take a risk on you, so reduce that risk as much as you can.',
        },
        {
          title: 'Reach out personally -- no mass emails or generic posts',
          body: 'Send individual messages to each person on your list. Use whatever channel they are most active on: text, Instagram DM, LinkedIn message, email. Personalize each message -- mention something specific about them. "Hey Sarah, I know you have been tutoring math on the side. I am building something that could help you find more students..." is much better than "Dear freelancer, we have an exciting new platform."',
        },
        {
          title: 'Help them get set up and make it as easy as possible',
          body: 'When someone says yes, do not just send them a link and hope for the best. Walk them through the signup process. If they need to create a profile, offer to help them write it. If they need to upload photos, give them tips. The fewer barriers, the more people actually complete the process. At this stage, you should be willing to do things that do not scale -- even filling out their profile for them based on a quick phone call.',
          tip: 'Keep track of everyone who says yes, everyone who says no, and everyone who says "maybe later." The "maybe later" people are your follow-up list for when you have the other side ready.',
        },
      ],
      commonMistakes: [
        'Posting in a Facebook group or subreddit and waiting for people to come to you. That is passive. You need to actively recruit people one by one at this stage.',
        'Giving up after 5 rejections. Rejection is normal. Most people will not join an empty marketplace. You need to find the early adopters who are willing to take a chance, and they are a small percentage of people you ask.',
        'Focusing on quantity over quality. Ten mediocre providers will hurt your marketplace more than three excellent ones. When the other side shows up, their first experience needs to be good or they will not come back.',
        'Not following up. People are busy. If someone does not respond, send a polite follow-up a few days later. Many people intend to respond but forget.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'how_many',
        label: 'How many people are on your first side?',
        type: 'text',
        placeholder: 'e.g., 8 tutors signed up',
        helpText: 'Give a number and who they are.',
        howToFill: {
          guidanceText: 'State the number and type of people who have actually signed up, not just people who said they were interested. "8 tutors have created profiles and are ready to accept bookings" counts. "15 people said they might join" does not count. Only count people who have completed whatever signup or onboarding process you have.',
          exampleThought: 'Thinking process: "I reached out to 22 tutors. 12 responded. 8 actually signed up and created profiles. 4 said they would think about it. That is a 36% conversion rate from outreach to signup, which feels about right for an early marketplace."',
        },
      },
      {
        fieldName: 'how_recruited',
        label: 'How did you recruit them?',
        type: 'textarea',
        placeholder: 'e.g., Posted in college Facebook groups offering tutors a way to find students',
        helpText: 'Describe exactly what you did to get these people.',
        howToFill: {
          guidanceText: 'Be specific about the channels and tactics you used. What did you say? Where did you post? Who did you message? What worked and what did not? This information is valuable because you will need to recruit more people later, so knowing what actually works saves you time. For example: "I messaged 15 tutors I found in campus Facebook groups. 6 joined. I also asked 3 friends who tutor and all 3 joined. The personal ask worked much better than the Facebook messages."',
        },
      },
    ],
  },
  {
    id: 'marketplace_ch4_second_side',
    pathId: 'marketplace',
    sequence: 4,
    title: 'Second Side - Now get the other side to join',
    description: 'Bring in the other side and facilitate your first transactions.',
    whatThisAchieves: 'You will have both sides present.',
    completionCriteria: 'Done when the second side shows up and completes at least one transaction.',
    howTo: {
      intro: 'You have one side of your marketplace populated. Now comes the moment of truth: bringing in the other side and making real transactions happen. This is exciting because it is the first time your marketplace actually functions as a marketplace. The key advantage you have now is proof -- you can show the second side that real providers (or buyers) are already waiting for them.',
      steps: [
        {
          title: 'Lead with your supply (or demand) as proof',
          body: 'Your biggest recruiting tool is the first side you already have. Instead of saying "join our marketplace," you can now say "we have 8 vetted tutors ready to help you right now." That is a completely different pitch. Show the second side exactly what is waiting for them. If you have tutor profiles, share screenshots. If you have product listings, share links. Make it real and tangible.',
          tip: 'Create a simple landing page, a shared document, or even just an Instagram post that showcases your first side. "Meet our first 8 tutors" with photos and short bios is incredibly powerful for recruiting students.',
        },
        {
          title: 'Go to where the second side already hangs out',
          body: 'Think about where the second side spends time, both online and offline. If you need students, go to study groups, campus events, and student Discord servers. If you need homeowners, try Nextdoor, local Facebook groups, and neighborhood events. Post where they already are -- do not expect them to find you.',
        },
        {
          title: 'Make the first transaction stupidly easy',
          body: 'Remove every possible barrier to the first transaction happening. If your platform is not built yet, match people manually. If payment is complicated, let them pay with Venmo or cash for now. If booking is confusing, do it for them. Your only goal right now is to make one real transaction happen between a real buyer and a real seller. You can automate everything later -- right now, just make it work by any means necessary.',
          tip: 'Be willing to be the middleman for early transactions. Text both parties, confirm the details, follow up afterward. It does not scale, but it does not need to. You need to prove the concept works before you worry about scale.',
        },
        {
          title: 'Follow up on every transaction and ask what happened',
          body: 'After each transaction, reach out to both sides and ask how it went. Was the tutor good? Was the student respectful? Did the payment work? Would they do it again? This feedback is gold. It tells you what is working, what is broken, and what you need to fix before trying to grow. Take notes on every single transaction.',
        },
      ],
      commonMistakes: [
        'Waiting until your platform is "ready" before bringing in the second side. Your platform does not need to be polished. It needs to work well enough for one transaction to happen. Use manual processes, spreadsheets, or group chats if your technology is not ready.',
        'Not personally facilitating the first few transactions. At this stage, you should be deeply involved in every transaction. Introduce buyers to sellers, check in during the process, and follow up afterward. You are the glue holding this together.',
        'Getting discouraged if the first few transactions are messy. They will be. That is normal. The first Uber rides were chaotic, the first Airbnb stays had issues. What matters is whether both sides are willing to do it again despite the messiness.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'how_many_second',
        label: 'How many people are on the second side?',
        type: 'text',
        placeholder: 'e.g., 12 students',
        helpText: 'Count the people who actually joined the other side.',
        howToFill: {
          guidanceText: 'Give the number of people on the second side who have actually signed up or engaged, not just people who heard about it. "12 students signed up and browsed tutor profiles" counts. "50 people saw my Instagram post" does not count. Be honest about the real number.',
          exampleThought: 'Thinking process: "I posted in 3 student groups and got about 30 people interested. Of those, 12 actually signed up and looked at tutor profiles. That is my real number -- 12 students on the platform."',
        },
      },
      {
        fieldName: 'transactions',
        label: 'How many transactions have happened?',
        type: 'text',
        placeholder: 'e.g., 5 tutoring sessions booked',
        helpText: 'Count completed transactions between the two sides.',
        howToFill: {
          guidanceText: 'Count only completed transactions where both sides followed through. A booking that got cancelled does not count. A tutoring session that actually happened counts. Be specific: "5 tutoring sessions were completed. 3 were repeat bookings from the same 2 students. 2 were new students trying it for the first time." This level of detail helps you understand what is really happening.',
          exampleThought: 'Thinking process: "We had 8 bookings attempted. 5 actually happened. 2 were cancelled because the student did not show up, and 1 was cancelled because the tutor was sick. So 5 completed transactions is my real number. Of those 5, 2 students have already booked a second session, which is encouraging."',
        },
      },
    ],
  },
  {
    id: 'marketplace_ch5_liquidity',
    pathId: 'marketplace',
    sequence: 5,
    title: 'Liquidity - Make sure both sides keep coming back',
    description: 'Measure whether your marketplace works without you manually running everything.',
    whatThisAchieves: 'You will know if your marketplace actually works without you manually matching people.',
    completionCriteria: 'Done when transactions happen regularly without you having to intervene.',
    howTo: {
      intro: 'Liquidity is the heartbeat of a marketplace. It means that when a buyer shows up, they can actually find what they need and complete a transaction without too much effort. When a seller lists something, it actually gets bought. A marketplace without liquidity is just a dead website with listings nobody uses. This chapter helps you figure out if your marketplace is truly alive or if you are keeping it on life support by doing everything manually.',
      steps: [
        {
          title: 'Track your key liquidity metrics',
          body: 'You need to measure a few things: How many transactions are happening per week? What percentage of buyers who search actually complete a transaction? What percentage of sellers actually get at least one sale or booking? How many transactions are repeat transactions? You do not need fancy analytics tools -- a simple spreadsheet works. The point is to see if numbers are going up, staying flat, or going down over the course of 2-4 weeks.',
          tip: 'The single most important number is the percentage of searches that result in a transaction. If people come looking and leave without transacting, your marketplace is not liquid enough. Either you do not have enough supply, the quality is not right, or the transaction process is too hard.',
        },
        {
          title: 'Identify where you are still doing things manually',
          body: 'Be honest: how many transactions happen because you personally made them happen? Are you introducing buyers to sellers? Are you reminding people to respond to messages? Are you following up to make sure transactions close? Write down every manual step you are doing. This is your "manual intervention list," and your goal over time is to make it shorter. But right now, just be aware of it.',
        },
        {
          title: 'Test what happens when you step back',
          body: 'Pick one week where you do not proactively match people or send reminders. Just let the marketplace run on its own and see what happens. Do transactions still occur? If they do, even at a lower rate, your marketplace has real liquidity. If transactions drop to zero the moment you stop intervening, you are the marketplace, not the platform -- and that is a problem you need to solve.',
          tip: 'If transactions drop to zero without you, do not panic. It just means you need to build better systems: automated notifications, better search, email reminders, or a simpler booking process. The goal is to replace your manual effort with features, one piece at a time.',
        },
        {
          title: 'Look for signs of organic growth',
          body: 'The best sign of a healthy marketplace is that people start showing up without you recruiting them. Ask new users how they heard about you. Are existing users telling their friends? Are sellers promoting their listings on social media and driving buyers to your platform? If any of this is happening, even at a small scale, it means the marketplace is starting to generate its own momentum. That is the magic moment.',
        },
      ],
      commonMistakes: [
        'Confusing signups with liquidity. Having 100 users signed up means nothing if only 3 of them are actually transacting. Focus on transaction activity, not registration numbers.',
        'Stepping back from manual intervention too early. You probably need to keep doing manual matching for longer than feels comfortable. The marketplace needs to reach a certain density before it works on its own. Pulling back too early can kill momentum.',
        'Ignoring the supply side after focusing on demand. If your early sellers are not getting transactions, they will leave. Check in with your supply side regularly and make sure they are getting value. Losing good supply is much harder to recover from than losing demand.',
        'Not asking users why they did not transact. If someone searched for a tutor but did not book, ask why. The answer might be "there were no tutors available at my time" or "the prices were too high" or "I could not figure out how to book." Each of these has a different solution.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'repeat_transactions',
        label: 'How many repeat transactions are happening?',
        type: 'text',
        placeholder: 'e.g., 10 sessions from repeat bookings',
        helpText: 'Count transactions from people who have used the marketplace more than once.',
        howToFill: {
          guidanceText: 'Count only transactions where at least one side is a returning user. "10 tutoring sessions this month, 7 of which were from students who booked before" is a great answer because it shows retention. If all your transactions are first-time users and nobody comes back, that is a warning sign. Be honest about the split between new and repeat usage.',
          exampleThought: 'Thinking process: "This month we had 15 completed sessions. 10 were from students who had booked before -- 4 students each booked 2-3 sessions. 5 were from brand new students. So about two-thirds of our transactions are repeat business. That tells me the experience is good enough for people to come back."',
        },
      },
      {
        fieldName: 'manual_intervention',
        label: 'How much are you still doing manually?',
        type: 'textarea',
        placeholder: 'e.g., Still introducing every tutor to students manually',
        helpText: 'Be honest about what still requires your personal involvement.',
        howToFill: {
          guidanceText: 'List every thing you are personally doing to keep transactions happening. Be brutally honest. Common manual tasks include: introducing buyers to sellers, reminding people to respond to messages, following up on uncompleted bookings, resolving disputes, onboarding new users, and promoting listings. Then note which of these you think the platform could handle automatically and which truly need a human touch. This list becomes your product roadmap.',
          exampleThought: 'Thinking process: "I am still sending a welcome message to every new student and suggesting 2-3 tutors based on their subject. I follow up after every session to make sure it went well. I also send a weekly email to tutors who have not gotten bookings. If I stopped doing these things, I think transactions would drop by about half. I need to automate the tutor recommendations and the post-session follow-up at minimum."',
        },
      },
    ],
  },
  {
    id: 'marketplace_ch6_growth_decision',
    pathId: 'marketplace',
    sequence: 6,
    title: 'Growth Decision - Decide how to grow both sides',
    description: 'Choose your strategy for scaling the marketplace.',
    whatThisAchieves: 'You will have a plan for scaling your marketplace.',
    completionCriteria: 'Done when you choose your growth strategy.',
    howTo: {
      intro: 'Your marketplace is working at a small scale. Transactions are happening, some people are coming back, and you have learned a lot about what both sides want. Now you need to decide how to grow. Growing a marketplace is different from growing a regular business because you have to grow two sides at once, and they need to stay roughly in balance. Too many buyers and not enough sellers leads to frustrated buyers. Too many sellers and not enough buyers leads to sellers leaving. This chapter helps you figure out which side to grow, how to grow it, and when to invest in technology versus keep doing things by hand.',
      steps: [
        {
          title: 'Figure out which side is your bottleneck',
          body: 'Look at your current marketplace and ask: which side is constraining growth right now? If buyers are searching but not finding what they want, you need more supply. If sellers are listing but nothing is selling, you need more demand. If both sides are transacting smoothly, look at which side would break first if you doubled the other side. That is your bottleneck, and that is where you should focus your growth efforts.',
          tip: 'A quick way to identify the bottleneck: ask both sides what they wish was different. If buyers say "I wish there were more options," your bottleneck is supply. If sellers say "I wish I had more customers," your bottleneck is demand. Listen to what they are telling you.',
        },
        {
          title: 'Choose your growth strategy for the bottleneck side',
          body: 'There are several proven strategies for growing each side of a marketplace. For growing supply: offer incentives for early sellers (reduced fees, featured placement), recruit from existing platforms where sellers already are (poach from Craigslist, Fiverr, etc.), or make it incredibly easy to list. For growing demand: create content that attracts buyers organically (SEO, social media), partner with organizations that have access to your buyers, or offer first-time buyer incentives. Pick one or two strategies and execute them well rather than trying everything at once.',
        },
        {
          title: 'Decide what to automate versus keep manual',
          body: 'Look at your manual intervention list from Chapter 5. Some of those manual tasks need to become automated features. Prioritize automating the things you do most frequently and that have the biggest impact on transactions happening. If you spend 2 hours a day matching buyers with sellers, build a basic recommendation or search feature. If you spend an hour a day sending reminders, set up automated emails. But keep doing manually anything that requires judgment, like quality control and dispute resolution -- those are too important to automate badly.',
          tip: 'Do not try to automate everything at once. Pick the one manual task that takes the most time and automate just that one thing. Then see how it goes before automating the next one. Bad automation is worse than manual work because it creates a bad user experience at scale.',
        },
        {
          title: 'Set concrete growth targets for the next 30 days',
          body: 'Write down specific numbers you want to hit in the next month. How many new suppliers? How many new buyers? How many transactions per week? Make these numbers realistic but ambitious. If you have 10 transactions a week now, aiming for 15-20 in a month is reasonable. Aiming for 500 is not. Having specific targets lets you measure whether your growth strategy is actually working or if you need to try something different.',
        },
      ],
      commonMistakes: [
        'Trying to grow both sides equally at the same time. At any given moment, one side is more important to grow than the other. Focus your energy where it matters most right now.',
        'Investing heavily in technology before you have proven the marketplace works. If transactions are happening manually and both sides are happy, the marketplace works. Technology makes it more efficient, but it does not make it work. Spend money on growth before spending money on engineering.',
        'Copying the growth tactics of massive marketplaces like Uber or Airbnb. They had millions of dollars in funding. You do not. Focus on tactics that work at your scale: personal outreach, community partnerships, word of mouth, and targeted content. These are free and they work.',
        'Neglecting the existing users while chasing new ones. Your current users are your best growth engine. If they love the experience, they will bring others. If they are having problems you are ignoring, they will leave and take their friends with them.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'strategy',
        label: 'What is your growth strategy?',
        type: 'textarea',
        placeholder: 'e.g., Focus on getting more students because tutors are easy to find',
        helpText: 'Describe which side you will grow and how.',
        howToFill: {
          guidanceText: 'Describe three things: (1) which side you are going to focus on growing and why it is the bottleneck, (2) the specific tactics you will use to grow that side in the next 30 days, and (3) the concrete numbers you are aiming for. A strong answer sounds like: "I am focusing on growing the student side because I have 15 tutors but only 8 active students. My plan is to partner with 3 study groups on campus and offer first-session discounts. My target is 25 active students within 30 days, which would give every tutor at least 1-2 bookings per week."',
          exampleThought: 'Thinking process: "Right now my tutors are not getting enough bookings -- 3 of them have told me they are thinking about leaving. That means my bottleneck is demand. I need more students. The best channel so far has been campus Facebook groups, so I will double down on that and also try posting in the campus subreddit and partnering with the student government tutoring program. I will aim for 25 active students in the next month, which should keep all my tutors busy enough to stay."',
        },
      },
    ],
  },
]
