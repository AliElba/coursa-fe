# Git Workflow: Merging Latest Changes to Stage and Production

This guide explains how to apply the latest changes from the `main` branch to your `stage` and `prod` branches.

---

## Overview

The recommended workflow ensures that your stage and production environments stay up-to-date with the latest changes from the main branch while maintaining a clean Git history.

---

## Recommended Workflow

### 1. Update Stage Branch

```bash
# 1. Make sure you're on stage branch
git checkout stage

# 2. Pull latest changes from remote
git pull origin stage

# 3. Merge main into stage
git merge main

# 4. Push the merged changes
git push origin stage
```

### 2. Update Production Branch

```bash
# 1. Switch to production branch
git checkout prod

# 2. Pull latest changes from remote
git pull origin prod

# 3. Merge main into production
git merge main

# 4. Push the merged changes
git push origin prod
```

---

## Alternative Approaches

### Option 1: Rebase (Cleaner History)
```bash
# Switch to target branch
git checkout stage

# Rebase on top of main (cleaner history)
git rebase main

# Push with force (if rebase rewrote history)
git push origin stage --force-with-lease
```

### Option 2: Fast-forward Merge
```bash
# Switch to target branch
git checkout stage

# Fast-forward merge (only if stage has no new commits)
git merge --ff-only main
```

---

## Pre-Merge Checks

Before merging, you can preview what will be merged:

```bash
# See what commits are in main but not in stage
git log stage..main --oneline

# See the difference between branches
git diff stage..main

# Check current branch
git branch
```

---

## Best Practices

1. **Always pull before merging** to ensure you have the latest remote changes
2. **Test on stage first** before merging to production
3. **Use meaningful commit messages** for merge commits
4. **Resolve conflicts carefully** if they occur during merge
5. **Consider using protected branches** for stage and production

---

## Troubleshooting

### If merge conflicts occur:
```bash
# Abort the merge
git merge --abort

# Or resolve conflicts manually, then:
git add .
git commit -m "Resolve merge conflicts"
```

### If you need to force push (use with caution):
```bash
git push origin stage --force-with-lease
```

---

## Workflow Summary

1. **Development**: Work on feature branches from `main`
2. **Stage**: Merge `main` → `stage` for testing
3. **Production**: Merge `main` → `prod` for deployment
4. **Hotfixes**: Create hotfix branches from `prod` if needed

This ensures a clean, predictable deployment pipeline with proper testing at each stage. 