# Adventure Escape SA (React Native + Expo + TypeScript)

A Western Cape adventure tour app built from the wireframes: Home, Activities,
Activity Detail, Fees calculator, About and Contact screens with a shared
booking cart and automatic group discounts.

## Run with Expo Go

1. Install dependencies:
   npm install
2. Start the dev server:
   npx expo start
3. Scan the QR code with the Expo Go app (iOS/Android).

## Notes

- No native modules beyond the Expo SDK, so it runs directly in Expo Go.
- Activity photos load from Unsplash over the network; a colored placeholder
  is shown if a device is offline.
- Discount tiers (applied on total persons booked): 2 -> 5%, 3 -> 10%, 4+ -> 15%.
- State lives in a React context (BookingContext). Swap `activities` in
  `src/data/activities.ts` to point at a real API later.
