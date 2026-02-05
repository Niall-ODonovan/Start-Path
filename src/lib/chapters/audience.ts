import type { Chapter } from './types'

export const AUDIENCE_CHAPTERS: Chapter[] = [
  {
    id: 'audience_ch1_content_theme',
    pathId: 'audience_monetization',
    sequence: 1,
    title: 'Content Theme - Pick what you will create content about',
    description:
      'Before you post anything, you need to decide what you are going to talk about and who you are talking to. This chapter helps you find a topic you can stick with and an audience that actually wants it.',
    whatThisAchieves: 'You will have a clear focus for your content.',
    completionCriteria:
      'Done when you have chosen a topic and know who cares about it.',
    howTo: {
      intro:
        'Picking a content theme is about finding the overlap between what you genuinely know or care about and what other people are actively searching for or struggling with. You do not need to be the world expert. You just need to be a few steps ahead of the people you want to help.',
      steps: [
        {
          title: 'List what you know or do regularly',
          body: 'Grab a piece of paper and write down ten things you spend time on, know more about than the average person, or get asked about by friends and family. These can be hobbies, job skills, life experiences, or even struggles you have worked through. Do not filter yourself yet. The goal is volume.',
          tip: 'If you are stuck, think about what tabs are open on your phone right now, what YouTube videos you watch for fun, or what topics make you lose track of time when you start talking about them.',
        },
        {
          title: 'Check if people are searching for it',
          body: 'Take your top three ideas and search for them on YouTube, TikTok, or Google. Look at how many views similar content gets. Search Reddit for subreddits about the topic and see how active they are. You are looking for signs that real people are already interested in this subject. If nobody is searching for it, it will be very hard to grow.',
          tip: 'A topic with medium competition is often better than one with zero competition. Zero competition sometimes means zero demand.',
        },
        {
          title: 'Find the specific angle',
          body: 'Broad topics like "fitness" or "money" are too crowded for a new creator. Narrow it down. Instead of fitness, maybe it is bodyweight workouts for people who travel for work. Instead of money, maybe it is budgeting for freelancers with irregular income. The more specific you get, the easier it is for the right people to find you and feel like you are speaking directly to them.',
          tip: 'Try filling in this sentence: "I help [specific group of people] with [specific problem or goal]." If you cannot fill it in clearly, your topic is still too broad.',
        },
        {
          title: 'Describe your person',
          body: 'Write a short paragraph describing one real person who would want your content. Give them an age, a situation, and a problem. For example: "A 22-year-old recent graduate who just started their first job and has no idea how to cook meals that are cheap, healthy, and fast." When you create content, you will be talking to this person.',
        },
      ],
      commonMistakes: [
        'Picking a topic just because it seems profitable even though you have no genuine interest in it. You will burn out within a month.',
        'Trying to appeal to everyone. "My content is for anyone who wants to improve their life" is too vague to attract anyone.',
        'Changing your topic every week because growth is slow at first. Give your theme at least 30 posts before you reconsider.',
        'Overthinking this step and never actually starting. A good-enough topic you execute on beats a perfect topic you never act on.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'topic',
        label: 'Content Topic',
        type: 'textarea',
        placeholder: 'e.g., Study tips for high school students',
        helpText: 'Pick one clear topic.',
        howToFill: {
          guidanceText:
            'Write down the specific subject you will create content about. Be as narrow and concrete as possible. Instead of "cooking," say "quick weeknight dinners for beginners." Instead of "tech," say "explaining new AI tools in plain English." The more specific you are, the easier it will be to come up with content ideas and attract the right followers.',
          exampleThought:
            'I keep helping my younger cousins figure out how to study for exams and they always say my tips actually work. There are millions of students who are stressed about grades. I could make content about study techniques that actually stick.',
        },
      },
      {
        fieldName: 'who_cares',
        label: 'Who Cares About This',
        type: 'textarea',
        placeholder:
          'e.g., Students stressed about grades and college applications',
        helpText: 'Who is your audience?',
        howToFill: {
          guidanceText:
            'Describe the specific group of people who would stop scrolling to watch or read your content. Think about their age range, their situation, and the problem they are dealing with. Do not say "everyone." The best audiences are ones where the people in them would describe themselves using the label you give them.',
          exampleThought:
            'High school juniors and seniors who feel overwhelmed by tests, homework, and college prep. They are already searching for study tips on TikTok and YouTube. They want something that works and does not feel like more homework.',
        },
      },
    ],
  },
  {
    id: 'audience_ch2_platform_choice',
    pathId: 'audience_monetization',
    sequence: 2,
    title: 'Platform Choice - Pick one platform to focus on',
    description:
      'You cannot be everywhere at once when you are starting out. This chapter helps you choose the single platform where you will build your audience first, based on your content style and where your people already hang out.',
    whatThisAchieves:
      'You will commit to one platform instead of spreading yourself thin.',
    completionCriteria:
      'Done when you choose your primary platform and know where your audience hangs out.',
    howTo: {
      intro:
        'Every platform rewards different types of content and attracts different audiences. The goal here is not to find the "best" platform. It is to find the one where your content style and your audience overlap the most. You will expand later, but right now you need focus.',
      steps: [
        {
          title: 'Match your content style to a platform',
          body: 'Think about what kind of content feels most natural to you. If you are comfortable on camera and can explain things in 60 seconds, TikTok or Instagram Reels might fit. If you like going deeper and making 10-to-20-minute explanations, YouTube is your place. If you prefer writing, consider Twitter or a newsletter. If you are good with visuals and step-by-step images, Instagram or Pinterest could work. Do not force yourself onto a platform that requires a skill you hate.',
          tip: 'You do not need expensive equipment. Most successful creators on TikTok and Instagram started with just their phone. YouTube is more forgiving of longer, less polished content as long as the information is good.',
        },
        {
          title: 'Find where your audience already is',
          body: 'Go back to the person you described in Chapter 1. Where do they spend time online? If your audience is teenagers, they are probably on TikTok. If they are professionals in their 30s and 40s, LinkedIn or YouTube might be better. If they are hobbyists, Reddit and YouTube are strong. Search for your topic on two or three platforms and see where the most active communities and content already exist.',
          tip: 'Look at the comments on existing content in your niche. If people are asking questions and engaging, that is a sign the audience is active on that platform.',
        },
        {
          title: 'Consider the growth mechanics',
          body: 'Some platforms make it easier for new creators to get discovered. TikTok and YouTube Shorts have algorithms that show content to people who do not follow you yet, which is great for growth. Instagram favors people who already have followers. YouTube long-form rewards consistency over time and has incredible search traffic. Twitter grows through replies, threads, and retweets. Understand how people will actually find you on each platform.',
        },
        {
          title: 'Make your pick and commit',
          body: 'Choose one platform. Write it down. You are going to spend the next several weeks focused entirely on this one place. You can always change later, but splitting your energy across three platforms when you are starting out means you will grow three times slower on each one. One platform, full effort.',
          tip: 'If you truly cannot decide between two platforms, pick the one where you can post more frequently with less effort. Consistency matters more than perfection.',
        },
      ],
      commonMistakes: [
        'Trying to post on every platform simultaneously. You will burn out and none of them will grow.',
        'Picking a platform because a guru said it is the best for making money, even though your audience is not there.',
        'Avoiding video platforms because you are nervous on camera. Being on camera gets easier fast, and video platforms currently have the best growth potential for new creators.',
        'Spending weeks researching platforms instead of just picking one and starting. The information you get from actually posting will teach you more than any amount of research.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'platform',
        label: 'Chosen Platform',
        type: 'text',
        placeholder: 'e.g., TikTok or YouTube or Instagram',
        howToFill: {
          guidanceText:
            'Write the name of the single platform you are going to focus on. Just one. If you went through the steps above and matched your content style to your audience, you should have a clear winner. If two platforms seem equally good, go with the one where you can create content faster and more often.',
          exampleThought:
            'My audience is high school students and they live on TikTok. I can make quick 60-second study tip videos on my phone without any editing. TikTok it is.',
        },
      },
      {
        fieldName: 'why_this_platform',
        label: 'Why This Platform',
        type: 'textarea',
        helpText: 'Explain why this platform is the best fit for your content and audience.',
        howToFill: {
          guidanceText:
            'In two or three sentences, explain why you chose this platform. Mention where your audience is, why the content format works for you, and how new creators get discovered on this platform. This is for your own clarity so you do not second-guess yourself next week.',
          exampleThought:
            'TikTok because my audience is high school students who spend hours on the app. Short-form video fits study tips perfectly since I can share one technique per video. TikTok also shows content to people who do not follow me yet, which means I can grow from zero.',
        },
      },
    ],
  },
  {
    id: 'audience_ch3_first_30',
    pathId: 'audience_monetization',
    sequence: 3,
    title: 'First 30 Posts - Create and post 30 pieces of content',
    description:
      'Theory is over. This chapter is about doing the work. You will create and publish 30 pieces of content on your chosen platform, build a creation habit, and start learning what your audience responds to.',
    whatThisAchieves:
      'You will have consistent content and see what people respond to.',
    completionCriteria: 'Done when you have posted 30 times.',
    howTo: {
      intro:
        'Thirty posts sounds like a lot, but it is the minimum amount you need to start seeing patterns. Your first few posts will probably not go viral, and that is completely fine. The purpose of this chapter is to build a creation muscle, get past the awkward early stage, and collect real data about what works.',
      steps: [
        {
          title: 'Brainstorm a list of content ideas',
          body: 'Before you start posting, sit down and list 30 to 50 content ideas. Think about questions your audience has, mistakes they make, tips you wish someone had told you, myths in your space, step-by-step tutorials, personal stories, and hot takes. Write each idea as a single sentence. You do not need to flesh them out yet. Having a list ready means you will never sit down to create and draw a blank.',
          tip: 'Search Reddit, Quora, and the comments sections of popular creators in your niche for questions people are asking. Every question is a potential piece of content.',
        },
        {
          title: 'Set a posting schedule and batch your content',
          body: 'Decide how often you will post. For most platforms, three to five times per week is a good starting pace. Then pick one or two days per week where you create multiple pieces of content in a single session. This is called batching, and it is far more efficient than creating one piece every day. If you are making short videos, you might film five in one afternoon. If you are writing threads, you might draft three in one sitting.',
          tip: 'Sunday afternoons and Wednesday evenings work well for batch creation. Find a two-hour block that works for you and protect it like a meeting you cannot cancel.',
        },
        {
          title: 'Keep your production simple',
          body: 'Do not spend hours editing each post. For videos, use your phone camera, natural lighting near a window, and speak clearly. For written content, write like you talk. For images, use free tools like Canva. Your first 30 posts are about learning, not about being polished. A simple video with a good tip will outperform a beautifully edited video with nothing useful to say.',
          tip: 'Set a time limit for yourself. No more than 30 minutes per post for short-form content, no more than two hours for long-form. If it is taking longer than that, you are overcomplicating it.',
        },
        {
          title: 'Track what happens and look for signals',
          body: 'After each post, write down the topic, the format, and after a few days, the basic numbers: views, likes, comments, shares, or saves. You do not need a fancy spreadsheet. A simple note on your phone works. After 30 posts, you will look back at this data to find patterns. Which topics got the most views? Which formats got the most engagement? Which posts got comments asking for more?',
        },
      ],
      commonMistakes: [
        'Spending a week perfecting your first post. Just publish it. Your tenth post will be better than your first no matter what.',
        'Deleting posts that do not perform well. Leave them up. They still provide value to people who find them later, and they show that your account is active.',
        'Comparing your day-one results to someone else who has been posting for two years. Everyone starts at zero.',
        'Stopping at post 10 or 15 because growth feels slow. The first 30 posts are about building the habit and collecting data. Growth often kicks in after the initial phase.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'posts_count',
        label: 'Number of Posts Published',
        type: 'text',
        placeholder: 'e.g., 30',
        helpText: 'How many posts have you published so far?',
        howToFill: {
          guidanceText:
            'Go to your profile on your chosen platform and count how many posts you have published since starting this chapter. Write the number here. The goal is 30. If you are not there yet, keep going and come back to update this number.',
          exampleThought:
            'I have been posting five TikToks a week for six weeks. Let me go count on my profile. I see 32 videos. I will write 32.',
        },
      },
      {
        fieldName: 'what_worked',
        label: 'What Worked Best',
        type: 'textarea',
        placeholder: 'e.g., Quick tip videos under 30 seconds got 3x more views than longer ones',
        helpText: 'Describe what topics, formats, or styles got the best response.',
        howToFill: {
          guidanceText:
            'Look at your tracking notes or your platform analytics. Sort your posts by views or engagement. Write down what the top five posts had in common. Was it the topic? The format? The length? The hook in the first few seconds? Also note what flopped. The contrast between your best and worst posts is where the insight lives.',
          exampleThought:
            'My top five posts were all quick, single-tip videos under 30 seconds that started with a surprising statement. The longer explanation videos got way fewer views. People also loved the posts where I showed a before-and-after of messy notes turned into organized study sheets.',
        },
      },
    ],
  },
  {
    id: 'audience_ch4_growth_pattern',
    pathId: 'audience_monetization',
    sequence: 4,
    title: 'Growth Pattern - Identify what content makes your audience grow',
    description:
      'Now that you have 30 posts and some data, it is time to figure out what actually drives people to follow you. This chapter is about reading your numbers, finding patterns, and doubling down on what works.',
    whatThisAchieves: 'You will know what to make more of.',
    completionCriteria:
      'Done when you can describe what content drives growth.',
    howTo: {
      intro:
        'Growth is not random. There are specific types of content, topics, and formats that bring new followers to your account. Your job now is to become a detective and figure out what those are for your specific audience. This is where you stop guessing and start being strategic.',
      steps: [
        {
          title: 'Dig into your analytics',
          body: 'Every major platform gives you free analytics if you have a creator or business account. Go to your analytics dashboard and look at the last 30 to 60 days. Find your top-performing posts by reach or views, not just likes. Reach tells you how many new people saw your content. Also look at your follower growth over time. Are there spikes? What did you post right before each spike?',
          tip: 'On TikTok, check the "For You" percentage in your video analytics. A high percentage means the algorithm is pushing your content to new people. On YouTube, check "Impressions click-through rate" and "Average view duration" since those are what the algorithm cares about most.',
        },
        {
          title: 'Identify your content pillars',
          body: 'Look at your top ten posts and group them by theme. You will probably notice that two or three topics or formats consistently outperform the rest. These are your content pillars. For example, you might find that "study technique tutorials" and "exam day motivation" do great, but "school supply hauls" flop. Write down your two or three strongest pillars.',
          tip: 'Pay special attention to posts that got a lot of saves or shares. Saves mean people found it valuable enough to come back to. Shares mean people thought it was good enough to show someone else. Both of these signals are more meaningful than likes.',
        },
        {
          title: 'Study what triggers follows',
          body: 'A view is not the same as a follow. Someone might watch one video and never come back. To understand what triggers follows, look at which posts had the highest follower conversion. Some platforms show this directly. If yours does not, compare your follower growth timeline to your posting history and find the posts that caused spikes. Usually, posts that trigger follows are ones that make someone think "I need more of this."',
        },
        {
          title: 'Create a doubled-down content plan',
          body: 'Take your top-performing content pillars and plan your next 15 to 20 posts around them. This does not mean you post the same thing over and over. It means you explore different angles within the topics that work. If "quick study techniques" is your best pillar, make posts about different techniques, for different subjects, for different situations. Go deeper, not wider.',
          tip: 'A simple rule: make 70 percent of your content about your proven pillars, and use the other 30 percent to experiment with new ideas. This keeps your growth steady while you look for new winners.',
        },
      ],
      commonMistakes: [
        'Only looking at likes. Likes are the least meaningful metric. Views, saves, shares, comments, and follower growth tell you much more.',
        'Assuming one viral post means you have found your formula. Look for patterns across multiple posts, not just one outlier.',
        'Abandoning content pillars that work because you are bored of them. Your audience is not bored. They just found you. Keep making what they want.',
        'Ignoring negative signals. If a type of content consistently underperforms, stop making it, even if you personally enjoy creating it.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'growth_content',
        label: 'What Content Drives Growth',
        type: 'textarea',
        placeholder: 'e.g., Short tutorial-style videos about specific study methods get the most views and followers',
        helpText: 'Describe the content types, topics, or formats that bring in the most new followers.',
        howToFill: {
          guidanceText:
            'Based on your analytics review, describe the two or three content pillars that drive the most growth. Be specific about the topic, format, and style. For example, instead of "tips videos," say "60-second videos where I demonstrate one study technique with a whiteboard." The more specific you are, the easier it is to replicate your success.',
          exampleThought:
            'My best content is short videos where I show one study technique being used on a real textbook chapter. Videos where I show the technique in action get three times more views than videos where I just talk about it. My audience also loves "study with me" time-lapse videos, but those do not drive as many follows.',
        },
      },
      {
        fieldName: 'follower_count',
        label: 'Current Follower Count',
        type: 'text',
        placeholder: 'e.g., 2,400',
        helpText: 'Your current follower or subscriber count on your main platform.',
        howToFill: {
          guidanceText:
            'Go to your profile on your chosen platform and write down your current follower or subscriber count. This is a snapshot so you can track your growth over time. Do not worry if the number feels small. Every large account started where you are now.',
          exampleThought:
            'I just checked my TikTok profile and I have 1,847 followers after about two months of consistent posting. That is up from 200 when I started Chapter 3.',
        },
      },
    ],
  },
  {
    id: 'audience_ch5_monetization_signal',
    pathId: 'audience_monetization',
    sequence: 5,
    title:
      'Monetization Signal - Look for signs that people would pay for something',
    description:
      'Before you build a product or offer a service, you need to know if your audience is actually willing to spend money. This chapter teaches you how to test demand without building anything first.',
    whatThisAchieves:
      'You will identify if your audience is willing to spend money.',
    completionCriteria:
      'Done when you have tested interest in a paid offering.',
    howTo: {
      intro:
        'The biggest mistake creators make is spending weeks building a product that nobody wants. Instead, you are going to test demand first. This means putting out signals, asking questions, and gauging reactions before you commit to creating anything. Think of it as checking whether people are hungry before you cook a meal.',
      steps: [
        {
          title: 'Listen for buying signals in your existing content',
          body: 'Go through your comments and direct messages from the past month. Look for phrases like "Do you have a course on this?" or "Can you make a guide?" or "I would pay for this" or "Where can I learn more?" These are unprompted buying signals and they are gold. Also look for repeated questions about the same topic. If fifty people have asked you the same question, that is a product waiting to happen.',
          tip: 'Create a simple document and start copying and pasting every comment or message that hints at a desire for more. After a week of collecting these, patterns will jump out at you.',
        },
        {
          title: 'Ask your audience directly',
          body: 'Post a piece of content that directly asks your audience what they struggle with most or what they wish they had. Use polls, question stickers on stories, or just ask in a post. You can also ask "If I made a [guide/course/template] about [topic], would you be interested?" The responses will tell you both what to make and how much demand exists. Pay more attention to direct messages than public comments since people are more honest in private.',
          tip: 'Instead of asking "Would you buy this?" which people tend to say yes to out of politeness, ask "What would you pay for this?" or "Would you rather have X or Y?" The specificity forces more honest answers.',
        },
        {
          title: 'Run a low-effort test',
          body: 'Pick the most promising idea and test it without building the full thing. If you are thinking about a digital guide, post the table of contents and ask people to sign up for a waitlist. If you are thinking about coaching, offer three free 15-minute calls and see how quickly the spots fill up. If you are thinking about a template or tool, share a simplified free version and see how many people download it. The goal is to measure actual behavior, not just words.',
          tip: 'A waitlist with an email signup is one of the best tests. If people are willing to give you their email address for something that does not exist yet, that is a very strong signal. Use a free tool like Google Forms or a simple landing page builder.',
        },
        {
          title: 'Evaluate the signals honestly',
          body: 'After running your test for a week or two, look at the numbers. How many people signed up, responded, or took action? A good rule of thumb is that if more than five percent of the people who saw your test took action, there is real demand. Also look at the enthusiasm level. Are people just clicking a button, or are they sending you messages asking when it will be ready? Excitement matters as much as numbers.',
        },
      ],
      commonMistakes: [
        'Skipping the testing phase and jumping straight to building a product. You might waste weeks creating something nobody wants.',
        'Only asking friends and family for feedback. They will say yes to be supportive. You need feedback from your actual audience.',
        'Interpreting polite interest as strong demand. "That sounds cool" is not the same as "Take my money." Look for people who take action, not just people who say nice things.',
        'Getting discouraged if your first test flops. Try a different angle or a different product idea. The audience is there; you might just be offering the wrong thing.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'what_tested',
        label: 'What You Tested',
        type: 'textarea',
        placeholder:
          'e.g., I posted a poll asking if people would buy a study planner template, and I created a waitlist for a detailed study methods guide',
        helpText: 'Describe what you did to test whether your audience would pay for something.',
        howToFill: {
          guidanceText:
            'Describe the specific test or tests you ran. What did you offer or propose? How did you present it to your audience? Where did you post it? Include details like whether you used a poll, a waitlist, free samples, or direct questions. The more specific you are, the more useful this will be when you look back at it.',
          exampleThought:
            'I posted a TikTok asking my followers what their biggest study struggle is, and 200 people commented saying they cannot stay focused. Then I posted a story saying "I am thinking about making a complete focus and study system guide, drop your email if you want it" and linked to a Google Form. I also did three free 15-minute study coaching calls to see if people would show up.',
        },
      },
      {
        fieldName: 'response',
        label: 'How People Responded',
        type: 'textarea',
        placeholder:
          'e.g., 85 people signed up for the waitlist, 12 people DM-ed asking when it would be ready',
        helpText: 'What happened when you tested? Include numbers and notable reactions.',
        howToFill: {
          guidanceText:
            'Write down the concrete results of your test. How many people responded, signed up, clicked, or messaged you? Include both the numbers and the qualitative feedback. Did people seem excited, mildly interested, or indifferent? Were there any messages that stood out? This data will guide your decision about what to sell in the next chapter.',
          exampleThought:
            'The poll got 340 responses and "staying focused" won by a landslide. The waitlist Google Form got 92 signups in 48 hours, which is about 8 percent of the people who saw the story. All three coaching call spots were claimed within an hour and two of the three people asked if I offer paid coaching. Several people DM-ed me saying they would definitely buy a focus guide.',
        },
      },
    ],
  },
  {
    id: 'audience_ch6_first_monetization',
    pathId: 'audience_monetization',
    sequence: 6,
    title: 'First Monetization - Make your first money from your audience',
    description:
      'This is where it all comes together. You have an audience, you know what they want, and you have tested demand. Now you are going to create something, put a price on it, and make your first sale.',
    whatThisAchieves:
      'You will have proof that you can earn from this audience.',
    completionCriteria:
      'Done when you have earned money from your audience.',
    howTo: {
      intro:
        'Making your first dollar from your audience is a milestone that changes everything. It proves that what you have built has real value. The key is to start simple. You do not need a fancy website, a complicated product, or a big launch. You need something useful, a price, and a way for people to pay you.',
      steps: [
        {
          title: 'Choose your first product based on your test results',
          body: 'Look back at your monetization signals from Chapter 5. What got the strongest response? Build that. For most creators, the easiest first products are digital: a PDF guide, a set of templates, a mini-course, or a recorded workshop. These cost nothing to produce, can be delivered instantly, and can be sold to unlimited people. If your signals pointed toward a service like coaching or consulting, that works too, but start with a small package like three sessions rather than an ongoing commitment.',
          tip: 'Your first product should take you no more than one to two weeks to create. If your idea requires more than that, simplify it. A focused 10-page guide that solves one problem is better than a 100-page ebook that tries to cover everything.',
        },
        {
          title: 'Set a price that feels right for a first product',
          body: 'For digital products, price between five and thirty dollars to start. A simple template or checklist can be five to ten dollars. A detailed guide or mini-course can be fifteen to thirty dollars. For services like coaching calls, charge twenty-five to seventy-five dollars per hour to start. The goal is not to maximize revenue on day one. The goal is to get your first paying customers and learn from the experience. You can always raise prices later once you have testimonials and proven results.',
          tip: 'If you are nervous about charging, remember that people value what they pay for. A free PDF gets downloaded and forgotten. A ten-dollar PDF gets read and used. You are actually doing your audience a favor by charging because it makes them take the content seriously.',
        },
        {
          title: 'Set up a simple way to sell',
          body: 'You do not need your own website to start selling. Use a platform that handles payments and delivery for you. Gumroad, Lemonsqueezy, and Payhip are great for digital products. They let you upload your file, set a price, and get a link you can share. For services, Calendly with Stripe or a simple PayPal link works. For courses, Teachable or Podia have free or low-cost starter plans. Pick one, set it up in an afternoon, and get your product listed.',
          tip: 'Keep the buying process as simple as possible. One page, one product, one button. Every extra step between "I want this" and "I bought this" loses you customers.',
        },
        {
          title: 'Launch to your audience',
          body: 'Create three to five pieces of content around your launch. Start by teasing the product a few days before it is ready. Share the problem it solves, show a preview, or share a behind-the-scenes look at you creating it. On launch day, post about it directly and include the link. In the days after launch, share testimonials, answer questions, and remind people it exists. Also message the people who were on your waitlist or who expressed interest in Chapter 5. They already told you they wanted this.',
          tip: 'Most of your sales will come from your warmest audience, the people who have been following you the longest and engaging with your content. Do not be afraid to post about your product multiple times. Most of your followers will not see every post. It typically takes someone seeing something five to seven times before they buy.',
        },
      ],
      commonMistakes: [
        'Overbuilding your first product. A polished, simple product that solves one clear problem will outsell a messy, complicated product that tries to do everything.',
        'Pricing too low out of fear. Charging two dollars signals low quality. Five to fifteen dollars is a comfortable starting range for digital products that still communicates value.',
        'Only posting about your product once and then giving up. People need multiple reminders. Launch week should include several posts about the product from different angles.',
        'Waiting until everything is perfect. Ship it when it is good enough, then improve it based on customer feedback. Your first customers will be forgiving and happy to help you make it better.',
        'Not following up with buyers. Ask them what they thought, if it helped, and what they wish was included. This feedback shapes your next product and gives you testimonials.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'what_sold',
        label: 'What You Sold',
        type: 'textarea',
        placeholder:
          'e.g., A 15-page PDF guide called "The Focus Study System" with study techniques, templates, and a weekly planner',
        helpText: 'Describe the product or service you sold.',
        howToFill: {
          guidanceText:
            'Describe exactly what you created and sold. Include the format (PDF, video course, coaching calls, templates), the topic, and what the buyer gets. If it is a digital product, mention how many pages or lessons it includes. If it is a service, describe what a session looks like. Be specific enough that someone reading this could understand exactly what was offered.',
          exampleThought:
            'I created a 15-page PDF called "The Focus Study System." It includes five study techniques explained step-by-step, a weekly study planner template, and a pre-exam checklist. I sold it on Gumroad for twelve dollars.',
        },
      },
      {
        fieldName: 'revenue',
        label: 'Revenue Earned',
        type: 'text',
        placeholder: 'e.g., $240',
        helpText: 'How much total money have you earned from this product or service?',
        howToFill: {
          guidanceText:
            'Write down the total amount of money you have earned from your first product or service. This includes all sales so far, not just the first day. Check your payment platform dashboard for the exact number. Include the currency. If you have not made a sale yet, keep promoting and come back to fill this in when you do.',
          exampleThought:
            'I launched the guide five days ago. Gumroad shows 20 sales at twelve dollars each, so that is $240 in revenue before platform fees. After fees it is about $220. I will write $240 as the gross revenue.',
        },
      },
    ],
  },
]
