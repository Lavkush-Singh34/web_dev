
## Delete previous commit
git reset --hard HEAD~1

To **remove all lines of code that are not staged** in Git — essentially **discard all unstaged changes** — you can use the following command:

```bash
git restore .
```

This will:

- Discard **all unstaged changes** in your working directory.
    
- Keep the **staged changes** intact.
    

---

### Want to be more specific?

- To discard changes in a specific file:
    
    ```bash
    git restore path/to/your/file.js
    ```
    
- To discard **both staged and unstaged** changes (reset everything to the last commit):
    
    ⚠️ Use with caution — this will wipe all your changes:
    
    ```bash
    git reset --hard
    ```
    

Let me know if you want to discard changes in tracked files, untracked files, or even stash them instead.