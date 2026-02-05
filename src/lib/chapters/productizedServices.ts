import type { Chapter } from './types'

export const PRODUCTIZED_SERVICES_CHAPTERS: Chapter[] = [
  {
    id: 'productized_ch1_standard_offer',
    pathId: 'productized_services',
    sequence: 1,
    title: 'Standard Offer - Define exactly what you do every time',
    description:
      'A productized service means every client gets the same thing. No custom quotes, no scope creep, no guessing. You define the package once, and then you sell it over and over. This chapter helps you design that package.',
    whatThisAchieves:
      'You will have a clearly defined service package with a fixed scope and a fixed price. This makes it easy to sell, easy to deliver, and easy to scale.',
    completionCriteria:
      'You have written down exactly what is included in your package, what is not included, and how much it costs.',
    howTo: {
      intro:
        'You are not building a menu of options. You are building one specific thing that you sell the same way every time. Think of it like a restaurant combo meal. The customer does not get to swap the fries for a salad. They get the combo, or they do not. That is what makes it fast and profitable. Your job right now is to pick one service, define exactly what it includes, and put a price on it.',
      steps: [
        {
          title: 'Pick one service you can deliver the same way every time',
          body:
            'Look at the work you have done before. Find the project type where the steps were roughly the same each time. Maybe you always build five-page websites for small businesses. Maybe you always write three blog posts per month. Maybe you always set up email marketing for new stores. The key is repetition. If you have done something more than twice in a similar way, that is your candidate.',
          tip:
            'If you have done a lot of different things, pick the one that was easiest to deliver. Easy for you means profitable for your business.',
        },
        {
          title: 'Write down everything the client gets',
          body:
            'Be specific. Do not say "website design." Say "a five-page website with a home page, about page, services page, contact page, and one additional page of your choice. Includes two rounds of revisions and is delivered within 14 business days." The more specific you are, the fewer arguments you will have with clients later. Include quantities, timelines, and deliverables.',
          tip:
            'Read your description out loud. If a stranger could misunderstand what they are getting, you need to be more specific.',
        },
        {
          title: 'Write down what is NOT included',
          body:
            'This is just as important as what is included. Think about all the extra things clients have asked for in the past. Things like rush delivery, extra revisions, ongoing maintenance, source files, or additional features. List them clearly. This protects you from scope creep and sets honest expectations. You can always offer these things as paid add-ons later.',
          tip:
            'Think about the last time a client frustrated you by asking for more. Whatever they asked for, put it on the "not included" list.',
        },
        {
          title: 'Set a fixed price',
          body:
            'Look at what you have charged for similar work before. Look at how long it takes you to deliver. Multiply your hourly rate by the number of hours, and then add 20 percent. The extra 20 percent covers the small things you forget to account for like communication time, revisions, and admin. If you do not know your hourly rate, start by figuring out how much you need to earn per month and divide by the number of packages you can realistically deliver.',
          tip:
            'Do not price based on what you think people will pay. Price based on what makes the work worth your time. You can always adjust later after a few sales.',
        },
      ],
      commonMistakes: [
        'Making the package too big. If your package takes more than a few days to deliver, it is probably too large. Break it into smaller packages.',
        'Being vague about what is included. "Logo design" could mean one concept or twenty concepts. Spell it out so there is no room for confusion.',
        'Pricing too low because you are scared no one will buy it. Underpricing attracts bad clients and burns you out fast.',
        'Trying to make a package that works for everyone. Your package should work for one specific type of client. It is okay if some people do not need it.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'offer_name',
        label: 'What is the name of your package?',
        type: 'text',
        placeholder: 'e.g., The Small Business Website Package',
        helpText:
          'Give your package a simple, clear name that tells people what they are getting.',
        howToFill: {
          guidanceText:
            'Your package name should be short and descriptive. It does not need to be clever. A good name tells someone exactly what they will get. Use the format "The [Audience] [Deliverable] Package" if you are stuck. For example, "The Startup Brand Kit" or "The Monthly Blog Package." Avoid generic names like "Basic Plan" or "Service Package" because they do not tell the buyer anything useful.',
          exampleThought:
            'I build five-page websites for local restaurants, so I will call it "The Restaurant Website Package." Simple and clear.',
        },
      },
      {
        fieldName: 'what_included',
        label: 'What is included in this package?',
        type: 'textarea',
        placeholder:
          'e.g., 5-page website, 2 rounds of revisions, mobile-responsive design, delivered in 14 business days',
        helpText:
          'List every single thing the client gets. Be specific about quantities, timelines, and deliverables.',
        howToFill: {
          guidanceText:
            'Write a bullet-point list of everything the client receives. For each item, include a number or quantity whenever possible. Instead of "revisions," write "2 rounds of revisions." Instead of "social media graphics," write "10 social media graphics sized for Instagram." Also include your delivery timeline and any support that comes with the package, like a walkthrough call or 7 days of email support after delivery.',
          exampleThought:
            'Last time I did this kind of project, I delivered a homepage, about page, menu page, contact page, and a reservations page. It took me about 10 days. I did two rounds of changes. I will list all of that.',
        },
      },
      {
        fieldName: 'what_not_included',
        label: 'What is NOT included?',
        type: 'textarea',
        placeholder:
          'e.g., Ongoing maintenance, custom coding, additional pages beyond 5, rush delivery',
        helpText:
          'List the things clients might expect but that are not part of this package.',
        howToFill: {
          guidanceText:
            'Think about every time a past client asked for something extra. Those extras go on this list. Common things to exclude are rush delivery, extra revisions beyond what is stated, ongoing maintenance or support after the delivery window, source files or raw assets, and anything that requires specialized skills outside your core service. Being upfront about exclusions prevents awkward conversations later and gives you the option to sell these as add-ons.',
          exampleThought:
            'Clients always ask me for ongoing updates after the site launches. I also get asked for custom features like booking systems. Those are extra work, so they go on the not-included list.',
        },
      },
      {
        fieldName: 'price',
        label: 'What is the price?',
        type: 'text',
        placeholder: 'e.g., $2,500',
        helpText:
          'Set a single fixed price for this package. No hourly rates, no ranges.',
        howToFill: {
          guidanceText:
            'Start with how many hours this work typically takes you. Multiply that by what you need to earn per hour to pay your bills and make a profit. Then add 20 percent to cover the time you spend on communication, revisions, and admin tasks. Round to a clean number. If the result feels too low, it probably is. If it feels slightly uncomfortable, you are likely in the right range. Remember, this is a starting price. You will adjust it after you see how sales go and how the delivery feels.',
          exampleThought:
            'This project usually takes me about 20 hours. I need to earn at least $100 per hour to cover my expenses and save. That is $2,000. Plus 20 percent is $2,400. I will round up to $2,500.',
        },
      },
    ],
  },
  {
    id: 'productized_ch2_process',
    pathId: 'productized_services',
    sequence: 2,
    title: 'Process - Document the exact steps you follow every time',
    description:
      'A productized service only works if you can deliver it the same way every time. That means writing down every step so the process is repeatable. This chapter helps you create that process document.',
    whatThisAchieves:
      'You will have a step-by-step checklist that you can follow for every new client. This removes guesswork, speeds up delivery, and makes it possible to eventually hand the work off to someone else.',
    completionCriteria:
      'You have a written process that covers every step from the moment a client signs up to the moment you deliver the finished work.',
    howTo: {
      intro:
        'Right now, you probably do your work from memory. You have a general sense of the steps, but you have never written them down. That is fine for one-off projects, but it does not work for a productized service. You need a checklist that you follow every single time, so the quality stays consistent and you stop reinventing the wheel with each new client. Think of it like a recipe. A chef might be able to cook from instinct, but a restaurant needs written recipes so every plate comes out the same.',
      steps: [
        {
          title: 'Do the work one more time and write down every step as you go',
          body:
            'The best way to document your process is to actually do the work while taking notes. Open a document and write down every single thing you do, in order. Include the small things you take for granted, like sending the welcome email, creating the project folder, or asking the client for their login credentials. If you do not have a current client, walk through your most recent project from memory and write down every step you remember.',
          tip:
            'Set a timer and narrate what you are doing out loud as you work. It sounds silly, but it catches steps you would otherwise skip because they feel automatic.',
        },
        {
          title: 'Organize the steps into phases',
          body:
            'Group your steps into logical phases. Most services have three to five phases. For example: onboarding (collecting information from the client), production (doing the actual work), review (getting client feedback and making changes), and delivery (handing over the final product). Organizing by phase makes the process easier to follow and helps you see where you spend the most time.',
          tip:
            'If one phase has more than seven steps, break it into two phases. Long lists are hard to follow and easy to skip steps in.',
        },
        {
          title: 'Cut anything that does not need to be there',
          body:
            'Look at your list and ask yourself: does this step actually improve the final result? Some steps exist because you have always done them, not because they matter. For example, maybe you create a detailed project brief that no one ever reads. Maybe you have a check-in call that could be replaced by a short email. Remove or simplify anything that wastes time without improving the outcome.',
          tip:
            'For each step, ask "what would happen if I skipped this?" If the answer is "nothing bad," consider cutting it.',
        },
        {
          title: 'Add time estimates to each step',
          body:
            'Next to each step, write down roughly how long it takes. This helps you see where the time goes and where you can improve. It also helps you verify that your pricing makes sense. If your process takes 30 hours but you priced the package based on 20 hours of work, you need to either raise your price or shorten your process.',
          tip:
            'Track your actual time on the next two to three projects. Your estimates are probably wrong. Real data will help you find where time disappears.',
        },
      ],
      commonMistakes: [
        'Writing the process from memory without actually doing the work. You will miss steps. Walk through a real project or your most recent project to catch everything.',
        'Making the process too detailed. You are writing a checklist, not an instruction manual. Each step should be one or two sentences that remind you what to do, not a full tutorial.',
        'Skipping the client-facing steps. Your process is not just the work you do. It includes communication, feedback collection, and delivery. Document all of it.',
        'Not including time estimates. Without time estimates, you cannot identify bottlenecks or verify that your pricing is right.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'process',
        label: 'What is your step-by-step process?',
        type: 'textarea',
        placeholder:
          'e.g., Step 1: Send welcome email and intake questionnaire. Step 2: Review answers and create project folder. Step 3: ...',
        helpText:
          'Write down every step from client sign-up to final delivery. Include communication steps, not just production steps.',
        howToFill: {
          guidanceText:
            'Write your process as a numbered list. Start with what happens right after someone buys your package and end with what happens after you deliver the final product. Include every step, even the small ones like sending a confirmation email or saving files to a specific folder. For each step, write one or two sentences describing what you do. If a step requires the client to do something, note that too. A good process has somewhere between 10 and 25 steps. Fewer than that and you are probably missing things. More than that and you might be over-complicating it.',
          exampleThought:
            'After someone buys, I send a welcome email with a questionnaire. Then I wait for their answers. Then I set up their project folder. Then I start the design. I do a first draft, send it for feedback, make changes, send a final version, and then deliver the files. I should also include the follow-up email I send a week later asking if everything is working.',
        },
      },
    ],
  },
  {
    id: 'productized_ch3_first_sales',
    pathId: 'productized_services',
    sequence: 3,
    title: 'First Sales - Sell your standardized package and see if people buy it as-is',
    description:
      'You have defined your package and your process. Now it is time to put it in front of real people and see if they buy it without asking for changes. This chapter is about getting your first sales and learning from them.',
    whatThisAchieves:
      'You will have real-world proof that people will buy your package as-is. You will also learn what clients actually want changed, which is much more valuable than guessing.',
    completionCriteria:
      'You have sold at least a few packages and can describe whether clients bought the package as defined or asked for custom changes.',
    howTo: {
      intro:
        'This is where things get real. You are not selling custom work anymore. You are selling a fixed package at a fixed price. Some people will love the simplicity. Others will want changes. Both reactions teach you something. Your goal is not to make a lot of sales right away. Your goal is to put the offer in front of enough people to learn whether it works as-is or needs adjustments.',
      steps: [
        {
          title: 'Create a simple way for people to see and buy your package',
          body:
            'You do not need a fancy website. You need a single page that explains what the package includes, what it costs, and how to buy it. This can be a page on your existing website, a Gumroad listing, a Carrd page, or even a well-formatted Google Doc with a payment link. The important thing is that a stranger can read it and understand exactly what they are getting. Include your package name, what is included, what is not included, the price, and a way to pay or get in touch.',
          tip:
            'Before you publish, send the page to someone who is not in your industry and ask them to explain back to you what the package is. If they cannot, rewrite it in simpler language.',
        },
        {
          title: 'Tell people about it in the places they already are',
          body:
            'Post your offer where your potential clients already spend time. If you serve local businesses, that might be local Facebook groups, your city subreddit, or local networking events. If you serve online businesses, post in relevant Twitter threads, LinkedIn, or niche communities. Do not be spammy. Share it as a helpful offering. Something like "I have started offering a fixed-price package for [specific result]. Here is what is included." Direct messages to people in your network who might need it also work well.',
          tip:
            'The easiest first sales come from people who already know and trust you. Start by reaching out to past clients, colleagues, and your personal network before going to strangers.',
        },
        {
          title: 'Sell the package exactly as defined, no changes',
          body:
            'When someone is interested, present the package as a take-it-or-leave-it offer. Do not start customizing it for them. If they ask for changes, write down what they asked for but explain that the package is sold as-is. You can say something like "this package is designed to be delivered exactly as described, which is how I keep the price affordable and the quality consistent." If they still want something different, that is okay. Let them walk away. Not every prospect is the right fit.',
          tip:
            'Keep a list of every custom request people make. After your first five to ten conversations, you will see patterns that tell you whether your package needs adjusting.',
        },
        {
          title: 'Deliver the package using your documented process',
          body:
            'For every client who buys, follow your process from Chapter 2 exactly. This is your test. Did the process work? Did you miss any steps? Did the client get a good result? Take notes on what went smoothly and what felt clunky. After each delivery, update your process document with improvements. The goal is that each delivery gets a little faster and a little smoother.',
          tip:
            'After delivery, ask each client two questions: "What was the best part of working with me?" and "What could I improve?" Their answers are gold for refining your package.',
        },
      ],
      commonMistakes: [
        'Spending weeks building a perfect sales page before making a single sale. A simple, clear description is all you need to start. Improve it after you learn from real conversations.',
        'Caving to custom requests because you are afraid of losing the sale. Every time you customize, you are doing one-off client work, not building a productized service.',
        'Only telling people about it once. Most people need to see something multiple times before they buy. Keep sharing it in different ways and different places.',
        'Not tracking what people ask for. The custom requests people make are data. They tell you what the market actually wants. Write them all down.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'how_many_sold',
        label: 'How many packages have you sold?',
        type: 'text',
        placeholder: 'e.g., 3',
        helpText:
          'Enter the number of packages you have sold so far, even if it is just one.',
        howToFill: {
          guidanceText:
            'Count the number of clients who bought your package as defined. Only count completed sales where the client agreed to the fixed scope and price. If someone bought the package but you ended up customizing it heavily for them, do not count that one. You are tracking how many people bought the standard package. There is no minimum number needed here, but more sales give you better data about whether the package works.',
          exampleThought:
            'I have had five conversations about my package. Two people bought it exactly as described. One person wanted changes and walked away. Two are still thinking about it. So my answer is 2.',
        },
      },
      {
        fieldName: 'custom_requests',
        label: 'What custom requests or changes did people ask for?',
        type: 'textarea',
        placeholder:
          'e.g., Two clients asked for an extra page. One wanted rush delivery. One asked if I could also handle their social media.',
        helpText:
          'List every change or addition that people asked about, even if they ended up buying the standard package anyway.',
        howToFill: {
          guidanceText:
            'Go through every conversation you had about your package. Write down every time someone asked for something different from what you offer. Include requests from people who bought and people who did not buy. Note how many people asked for the same thing. If three different people asked for rush delivery, that tells you something different than if one person asked for an unrelated add-on. Also note if anyone said the package was missing something they expected to be included.',
          exampleThought:
            'Person 1 bought the package but asked if I could add a blog page. Person 2 wanted a faster turnaround. Person 3 loved the package but wanted to pay in two installments. Person 4 asked if I could also set up their email marketing. I will list all of these.',
        },
      },
    ],
  },
  {
    id: 'productized_ch4_boundaries',
    pathId: 'productized_services',
    sequence: 4,
    title: 'Boundaries - Learn to say no to custom requests',
    description:
      'Custom requests will keep coming. If you say yes to all of them, you are back to doing custom client work. This chapter helps you build the skill of saying no without losing clients.',
    whatThisAchieves:
      'You will have scripts and strategies for handling custom requests confidently. You will stop feeling guilty about saying no and start protecting your time and your business model.',
    completionCriteria:
      'You have handled at least one custom request by saying no or offering an alternative, and you can describe how it went.',
    howTo: {
      intro:
        'Saying no is the hardest part of running a productized service. You will feel pressure to say yes because you do not want to lose revenue, disappoint someone, or seem inflexible. But every time you say yes to a custom request, you are choosing short-term revenue over long-term scalability. The good news is that saying no does not mean being rude. It means being clear about what you offer and redirecting people to the right solution, even if that solution is not you.',
      steps: [
        {
          title: 'Understand why saying no is essential to your business model',
          body:
            'A productized service makes money because of efficiency. You get faster at delivering the same thing over and over. The moment you start customizing, you lose that efficiency. You have to think through new problems, estimate new timelines, and manage unique expectations. One custom project can eat up the time you would have spent delivering three standard packages. Saying no is not about being rigid. It is about protecting the business model that lets you serve more people at a fair price.',
          tip:
            'When you feel tempted to say yes to a custom request, calculate how many standard packages you could deliver in the same time. That number usually makes the decision clear.',
        },
        {
          title: 'Prepare scripts for the most common requests',
          body:
            'Look at the custom requests you collected in Chapter 3. Write a response for each common type. Here are templates you can adapt. For extra features: "My package is designed to deliver [specific result] at a price that stays affordable. Adding [requested feature] would change the scope significantly, so I keep it separate. I can recommend someone who specializes in that if you would like." For rush delivery: "My standard timeline is [X days], which is how I keep the quality high for every client. I do not currently offer rush delivery, but if timing is flexible, I would love to work with you." For price negotiations: "The price reflects the full value of everything included. I have designed the package to be comprehensive at this price point, so I am not able to offer discounts. If budget is a concern, I am happy to suggest alternatives that might be a better fit."',
          tip:
            'Save your scripts in a document you can copy and paste from. When a request comes in, you should not have to think about how to respond. Just grab the right script and personalize it slightly.',
        },
        {
          title: 'Offer alternatives instead of just saying no',
          body:
            'A flat "no" feels harsh. A "no, but here is what I can do" feels helpful. When someone asks for something outside your package, you have a few options. You can refer them to someone else who does that kind of work. You can offer the custom work as a separate paid project at a higher rate. Or you can explain how your standard package solves their underlying need even without the custom feature. The goal is to leave people feeling helped, not rejected.',
          tip:
            'If the same custom request keeps coming up from multiple people, consider creating a paid add-on for it rather than including it in the base package. That way you keep the core package simple but still capture the revenue.',
        },
        {
          title: 'Practice the conversation until it feels natural',
          body:
            'The first few times you say no, it will feel uncomfortable. That is normal. Practice saying your scripts out loud, even if it feels weird. Role-play the conversation with a friend. The more you practice, the more natural it becomes. After a few real conversations, you will notice that most people respect a clear, honest answer. Some will even appreciate that you have boundaries because it shows you run a professional operation.',
          tip:
            'After each conversation where you say no, write down how it went. Note what you said, how the person reacted, and what you would do differently. You will get better fast.',
        },
      ],
      commonMistakes: [
        'Apologizing too much when saying no. Being overly apologetic makes it seem like you are doing something wrong. You are not. You are running a business with clear boundaries.',
        'Saying "I cannot do that" instead of "I do not offer that." The first one sounds like a limitation. The second one sounds like a business decision. The difference matters.',
        'Making exceptions "just this once." One exception becomes a pattern. If you make an exception for one client, you will feel obligated to do it for the next one too.',
        'Not following up after saying no. Some people who walk away today come back later when they realize your standard package is exactly what they need. Stay on good terms.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'request',
        label: 'Describe a custom request you received',
        type: 'textarea',
        placeholder:
          'e.g., A client asked if I could add a custom booking system to their website package, which is not included in my standard offer.',
        helpText:
          'Describe a specific situation where someone asked for something outside your standard package.',
        howToFill: {
          guidanceText:
            'Pick one real situation where a client or prospect asked for something that is not in your package. Describe what they wanted and why it was outside the scope of your standard offer. Be specific about the request. Instead of "they wanted extra work," write "they asked me to also design their business cards and letterhead, which is not part of my website package." If you have not received a custom request yet, describe a request you are anticipating based on the patterns you saw in Chapter 3.',
          exampleThought:
            'A potential client loved my restaurant website package but asked if I could also set up an online ordering system integrated with their POS. That is a completely different type of project that would take three times as long as my standard package.',
        },
      },
      {
        fieldName: 'how_handled',
        label: 'How did you handle it?',
        type: 'textarea',
        placeholder:
          'e.g., I explained that my package is focused on getting their core website live and that an online ordering system would be a separate project. I referred them to a developer who specializes in POS integrations.',
        helpText:
          'Describe exactly what you said or did. Include whether the client still bought the standard package, walked away, or chose another option.',
        howToFill: {
          guidanceText:
            'Write down what you actually said to the client, as close to word-for-word as you can remember. Then describe what happened next. Did the client buy the standard package anyway? Did they walk away? Did they appreciate the clarity? Be honest about how it went, even if it was awkward. If you have not had this conversation yet, write down what you plan to say using one of the scripts from the guidance above. Then come back and update this after you have the real conversation.',
          exampleThought:
            'I told them that my package focuses on the core website and that the online ordering system would be a separate project requiring different expertise. I gave them the name of a developer I know who does POS integrations. The client appreciated the honesty and ended up buying my standard website package for now, with plans to add the ordering system later with the other developer.',
        },
      },
    ],
  },
  {
    id: 'productized_ch5_volume',
    pathId: 'productized_services',
    sequence: 5,
    title: 'Volume - Increase the number of packages you deliver',
    description:
      'You have a working package, a proven process, and the ability to say no to scope creep. Now it is time to deliver more packages without working more hours. This chapter helps you find and fix the bottlenecks that limit your capacity.',
    whatThisAchieves:
      'You will identify what is slowing you down and implement specific changes to handle more clients in the same amount of time.',
    completionCriteria:
      'You can describe how many packages you have delivered, what your biggest bottlenecks are, and what you are doing to address them.',
    howTo: {
      intro:
        'Scaling a productized service is not about working harder. It is about working smarter on the same package you already know how to deliver. You have already standardized your offer and your process. Now the question is: what is stopping you from delivering twice as many packages? The answer is usually one or two specific bottlenecks. Maybe it is the time you spend on client communication. Maybe it is one slow step in your production process. Maybe it is the fact that you are doing everything yourself. This chapter is about finding those bottlenecks and fixing them.',
      steps: [
        {
          title: 'Track where your time actually goes for three to five projects',
          body:
            'You cannot fix what you do not measure. For your next three to five projects, track how long each step in your process takes. Use a simple spreadsheet or a time-tracking tool. Write down the start and end time for every step. Include time spent on communication, waiting for client responses, doing the actual work, revisions, and delivery. At the end, add it all up and see which steps eat the most time.',
          tip:
            'Use a simple timer app on your phone. Start it when you begin a task, stop it when you are done. Do not try to estimate from memory. Actual tracking reveals surprises every time.',
        },
        {
          title: 'Identify your top two bottlenecks',
          body:
            'Look at your time data and find the two steps that take the longest or cause the most friction. Common bottlenecks include waiting for client feedback, doing repetitive setup tasks, making revisions because the first draft missed the mark, and context-switching between different clients. Your bottlenecks might also be less obvious, like spending 30 minutes writing a custom email to each client when a template would work, or redoing your file organization for every project because you do not have a standard folder structure.',
          tip:
            'Ask yourself: "If I could magically eliminate one step, which one would free up the most time?" That is probably your biggest bottleneck.',
        },
        {
          title: 'Fix each bottleneck with a specific change',
          body:
            'For each bottleneck, come up with one concrete change. If client communication takes too long, create email templates for every standard touchpoint. If setting up each project takes an hour, create a project template with all the folders, files, and settings already in place. If revisions are eating your time, improve your intake questionnaire so you get better information upfront and get closer to the right answer on the first try. If you are spending time on tasks that do not require your expertise, consider whether a tool or a freelancer could handle them.',
          tip:
            'Fix one bottleneck at a time. Implement the change, deliver a few projects with it, and measure the improvement before moving on to the next one. Trying to fix everything at once usually means nothing gets fixed properly.',
        },
        {
          title: 'Set a target for how many packages you want to deliver per month',
          body:
            'Based on your time data and the improvements you are making, set a realistic target. If you are currently delivering four packages per month and each one takes 15 hours, and you have freed up 3 hours per package through process improvements, you can now deliver five packages in the same time. Set that as your target and work toward it. As you hit each target, set a new one. Keep going until you hit a wall that requires hiring help or automating parts of the process, which is what Chapter 6 is about.',
          tip:
            'Your target should feel slightly uncomfortable but achievable. If it feels easy, you are not pushing hard enough. If it feels impossible, you are skipping steps.',
        },
      ],
      commonMistakes: [
        'Trying to scale before the package and process are solid. If every project still feels different, you are not ready to increase volume. Go back to Chapters 1 and 2 and tighten things up.',
        'Assuming the solution is always to work faster. Speed helps, but the biggest gains come from eliminating unnecessary steps, not doing necessary steps quicker.',
        'Ignoring communication as a bottleneck. For many service providers, client communication takes more time than the actual work. Templates, automated updates, and better intake forms can cut this dramatically.',
        'Not measuring the impact of changes. If you make a process improvement but do not track whether it actually saved time, you will not know what is working.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'total_delivered',
        label: 'How many packages have you delivered in total?',
        type: 'text',
        placeholder: 'e.g., 12',
        helpText:
          'Count every package you have fully delivered since you started selling your productized service.',
        howToFill: {
          guidanceText:
            'Count the total number of completed deliveries. A delivery counts when the client has received the final product and the project is closed. Do not count packages that are still in progress or ones where you gave a refund. This number helps you see your trajectory. Compare it to how long you have been selling the package to understand your monthly delivery rate.',
          exampleThought:
            'I have been selling my package for three months. I delivered 3 in month one, 4 in month two, and 5 in month three. That is 12 total, and the trend is going up, which is a good sign.',
        },
      },
      {
        fieldName: 'bottlenecks',
        label: 'What are your biggest bottlenecks?',
        type: 'textarea',
        placeholder:
          'e.g., Waiting for clients to send their content takes an average of 5 days and stalls every project. Writing custom project update emails takes 30 minutes per client per week.',
        helpText:
          'Describe the specific steps or situations that slow you down the most. Include time estimates if you can.',
        howToFill: {
          guidanceText:
            'Look at your time tracking data or think back over your recent projects. What caused delays? What took longer than it should have? What frustrated you? Write down the top two or three things that limit how many packages you can deliver. For each one, try to estimate how much time it costs you per project or per week. Then describe what you are doing or planning to do about each one. If you have already made improvements, describe what you changed and whether it helped.',
          exampleThought:
            'My biggest bottleneck is waiting for clients to send me their content. On average, it takes 5 days and I end up sending three follow-up emails. My second bottleneck is writing project update emails, which takes about 30 minutes per client each week. I am going to fix the first one by requiring all content before I start work, and the second one by creating email templates.',
        },
      },
    ],
  },
  {
    id: 'productized_ch6_next_step',
    pathId: 'productized_services',
    sequence: 6,
    title: 'Next Step - Decide to automate, hire help, or create a new package',
    description:
      'You have built a working productized service and pushed your personal capacity. Now you face a decision: automate parts of the process, hire someone to help you deliver, or create a second package. This chapter helps you decide which path makes sense for you right now.',
    whatThisAchieves:
      'You will make a clear decision about your next growth step and have a practical plan to start executing on it.',
    completionCriteria:
      'You have chosen your next step and can explain why it is the right move for your business right now.',
    howTo: {
      intro:
        'You have reached a point that most service providers never get to. You have a proven package, a repeatable process, and steady sales. Congratulations. Now you need to decide how to grow from here. There are three main options: automate parts of your process to free up more of your time, hire someone to help you deliver so you can take on more clients, or create a second package to sell alongside your first one. Each option has trade-offs, and the right choice depends on where you are and what you want. There is no wrong answer, but there is a wrong time for each option.',
      steps: [
        {
          title: 'Evaluate the automation option',
          body:
            'Automation works best when you have repetitive tasks that do not require human judgment. Look at your process and identify steps that are the same every single time. Things like sending welcome emails, creating project folders, generating invoices, scheduling calls, or sending status updates. These can often be automated with tools like Zapier, Make, Calendly, or simple email automation. Automation is the right first step if you are spending a lot of time on administrative tasks that pull you away from the actual work. The benefit is that it costs very little money and frees up your time immediately. The limitation is that it only works for tasks that follow a predictable pattern.',
          tip:
            'Start by automating the one task you do most often that does not require thinking. For most people, this is sending emails at specific stages of the project.',
        },
        {
          title: 'Evaluate the hiring option',
          body:
            'Hiring works best when your bottleneck is production capacity. If you are fully booked and turning away clients, but your process is well-documented, someone else can follow it. Start with a part-time contractor, not a full-time employee. Give them the parts of your process that require the least expertise. This might be the initial setup, the research phase, or the quality assurance checks. You keep the high-skill work and delegate the rest. Hiring is the right step if you have more demand than you can handle and your process is documented clearly enough that someone else can follow it without you hovering over their shoulder.',
          tip:
            'Before you hire, try doing one project where you pretend you are training someone. Write down every decision you make and why. If you can explain your reasoning clearly, your process is ready to be delegated. If you find yourself saying "it depends" a lot, you need to make your process more specific first.',
        },
        {
          title: 'Evaluate the new package option',
          body:
            'A second package works best when you see a clear pattern in the requests your current clients make after they buy your first package. Maybe every website client asks about SEO. Maybe every brand kit client needs social media templates. A natural second package often serves the same audience but addresses the next problem they face. Creating a new package is the right step if you are not at full capacity with your first package but want to increase revenue per client. Be careful though. A second package means a second process, a second sales conversation, and more complexity. Only do this if your first package is running smoothly.',
          tip:
            'The best second package is something you can offer to your existing clients. You have already built trust with them, so selling a follow-up package is much easier than finding new clients.',
        },
        {
          title: 'Make your decision and take the first step',
          body:
            'Pick one option. Not two, not three. One. Then take the smallest possible first step this week. If you chose automation, set up one automated email sequence. If you chose hiring, write a job description and post it in one place. If you chose a new package, draft the package description using the same format from Chapter 1. Do not overthink this decision. You can always change direction later. The worst thing you can do is spend weeks analyzing the options and taking no action. Pick the one that excites you most and start.',
          tip:
            'Set a deadline for your first step. Something like "by Friday, I will have my automated welcome email sequence set up" or "by next Monday, I will have a job posting live." A deadline turns a decision into an action.',
        },
      ],
      commonMistakes: [
        'Trying to do all three at once. Pick one growth path and focus on it until it is working before you add another.',
        'Hiring before your process is documented. If you cannot hand someone a step-by-step checklist, you are not ready to hire. You will spend all your time managing instead of growing.',
        'Automating things that should be personal. Some client touchpoints benefit from being human. Do not automate your feedback calls or your final delivery just because you can.',
        'Creating a second package because you are bored with the first one. Boredom is not a business reason. Only create a new package if there is clear demand for it from your existing clients.',
      ],
    },
    requiredOutputs: [
      {
        fieldName: 'choice',
        label: 'What is your next step, and why?',
        type: 'textarea',
        placeholder:
          'e.g., I am going to hire a part-time contractor to handle the initial setup and research phase of each project. My process is well-documented and I am turning away two to three clients per month because I am at full capacity.',
        helpText:
          'Describe which option you chose (automate, hire, or new package), why it is the right move for you right now, and what your first concrete step will be.',
        howToFill: {
          guidanceText:
            'Write down which option you are choosing and explain your reasoning. Start by describing your current situation: Are you at full capacity? Are you spending too much time on admin? Are clients asking for a follow-up service? Then explain which option addresses your biggest constraint. Finally, write down the specific first action you will take this week. Be concrete. Instead of "I will start automating," write "I will set up a Zapier workflow that automatically sends a welcome email and intake questionnaire when a new client pays." The more specific your first step, the more likely you are to actually do it.',
          exampleThought:
            'I am at full capacity and turning away about two clients per month. My process is solid and well-documented. I think hiring makes the most sense because my bottleneck is production time, not admin. My first step is to write a job description for a part-time contractor who can handle the initial project setup and research phase. I will post it on Upwork by Friday.',
        },
      },
    ],
  },
]
