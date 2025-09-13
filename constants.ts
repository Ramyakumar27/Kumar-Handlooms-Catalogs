export const CONTACT_INFO = {
  whatsapp: '917448330554', // For wa.me link fallback (new number)
  // NEW: Add the short link here from your WhatsApp Business App to show your business name.
  // Go to Settings > Business Tools > Short link. It looks like: https://wa.me/message/UNIQUECODE
  whatsappShortLink: '', // Example: 'https://wa.me/message/ABC123DEF456'
  phone: '+91 98422 30554', // For calling (old number)
  instagramUrl: 'https://www.instagram.com/kumarhandlooms?igsh=ZTEycmkxMXJneWM2', // Your full Instagram page URL
  email: 'kumarhandlooms17@gmail.com',
  address: '540A, Muthaliyar Street(East),\nElaiyur, Ariyalur,\nTamilnadu - 621806',
};

// New config for Google Sheets CSV URLs
export const GOOGLE_SHEETS_CSV_URLS = {
  // INSTRUCTIONS:
  // 1. In your Google Sheet, go to File > Share > Publish to the web.
  // 2. Select the "Sarees" sheet.
  // 3. Choose "Comma-separated values (.csv)".
  // 4. Click "Publish" and copy the generated URL here.
  SAREES: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRGC5aBIDQl7DNOzZy2onL7nX1Yl4l5JTXyYYO2kSaK-oGLK4zxlWGQwf1y3pmpwHNIv20ICwsUw-kp/pub?gid=0&single=true&output=csv', // Example: 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv'
  
  // 5. Do the same for your "Config" sheet and paste the URL below.
  //    The Config sheet MUST have headers in the first row: 'key' and 'value'.
  CONFIG: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRGC5aBIDQl7DNOzZy2onL7nX1Yl4l5JTXyYYO2kSaK-oGLK4zxlWGQwf1y3pmpwHNIv20ICwsUw-kp/pub?gid=122430897&single=true&output=csv', // Example: 'https://docs.google.com/spreadsheets/d/e/2PACX-.../pub?output=csv'
};