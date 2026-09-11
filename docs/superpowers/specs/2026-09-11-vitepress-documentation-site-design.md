# VitePress Documentation Site Design

## Purpose

Add a locally runnable and buildable VitePress site that presents every Markdown document in this repository without moving or duplicating the existing documentation.

Deployment, hosting, analytics, external search, and a custom visual theme are outside this change.

## Architecture

VitePress will use the repository root as its source directory. This preserves the existing Markdown paths, relative links, and Git history. `README.md` will be rewritten to the root route so it remains both the repository README and the documentation homepage.

The tooling will use pnpm. A private `package.json` will expose commands for local development, production builds, previews, and tests. The committed pnpm lockfile will make dependency installation reproducible.

## Navigation

The standard VitePress theme will provide top navigation and a structured sidebar. Documents will be grouped into:

- Core documentation
- Services
- Architecture decisions
- Diagrams
- Project guidance

`AGENTS.md` and `CODEX.md` are intentionally included under project guidance because the requirement is to display every repository Markdown file.

A small navigation module will be the single source of truth for document labels, grouping, ordering, and routes. The VitePress configuration will derive its sidebar from this module rather than duplicating the document list.

## Validation

A Node test will recursively discover repository Markdown files while excluding dependency, build-output, and Git directories. It will verify that:

- Every Markdown file is represented exactly once in the navigation module.
- Every configured document exists.
- No document is listed more than once.

This makes adding a Markdown file without making it discoverable on the site a test failure.

A production VitePress build will verify that the site compiles and that internal document links resolve. Existing broken links encountered by that validation will be repaired without otherwise rewriting their content.

## Files and Responsibilities

- `package.json`: pnpm metadata and documentation scripts.
- `pnpm-lock.yaml`: reproducible dependency resolution.
- `.vitepress/config.mts`: VitePress site metadata, rewrite, theme configuration, and navigation wiring.
- `.vitepress/navigation.mjs`: ordered documentation catalog and sidebar generation.
- `tests/docs-navigation.test.mjs`: repository coverage, existence, and uniqueness checks for Markdown navigation.
- `.gitignore`: VitePress output and cache exclusions.
- `README.md`: concise local development and build instructions.

## User Workflow

From the repository root:

```sh
pnpm install
pnpm docs:dev
```

For a production build and local preview:

```sh
pnpm docs:build
pnpm docs:preview
```

## Constraints

- Existing Markdown files remain in their current locations.
- Existing infrastructure naming decisions remain unchanged.
- The site uses VitePress's default theme with no custom styling in this change.
- No deployment configuration is added.
- Generated output and dependency directories are not committed.
