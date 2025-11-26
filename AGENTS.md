# AGENTS.md - Agent Guidelines for ModernBlog Repository

This document provides rules, guidelines, and a table of contents for AI agents working with this codebase.

## Repository Purpose

ModernBlog is an automated blog publishing pipeline that:
- Accepts Markdown files in `Posts/` directory
- Builds a static site using Astro
- Deploys to GitHub Pages and portfolio site
- Cross-posts to Medium, Dev.to, and LinkedIn (v2)

## Codebase Structure

```
ModernBlog/
├── AGENTS.md              # This file - agent guidelines
├── LOCAL_AGENT.md          # Local-only config (not in repo)
├── README.md              # User-facing documentation
├── COMMAND_LIST.md         # Quick command reference
├── Posts/                  # Blog post Markdown files
├── Images/                 # Image assets
└── Pipeline/               # Deployment automation
    ├── Research/           # Implementation research & decisions
    └── site/              # Astro static site generator
```

## White-Labeling Philosophy

**Critical Rule**: This repository must remain white-label and usable by anyone.

- **Public Repo**: Contains only generic, reusable code
- **No Personal Info**: No API keys, tokens, URLs, or personal identifiers
- **LOCAL_AGENT.md**: Contains all personal config (stored outside repo)
- **Variable Injection**: Local agent injects variables into code before build, then white-labels them back

## Documentation Table of Contents

### For Agents
1. **AGENTS.md** (this file) - Agent guidelines and rules
2. **LOCAL_AGENT.md** - Local configuration (outside repo)
3. **Pipeline/Research/** - Implementation decisions and research

### For Users
1. **README.md** - Overview and getting started
2. **COMMAND_LIST.md** - Quick command reference
3. **Pipeline/Research/implementation-questions.md** - Decision log

## Key Rules for Agents

### 0. Image Path Handling - CRITICAL
**NEVER manually add base path prefixes to image src attributes in source files.**

- ✅ **ALWAYS use:** `src="Images/filename.jpg"` (relative path, no prefix)
- ❌ **NEVER use:** `src="/ModernBlog/Images/..."` or `src="/Images/..."`
- The `remark-fix-image-paths.js` plugin automatically adds the base path during build
- See `Pipeline/Research/image-path-handling.md` for full documentation
- **If local preview shows broken images:** Fix the image copy step, NOT the source paths
- If images break, check that source files use `Images/...` format and the remark plugin is enabled

### 1. Never Commit Personal Information
- ❌ API keys, tokens, passwords
- ❌ Personal URLs, domains
- ❌ Email addresses, usernames
- ❌ Local file paths
- ✅ Use placeholders: `YOUR_API_KEY`, `YOUR_DOMAIN`, etc.

### 2. Variable Injection Pattern
When code needs personal config:
1. Use placeholder variables: `process.env.MEDIUM_TOKEN`
2. Document in LOCAL_AGENT.md what needs to be set
3. Local agent injects real values before build
4. After build, restore placeholders

### 3. Documentation Standards
- **AGENTS.md**: Technical details, architecture, agent rules
- **README.md**: User-friendly, getting started, philosophy
- **COMMAND_LIST.md**: Quick reference, copy-paste commands
- **LOCAL_AGENT.md**: Personal config, secrets management

### 4. Code Organization
- **Pipeline/site/**: Astro project (white-label)
- **Pipeline/scripts/**: Build and deployment scripts
- **Pipeline/.github/workflows/**: GitHub Actions (use secrets, not hardcoded values)

### 5. Testing Strategy
- **Stage First**: All posts go to staging by default
- **Draft Mode**: Use draft/private flags in APIs during testing
- **Manual Review**: User reviews staging before promotion
- **Production**: Only after explicit approval

### 6. Git Commands
- **User Handles Git**: The user handles all git commands manually unless otherwise specified
- **No Auto Git**: Agents should NOT run git commands (init, add, commit, push, etc.) unless explicitly requested
- **Exception**: Only run git commands when user explicitly asks for them

## Common Tasks

### Adding a New Blog Post
1. Create `.md` file in `Posts/`
2. Optional: Add frontmatter (title, tags, etc.)
3. Push to repo
4. GitHub Actions processes automatically

### Modifying Pipeline
1. Update code in `Pipeline/`
2. Test locally if possible
3. Push to repo
4. Workflow runs automatically

### Debugging
1. Check GitHub Actions logs
2. Review `Pipeline/Research/` for decisions
3. Check LOCAL_AGENT.md for config issues
4. Review COMMAND_LIST.md for commands

## Variable Placeholders

When writing code, use these placeholders:
- `YOUR_MEDIUM_TOKEN` → Injected from LOCAL_AGENT.md
- `YOUR_DEVTO_API_KEY` → Injected from LOCAL_AGENT.md
- `YOUR_LINKEDIN_TOKEN` → Injected from LOCAL_AGENT.md
- `YOUR_VERCEL_TOKEN` → Injected from LOCAL_AGENT.md
- `YOUR_PORTFOLIO_URL` → Injected from LOCAL_AGENT.md
- `YOUR_GITHUB_USERNAME` → Injected from LOCAL_AGENT.md

## File Modification Rules

### Safe to Modify
- ✅ `Posts/*.md` - Blog content
- ✅ `Pipeline/site/` - Astro site code
- ✅ `Pipeline/scripts/` - Build scripts
- ✅ `.github/workflows/` - GitHub Actions (using secrets)

### Never Modify Directly
- ❌ `LOCAL_AGENT.md` - Only local agent modifies
- ❌ Hardcoded personal info - Use variables

## Questions?

If an agent is unsure:
1. Check this file first
2. Review LOCAL_AGENT.md (if available locally)
3. Check Pipeline/Research/ for implementation details
4. Default to white-label, generic approach

