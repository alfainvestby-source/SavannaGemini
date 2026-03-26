
# Savanna Brand & Engineering Guidelines

Always make sure the brand_guidelines.md file is not conflicting with StyleGuidePage. If it does, then dont proceed and ask clarifying questions.
Also ask questions before proceeding if you think important elements are missing from the StyleGuidePage and you need help.
Always ask if I want to update brand_guidelines.md if we make changes that conflict the StyleGuidePage.

## 1. Brand Identity: "The Modern Wild"
Savanna bridges the gap between luxury travelers and local safari operators. The aesthetic is clean, airy, and premium, utilizing glassmorphism to overlay data onto rich, high-definition photography.

### Core Values
*   **Clarity:** Structured data cutting through the noise.
*   **Modernity:** AI-driven, contemporary UI.
*   **Connection:** Seamless link between traveler and operator.

---

## 2. Color Palette

### Primary
| Name | Hex | Usage |
| :--- | :--- | :--- |
| **Savanna Sun** | `#FAFF7F` | Primary Actions, Highlights, AI Badge, Selection States |
| **Acacia Green** | `#0C9762` | Success, Confirmations, Map Pins, Sustainability Indicators |
| **Obsidian** | `#000000` | Primary Text, Headings, High-contrast Buttons |
| **Wilderness White** | `#F4F4F4` | App Backgrounds, Subtle Surfaces |
| **Cloud Grey** | `#CBCBCB` | Secondary Text, Borders, Inactive Icons |

### Gradients
*   **Sunburst:** `from-[#FAFF7F] to-[#FFDA1A]`
*   **Deep Acacia:** `from-[#0C9762] to-[#054029]`
*   **Morning Mist:** `from-white via-[#F4F4F4] to-[#CBCBCB]/50`

---

## 3. Typography
**Font Family:** `Outfit` (Google Fonts)

| Style | Weight | Tailwind Class | Notes |
| :--- | :--- | :--- | :--- |
| **H1 - H3** | Bold / 700 | `font-bold tracking-tight` | Letter spacing -0.02em |
| **H4 - H6** | Bold / 700 | `font-bold` | Standard tracking |
| **Body** | Light / 300 | `font-light` | Line height 1.6 (relaxed) |
| **Buttons** | Semibold / 600 | `font-semibold uppercase tracking-widest` | Small text size (xs/sm) |
| **Labels** | Bold / 700 | `font-bold uppercase tracking-widest` | Usually Cloud Grey or Accent Color |

---

## 4. UI Patterns & Components

### Glassmorphism
Use the global CSS class `.glass` or Tailwind utilities:
```css
background: rgba(244, 244, 244, 0.7);
backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Containers
*   **Cards:** Large border radius is mandatory.
    *   Standard: `rounded-[32px]`
    *   Large/Hero: `rounded-[48px]`
*   **Borders:** Subtle borders are preferred over heavy shadows.
    *   Color: `border-cloud-grey/10` or `border-black/5`

### Iconography
*   **Library:** `lucide-react`
*   **Style:** Thin to medium stroke.
*   **Active:** Obsidian (`#000000`) or Acacia Green (`#0C9762`).
*   **Inactive:** Cloud Grey (`#CBCBCB`).

### Buttons
1.  **Primary:** Obsidian Background, White Text, Rounded Full.
2.  **Action/Highlight:** Savanna Sun Background, Obsidian Text, Rounded Full.
3.  **Secondary/Outline:** White Background, Border Cloud Grey/20, Rounded Full.

### Rotating Info Widget
A dynamic, space-efficient card used to display contextual location data on mobile views.
*   **Container:** Dark gradient (`from-gray-800 to-black`) with `rounded-[32px]`.
*   **Interaction:** Auto-rotates every 5 seconds between:
    1.  **Live Status:** Temperature, Crowd density ("Not too busy"), and Location.
    2.  **Seasonality:** Best time to visit and migration details.
    3.  **Social Proof:** Aggregate ratings with granular sub-ratings (Wildlife, Scenery, etc).
*   **Indicators:** Bottom progress bars indicate active state and total length.

---

## 5. Technical Rules

### AI Integration (Gemini)
*   **Model:** Use `gemini-3-flash-preview` for general text/chat tasks.
*   **Client:** Always initialize with `new GoogleGenAI({ apiKey: process.env.API_KEY })`.
*   **Tone:** The AI should speak like an "Expert Guide" — encouraging, concise, and knowledgeable.

### Code Style
*   **Styling:** Tailwind CSS.
*   **Icons:** Lucide React.
*   **Animations:** Use `animate-in`, `fade-in`, `slide-in-from-bottom` for smooth entrances.
