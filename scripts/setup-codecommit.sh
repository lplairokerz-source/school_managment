
#!/usr/bin/env bash
set -euo pipefail

REPO_NAME="school-mgmt-frontend"
REGION="<your-region>" # e.g., ap-south-1

# 1) Create CodeCommit repository
aws codecommit create-repository --repository-name "$REPO_NAME" --region "$REGION" || true

# 2) Initialize git if not already
if [ ! -d .git ]; then
  git init
fi

git add .
git commit -m "Initial commit - School Management React Frontend" || true

git branch -M main || true

# 3) Add remote using HTTPS (requires IAM Git credentials)
REMOTE_URL="https://git-codecommit.$REGION.amazonaws.com/v1/repos/$REPO_NAME"

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE_URL"

echo "Pushing to $REMOTE_URL ..."

git push -u origin main

echo "Done."
