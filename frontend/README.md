# Hacker Access Console (Frontend)

This React single-page application renders the cyberpunk login terminal for the Cosmic Meatball Portal. Operators must provide a name and a valid email address before initiating access. The interface highlights validation errors in a hacker aesthetic, plays a glitch-driven "ACCESS GRANTED" sequence on success, and finally redirects the user to the Robots Game demo instance.

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev -- --host
```

By default the app runs at [http://localhost:5173](http://localhost:5173).

## Scripts

- `npm run dev` – Start the Vite dev server with hot reloading.
- `npm run build` – Build the production bundle.
- `npm run preview` – Preview the production build locally.
- `npm run lint` – Run ESLint checks.

## Key Features

- Cyberpunk terminal UI with scanline, noise, and glitch effects
- Client-side validation for name and email inputs
- Loading animation before showing the access granted state
- Automatic redirect to the Robots Game demo after authorization

## Design Details

### Color Scheme
- **Neon Primary**: `#5cffd8` (cyan/teal)
- **Neon Accent**: `#66f7ff` (bright cyan)
- **Alert Color**: `#ff4d8d` (neon pink for errors)
- **Background**: `#040b11` (deep dark blue-black)

### Visual Effects
- **CRT Overlay**: Scanline effect with radial gradients
- **Noise Overlay**: Animated fractal noise for authenticity
- **Glitch Animation**: Text skewing and color channel separation on "ACCESS GRANTED"
- **Loading Sequence**: Three animated blocks that pulse vertically

### Form Validation
- Name field: Required, shows "IDENTIFICATION STRING REQUIRED" error
- Email field: Required with regex validation, shows "EMAIL CHANNEL REQUIRED" or "EMAIL SIGNAL MALFORMED"
- Referral field: Optional
- Submit button disabled until all required fields are valid

### User Flow
1. User enters credentials in the cyberpunk terminal
2. Real-time validation with hacker-styled error messages
3. On submit: Loading animation (1.5s delay)
4. "ACCESS GRANTED" message with glitch effect
5. Auto-redirect to Robots Game demo (2.4s after granted state)

## Technology Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **ESLint** - Code linting
- Monospace fonts: Share Tech Mono, Space Mono
