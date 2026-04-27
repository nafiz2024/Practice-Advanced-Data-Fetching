# Advanced Data Fetching

A polished Next.js practice project for exploring real-world data fetching patterns with multiple sources, dynamic routes, and clean UI presentation.

This app combines:

- Local data from `json-server` for books and products
- External data from JSONPlaceholder for posts
- Dynamic detail pages for each resource
- A consistent card-based interface across sections

## Overview

The project is built to practice how modern Next.js pages fetch, display, and organize data from different endpoints. Instead of working with a single list, the app brings together three separate content flows:

- `Books` from a local API
- `Products` from a local API
- `Posts` from a live external API

The home page fetches all three in parallel and turns them into a small dashboard. Each section then has its own listing page and dedicated detail route.

## Features

- Parallel data loading on the home page using `Promise.all()`
- Local mock API with `json-server`
- External API integration with JSONPlaceholder
- Dynamic routes for books, products, and posts
- Loading UI for book details
- Graceful 404 handling with `notFound()`
- Modern responsive layout with Tailwind CSS
- Shared navigation across all pages

## Route Map

| Route | Purpose | Data Source |
| --- | --- | --- |
| `/` | Dashboard-style landing page | Local books + local products + external posts |
| `/books` | Book listing page | `http://localhost:5000/books` |
| `/books/[bookId]` | Single book details page | `http://localhost:5000/books/:id` |
| `/products` | Product listing page | `http://localhost:5000/products` |
| `/products/[productId]` | Single product details page | `http://localhost:5000/products/:id` |
| `/post` | Posts listing page | `https://jsonplaceholder.typicode.com/posts` |
| `/post/[postId]` | Single post details page | `https://jsonplaceholder.typicode.com/posts/:id` |

## Tech Stack

- Next.js `16.2.4`
- React `19.2.4`
- Tailwind CSS `4`
- DaisyUI
- JSON Server

## Project Structure

```text
src/
  app/
    page.js
    books/
      page.jsx
      [bookId]/
        page.jsx
        loading.jsx
    products/
      page.jsx
      [productId]/
        page.jsx
    post/
      page.jsx
      [postId]/
        page.jsx
  component/
    navbar/
      page.jsx
  lib/
    detail-hero-image.js

db.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the local mock API

```bash
npm run server
```

This runs `json-server` on:

```text
http://localhost:5000
```

### 3. Start the Next.js app

Open a second terminal and run:

```bash
npm run dev
```

Then visit:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run server
```

## Local API Data

The local API lives in [`db.json`](./db.json) and currently exposes two collections:

- `books`
- `products`

Example endpoints:

```text
GET http://localhost:5000/books
GET http://localhost:5000/products
GET http://localhost:5000/books/1
GET http://localhost:5000/products/1
```

## Learning Focus

This project is useful for practicing:

- Server-side data fetching in route components
- Combining multiple async requests
- Working with local and external APIs together
- Building dynamic detail pages from route params
- Handling loading and missing-state UX
- Designing a more production-like UI for fetched data

## Notes

- The app depends on the local `json-server` running on port `5000`
- Posts are fetched from JSONPlaceholder, so that section requires internet access
- Books and products use `cache: 'no-store'`, so fresh data is requested on each load

## Future Improvements

- Add search and filtering
- Add pagination for posts
- Add error boundaries for each section
- Move fetch helpers into reusable server utilities
- Add TypeScript or schema validation for API responses

## License

This project is for learning and practice.
