# R&R Consulting Brand Style Guide

## 📋 Table of Contents

1. Brand Overview
2. Color Palette
3. Typography
4. Logo Guidelines
5. Design Principles
6. Component Styles
7. Imagery Guidelines
8. Tone of Voice

---

## 🎯 Brand Overview

### Mission

To enable organizations to achieve excellence through strategic clarity, operational efficiency, and people-centric approaches.

### Vision

Moving organizations from Complexity and Chaos to Clarity and Confidence.

### Core Values

- **Excellence**: Delivering superior quality in all services
- **Clarity**: Providing clear, actionable insights
- **Confidence**: Building trust through proven methodologies
- **Collaboration**: Working as true partners with clients
- **Continuous Improvement**: Embracing growth and transformation

### Brand Promise

"Remodel to Realize – Enabling Excellence with Clarity and Confidence"

---

## 🎨 Color Palette

### Primary Colors

#### Primary Blue

```
HEX: #1e3a8a
RGB: 30, 58, 138
CMYK: 78, 58, 0, 46
Usage: Main headers, key CTAs, navigation elements
Psychology: Trust, professionalism, stability
```

#### Secondary Blue

```
HEX: #3b82f6
RGB: 59, 130, 246
CMYK: 76, 47, 0, 4
Usage: Links, secondary buttons, accents
Psychology: Clarity, confidence, communication
```

### Accent Colors

#### Accent Green

```
HEX: #10b981
RGB: 16, 185, 129
CMYK: 91, 0, 30, 27
Usage: Success messages, growth indicators, positive elements
Psychology: Growth, transformation, freshness
```

#### Accent Orange

```
HEX: #f97316
RGB: 249, 115, 22
CMYK: 0, 54, 91, 2
Usage: CTAs, highlighted sections, energy indicators
Psychology: Energy, motivation, action
```

### Neutral Colors

```
Dark Background:    #0f172a (Primary text background)
Light Background:   #f8fafc (Secondary background)
Text Dark:          #1e293b (Primary text)
Text Light:         #64748b (Secondary text)
Border:             #e2e8f0 (Dividers, borders)
White:              #ffffff (Clean spaces)
```

### Color Usage Examples

| Element           | Color                 | Usage              |
| ----------------- | --------------------- | ------------------ |
| Header Background | White                 | #ffffff            |
| Hero Section      | Primary Blue Gradient | #1e3a8a to #3b82f6 |
| Primary Buttons   | Orange                | #f97316            |
| Secondary Buttons | Green                 | #10b981            |
| Links             | Secondary Blue        | #3b82f6            |
| Hover State       | Orange                | #f97316            |
| Success Message   | Green                 | #10b981            |
| Error Message     | Red                   | #ef4444            |
| Footer            | Dark                  | #0f172a            |
| Cards             | White                 | #ffffff            |

---

## 🔤 Typography

### Font Family

#### Primary Font (Headlines)

```
Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
Weight: 700 (Bold) to 800 (Extra Bold)
Letter Spacing: Normal to 1px
Usage: Headlines, section titles, main content
```

#### Secondary Font (Body)

```
Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
Weight: 400 (Regular) to 600 (Semi-Bold)
Usage: Body text, descriptions, lists
```

### Font Sizes

| Element         | Size (Desktop) | Size (Mobile) | Weight | Line Height |
| --------------- | -------------- | ------------- | ------ | ----------- |
| H1 (Hero)       | 3.5rem         | 2.5rem        | 800    | 1.2         |
| H2 (Section)    | 2.5rem         | 2rem          | 700    | 1.2         |
| H3 (Subsection) | 1.75rem        | 1.5rem        | 700    | 1.2         |
| H4 (Card Title) | 1.25rem        | 1.1rem        | 600    | 1.2         |
| Body Text       | 1rem           | 0.95rem       | 400    | 1.6         |
| Small Text      | 0.875rem       | 0.8rem        | 400    | 1.6         |
| Caption         | 0.75rem        | 0.7rem        | 400    | 1.4         |

### Text Styles

#### Headline Style

```css
font-family: Segoe UI, sans-serif;
font-weight: 700;
color: #1e3a8a;
letter-spacing: -0.5px;
```

#### Body Text Style

```css
font-family: Segoe UI, sans-serif;
font-weight: 400;
color: #1e293b;
line-height: 1.6;
```

#### Accent Text

```css
font-weight: 600;
color: #f97316;
text-transform: uppercase;
letter-spacing: 1px;
```

---

## 🏷️ Logo Guidelines

### Logo Placement

#### Header

- **Position**: Left-aligned
- **Size**: 40-50px height
- **Spacing**: 1rem from left edge
- **Alignment**: Vertically centered

#### Hero Section

- **Position**: Center-aligned
- **Size**: 120px height
- **Spacing**: 2rem below top of section
- **Style**: With subtle shadow/glow

#### Footer

- **Position**: Left-aligned in footer
- **Size**: 60-80px height
- **Spacing**: 1rem margins
- **Style**: Slightly muted opacity

### Logo Sizing Rules

```css
Header Logo:
max-width: 50px;
height: auto;
border-radius: 8px;

Hero Logo:
max-width: 120px;
height: auto;
border-radius: 12px;

Footer Logo:
max-width: 80px;
height: auto;
border-radius: 8px;
```

### Logo Background

- **Clear Background**: Preferred
- **Minimum Clearance**: 1rem on all sides
- **Logo Background Colors**: White or transparent
- **Don't Use On**: Busy/complex backgrounds

### Logo Don'ts

❌ Don't stretch or distort
❌ Don't place on similar-colored backgrounds
❌ Don't rotate or tilt
❌ Don't apply effects (shadows, glows)
❌ Don't reduce size below 30px
❌ Don't use outdated versions

---

## 🎨 Design Principles

### 1. Clarity First

- Clean, uncluttered layouts
- Clear hierarchy of information
- Easy-to-read typography
- Intuitive navigation

### 2. Professional Yet Approachable

- Balanced color usage
- Consistent spacing
- Modern aesthetics
- Human-centered design

### 3. Motivational & Inspiring

- Uplifting imagery
- Positive color choices
- Success-oriented messaging
- Aspirational tone

### 4. Consistency

- Uniform component styling
- Consistent spacing/margins
- Predictable interactions
- Aligned design elements

### 5. Accessibility

- High contrast ratios
- Readable font sizes
- Clear navigation
- Keyboard support

---

## 🧩 Component Styles

### Buttons

#### Primary Button (CTA)

```css
Background: linear-gradient(135deg, #f97316, #fb923c)
Color: White
Padding: 15px 40px
Border Radius: 50px
Font Weight: 700
Text Transform: uppercase
Letter Spacing: 1px
Hover Effect: Lift (transform: translateY(-3px))
```

#### Secondary Button

```css
Background: #10b981
Color: White
Padding: 12px 30px
Border Radius: 8px
Font Weight: 600
Hover Effect: Darken background
```

#### Link Button

```css
Color: #3b82f6
Text Decoration: None
Hover Color: #f97316
Border Bottom: 2px solid transparent
Hover Border: 2px solid #f97316
```

### Card Styles

#### Service Card

```css
Background: White
Border Radius: 12px
Box Shadow: 0 4px 6px rgba(0,0,0,0.1)
Border Left: 4px solid #10b981
Padding: 2rem
Hover: translateY(-10px), enhanced shadow
```

#### Info Card

```css
Background: White
Border Radius: 12px
Box Shadow: 0 4px 6px rgba(0,0,0,0.1)
Padding: 2rem
Border Top: 4px solid #10b981
Hover: Border color change to orange
```

### Form Elements

#### Input Fields

```css
Padding: 0.75rem
Border: 1px solid #e2e8f0
Border Radius: 8px
Font Size: 1rem
Focus: Border color #3b82f6
Focus Shadow: 0 0 0 3px rgba(59,130,246,0.1)
```

#### Textarea

```css
Padding: 0.75rem
Font Family: Inherit
Line Height: 1.6
Resize: Vertical
Focus: Same as input
```

---

## 🖼️ Imagery Guidelines

### Image Types

#### Hero Section

- **Type**: Inspirational landscape/skyline
- **Mood**: Sunrise, clarity, growth
- **Colors**: Blues, golds, warm tones
- **Orientation**: Landscape (16:9)
- **Size**: 1920x1080px minimum

#### Service/Card Images

- **Type**: Relevant to service (compass, graph, gears)
- **Mood**: Professional, dynamic, modern
- **Colors**: Aligned with brand palette
- **Orientation**: Square to landscape
- **Size**: 400x300px for cards

#### Team/People Images

- **Type**: Professional portraits, collaboration
- **Mood**: Trustworthy, approachable, diverse
- **Colors**: Natural lighting
- **Orientation**: Portrait for headshots, landscape for teams
- **Size**: 300x300px for avatars

### Photography Style

✅ **Do Use:**

- Professional photography
- High-quality stock images
- Diverse representation
- Authentic, genuine moments
- Consistent lighting/color tone

❌ **Avoid:**

- Overly staged/artificial scenes
- Low-quality images
- Outdated stock photos
- Extreme/distracting colors
- Inconsistent style

### Color Overlay Recommendations

For text overlay on images:

- Use semi-transparent dark overlay (rgba(0,0,0,0.3-0.5))
- Maintain text contrast ratio of at least 4.5:1
- Add text shadow for additional clarity

---

## 💬 Tone of Voice

### Brand Voice Characteristics

#### Professional

- Use industry-appropriate terminology
- Maintain formal register
- Avoid slang or colloquialisms
- Be precise and accurate

#### Motivational

- Emphasize positive outcomes
- Use aspirational language
- Inspire confidence
- Highlight transformations

#### Clarity-Driven

- Clear, concise messaging
- Avoid jargon without explanation
- Use simple, direct language
- Organize information logically

#### Inclusive

- Use gender-neutral language
- Respect diverse perspectives
- Be welcoming and supportive
- Acknowledge different backgrounds

### Writing Examples

#### ✅ Good Messaging

"Transform your organization from complexity to clarity with proven methodologies."
"We partner with you to achieve sustainable excellence."
"Your success is our mission."

#### ❌ Avoid

"We do consulting stuff for companies."
"Our service is super cool and amazing."
"This is the best thing ever."

### Key Phrases

- "Enabling excellence..."
- "Clarity and confidence..."
- "Sustainable transformation..."
- "Strategic partnership..."
- "Measurable results..."
- "Continuous improvement..."
- "Proven methodologies..."

---

## 📊 Visual Hierarchy

### Page Layout Structure

```
Header (Navigation)
   ↓
Hero Section (Largest, most prominent)
   ↓
About Section (Substantial, engaging)
   ↓
Services Section (Three equal cards)
   ↓
Execution Model (Process flow)
   ↓
Belief Section (Inspirational)
   ↓
Contact Section (Call-to-action focused)
   ↓
Footer (Reference, secondary navigation)
```

### Text Hierarchy

```
H1: Hero Headline (3.5rem)
    ├─ Subheading (2rem)
    └─ Description (1.25rem)

H2: Section Headers (2.5rem)
    ├─ H3: Subsections (1.75rem)
    └─ Body Text (1rem)
```

---

## 🎯 Responsive Design Specifications

### Breakpoints

| Device  | Width        | Grid          | Font Scale |
| ------- | ------------ | ------------- | ---------- |
| Mobile  | 320px-480px  | Single column | 90%        |
| Tablet  | 481px-768px  | 2 columns     | 95%        |
| Laptop  | 769px-1200px | 3 columns     | 100%       |
| Desktop | 1201px+      | 4 columns     | 100%       |

### Mobile First Approach

- Design for mobile first
- Add complexity for larger screens
- Test on actual devices
- Ensure touch targets are 44px minimum

---

## 🔗 Implementation Checklist

- [ ] All colors match brand palette
- [ ] Fonts use specified typefaces
- [ ] Logo sizing follows guidelines
- [ ] Image selection matches style
- [ ] Tone matches voice guidelines
- [ ] Spacing is consistent
- [ ] Hover states are defined
- [ ] Mobile responsiveness verified
- [ ] Accessibility standards met
- [ ] Performance optimized

---

## 📞 Brand Guidelines Support

For questions about brand implementation:

1. Check this style guide
2. Review color palette hex values
3. Verify typography specifications
4. Confirm image guidelines
5. Reference tone of voice guidelines

---

**Version**: 1.0
**Last Updated**: November 26, 2025
**Status**: Active

This style guide ensures consistency and professional presentation of the R&R Consulting brand across all digital and physical materials.
