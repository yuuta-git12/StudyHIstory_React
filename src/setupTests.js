// // src/setupTests.js
const SUPABASE_URL = process.env.VITE_REACT_APP_SUPABASE_URL;
const SUPABASE_API_KEY = process.env.VITE_REACT_APP_SUPABASE_API_KEY;

if (!SUPABASE_URL || !SUPABASE_API_KEY) {
  throw new Error('Supabase URL または API キーが見つかりません！');
}

export { SUPABASE_URL, SUPABASE_API_KEY };
