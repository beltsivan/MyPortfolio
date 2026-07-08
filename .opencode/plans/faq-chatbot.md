# FAQ Rule-Based Chatbot Implementation

## Problem
Gemini API quota exceeded. Need a no-API alternative.

## Solution
Rule-based keyword matching chatbot. No API, no server, works offline.

## Files

### 1. CREATE `src/data/chatbot-data.ts`

```typescript
export interface QAItem {
  keywords: string[];
  answer: string;
}

export const qaData: QAItem[] = [
  {
    keywords: ['who', 'about', 'yourself', 'background', 'tell', 'ivan', 'beltran', 'name'],
    answer: "I'm Ivan Mathew Beltran, a 22-year-old Graphic & Web Designer. I build clean, user-centered interfaces with seamless backend integration.",
  },
  {
    keywords: ['project', 'work', 'done', 'portfolio', 'build', 'made', 'create', 'what'],
    answer: "I have 5 main projects:\n1. Computer Services Appointment Booking — React, Vite, Tailwind (Live)\n2. Diamond Skin Care — React, Firebase, Firestore (Live)\n3. School Management System — C#, ASP.NET MVC, SQL Server\n4. McDelivery PH Website Clone — PHP, MySQL\n5. McDelivery PH Mobile App — Kotlin, Android Studio",
  },
  {
    keywords: ['skill', 'technology', 'tech', 'know', 'tools', 'stack', 'proficient', 'language'],
    answer: "My skills include:\n• Design: Graphic Design, UI/UX, T-Shirt Design, Visual Identity, Responsive Design\n• Frontend: HTML, CSS, JavaScript, React\n• Backend: PHP, MySQL, Firebase, REST APIs\n• Tools: Figma, Canva, Photoshop, Illustrator, Google Analytics\n• Other: C#, ASP.NET MVC, Kotlin, CMS Management",
  },
  {
    keywords: ['email', 'contact', 'reach', 'hire', 'message', 'get in touch'],
    answer: "You can reach me at ivanmathewbeltran@email.com or connect on LinkedIn at https://www.linkedin.com/in/ivan-beltran-894124405/",
  },
  {
    keywords: ['github', 'code', 'repository', 'source'],
    answer: "My GitHub profile is https://github.com/beltsivan",
  },
  {
    keywords: ['appointment', 'booking', 'computer', 'repair', 'service'],
    answer: "Computer Services Appointment Booking is a React app for booking computer repair services. Features service selection, date/time picking, real-time availability, and admin dashboard. Built with React, Vite, Tailwind CSS, and REST API. Live at https://computer-services-appointment-booki.vercel.app/",
  },
  {
    keywords: ['diamond', 'skin', 'care', 'skincare', 'beauty', 'cms'],
    answer: "Diamond Skin Care is a skincare business website with online appointment booking, user authentication, and a full admin CMS dashboard. Built with React, Tailwind CSS, Firebase, and Firestore. Live at https://diamond-skin-care.vercel.app/",
  },
  {
    keywords: ['school', 'management', 'student', 'grade', 'enrollment', 'academic'],
    answer: "The School Management System is a C# ASP.NET MVC application managing student enrollment, class scheduling, grade recording, report cards, and teacher assignments with role-based access.",
  },
  {
    keywords: ['mcdelivery', 'mcdo', 'mcdonald', 'food', 'delivery'],
    answer: "I have two McDelivery PH projects: Website Clone (PHP, MySQL) with menu catalog, cart, orders, and admin dashboard; and Mobile App Clone (Kotlin, Android Studio) with Firebase backend, real-time order tracking, and push notifications. Both in development.",
  },
  {
    keywords: ['graphic', 'design', 'visual', 'beauty', 'church', 'flower', 'food', 'drink'],
    answer: "My Graphic Design portfolio has 4 subcategories: Beauty (Diamond Skin Care branding, social media, ads), Church Design (website and event posters), Flower Shop (brand collateral, lookbooks, social media, catalogs), Food & Drinks (menu boards, marketing, illustrations, beverage branding).",
  },
  {
    keywords: ['tshirt', 't-shirt', 'shirt', 'apparel', 'clothing', 'design'],
    answer: "I have 10 t-shirt designs featuring MM branding, Ancient-inspired art, David piece, and numbered designs (6, 8, 9, 10, 13, 14, 15) with themes from streetwear to minimalist to pop-art.",
  },
  {
    keywords: ['presentation', 'deck', 'slide', 'powerpoint', 'pitch'],
    answer: "I have 6 presentation decks: Flexibility & Adaptability, Operations Management, Business Development Management, Conflict Management, Cultural Awareness, and Empathy in the Workplace (16-24 slides each).",
  },
  {
    keywords: ['web', 'development', 'frontend', 'backend', 'fullstack', 'website'],
    answer: "My web development work includes 5 projects using React, PHP, C#, Firebase, and MySQL. I build responsive, functional web applications with clean UI and database integration.",
  },
  {
    keywords: ['education', 'college', 'student', 'course', 'study', 'learn'],
    answer: "I'm currently a college student building my skills in web and graphic design alongside my studies.",
  },
  {
    keywords: ['price', 'rate', 'cost', 'freelance', 'pay', 'budget'],
    answer: "For inquiries about rates or freelance work, please contact me at ivanmathewbeltran@email.com",
  },
  {
    keywords: ['live', 'demo', 'link', 'url', 'website', 'visit', 'see'],
    answer: "Live projects: Computer Services Appointment Booking (https://computer-services-appointment-booki.vercel.app/) and Diamond Skin Care (https://diamond-skin-care.vercel.app/). Others are in development.",
  },
];
```

### 2. REWRITE `src/components/ChatBot.tsx`

Replace the Gemini API call with local keyword matching. Import `qaData` from the data file.

Key changes in `sendMessage()`:
```tsx
import { qaData } from '../data/chatbot-data';

// In sendMessage, replace the fetch block with:
const words = userMsg.toLowerCase().split(/\s+/);
let bestScore = 0;
let bestAnswer = "I can only answer based on the portfolio data. Try asking about my projects, skills, design work, or contact info.";

for (const item of qaData) {
  const score = item.keywords.filter(kw => words.some(w => w.includes(kw) || kw.includes(w))).length;
  if (score > bestScore) {
    bestScore = score;
    bestAnswer = item.answer;
  }
}
setMessages(prev => [...prev, { role: 'assistant', text: bestAnswer }]);
```

Also remove the `API_KEY` constant since it's no longer needed.

### 3. DELETE `api/` directory (already done)

### 4. KEEP `.env` as-is or delete — no longer used by the app

## Testing
1. Run `npm run dev`
2. Open http://localhost:3000
3. Click chat circle
4. Try: "what projects?", "your email?", "skills?", "tshirt designs?"
5. Each should return the matching answer instantly
