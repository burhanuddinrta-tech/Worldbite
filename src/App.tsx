import { useMemo, useState } from 'react';
import {
  Search,
  Plus,
  Globe2,
  Utensils,
  CalendarDays,
  Trash2,
  Leaf,
  Flame,
  ChevronDown,
  Check,
  X,
} from 'lucide-react';

type Food = {
  id: string;
  name: string;
  region: string;
  category: string;
  kcal: number;
  unit: string;
  portion: number;
  emoji: string;
  note?: string;
};
type Entry = {
  id: string;
  food: Food;
  grams: number;
  meal: string;
  date: string;
};

const foods: Food[] = [
  {
    id: 'idli',
    name: 'Idli',
    region: 'South Asia',
    category: 'Breakfast',
    kcal: 146,
    unit: '100 g',
    portion: 100,
    emoji: '🍚',
  },
  {
    id: 'dosa',
    name: 'Plain dosa',
    region: 'South Asia',
    category: 'Breakfast',
    kcal: 168,
    unit: '100 g',
    portion: 100,
    emoji: '🥞',
  },
  {
    id: 'masala-dosa',
    name: 'Masala dosa',
    region: 'South Asia',
    category: 'Main',
    kcal: 190,
    unit: '100 g',
    portion: 180,
    emoji: '🥞',
    note: 'Recipe and oil change the value',
  },
  {
    id: 'rice',
    name: 'Cooked white rice',
    region: 'South Asia',
    category: 'Staple',
    kcal: 130,
    unit: '100 g',
    portion: 150,
    emoji: '🍚',
  },
  {
    id: 'biryani',
    name: 'Chicken biryani',
    region: 'South Asia',
    category: 'Main',
    kcal: 180,
    unit: '100 g',
    portion: 300,
    emoji: '🍛',
    note: 'Recipe-dependent estimate',
  },
  {
    id: 'dal',
    name: 'Cooked dal',
    region: 'South Asia',
    category: 'Main',
    kcal: 116,
    unit: '100 g',
    portion: 150,
    emoji: '🥣',
  },
  {
    id: 'chapati',
    name: 'Chapati / roti',
    region: 'South Asia',
    category: 'Bread',
    kcal: 297,
    unit: '100 g',
    portion: 40,
    emoji: '🫓',
  },
  {
    id: 'paneer',
    name: 'Paneer curry',
    region: 'South Asia',
    category: 'Main',
    kcal: 220,
    unit: '100 g',
    portion: 180,
    emoji: '🍲',
    note: 'Depends on cream and oil',
  },
  {
    id: 'samosa',
    name: 'Vegetable samosa',
    region: 'South Asia',
    category: 'Snack',
    kcal: 308,
    unit: '100 g',
    portion: 80,
    emoji: '🥟',
  },
  {
    id: 'poha',
    name: 'Poha',
    region: 'South Asia',
    category: 'Breakfast',
    kcal: 130,
    unit: '100 g',
    portion: 200,
    emoji: '🍲',
  },
  {
    id: 'upma',
    name: 'Upma',
    region: 'South Asia',
    category: 'Breakfast',
    kcal: 120,
    unit: '100 g',
    portion: 200,
    emoji: '🥣',
  },
  {
    id: 'curd',
    name: 'Plain curd / yogurt',
    region: 'South Asia',
    category: 'Dairy',
    kcal: 61,
    unit: '100 g',
    portion: 100,
    emoji: '🥛',
  },
  {
    id: 'naan',
    name: 'Naan',
    region: 'South Asia',
    category: 'Bread',
    kcal: 290,
    unit: '100 g',
    portion: 90,
    emoji: '🫓',
  },
  {
    id: 'falafel',
    name: 'Falafel',
    region: 'Middle East',
    category: 'Snack',
    kcal: 333,
    unit: '100 g',
    portion: 100,
    emoji: '🧆',
  },
  {
    id: 'hummus',
    name: 'Hummus',
    region: 'Middle East',
    category: 'Dip',
    kcal: 166,
    unit: '100 g',
    portion: 60,
    emoji: '🥣',
  },
  {
    id: 'shawarma',
    name: 'Chicken shawarma',
    region: 'Middle East',
    category: 'Main',
    kcal: 230,
    unit: '100 g',
    portion: 250,
    emoji: '🌯',
    note: 'Sauces and bread vary',
  },
  {
    id: 'tabbouleh',
    name: 'Tabbouleh',
    region: 'Middle East',
    category: 'Salad',
    kcal: 120,
    unit: '100 g',
    portion: 150,
    emoji: '🥗',
  },
  {
    id: 'pizza',
    name: 'Cheese pizza',
    region: 'Europe',
    category: 'Main',
    kcal: 266,
    unit: '100 g',
    portion: 110,
    emoji: '🍕',
  },
  {
    id: 'pasta',
    name: 'Cooked pasta',
    region: 'Europe',
    category: 'Staple',
    kcal: 157,
    unit: '100 g',
    portion: 180,
    emoji: '🍝',
  },
  {
    id: 'croissant',
    name: 'Croissant',
    region: 'Europe',
    category: 'Bakery',
    kcal: 406,
    unit: '100 g',
    portion: 60,
    emoji: '🥐',
  },
  {
    id: 'greek-yogurt',
    name: 'Plain Greek yogurt',
    region: 'Europe',
    category: 'Dairy',
    kcal: 97,
    unit: '100 g',
    portion: 170,
    emoji: '🥣',
  },
  {
    id: 'fish-chips',
    name: 'Fish and chips',
    region: 'Europe',
    category: 'Main',
    kcal: 232,
    unit: '100 g',
    portion: 350,
    emoji: '🐟',
  },
  {
    id: 'sushi',
    name: 'Salmon sushi',
    region: 'East Asia',
    category: 'Main',
    kcal: 150,
    unit: '100 g',
    portion: 200,
    emoji: '🍣',
  },
  {
    id: 'ramen',
    name: 'Pork ramen',
    region: 'East Asia',
    category: 'Main',
    kcal: 150,
    unit: '100 g',
    portion: 500,
    emoji: '🍜',
    note: 'Broth and toppings vary',
  },
  {
    id: 'miso',
    name: 'Miso soup',
    region: 'East Asia',
    category: 'Soup',
    kcal: 40,
    unit: '100 g',
    portion: 240,
    emoji: '🍲',
  },
  {
    id: 'kimchi',
    name: 'Kimchi',
    region: 'East Asia',
    category: 'Side',
    kcal: 15,
    unit: '100 g',
    portion: 50,
    emoji: '🥬',
  },
  {
    id: 'dumplings',
    name: 'Steamed dumplings',
    region: 'East Asia',
    category: 'Main',
    kcal: 220,
    unit: '100 g',
    portion: 150,
    emoji: '🥟',
  },
  {
    id: 'fried-rice',
    name: 'Egg fried rice',
    region: 'East Asia',
    category: 'Main',
    kcal: 174,
    unit: '100 g',
    portion: 250,
    emoji: '🍚',
  },
  {
    id: 'taco',
    name: 'Beef taco',
    region: 'Latin America',
    category: 'Main',
    kcal: 220,
    unit: '100 g',
    portion: 150,
    emoji: '🌮',
  },
  {
    id: 'guac',
    name: 'Guacamole',
    region: 'Latin America',
    category: 'Dip',
    kcal: 150,
    unit: '100 g',
    portion: 50,
    emoji: '🥑',
  },
  {
    id: 'black-beans',
    name: 'Cooked black beans',
    region: 'Latin America',
    category: 'Staple',
    kcal: 132,
    unit: '100 g',
    portion: 150,
    emoji: '🫘',
  },
  {
    id: 'arepa',
    name: 'Arepa',
    region: 'Latin America',
    category: 'Bread',
    kcal: 218,
    unit: '100 g',
    portion: 100,
    emoji: '🫓',
  },
  {
    id: 'jollof',
    name: 'Jollof rice',
    region: 'Africa',
    category: 'Main',
    kcal: 160,
    unit: '100 g',
    portion: 250,
    emoji: '🍛',
    note: 'Oil and recipe vary',
  },
  {
    id: 'injera',
    name: 'Injera',
    region: 'Africa',
    category: 'Bread',
    kcal: 131,
    unit: '100 g',
    portion: 100,
    emoji: '🫓',
  },
  {
    id: 'plantain',
    name: 'Fried plantain',
    region: 'Africa',
    category: 'Side',
    kcal: 250,
    unit: '100 g',
    portion: 100,
    emoji: '🍌',
  },
  {
    id: 'peanut-stew',
    name: 'Groundnut stew',
    region: 'Africa',
    category: 'Main',
    kcal: 180,
    unit: '100 g',
    portion: 250,
    emoji: '🥘',
  },
  {
    id: 'burger',
    name: 'Beef burger',
    region: 'North America',
    category: 'Main',
    kcal: 295,
    unit: '100 g',
    portion: 220,
    emoji: '🍔',
  },
  {
    id: 'pancakes',
    name: 'Buttermilk pancakes',
    region: 'North America',
    category: 'Breakfast',
    kcal: 227,
    unit: '100 g',
    portion: 150,
    emoji: '🥞',
  },
  {
    id: 'mac-cheese',
    name: 'Macaroni and cheese',
    region: 'North America',
    category: 'Main',
    kcal: 164,
    unit: '100 g',
    portion: 250,
    emoji: '🧀',
  },
  {
    id: 'oatmeal',
    name: 'Oatmeal, cooked',
    region: 'North America',
    category: 'Breakfast',
    kcal: 71,
    unit: '100 g',
    portion: 240,
    emoji: '🥣',
  },
  {
    id: 'vegemite-toast',
    name: 'Vegemite toast',
    region: 'Oceania',
    category: 'Breakfast',
    kcal: 250,
    unit: '100 g',
    portion: 70,
    emoji: '🍞',
  },
  {
    id: 'meat-pie',
    name: 'Australian meat pie',
    region: 'Oceania',
    category: 'Main',
    kcal: 260,
    unit: '100 g',
    portion: 200,
    emoji: '🥧',
  },
  {
    id: 'apple',
    name: 'Apple',
    region: 'Everywhere',
    category: 'Fruit',
    kcal: 52,
    unit: '100 g',
    portion: 180,
    emoji: '🍎',
  },
  {
    id: 'banana',
    name: 'Banana',
    region: 'Everywhere',
    category: 'Fruit',
    kcal: 89,
    unit: '100 g',
    portion: 120,
    emoji: '🍌',
  },
  {
    id: 'egg',
    name: 'Boiled egg',
    region: 'Everywhere',
    category: 'Protein',
    kcal: 155,
    unit: '100 g',
    portion: 50,
    emoji: '🥚',
  },
  {
    id: 'chicken',
    name: 'Cooked chicken breast',
    region: 'Everywhere',
    category: 'Protein',
    kcal: 165,
    unit: '100 g',
    portion: 120,
    emoji: '🍗',
  },
  {
    id: 'salmon',
    name: 'Cooked salmon',
    region: 'Everywhere',
    category: 'Protein',
    kcal: 206,
    unit: '100 g',
    portion: 120,
    emoji: '🐟',
  },
  {
    id: 'tofu',
    name: 'Firm tofu',
    region: 'Everywhere',
    category: 'Protein',
    kcal: 144,
    unit: '100 g',
    portion: 100,
    emoji: '🧈',
  },
  {
    id: 'almonds',
    name: 'Almonds',
    region: 'Everywhere',
    category: 'Snack',
    kcal: 579,
    unit: '100 g',
    portion: 28,
    emoji: '🥜',
  },
  {
    id: 'milk',
    name: 'Whole milk',
    region: 'Everywhere',
    category: 'Dairy',
    kcal: 61,
    unit: '100 g',
    portion: 240,
    emoji: '🥛',
  },
  {
    id: 'bread',
    name: 'Whole wheat bread',
    region: 'Everywhere',
    category: 'Bread',
    kcal: 247,
    unit: '100 g',
    portion: 35,
    emoji: '🍞',
  },
  {
    id: 'avocado',
    name: 'Avocado',
    region: 'Everywhere',
    category: 'Fruit',
    kcal: 160,
    unit: '100 g',
    portion: 75,
    emoji: '🥑',
  },
  {
    id: 'broccoli',
    name: 'Broccoli, cooked',
    region: 'Everywhere',
    category: 'Vegetable',
    kcal: 35,
    unit: '100 g',
    portion: 100,
    emoji: '🥦',
  },
  {
    id: 'potato',
    name: 'Baked potato',
    region: 'Everywhere',
    category: 'Vegetable',
    kcal: 93,
    unit: '100 g',
    portion: 170,
    emoji: '🥔',
  },
  {
    id: 'dark-chocolate',
    name: 'Dark chocolate',
    region: 'Everywhere',
    category: 'Treat',
    kcal: 598,
    unit: '100 g',
    portion: 20,
    emoji: '🍫',
  },
  {
    id: 'orange-juice',
    name: 'Orange juice',
    region: 'Everywhere',
    category: 'Drink',
    kcal: 45,
    unit: '100 g',
    portion: 240,
    emoji: '🍊',
  },
];

const today = () => new Date().toLocaleDateString('en-CA');
const regions = [
  'All regions',
  'South Asia',
  'East Asia',
  'Middle East',
  'Europe',
  'Africa',
  'Latin America',
  'North America',
  'Oceania',
  'Everywhere',
];
const meals = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
const loadEntries = (): Entry[] => {
  try {
    return JSON.parse(localStorage.getItem('worldbite-entries') || '[]');
  } catch {
    return [];
  }
};

function App() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('All regions');
  const [meal, setMeal] = useState('Lunch');
  const [selected, setSelected] = useState<Food | null>(null);
  const [grams, setGrams] = useState(150);
  const [entries, setEntries] = useState<Entry[]>(loadEntries);
  const [day, setDay] = useState(today());
  const [tab, setTab] = useState<'foods' | 'log'>('foods');
  const [customOpen, setCustomOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customKcal, setCustomKcal] = useState('');
  const [customGrams, setCustomGrams] = useState('100');
  const [customRegion, setCustomRegion] = useState('Everywhere');
  const [customFoods, setCustomFoods] = useState<Food[]>([]);
  const [notice, setNotice] = useState('');
  const allFoods = useMemo(() => [...foods, ...customFoods], [customFoods]);
  const filtered = useMemo(
    () =>
      allFoods.filter(
        f =>
          (region === 'All regions' || f.region === region) &&
          (f.name.toLowerCase().includes(query.toLowerCase()) ||
            f.category.toLowerCase().includes(query.toLowerCase()) ||
            f.region.toLowerCase().includes(query.toLowerCase()))
      ),
    [allFoods, query, region]
  );
  const todays = entries.filter(e => e.date === day);
  const total = todays.reduce(
    (sum, e) => sum + (e.food.kcal * e.grams) / 100,
    0
  );
  const addEntry = () => {
    if (!selected || grams <= 0) return;
    const next = [
      ...entries,
      { id: crypto.randomUUID(), food: selected, grams, meal, date: day },
    ];
    setEntries(next);
    localStorage.setItem('worldbite-entries', JSON.stringify(next));
    setNotice('Added to your meal log');
    setSelected(null);
    window.setTimeout(() => setNotice(''), 2200);
  };
  const removeEntry = (id: string) => {
    const next = entries.filter(e => e.id !== id);
    setEntries(next);
    localStorage.setItem('worldbite-entries', JSON.stringify(next));
  };
  const addCustom = () => {
    const k = Number(customKcal),
      g = Number(customGrams);
    if (
      !customName.trim() ||
      !Number.isFinite(k) ||
      k < 0 ||
      !Number.isFinite(g) ||
      g <= 0
    )
      return;
    const food: Food = {
      id: crypto.randomUUID(),
      name: customName.trim(),
      region: customRegion,
      category: 'Custom',
      kcal: k,
      unit: `${g} g`,
      portion: g,
      emoji: '🍽️',
      note: 'Your entered value per 100 g',
    };
    setCustomFoods([...customFoods, food]);
    setSelected(food);
    setGrams(g);
    setCustomOpen(false);
    setQuery('');
    setCustomName('');
    setCustomKcal('');
    setCustomGrams('100');
  };
  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#">
          <span className="brand-mark">
            <Leaf size={22} />
          </span>
          <span>
            worldbite<span className="brand-light"> calories</span>
          </span>
        </a>
        <span className="top-tag">
          <Globe2 size={15} /> FOOD FROM EVERYWHERE
        </span>
      </header>
      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="pulse" /> YOUR FOOD, YOUR WORLD
            </div>
            <h1>
              Know what’s
              <br />
              <span>on your plate.</span>
            </h1>
            <p>
              Explore dishes from around the globe and estimate calories by the
              portion you actually eat.
            </p>
            <div className="hero-pills">
              <span>
                <Globe2 size={15} /> 9 cuisine regions
              </span>
              <span>
                <Utensils size={15} /> 50+ foods
              </span>
            </div>
          </div>
          <div className="hero-art">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="food-plate">
              <span>🥗</span>
            </div>
            <div className="float-chip chip-one">🥑 Fresh picks</div>
            <div className="float-chip chip-two">🍜 Global eats</div>
            <div className="float-chip chip-three">
              <Flame size={15} /> kcal made simple
            </div>
          </div>
        </section>
        <section className="daily-card">
          <div className="daily-top">
            <div>
              <span className="section-kicker">YOUR DAILY SNAPSHOT</span>
              <h2>Today at a glance</h2>
            </div>
            <label className="date-control">
              <CalendarDays size={16} />
              <input
                type="date"
                value={day}
                onChange={e => setDay(e.target.value)}
              />
            </label>
          </div>
          <div className="daily-stats">
            <div className="stat-main">
              <div className="stat-icon">
                <Flame size={19} />
              </div>
              <div>
                <span>Logged calories</span>
                <div className="stat-number">
                  {Math.round(total).toLocaleString()} <small>kcal</small>
                </div>
              </div>
            </div>
            <div className="stat-side">
              <span>FOODS LOGGED</span>
              <strong>{todays.length}</strong>
            </div>
            <div className="stat-side">
              <span>MEALS TRACKED</span>
              <strong>{new Set(todays.map(e => e.meal)).size}</strong>
            </div>
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${Math.min(100, (total / 2000) * 100)}%` }}
            />
          </div>
          <div className="progress-caption">
            <span>Calories logged for selected day</span>
            <span>{Math.round(total).toLocaleString()} kcal</span>
          </div>
        </section>
        <section className="explore-section">
          <div className="section-heading">
            <div>
              <span className="section-kicker">THE WORLD ON YOUR MENU</span>
              <h2>Find your food</h2>
              <p>Search a dish, pick a region, then set your serving size.</p>
            </div>
            <button
              className="custom-btn"
              onClick={() => setCustomOpen(!customOpen)}
            >
              <Plus size={17} /> Add custom food
            </button>
          </div>
          {customOpen && (
            <div className="custom-panel">
              <div className="custom-panel-head">
                <div>
                  <strong>Add your own food</strong>
                  <p>
                    Enter calories per 100 g from a label or trusted recipe
                    source.
                  </p>
                </div>
                <button
                  className="icon-btn"
                  onClick={() => setCustomOpen(false)}
                  aria-label="Close"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="custom-fields">
                <label>
                  Food name
                  <input
                    value={customName}
                    onChange={e => setCustomName(e.target.value)}
                    placeholder="e.g. homemade lentil soup"
                  />
                </label>
                <label>
                  kcal per 100 g
                  <input
                    type="number"
                    min="0"
                    value={customKcal}
                    onChange={e => setCustomKcal(e.target.value)}
                    placeholder="e.g. 120"
                  />
                </label>
                <label>
                  Serving size (g)
                  <input
                    type="number"
                    min="1"
                    value={customGrams}
                    onChange={e => setCustomGrams(e.target.value)}
                  />
                </label>
                <label>
                  Region
                  <select
                    value={customRegion}
                    onChange={e => setCustomRegion(e.target.value)}
                  >
                    {regions.slice(1).map(r => (
                      <option key={r}>{r}</option>
                    ))}
                  </select>
                </label>
              </div>
              <button
                className="primary-btn"
                onClick={addCustom}
                disabled={
                  !customName.trim() ||
                  customKcal === '' ||
                  Number(customKcal) < 0 ||
                  (customGrams) <= 0
                }
              >
                Save food & calculate <Plus size={16} />
              </button>
            </div>
          )}
          <div className="search-row">
            <div className="search-box">
              <Search size={19} />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search foods, dishes or cuisine…"
              />
              {query && (
                <button className="icon-btn" onClick={() => setQuery('')}>
                  <X size={16} />
                </button>
              )}
            </div>
            <label className="region-select">
              <Globe2 size={17} />
              <select value={region} onChange={e => setRegion(e.target.value)}>
                {regions.map(r => (
                  <option key={r}>{r}</option>
                ))}
              </select>
              <ChevronDown size={15} />
            </label>
          </div>
          <div className="region-chips">
            {regions.slice(1, 7).map(r => (
              <button
                key={r}
                className={region === r ? 'region-chip active' : 'region-chip'}
                onClick={() => setRegion(region === r ? 'All regions' : r)}
              >
                {r}
              </button>
            ))}
          </div>
          <div className="results-head">
            <span>{filtered.length} foods to explore</span>
            <div className="tabs">
              <button
                className={tab === 'foods' ? 'tab active' : 'tab'}
                onClick={() => setTab('foods')}
              >
                Explore foods
              </button>
              <button
                className={tab === 'log' ? 'tab active' : 'tab'}
                onClick={() => setTab('log')}
              >
                Meal log ({todays.length})
              </button>
            </div>
          </div>
          {tab === 'foods' ? (
            <div className="food-grid">
              {filtered.map(f => (
                <button
                  className={
                    selected?.id === f.id ? 'food-card chosen' : 'food-card'
                  }
                  key={f.id}
                  onClick={() => {
                    setSelected(f);
                    setGrams(f.portion);
                  }}
                >
                  <div className="food-emoji">{f.emoji}</div>
                  <div className="food-info">
                    <span className="food-region">{f.region}</span>
                    <strong>{f.name}</strong>
                    <span className="food-category">{f.category}</span>
                  </div>
                  <div className="food-kcal">
                    <strong>{f.kcal}</strong>
                    <span>kcal / 100 g</span>
                  </div>
                  <div className="card-arrow">
                    {selected?.id === f.id ? (
                      <Check size={17} />
                    ) : (
                      <Plus size={17} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="log-panel">
              {todays.length === 0 ? (
                <div className="empty-state">
                  <span>🥣</span>
                  <strong>No foods logged yet</strong>
                  <p>Choose a food from Explore foods to start your log.</p>
                  <button
                    className="primary-btn"
                    onClick={() => setTab('foods')}
                  >
                    Explore foods
                  </button>
                </div>
              ) : (
                meals.map(m => {
                  const items = todays.filter(e => e.meal === m);
                  if (!items.length) return null;
                  return (
                    <div className="meal-group" key={m}>
                      <div className="meal-group-head">
                        <strong>{m}</strong>
                        <span>
                          {Math.round(
                            items.reduce(
                              (s, e) => s + (e.food.kcal * e.grams) / 100,
                              0
                            )
                          )}{' '}
                          kcal
                        </span>
                      </div>
                      {items.map(e => (
                        <div className="log-row" key={e.id}>
                          <span className="log-emoji">{e.food.emoji}</span>
                          <div className="log-name">
                            <strong>{e.food.name}</strong>
                            <span>
                              {e.grams} g ·{' '}
                              {Math.round((e.food.kcal * e.grams) / 100)} kcal
                            </span>
                          </div>
                          <button
                            className="icon-btn delete-btn"
                            onClick={() => removeEntry(e.id)}
                            aria-label={`Remove ${e.food.name}`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                })
              )}
            </div>
          )}
          {filtered.length === 0 && tab === 'foods' && (
            <div className="empty-state">
              <span>🔎</span>
              <strong>No matches found</strong>
              <p>Try a different food name or choose another region.</p>
              <button
                className="text-btn"
                onClick={() => {
                  setQuery('');
                  setRegion('All regions');
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>
        <section className="trust-note">
          <div className="trust-icon">
            <Leaf size={20} />
          </div>
          <div>
            <strong>A useful estimate, not a lab measurement</strong>
            <p>
              Calories vary with ingredients, cooking method, oil, sauces and
              serving size. Values shown are approximate reference averages. For
              packaged food, use its nutrition label; for homemade dishes, weigh
              ingredients for a closer estimate.
            </p>
          </div>
        </section>
      </main>
      <footer>
        <span className="footer-brand">worldbite calories</span>
        <span>Explore food. Understand portions. Enjoy your plate.</span>
      </footer>
      {selected && (
        <div className="modal-backdrop" onClick={() => setSelected(null)}>
          <section className="portion-modal" onClick={e => e.stopPropagation()}>
            <button
              className="modal-close icon-btn"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              <X size={19} />
            </button>
            <div className="modal-food">
              <span>{selected.emoji}</span>
              <div>
                <span className="food-region">
                  {selected.region} · {selected.category}
                </span>
                <h2>{selected.name}</h2>
                <p>{selected.kcal} kcal per 100 g</p>
              </div>
            </div>
            <div className="portion-divider" />
            <label className="meal-label">
              Add to meal
              <select value={meal} onChange={e => setMeal(e.target.value)}>
                {meals.map(m => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>
            <div className="portion-label">
              <label htmlFor="portion">Serving size</label>
              <strong>
                {grams} <small>g</small>
              </strong>
            </div>
            <input
              id="portion"
              className="portion-slider"
              type="range"
              min="10"
              max="700"
              step="5"
              value={grams}
              onChange={e => setGrams(Number(e.target.value))}
            />
            <div className="slider-limits">
              <span>10 g</span>
              <span>700 g</span>
            </div>
            <div className="grams-entry">
              <label>
                Enter grams
                <input
                  type="number"
                  min="1"
                  max="10000"
                  value={grams}
                  onChange={e =>
                    setGrams(Math.max(1, Number(e.target.value) || 1))
                  }
                />
              </label>
              <div className="portion-result">
                <span>Estimated calories</span>
                <strong>
                  {Math.round((selected.kcal * grams) / 100)}{' '}
                  <small>kcal</small>
                </strong>
              </div>
            </div>
            {selected.note && <p className="food-warning">ⓘ {selected.note}</p>}
            <button className="primary-btn add-to-log" onClick={addEntry}>
              Add to {meal.toLowerCase()} <Plus size={17} />
            </button>
          </section>
        </div>
      )}
      {notice && (
        <div className="toast">
          <Check size={17} />
          {notice}
        </div>
      )}
    </div>
  );
}

export default App;
