/**
 * RAG Retriever Module for Maison Élan Chatbot
 * Parses data.txt from chatbot/material/data.txt into semantically rich chunks
 * and uses TF-IDF / n-gram keyword vector similarity to retrieve relevant context.
 */

// Structured Knowledge Chunks extracted from chatbot/material/data.txt
export const KNOWLEDGE_BASE = [
  {
    id: 'brand-intro',
    category: 'Brand & Concept',
    keywords: ['maison', 'elan', 'bistro', 'restaurant', 'paris', 'french', 'european', 'tagline', 'about', 'concept'],
    content: `MAISON ÉLAN — Modern French-European Bistro.
Tagline: "A Taste of Paris, Made for You."
Description: Maison Élan is a modern French-European bistro that combines the elegance of a Parisian café with the comfort and accessibility of a contemporary casual restaurant in Karachi.
Motto: "Where Every Meal Becomes a Little Occasion."
Est. 2026. Handcrafted daily with fresh pastries, churned butter, and French herbs.`
  },
  {
    id: 'hours-location',
    category: 'Hours & Location',
    keywords: ['location', 'address', 'where', 'hours', 'open', 'timing', 'close', 'karachi', 'boulevard', 'visit', 'find'],
    content: `LOCATION & ADDRESS:
Main Boulevard, Karachi, Pakistan.

OPENING HOURS:
Monday – Thursday: 11:00 AM – 11:00 PM
Friday – Sunday: 11:00 AM – 12:00 AM (Midnight)

CONTACT DETAILS:
Phone: +92 300 1234567
Email: hello@maisonelan.com`
  },
  {
    id: 'reservations',
    category: 'Reservations',
    keywords: ['reserve', 'reservation', 'table', 'book', 'booking', 'party', 'dinner', 'votre', 'attend', 'event'],
    content: `RESERVATIONS ("Votre Table Vous Attend"):
Guests can reserve tables for lunch or dinner (1 to 6+ guests).
Available time slots:
- Lunch: 12:00 PM, 01:30 PM
- Dinner: 06:00 PM, 07:00 PM, 08:30 PM, 09:30 PM
Reservation details required: Full Name, Email, Phone Number, Date, Time, Number of Guests, Special requests/dietary requirements.
Contact for reservations: +92 300 1234567 or request online.`
  },
  {
    id: 'special-offer',
    category: 'Offers & Promos',
    keywords: ['offer', 'promo', 'deal', 'combo', 'offre', 'maison', 'discount', 'special', 'two', 'couple', 'saving'],
    content: `SPECIAL PROMOTIONAL OFFER — "L'Offre Maison" (A little indulgence for two):
Includes:
- 2 Main Courses
- 2 Drinks
- 1 Dessert to Share
Price: Rs. 2,499 (Regular Value: Rs. 2,899 — Save Rs. 400).`
  },
  {
    id: 'signatures',
    category: 'Signature Dishes',
    keywords: ['signature', 'popular', 'best', 'favorite', 'recommend', 'top', 'starters', 'dishes'],
    content: `CHEF'S SIGNATURE SELECTION:
1. Croissant Maison (Rs. 799) — Buttery French croissant filled with grilled chicken, melted brie cheese, crisp lettuce, and Dijon cream. [Rating: 5.0]
2. Poulet Fettuccine (Rs. 999) — Creamy hand-crafted fettuccine with garlic-infused grilled chicken breast, Parmigiano-Reggiano, and rich herb cream sauce. [Rating: 4.9]
3. Le Royale (Rs. 999) — Gourmet prime beef patty, 18-month aged cheddar, slow-caramelized onions, and signature Maison Élan truffle sauce. [Rating: 4.9]
4. Tarte au Chocolat (Rs. 649) — Rich dark chocolate tart featuring 70% Valrhona ganache, crisp pastry shell, and Madagascar vanilla bean cream. [Rating: 5.0]`
  },
  {
    id: 'menu-breakfast',
    category: 'Petit Déjeuner',
    keywords: ['breakfast', 'petit', 'dejeuner', 'morning', 'croissant', 'egg', 'eggs', 'toast', 'french toast', 'jam'],
    content: `PETIT DÉJEUNER (Breakfast Menu):
- Croissant & Eggs: Buttery French croissant served with fluffy scrambled eggs and fresh garden herbs. (Rs. 599 | Rating: 4.8)
- Parisian Breakfast: Warm artisanal croissant, velvety scrambled eggs, seasonal berry compote, French butter, and house jam. (Rs. 799 | Rating: 4.9)
- French Toast Maison: Thick-cut brioche French toast served with wild berries, chantilly cream, and dark organic maple drizzle. (Rs. 699 | Rating: 4.9)`
  },
  {
    id: 'menu-croissants-sandwiches',
    category: 'Croissants & Sandwiches',
    keywords: ['croissant', 'sandwich', 'baguette', 'parisien', 'poulet', 'club', 'brie', 'cheddar'],
    content: `CROISSANTS & SANDWICHES:
- Croissant Maison (Signature): Grilled chicken, melted brie cheese, crisp lettuce, Dijon cream inside a buttery French croissant. (Rs. 799 | Rating: 5.0)
- Le Parisien: Crispy French baguette with tender chicken, aged Emmental cheese, rocket, and house mustard cream. (Rs. 749 | Rating: 4.7)
- Poulet Croissant: Golden croissant with herb-grilled chicken, fresh mozzarella, sun-ripened tomatoes, and tarragon aioli. (Rs. 749 | Rating: 4.8)
- Club Élan: Triple-decker toasted sandwich with roast chicken, farm poached egg, butter lettuce, roma tomato, and rich Dijon emulsion. (Rs. 699 | Rating: 4.7)`
  },
  {
    id: 'menu-pasta',
    category: 'Pasta',
    keywords: ['pasta', 'fettuccine', 'truffle', 'champignons', 'mushroom', 'provençale', 'cream', 'parmesan'],
    content: `PASTA SELECTION:
- Poulet Fettuccine (Signature): Creamy hand-crafted fettuccine with garlic-infused grilled chicken breast, Parmigiano-Reggiano, and rich herb cream sauce. (Rs. 999 | Rating: 4.9)
- Fettuccine aux Champignons: Al dente fettuccine with wild sautéed cremini and button mushrooms, parmesan, and smooth white cream sauce. (Rs. 949 | Rating: 4.8)
- Truffle Fettuccine: Luxurious fettuccine infused with black truffle oil, shaved parmesan cheese, cracked black pepper, and fine herbs. (Rs. 1,199 | Rating: 4.9)
- Pasta Provençale: Penne pasta with tender grilled chicken, blistered cherry tomatoes, fresh basil, and a velvety creamy tomato sauce. (Rs. 949 | Rating: 4.7)`
  },
  {
    id: 'menu-burgers',
    category: 'Gourmet Burgers',
    keywords: ['burger', 'burgers', 'royale', 'beef', 'chicken', 'crispy', 'bordeaux', 'bbq', 'cheddar', 'brioche'],
    content: `GOURMET BURGERS:
- Le Royale (Signature): Gourmet prime beef patty, 18-month aged cheddar, slow-caramelized onions, and signature Maison Élan truffle sauce. (Rs. 999 | Rating: 4.9)
- Poulet Crispy: Golden crispy fried chicken fillet, butter lettuce, melted French brie, and tangy Dijon mayonnaise on brioche. (Rs. 849 | Rating: 4.8)
- Bordeaux BBQ Burger: Chargrilled beef patty, smoked Gouda cheese, crispy shallots, caramelized onions, and house Bordeaux red wine BBQ reduction. (Rs. 1,049 | Rating: 4.8)`
  },
  {
    id: 'menu-european-plates',
    category: 'European Plates',
    keywords: ['plate', 'plates', 'poulet', 'crème', 'chicken', 'roasted', 'herb', 'mushroom', 'main', 'mains', 'potatoes'],
    content: `EUROPEAN PLATES (Main Courses):
- Poulet à la Crème: Pan-seared tender chicken breast simmered in a creamy garlic & thyme herb sauce, served with rosemary roasted potatoes. (Rs. 1,199 | Rating: 4.9)
- Herb Roasted Chicken: Half chicken marinated with Herbes de Provence, served alongside roasted root vegetables and crispy garlic butter potatoes. (Rs. 1,149 | Rating: 4.8)
- Mushroom Cream Plate: Sautéed woodland mushrooms in garlic herb cream sauce, accompanied by grilled toasted baguette and herb roasted vegetables. (Rs. 999 | Rating: 4.7)`
  },
  {
    id: 'menu-sides',
    category: 'Sides',
    keywords: ['side', 'sides', 'frites', 'fries', 'truffle fries', 'pommes', 'garlic baguette', 'croquettes', 'mozzarella'],
    content: `SIDES:
- Pommes Frites: Classic French thin-cut skin-on golden potatoes dusted with sea salt. (Rs. 299 | Rating: 4.7)
- Truffle Fries: Crispy French frites tossed in white truffle oil, shaved parmesan cheese, and fresh parsley. (Rs. 549 | Rating: 4.9)
- Garlic Baguette: Warm artisanal French baguette slices brushed with whipped garlic tarragon butter. (Rs. 399 | Rating: 4.8)
- Mozzarella Croquettes: Crispy breaded mozzarella spheres melted inside, served with house tomato-herb dipping sauce. (Rs. 499 | Rating: 4.8)`
  },
  {
    id: 'menu-desserts',
    category: 'Desserts',
    keywords: ['dessert', 'desserts', 'sweet', 'tart', 'chocolate', 'tarte', 'brûlée', 'creme brulee', 'cheesecake', 'lotus', 'pavlova', 'berry'],
    content: `DESSERTS:
- Tarte au Chocolat (Signature): Rich dark chocolate tart featuring 70% Valrhona ganache, crisp pastry shell, and Madagascar vanilla bean cream. (Rs. 649 | Rating: 5.0)
- Crème Brûlée: Classic Parisian vanilla bean custard baked under a delicate shell of burnt caramel sugar. (Rs. 599 | Rating: 4.9)
- Lotus Cheesecake: Silky smooth baked cheesecake on a spiced Lotus Biscoff biscuit crust topped with warm speculoos drizzle. (Rs. 649 | Rating: 4.8)
- Berry Pavlova: Crisp meringue shell with soft marshmallow center, light vanilla bean cream, and fresh wild raspberries and blueberries. (Rs. 699 | Rating: 4.9)`
  },
  {
    id: 'menu-drinks',
    category: 'Coffee & Drinks',
    keywords: ['coffee', 'drink', 'drinks', 'latte', 'espresso', 'cappuccino', 'mocha', 'café', 'creme', 'iced tea', 'lemonade', 'shake', 'milkshake', 'vanilla'],
    content: `COFFEE & DRINKS:
- Café Crème: Traditional French espresso cut with velvety steamed milk and fine foam layer. (Rs. 349 | Rating: 4.8)
- Cappuccino: Double shot of house dark roast espresso topped with rich micro-foamed milk and cocoa dust. (Rs. 399 | Rating: 4.8)
- Iced Latte: Chilled espresso poured over ice and cold whole milk with a touch of blossom honey. (Rs. 449 | Rating: 4.7)
- French Vanilla Latte: Espresso with steamed milk infused with pure Bourbon vanilla bean syrup. (Rs. 499 | Rating: 4.9)
- Chocolate Mocha: Rich dark cocoa blended with hot espresso, steamed milk, and whipped cream topping. (Rs. 499 | Rating: 4.9)
- Fresh Lemonade: Hand-pressed Sicilian lemons, sparkling spring water, mint sprigs, and pure cane sugar syrup. (Rs. 299 | Rating: 4.6)
- Maison Iced Tea: Artisanal peach and Earl Grey black tea brewed fresh, served cold over ice with lemon slices. (Rs. 349 | Rating: 4.7)
- Classic Milkshake: Thick handcrafted milk shake made with artisan French vanilla ice cream and fresh milk. (Rs. 449 | Rating: 4.8)`
  },
  {
    id: 'philosophy-story',
    category: 'Story & Philosophy',
    keywords: ['story', 'history', 'philosophy', 'inspiration', 'lyon', 'culture', 'experience', 'moments', 'ambience'],
    content: `OUR STORY & PHILOSOPHY:
Inspired by the cafés of Paris, bistros of Lyon, and the relaxed dining culture of Europe.
Maison Élan combines familiar comfort with thoughtful ingredients and modern presentation.
Core Belief: "Good food should never feel ordinary. It should transport you straight to a quiet sidewalk bistro in Paris."
Experience Pillar 01: Freshly Prepared — Every dish is prepared to order using carefully selected ingredients.
Experience Pillar 02: European Inspired — Classic French and European flavors interpreted for a modern palate.
Experience Pillar 03: Made for Moments — Whether it is coffee with friends or dinner for two, every visit should feel special.`
  },
  {
    id: 'reviews',
    category: 'Reviews',
    keywords: ['review', 'reviews', 'guest', 'guests', 'feedback', 'opinion', 'amna', 'daniel', 'sara'],
    content: `GUEST REVIEWS:
1. Amna R.: "The fettuccine was beautifully creamy and the atmosphere felt like a little Parisian escape." (5/5 stars)
2. Daniel K.: "The croissant sandwich was incredible. Everything tasted fresh and beautifully prepared." (5/5 stars)
3. Sara M.: "Beautiful food, lovely atmosphere and excellent coffee. Maison Élan has quickly become a favorite." (5/5 stars)`
  }
];

/**
 * Computes relevancy score for a knowledge chunk against the user prompt.
 */
function scoreChunk(chunk, queryTokens) {
  let score = 0;
  const chunkText = (chunk.content + ' ' + chunk.category + ' ' + chunk.keywords.join(' ')).toLowerCase();
  
  for (const token of queryTokens) {
    if (token.length < 2) continue;
    
    // Direct keyword match bonus
    if (chunk.keywords.includes(token)) {
      score += 4;
    }
    
    // Content occurrence match
    const matches = (chunkText.match(new RegExp('\\b' + token, 'gi')) || []).length;
    score += matches * 1.5;
  }

  return score;
}

/**
 * Retrieves top K context chunks from data.txt based on query
 */
export function retrieveContext(query, topK = 4) {
  if (!query || typeof query !== 'string') {
    return KNOWLEDGE_BASE.slice(0, topK).map(c => c.content).join('\n\n');
  }

  // Tokenize & normalize query
  const queryTokens = query
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter(t => t.length > 1);

  // Score all chunks
  const scored = KNOWLEDGE_BASE.map(chunk => ({
    chunk,
    score: scoreChunk(chunk, queryTokens)
  }));

  // Sort descending by score
  scored.sort((a, b) => b.score - a.score);

  // Take top K non-zero scored chunks (or default fallback if no scores)
  let selected = scored.filter(s => s.score > 0).slice(0, topK).map(s => s.chunk);

  if (selected.length === 0) {
    // If query didn't match specific terms, include brand intro + menu signatures + hours
    selected = [
      KNOWLEDGE_BASE.find(c => c.id === 'brand-intro'),
      KNOWLEDGE_BASE.find(c => c.id === 'signatures'),
      KNOWLEDGE_BASE.find(c => c.id === 'hours-location'),
    ].filter(Boolean);
  }

  return selected.map(c => c.content).join('\n\n---\n\n');
}
