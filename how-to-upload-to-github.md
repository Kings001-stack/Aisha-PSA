# How to upload to GitHub (quick)

1. Configure git (one-time)
   - git config --global user.name "Your Name"
   - git config --global user.email "you@example.com"

2. Initialize or update local repo
   - cd path/to/your/project
   - git init # only if repo not initialized
   - git status

3. Add files and commit
   - Create .gitignore if needed (node_modules, .env, etc.)
   - git add .
   - git commit -m "Initial commit" # or a meaningful message

4. Create a remote repository on GitHub
   - Option A: Use the GitHub website -> New repository -> copy the remote URL
   - Option B: Use gh CLI: gh repo create YOUR_REPO_NAME --public --source=. --remote=origin

5. Add remote and push
   - git remote add origin https://github.com/USERNAME/REPO.git # or use SSH URL
   - git branch -M main # or use 'master' if you prefer
   - git push -u origin main

6. Updating later
   - git add <files>
   - git commit -m "Describe changes"
   - git push

7. Tips & troubleshooting
   - Use SSH keys to avoid entering password: https://docs.github.com/en/authentication/connecting-to-github-with-ssh
   - If push rejected: git pull --rebase origin main then resolve conflicts, then git push
   - Check remote: git remote -v
   - See commit history: git log --oneline

End — verify files appear in your GitHub repository.
