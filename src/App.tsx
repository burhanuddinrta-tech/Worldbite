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
  servingAmount?: number;
  servingUnit?: string;
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
  { id: 'omelette', name: 'Plain omelette', region: 'Everywhere', category: 'Egg', kcal: 154, unit: '100 g', portion: 100, emoji: '🍳', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'scrambled-eggs', name: 'Scrambled eggs', region: 'Everywhere', category: 'Egg', kcal: 148, unit: '100 g', portion: 120, emoji: '🍳', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'egg-bhurji', name: 'Egg bhurji', region: 'South Asia', category: 'Egg', kcal: 170, unit: '100 g', portion: 150, emoji: '🍳', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'chicken-thigh', name: 'Roasted chicken thigh', region: 'Everywhere', category: 'Chicken', kcal: 209, unit: '100 g', portion: 130, emoji: '🍗', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'chicken-curry', name: 'Indian chicken curry', region: 'South Asia', category: 'Chicken', kcal: 165, unit: '100 g', portion: 200, emoji: '🍛', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'tandoori-chicken', name: 'Tandoori chicken', region: 'South Asia', category: 'Chicken', kcal: 165, unit: '100 g', portion: 180, emoji: '🍗', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'chicken-tikka', name: 'Chicken tikka', region: 'South Asia', category: 'Chicken', kcal: 190, unit: '100 g', portion: 150, emoji: '🍢', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'chicken-kebab', name: 'Chicken seekh kebab', region: 'South Asia', category: 'Chicken', kcal: 220, unit: '100 g', portion: 120, emoji: '🍢', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'mutton-curry', name: 'Mutton curry', region: 'South Asia', category: 'Mutton', kcal: 240, unit: '100 g', portion: 200, emoji: '🍲', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'mutton-kebab', name: 'Mutton seekh kebab', region: 'South Asia', category: 'Mutton', kcal: 260, unit: '100 g', portion: 120, emoji: '🍢', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'mutton-biryani', name: 'Mutton biryani', region: 'South Asia', category: 'Mutton', kcal: 210, unit: '100 g', portion: 300, emoji: '🍛', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'paneer-tikka', name: 'Paneer tikka', region: 'South Asia', category: 'Paneer', kcal: 260, unit: '100 g', portion: 150, emoji: '🧀', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'shahi-paneer', name: 'Shahi paneer', region: 'South Asia', category: 'Paneer', kcal: 240, unit: '100 g', portion: 180, emoji: '🍲', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'palak-paneer', name: 'Palak paneer', region: 'South Asia', category: 'Paneer', kcal: 170, unit: '100 g', portion: 180, emoji: '🥬', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'paneer-bhurji', name: 'Paneer bhurji', region: 'South Asia', category: 'Paneer', kcal: 210, unit: '100 g', portion: 150, emoji: '🍳', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'masala-chai-sugar', name: 'Masala chai with sugar', region: 'South Asia', category: 'Drink', kcal: 50, unit: '100 g', portion: 150, emoji: '☕', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'masala-chai-no-sugar', name: 'Masala chai without sugar', region: 'South Asia', category: 'Drink', kcal: 35, unit: '100 g', portion: 150, emoji: '☕', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'black-tea-sugar', name: 'Black tea with sugar', region: 'Everywhere', category: 'Drink', kcal: 35, unit: '100 g', portion: 200, emoji: '🍵', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'black-tea-no-sugar', name: 'Black tea without sugar', region: 'Everywhere', category: 'Drink', kcal: 1, unit: '100 g', portion: 200, emoji: '🍵', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'filter-coffee-sugar', name: 'Filter coffee with sugar', region: 'South Asia', category: 'Drink', kcal: 60, unit: '100 g', portion: 150, emoji: '☕', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'filter-coffee-no-sugar', name: 'Filter coffee without sugar', region: 'South Asia', category: 'Drink', kcal: 40, unit: '100 g', portion: 150, emoji: '☕', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'espresso', name: 'Espresso, unsweetened', region: 'Europe', category: 'Drink', kcal: 9, unit: '100 g', portion: 30, emoji: '☕', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'cappuccino', name: 'Cappuccino, unsweetened', region: 'Europe', category: 'Drink', kcal: 45, unit: '100 g', portion: 180, emoji: '☕', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'cold-coffee', name: 'Cold coffee with milk', region: 'South Asia', category: 'Drink', kcal: 85, unit: '100 g', portion: 250, emoji: '🥤', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'chole', name: 'Chole masala', region: 'South Asia', category: 'Main', kcal: 160, unit: '100 g', portion: 180, emoji: '🍲', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'rajma', name: 'Rajma masala', region: 'South Asia', category: 'Main', kcal: 140, unit: '100 g', portion: 180, emoji: '🫘', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'pav-bhaji', name: 'Pav bhaji', region: 'South Asia', category: 'Main', kcal: 180, unit: '100 g', portion: 250, emoji: '🍞', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'vada-pav', name: 'Vada pav', region: 'South Asia', category: 'Snack', kcal: 290, unit: '100 g', portion: 150, emoji: '🍔', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'dhokla', name: 'Dhokla', region: 'South Asia', category: 'Snack', kcal: 160, unit: '100 g', portion: 100, emoji: '🟨', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'uttapam', name: 'Vegetable uttapam', region: 'South Asia', category: 'Breakfast', kcal: 180, unit: '100 g', portion: 160, emoji: '🥞', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'aloo-paratha', name: 'Aloo paratha', region: 'South Asia', category: 'Bread', kcal: 260, unit: '100 g', portion: 150, emoji: '🫓', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'khichdi', name: 'Moong dal khichdi', region: 'South Asia', category: 'Main', kcal: 120, unit: '100 g', portion: 250, emoji: '🥣', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'gulab-jamun', name: 'Gulab jamun', region: 'South Asia', category: 'Dessert', kcal: 320, unit: '100 g', portion: 80, emoji: '🍩', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'kheer', name: 'Rice kheer', region: 'South Asia', category: 'Dessert', kcal: 120, unit: '100 g', portion: 150, emoji: '🍚', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'pad-thai', name: 'Pad Thai', region: 'East Asia', category: 'Main', kcal: 160, unit: '100 g', portion: 280, emoji: '🍜', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'bibimbap', name: 'Bibimbap', region: 'East Asia', category: 'Main', kcal: 140, unit: '100 g', portion: 350, emoji: '🍚', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'teriyaki-chicken', name: 'Chicken teriyaki', region: 'East Asia', category: 'Chicken', kcal: 180, unit: '100 g', portion: 180, emoji: '🍗', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'pho', name: 'Vietnamese pho', region: 'East Asia', category: 'Soup', kcal: 60, unit: '100 g', portion: 450, emoji: '🍜', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'spring-rolls', name: 'Vegetable spring rolls', region: 'East Asia', category: 'Snack', kcal: 210, unit: '100 g', portion: 100, emoji: '🥢', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'greek-salad', name: 'Greek salad', region: 'Europe', category: 'Salad', kcal: 120, unit: '100 g', portion: 180, emoji: '🥗', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'lasagna', name: 'Lasagna', region: 'Europe', category: 'Main', kcal: 160, unit: '100 g', portion: 250, emoji: '🍝', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'ratatouille', name: 'Ratatouille', region: 'Europe', category: 'Main', kcal: 70, unit: '100 g', portion: 200, emoji: '🍆', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'pierogi', name: 'Potato pierogi', region: 'Europe', category: 'Main', kcal: 220, unit: '100 g', portion: 180, emoji: '🥟', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'ceviche', name: 'Fish ceviche', region: 'Latin America', category: 'Main', kcal: 90, unit: '100 g', portion: 180, emoji: '🐟', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'enchiladas', name: 'Chicken enchiladas', region: 'Latin America', category: 'Chicken', kcal: 190, unit: '100 g', portion: 250, emoji: '🌮', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'vegetable-sushi', name: 'Vegetable sushi roll', region: 'East Asia', category: 'Main', kcal: 150, unit: '100 g', portion: 180, emoji: '🍣', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'shakshuka', name: 'Shakshuka', region: 'Middle East', category: 'Egg', kcal: 110, unit: '100 g', portion: 220, emoji: '🍳', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'bobotie', name: 'South African bobotie', region: 'Africa', category: 'Main', kcal: 180, unit: '100 g', portion: 220, emoji: '🥘', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'poutine', name: 'Poutine', region: 'North America', category: 'Main', kcal: 240, unit: '100 g', portion: 250, emoji: '🍟', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'honey-soy-chicken', name: 'Honey soy chicken', region: 'Oceania', category: 'Chicken', kcal: 190, unit: '100 g', portion: 180, emoji: '🍗', note: 'Approximate recipe average; ingredients and cooking method vary' },
  { id: 'bohri-dabba', name: 'Bohri thaal (mixed meal)', region: 'South Asia', category: 'Main', kcal: 190, unit: '100 g', portion: 450, emoji: '🍱', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-mutton-rice', name: 'Bohri masala rice with mutton', region: 'South Asia', category: 'Mutton', kcal: 210, unit: '100 g', portion: 300, emoji: '🍛', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-kheema', name: 'Bohri kheema', region: 'South Asia', category: 'Mutton', kcal: 230, unit: '100 g', portion: 180, emoji: '🍲', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-dal-chawal', name: 'Bohri dal chawal', region: 'South Asia', category: 'Main', kcal: 145, unit: '100 g', portion: 300, emoji: '🍚', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-khichda', name: 'Bohri khichda', region: 'South Asia', category: 'Main', kcal: 170, unit: '100 g', portion: 250, emoji: '🥣', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-lagan-ni-sev', name: 'Lagan ni sev', region: 'South Asia', category: 'Dessert', kcal: 360, unit: '100 g', portion: 100, emoji: '🍮', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-malido', name: 'Bohri malido', region: 'South Asia', category: 'Dessert', kcal: 420, unit: '100 g', portion: 80, emoji: '🍯', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-doodhi-halwa', name: 'Doodhi halwa', region: 'South Asia', category: 'Dessert', kcal: 230, unit: '100 g', portion: 120, emoji: '🍮', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-kebabs', name: 'Bohri-style mutton kebab', region: 'South Asia', category: 'Mutton', kcal: 260, unit: '100 g', portion: 130, emoji: '🍢', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'bohri-samosa', name: 'Bohri samosa', region: 'South Asia', category: 'Snack', kcal: 300, unit: '100 g', portion: 80, emoji: '🥟', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'gujarati-kadhi', name: 'Gujarati kadhi', region: 'South Asia', category: 'Main', kcal: 90, unit: '100 g', portion: 180, emoji: '🥣', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'undhiyu', name: 'Gujarati undhiyu', region: 'South Asia', category: 'Main', kcal: 140, unit: '100 g', portion: 200, emoji: '🥘', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'dal-dhokli', name: 'Dal dhokli', region: 'South Asia', category: 'Main', kcal: 150, unit: '100 g', portion: 250, emoji: '🥣', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'misal-pav', name: 'Misal pav', region: 'South Asia', category: 'Main', kcal: 180, unit: '100 g', portion: 250, emoji: '🍲', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'khandvi', name: 'Khandvi', region: 'South Asia', category: 'Snack', kcal: 160, unit: '100 g', portion: 100, emoji: '🟨', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'hyderabadi-haleem', name: 'Hyderabadi haleem', region: 'South Asia', category: 'Main', kcal: 180, unit: '100 g', portion: 250, emoji: '🥣', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'nihari', name: 'Nihari', region: 'South Asia', category: 'Mutton', kcal: 190, unit: '100 g', portion: 250, emoji: '🍲', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'seekh-paratha', name: 'Seekh kebab roll', region: 'South Asia', category: 'Mutton', kcal: 260, unit: '100 g', portion: 200, emoji: '🌯', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'malai-kofta', name: 'Malai kofta', region: 'South Asia', category: 'Main', kcal: 210, unit: '100 g', portion: 180, emoji: '🍲', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'amritsari-kulcha', name: 'Amritsari kulcha', region: 'South Asia', category: 'Bread', kcal: 280, unit: '100 g', portion: 140, emoji: '🫓', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'mutton-rogan-josh', name: 'Kashmiri rogan josh', region: 'South Asia', category: 'Mutton', kcal: 200, unit: '100 g', portion: 220, emoji: '🍲', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'appam-stew', name: 'Appam with vegetable stew', region: 'South Asia', category: 'Main', kcal: 135, unit: '100 g', portion: 250, emoji: '🥥', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'kerala-puttu', name: 'Kerala puttu', region: 'South Asia', category: 'Breakfast', kcal: 160, unit: '100 g', portion: 150, emoji: '🍚', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'fish-curry-kerala', name: 'Kerala fish curry', region: 'South Asia', category: 'Main', kcal: 145, unit: '100 g', portion: 200, emoji: '🐟', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'prawn-masala', name: 'Prawn masala', region: 'South Asia', category: 'Main', kcal: 150, unit: '100 g', portion: 180, emoji: '🍤', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'mandi-rice', name: 'Arabian chicken mandi', region: 'Middle East', category: 'Chicken', kcal: 175, unit: '100 g', portion: 350, emoji: '🍗', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'kabsa', name: 'Saudi chicken kabsa', region: 'Middle East', category: 'Chicken', kcal: 180, unit: '100 g', portion: 350, emoji: '🍛', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'machboos', name: 'Gulf machboos', region: 'Middle East', category: 'Main', kcal: 190, unit: '100 g', portion: 350, emoji: '🍚', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'lamb-ouzi', name: 'Lamb ouzi', region: 'Middle East', category: 'Mutton', kcal: 220, unit: '100 g', portion: 300, emoji: '🍖', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'lamb-mandi', name: 'Lamb mandi', region: 'Middle East', category: 'Mutton', kcal: 210, unit: '100 g', portion: 350, emoji: '🍖', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'chicken-madhbi', name: 'Yemeni chicken madhbi', region: 'Middle East', category: 'Chicken', kcal: 190, unit: '100 g', portion: 300, emoji: '🍗', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'mutabbal', name: 'Mutabbal (smoky eggplant dip)', region: 'Middle East', category: 'Dip', kcal: 150, unit: '100 g', portion: 80, emoji: '🥣', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'manakish-zaatar', name: 'Manakish za’atar', region: 'Middle East', category: 'Bread', kcal: 280, unit: '100 g', portion: 120, emoji: '🫓', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'kunafa', name: 'Kunafa', region: 'Middle East', category: 'Dessert', kcal: 350, unit: '100 g', portion: 120, emoji: '🍰', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'luqaimat', name: 'Luqaimat', region: 'Middle East', category: 'Dessert', kcal: 400, unit: '100 g', portion: 100, emoji: '🍩', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'harees', name: 'Arabian harees', region: 'Middle East', category: 'Main', kcal: 150, unit: '100 g', portion: 250, emoji: '🥣', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'foul-medames', name: 'Foul medames', region: 'Middle East', category: 'Main', kcal: 120, unit: '100 g', portion: 200, emoji: '🫘', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'koshari', name: 'Egyptian koshari', region: 'Middle East', category: 'Main', kcal: 160, unit: '100 g', portion: 300, emoji: '🍚', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'mujadara', name: 'Mujadara', region: 'Middle East', category: 'Main', kcal: 145, unit: '100 g', portion: 250, emoji: '🍚', note: 'Approximate recipe average; family recipes and preparation vary' },
  { id: 'lamb-kofta', name: 'Lamb kofta', region: 'Middle East', category: 'Mutton', kcal: 260, unit: '100 g', portion: 150, emoji: '🍢', note: 'Approximate recipe average; family recipes and preparation vary' },
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
  const [servingUnit, setServingUnit] = useState<'plate' | 'piece' | 'g' | 'ml' | 'cup'>('plate');
  const [servingAmount, setServingAmount] = useState(1);
  const [showUpdates, setShowUpdates] = useState(false);
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
  const [snapImage, setSnapImage] = useState('');
  const [snapBusy, setSnapBusy] = useState(false);
  const [snapError, setSnapError] = useState('');
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
  const isDrink = (food: Food) => food.category.toLowerCase() === 'drink';
  const gramsForServing = (food: Food, unit: string, amount: number) => {
    if (unit === 'plate') return amount * 300;
    if (unit === 'piece') return amount * food.portion;
    if (unit === 'cup') return amount * 240;
    if (unit === 'ml') return amount;
    return amount;
  };
  const selectFood = (food: Food) => {
    setSelected(food);
    const drink = isDrink(food);
    setServingUnit(drink ? 'ml' : 'plate');
    setServingAmount(drink ? food.portion : 1);
    setGrams(drink ? food.portion : 300);
  };
  const analyzeSnap = async (file?: File) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) { setSnapError('Please choose an image file.'); return; }
    if (file.size > 6 * 1024 * 1024) { setSnapError('Please choose an image smaller than 6 MB.'); return; }
    setSnapBusy(true); setSnapError('');
    setSnapImage(URL.createObjectURL(file));
    try {
      // Resize/compress photos before upload so they fit serverless request limits.
      const sourceUrl = URL.createObjectURL(file);
      const imageData = await new Promise<string>((resolve, reject) => {
        const image = new Image();
        image.onload = () => {
          const scale = Math.min(1, 1280 / Math.max(image.width, image.height));
          const canvas = document.createElement('canvas');
          canvas.width = Math.max(1, Math.round(image.width * scale));
          canvas.height = Math.max(1, Math.round(image.height * scale));
          const context = canvas.getContext('2d');
          if (!context) { URL.revokeObjectURL(sourceUrl); reject(new Error('This browser could not prepare the photo.')); return; }
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          canvas.toBlob(blob => {
            URL.revokeObjectURL(sourceUrl);
            if (!blob) { reject(new Error('Could not compress this photo.')); return; }
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result || ''));
            reader.onerror = () => reject(new Error('Could not read the prepared photo.'));
            reader.readAsDataURL(blob);
          }, 'image/jpeg', 0.82);
        };
        image.onerror = () => { URL.revokeObjectURL(sourceUrl); reject(new Error('Could not open this photo.')); };
        image.src = sourceUrl;
      });
      const response = await fetch('/api/analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: imageData }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Food recognition is unavailable right now.');
      const food: Food = { id: 'snap-' + crypto.randomUUID(), name: String(result.name || 'Identified dish'), region: String(result.region || 'Everywhere'), category: 'Snap AI', kcal: Math.max(0, Math.round(Number(result.kcalPer100g) || 0)), unit: '100 g', portion: Math.max(1, Math.round(Number(result.portionGrams) || 150)), emoji: '📸', note: 'AI estimate from a photo. Actual calories vary with ingredients and portion size.' };
      if (!food.kcal) throw new Error('The photo result did not include a usable calorie estimate. Try a clearer photo.');
      selectFood(food); setMeal('Lunch');
    } catch (error) { setSnapError(error instanceof Error ? error.message : 'Could not analyze this photo.'); }
    finally { setSnapBusy(false); }
  };
  const addEntry = () => {
    if (!selected || servingAmount <= 0) return;
    const actualGrams = gramsForServing(selected, servingUnit, servingAmount);
    const next = [
      ...entries,
      { id: crypto.randomUUID(), food: selected, grams: actualGrams, servingAmount, servingUnit, meal, date: day },
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
    setServingUnit('g');
    setServingAmount(g);
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
        <button className="top-tag updates-link" onClick={() => setShowUpdates(v => !v)}>
          <Leaf size={15} /> WHAT'S NEW
        </button>
      </header>
      <main>
        {showUpdates && <section className="updates-card" aria-label="Latest updates"><div><span className="section-kicker">WORLD BITE UPDATES</span><h2>What's new</h2></div><ul><li><strong>Snap AI:</strong> identify a dish from a photo and review its estimated calories.</li><li><strong>Flexible portions:</strong> log drinks by ml or cup, and foods by plate, piece or grams.</li><li><strong>Expanded food library:</strong> more Indian, Bohri, Arabian and global dishes.</li></ul><button className="text-btn" onClick={() => setShowUpdates(false)}>Close updates</button></section>}
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
                <Utensils size={15} /> {foods.length}+ foods
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
        <section className="snap-card" style={{ marginTop: 24, padding: 22, borderRadius: 20, background: "#f0f8f3" }}>
          <div className="daily-top"><div><span className="section-kicker">WORLD BITE SNAP</span><h2>Scan your plate</h2><p>Take a photo or choose a food picture to estimate the dish and calories.</p></div>
          <label className="custom-btn" style={{ cursor: snapBusy ? "wait" : "pointer" }}>{snapBusy ? "Analyzing…" : "📸 Snap food"}<input type="file" accept="image/*" capture="environment" disabled={snapBusy} onChange={e => analyzeSnap(e.target.files?.[0])} style={{ display: "none" }} /></label></div>
          {snapImage && <img src={snapImage} alt="Selected meal" style={{ display: "block", width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: 16, marginTop: 14 }} />}
          {snapBusy && <p role="status">Looking at the dish and estimating a typical portion…</p>}
          {snapError && <p role="alert" style={{ color: "#b42318", marginTop: 10 }}>{snapError}</p>}
          <p style={{ fontSize: 12, opacity: 0.72, marginTop: 10 }}>Photo estimates can be wrong, especially when ingredients or portion sizes are hidden. Check the result before adding it to your log.</p>
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
                    selectFood(f);
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
                              {e.servingAmount ?? e.grams} {e.servingUnit === 'ml' ? 'ml' : e.servingUnit === 'cup' ? 'cup(s)' : e.servingUnit === 'plate' ? 'plate(s)' : e.servingUnit === 'piece' ? 'piece(s)' : 'g'} ·{' '}
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
            <div className="serving-controls">
              <label className="serving-unit-label">Serving unit
                <select value={servingUnit} onChange={e => { const unit = e.target.value as typeof servingUnit; setServingUnit(unit); setServingAmount(unit === 'plate' ? 1 : unit === 'piece' ? 1 : unit === 'cup' ? 1 : unit === 'ml' ? selected.portion : 100); }}>
                  {isDrink(selected) ? <><option value="ml">Millilitres (ml)</option><option value="cup">Cup (240 ml)</option></> : <><option value="plate">Plate (approx. 300 g)</option><option value="piece">Piece (approx. 1 piece)</option><option value="g">Grams (g)</option></>}
                </select>
              </label>
              <label className="serving-amount-label">{servingUnit === 'plate' ? 'Number of plates' : servingUnit === 'piece' ? 'Number of pieces' : servingUnit === 'cup' ? 'Number of cups' : servingUnit === 'ml' ? 'Amount (ml)' : 'Amount (g)'}
                <input type="number" min="0.1" step="0.1" value={servingAmount} onChange={e => setServingAmount(Math.max(0.1, Number(e.target.value) || 0.1))} />
              </label>
            </div>
            <div className="portion-result serving-result">
              <span>Estimated calories · approx. {Math.round(gramsForServing(selected, servingUnit, servingAmount))} g equivalent</span>
              <strong>{Math.round(selected.kcal * gramsForServing(selected, servingUnit, servingAmount) / 100)} <small>kcal</small></strong>
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
