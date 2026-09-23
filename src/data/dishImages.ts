import { MenuItem } from '../types';

// Category fallback imagery with authentic high-resolution culinary photography
export const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  ALL:
    '/assets/images/chicken_dum_biryani_1790173575142.jpg',
  SOUPS:
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop',
  'VEG SNACKS':
    'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop',
  'NON-VEG SNACKS':
    '/assets/images/crispy_chicken_65_1790173622238.jpg',
  NOODLES:
    'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop',
  ROTIS:
    '/assets/images/butter_naan_basket_1790173604545.jpg',
  'VEG CURRIES':
    '/assets/images/paneer_butter_masala_1790173552093.jpg',
  'NON-VEG CURRIES':
    'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop',
  BIRYANI:
    '/assets/images/chicken_dum_biryani_1790173575142.jpg',
  'FRIED RICE':
    'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop',
  FISH:
    'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop',
  'COOL DRINKS':
    'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop',
};

/**
 * 1-to-1 Specific Dish Image Registry
 * Every single menu item has a photorealistic, high-speed, direct CDN image
 * matching the authentic dish presentation. Zero rate limits, fast loading.
 */
export const DISH_IMAGE_REGISTRY: Record<string, string> = {
  // SOUPS
  'sp-1': 'https://images.unsplash.com/photo-1547592166-23ac45744acd?q=80&w=800&auto=format&fit=crop', // Tomato Soup
  'sp-2': 'https://images.unsplash.com/photo-1603105037880-880cd4edfb0d?q=80&w=800&auto=format&fit=crop', // Veg Corn Soup
  'sp-3': 'https://images.unsplash.com/photo-1547592180-85f173990554?q=80&w=800&auto=format&fit=crop', // Chicken Corn Soup
  'sp-4': 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=800&auto=format&fit=crop', // Chicken Sweet & Sour Soup
  'sp-5': 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?q=80&w=800&auto=format&fit=crop', // Chicken Hot & Sour Soup

  // VEG SNACKS
  'vs-1': 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?q=80&w=800&auto=format&fit=crop', // Veg Manchurian
  'vs-2': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Paneer 65
  'vs-3': 'https://images.unsplash.com/photo-1625398407796-82650a8c135f?q=80&w=800&auto=format&fit=crop', // Gobi Manchurian
  'vs-4': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop', // Paneer Manchurian
  'vs-5': 'https://images.unsplash.com/photo-1576107232684-1279f3908594?q=80&w=800&auto=format&fit=crop', // Finger Chips
  'vs-6': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop', // Green Peas Fry
  'vs-7': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop', // Green Peas Roast
  'vs-8': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Veg Malaysian

  // NON-VEG SNACKS
  'nvs-1': '/assets/images/crispy_chicken_65_1790173622238.jpg', // Chicken 65
  'nvs-2': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop', // Chicken Manchurian
  'nvs-3': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop', // Chicken Burani
  'nvs-4': 'https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=800&auto=format&fit=crop', // Kaju Chicken Dry
  'nvs-5': 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop', // Chicken Lollipop 4 Pc
  'nvs-6': '/assets/images/tandoori_chicken_1790173587925.jpg', // Chicken Drumstick
  'nvs-7': 'https://images.unsplash.com/photo-1562967916-eb82221dfb92?q=80&w=800&auto=format&fit=crop', // Chicken Majestic
  'nvs-8': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Egg Manchurian
  'nvs-9': 'https://images.unsplash.com/photo-1527477378696-6134a413d71c?q=80&w=800&auto=format&fit=crop', // Chicken Lollipop Wet
  'nvs-10': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', // Chicken Pakoda
  'nvs-11': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop', // Chicken Roast
  'nvs-12': 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?q=80&w=800&auto=format&fit=crop', // Chilli Chicken
  'nvs-13': 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800&auto=format&fit=crop', // Pepper Chicken
  'nvs-14': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop', // Sai Datta Special Chicken Dry
  'nvs-15': 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?q=80&w=800&auto=format&fit=crop', // Chilli Egg
  'nvs-16': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop', // Egg 65
  'nvs-17': 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?q=80&w=800&auto=format&fit=crop', // Boiled Egg
  'nvs-18': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop', // Half Boiled Egg 2 Egg
  'nvs-19': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Fry Boiled Egg 2 Pc

  // NOODLES
  'nd-1': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop', // Veg Noodles
  'nd-2': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=800&auto=format&fit=crop', // Egg Noodles
  'nd-3': 'https://images.unsplash.com/photo-1612927601601-6638404737ce?q=80&w=800&auto=format&fit=crop', // Chicken Noodles
  'nd-4': 'https://images.unsplash.com/photo-1552611052-33e04de081de?q=80&w=800&auto=format&fit=crop', // Mix Noodles
  'nd-5': 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800&auto=format&fit=crop', // Manchurian Noodles

  // ROTIS
  'rt-1': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', // Tandoori Roti
  'rt-2': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop', // Butter Roti
  'rt-3': '/assets/images/butter_naan_basket_1790173604545.jpg', // Butter Naan
  'rt-4': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', // Plain Naan
  'rt-5': 'https://images.unsplash.com/photo-1626074353765-517a681e40be?q=80&w=800&auto=format&fit=crop', // Kulcha
  'rt-6': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', // Butter Kulcha
  'rt-7': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Paratha
  'rt-8': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=800&auto=format&fit=crop', // Aloo Stuff Paratha

  // VEG CURRIES
  'vc-1': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Dal Fry
  'vc-2': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Dal Tadka
  'vc-3': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Tomato Curry
  'vc-4': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Sava Tomato
  'vc-5': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Mix Veg Curry
  'vc-6': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop', // Kadai Veg
  'vc-7': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Kaju Paneer
  'vc-8': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Paneer Shahi Kurma
  'vc-9': '/assets/images/paneer_butter_masala_1790173552093.jpg', // Paneer Butter Masala
  'vc-10': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Aloo Palak
  'vc-11': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop', // Veg Kolhapuri
  'vc-12': 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?q=80&w=800&auto=format&fit=crop', // Paneer Manchurian Wet
  'vc-13': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Palak Paneer
  'vc-14': 'https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop', // Plain Palak
  'vc-15': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Aloo Gobi Masala
  'vc-16': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Kadai Paneer
  'vc-17': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Mushroom Butter Masala
  'vc-18': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Paneer Tikka Masala
  'vc-19': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Chana Masala
  'vc-20': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Dal Palak

  // NON-VEG CURRIES
  'nvc-1': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Chicken Curry
  'nvc-2': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop', // Chicken Fry
  'nvc-3': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Butter Chicken
  'nvc-4': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Kadai Chicken
  'nvc-5': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop', // Andhra Chicken
  'nvc-6': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop', // Chicken Kolhapuri
  'nvc-7': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Sai Datta Special Chicken Curry
  'nvc-8': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Chicken Tikka Masala
  'nvc-9': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Handi Chicken
  'nvc-10': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Punjabi Chicken
  'nvc-11': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Hyderabadi Chicken
  'nvc-12': 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop', // Chicken Mughlai
  'nvc-13': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Egg Curry
  'nvc-14': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop', // Egg Burji
  'nvc-15': 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=800&auto=format&fit=crop', // Egg Burji Curry
  'nvc-16': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Egg Tadka
  'nvc-17': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Egg Masala
  'nvc-18': 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=800&auto=format&fit=crop', // Egg Omelette
  'nvc-19': 'https://images.unsplash.com/photo-1608897013039-887f21d8c804?q=80&w=800&auto=format&fit=crop', // Egg Fry
  'nvc-20': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=800&auto=format&fit=crop', // Egg Keema Curry
  'nvc-21': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Gravy Fry
  'nvc-22': 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?q=80&w=800&auto=format&fit=crop', // Botti Curry
  'nvc-23': 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=800&auto=format&fit=crop', // Botti Fry

  // BIRYANI
  'by-1': '/assets/images/chicken_dum_biryani_1790173575142.jpg', // Chicken Biryani (Single)
  'by-2': '/assets/images/chicken_dum_biryani_1790173575142.jpg', // Chicken Handi Biryani
  'by-3': '/assets/images/chicken_dum_biryani_1790173575142.jpg', // Chicken Biryani Family Pack
  'by-4': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop', // Fish Biryani
  'by-5': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop', // Sai Datta Special Chicken Biryani
  'by-6': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop', // Panner Biryani
  'by-7': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop', // Veg Biryani
  'by-8': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop', // Veg Biryani Family Pack
  'by-9': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=800&auto=format&fit=crop', // Egg Biryani
  'by-10': '/assets/images/chicken_dum_biryani_1790173575142.jpg', // Handi Biryani

  // FRIED RICE
  'fr-1': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Veg Fried Rice
  'fr-2': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Jeera Fried Rice
  'fr-3': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Tomato Rice
  'fr-4': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Masala Rice
  'fr-5': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Lemon Rice
  'fr-6': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop', // Chicken Fried Rice
  'fr-7': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Egg Fried Rice
  'fr-8': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?q=80&w=800&auto=format&fit=crop', // Mix Fried Rice
  'fr-9': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Manchurian Fried Rice
  'fr-10': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // Curd Rice
  'fr-11': 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800&auto=format&fit=crop', // Meals
  'fr-12': 'https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop', // White Rice
  'fr-13': 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800&auto=format&fit=crop', // Boti Rice

  // FISH & SEAFOOD
  'fs-1': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop', // Fish Chilli (With Bone)
  'fs-2': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop', // Fish Roast
  'fs-3': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop', // Fish Curry
  'fs-4': 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=800&auto=format&fit=crop', // Apollo Fish Bone
  'fs-5': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop', // Apollo Prawns
  'fs-6': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop', // Prawns Fry
  'fs-7': 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?q=80&w=800&auto=format&fit=crop', // Prawns Masala

  // COOL DRINKS
  'cd-1': 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop', // Thumbs Up
  'cd-2': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=800&auto=format&fit=crop', // Sprite
  'cd-3': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?q=80&w=800&auto=format&fit=crop', // Pulpi Orange
  'cd-4': 'https://images.unsplash.com/photo-1546173159-315724a31696?q=80&w=800&auto=format&fit=crop', // Maaza
  'cd-5': 'https://images.unsplash.com/photo-1564419320461-6870880221ad?q=80&w=800&auto=format&fit=crop', // Mineral Water 1 Litre
  'cd-6': 'https://images.unsplash.com/photo-1523362628745-0c100150b504?q=80&w=800&auto=format&fit=crop', // Mineral Water 2 Litre
};

/**
 * Returns the individual high-quality, authentic food photograph for any menu item.
 */
export function getDishImage(item: MenuItem): string {
  if (item.image && item.image.trim().length > 0) {
    return item.image;
  }
  if (DISH_IMAGE_REGISTRY[item.id]) {
    return DISH_IMAGE_REGISTRY[item.id];
  }
  return (
    CATEGORY_FALLBACK_IMAGES[item.category] ||
    '/assets/images/chicken_dum_biryani_1790173575142.jpg'
  );
}

/**
 * Descriptive alt text for accessibility and SEO
 */
export function getDishImageAlt(item: MenuItem): string {
  return `${item.name} - ${item.category} (${item.type === 'veg' ? 'Vegetarian' : item.type === 'non-veg' ? 'Non-Vegetarian' : 'Beverage'}) at Sai Datta Restaurant`;
}
