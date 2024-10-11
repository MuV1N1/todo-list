import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_BASE_URL);
pb.admins.authWithPassword("marvin.kleiner1910@gmail.com", "1234567890");
console.log("pocketbase connected")

export default pb;
