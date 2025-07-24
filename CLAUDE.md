# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

CCIE Master is a professional CCIE/CCDE certification training website built as a pure static HTML/CSS/JavaScript application. The site features an Apple-inspired design with responsive layouts, dynamic promotional systems, and interactive elements. No server-side processing is required - it can be deployed to any static hosting service.

## Development Commands

### Local Development
- **Start development server**: `python3 serve.py` or `./start.sh`
- **Alternative servers**: 
  - PHP: `php -S localhost:8000`
  - Node.js: `npx serve .`
  - Direct file opening: Open `index.html` directly in browser

### Deployment
- Copy all files to web server's `public_html` directory
- Ensure `index.html` is set as default homepage
- Configure SSL certificate (recommended)
- Set appropriate caching strategies

## Architecture & Structure

### Core Technologies
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Design System**: Apple-inspired design with CSS custom properties
- **Responsive**: Mobile-first approach with breakpoints
- **Performance**: Lazy loading, compression, caching strategies

### Key Components

#### 1. Promotional System (`js/promotions-config.js`)
- **Purpose**: Manages dynamic pricing and seasonal promotions
- **Features**: 12-month promotional themes with automatic date-based switching
- **Configuration**: Course base prices, discount percentages, holiday themes
- **Usage**: Automatically updates prices across all pages based on current month

#### 2. Mobile Navigation (`js/mobile-menu.js`)
- **Purpose**: Handles mobile menu functionality and touch interactions
- **Features**: Touch swipe support, accessibility attributes, auto-close on resize
- **Integration**: Works with carousel touch gestures

#### 3. Course Management
- **Base Prices**: Configured in `promotions-config.js` for 8 different certification tracks
- **Dynamic Updates**: Prices automatically adjust based on current promotional period
- **Display Logic**: Shows original price, discount percentage, and final price

#### 4. Page Structure
- **Homepage** (`index.html`): Main landing page with course overview and pricing
- **Courses** (`courses/index.html`): Detailed course catalog with enhanced marketing elements
- **Contact** (`contact/index.html`): Contact information and forms
- **Success Stories** (`success-stories/index.html`): Customer testimonials

### Design System

#### CSS Architecture
- **Custom Properties**: Defined color palette and typography variables
- **Responsive Design**: Mobile-first with specific breakpoints
- **Animation System**: Subtle animations for enhanced UX
- **Component-based**: Modular CSS structure

#### Key Color Variables
```css
--color-primary: #2563eb;     /* Professional blue */
--color-secondary: #10b981;   /* Success green */
--color-accent: #f59e0b;      /* Highlight orange */
--color-urgency: #ef4444;     /* Urgency red */
```

### Marketing Features

#### Dynamic Promotional System
- **Monthly Themes**: 12 different promotional themes (New Year, Valentine's, etc.)
- **Automatic Switching**: System automatically detects current month and applies appropriate promotion
- **Configurable**: Easy to modify discounts, themes, and messaging
- **Social Engineering**: Incorporates scarcity, urgency, and social proof elements

#### Success Rate Display
- **Carousel System**: Rotating success stories with 100% pass rates
- **Auto-refresh**: Stories refresh every 4 seconds with pause on hover
- **Dynamic Data**: Varying completion timeframes (2-6 months)

## Important Configuration Files

### `js/promotions-config.js`
- Contains all course pricing and promotional configuration
- Monthly promotional themes with discounts ranging from 18% to 35%
- Base prices for 8 certification tracks
- Settings for animation, countdown display, and promotional features

### Contact Information
- **Email**: cciemasternode@gmail.com
- **WhatsApp**: +1 (603) 486-1896
- **Website**: https://cciemaster.com

## Development Guidelines

### Code Style
- Follow existing Apple-inspired design patterns
- Maintain responsive design principles
- Ensure accessibility compliance (ARIA attributes)
- Use semantic HTML structure

### Content Management
- All content should be in English (as specified in project requirements)
- Promotional content updates via `promotions-config.js`
- Maintain consistent brand messaging across all pages

### Performance Considerations
- Optimize images and use WebP format when possible
- Implement lazy loading for non-critical resources
- Minimize JavaScript execution and CSS render-blocking
- Use font-display: swap for web fonts

## SEO & Marketing

### Meta Tags
- Comprehensive SEO meta tags implemented
- Open Graph and Twitter Card support
- Structured data for courses and organization
- Canonical URLs and proper heading hierarchy

### Conversion Optimization
- Social proof elements (success stories, testimonials)
- Scarcity indicators (limited-time offers, countdown timers)
- Clear call-to-action buttons
- Trust signals (certifications, pass rates)

## File Structure Notes

- Static assets in `/images/` directory with organized subdirectories
- JavaScript modules in `/js/` directory
- Each major page has its own directory structure
- Mobile-specific CSS and optimizations included
- Service worker (`sw.js`) for potential PWA features

## Version History

Current version: v2.1 (2025-01-19) - Footer standardization and UI improvements completed. The project has evolved from a Node.js application to a pure static site for simplified deployment and maintenance.